"""
Safe HTTP error injector for local testing.

Usage examples:
  python inject_errors.py --url http://localhost:3000 --mode bad_path
  python inject_errors.py --url http://localhost:3000 --mode invalid_json --endpoint /api/auth
  python inject_errors.py --url http://localhost:3000 --mode large_payload --count 20
  python inject_errors.py --url http://localhost:3000 --mode coding_compiler
  python inject_errors.py --url http://localhost:3000 --mode stuck_unscored
  python inject_errors.py --url http://localhost:3000 --mode score_discrepancy
  python inject_errors.py --url http://localhost:3000 --mode upload_500
  python inject_errors.py --url http://localhost:3000 --mode report_mismatch
  python inject_errors.py --url http://localhost:3000 --mode api_blocked
  python inject_errors.py --url http://localhost:3000 --mode share_report
  python inject_errors.py --url http://localhost:3000 --mode reviewer_workflow
  python inject_errors.py --url http://localhost:3000 --mode invite_email

Modes (non-destructive):
  - bad_path: GET a non-existent path -> 404
  - invalid_json: POST malformed JSON to an endpoint (may trigger 400/500)
  - bad_method: use DELETE/PUT on endpoint (may trigger 405/500)
  - large_payload: POST a large body to endpoint (may reveal request-size handling errors)
  - concurrent: send many requests concurrently to an endpoint (simulates load)

  iMocha-specific scenarios:
  - coding_compiler:     Simulate intermittent coding execution engine failure (malformed
                         code submission payload to /api/coding/execute)
  - stuck_unscored:      Simulate reports stuck in unscored state by polling a scoring
                         status endpoint with a missing/invalid assessment ID
  - score_discrepancy:   POST tampered/mismatched score data to trigger score validation error
  - upload_500:          POST a malformed question bank payload to trigger 500 on upload
  - report_mismatch:     GET a report with a non-existent or mismatched result ID
  - api_blocked:         Send requests with headers that mimic a firewall-blocked API call
  - share_report:        POST to share-report endpoint with missing required fields
  - reviewer_workflow:   POST invalid reviewer action/state transition to evaluation workflow
  - invite_email:        POST invite with malformed/missing email to trigger notification failure

This tool is for authorized testing only. Do not run against production or systems you
are not permitted to test.
"""

import argparse
import requests
import threading
import time
import sys


def make_request(method, url, **kwargs):
    try:
        r = requests.request(method, url, timeout=10, **kwargs)
        print(f"{method} {url} -> {r.status_code} {r.reason}")
        text = r.text
        if len(text) > 400:
            text = text[:400] + '...'
        print(text)
    except requests.exceptions.RequestException as e:
        print(f"{method} {url} -> EXCEPTION: {e}")


def mode_bad_path(base):
    url = base.rstrip('/') + '/__nonexistent_path_404__'
    make_request('GET', url)


def mode_invalid_json(base, endpoint):
    url = base.rstrip('/') + (endpoint or '/api/test')
    # deliberately malformed JSON
    headers = {'Content-Type': 'application/json'}
    make_request('POST', url, data='{"bad":', headers=headers)


def mode_bad_method(base, endpoint):
    url = base.rstrip('/') + (endpoint or '/')
    make_request('DELETE', url)


def mode_large_payload(base, endpoint, size=5_000_00):
    url = base.rstrip('/') + (endpoint or '/api/test')
    payload = 'A' * int(size)
    headers = {'Content-Type': 'text/plain'}
    make_request('POST', url, data=payload, headers=headers)


def mode_concurrent(base, endpoint, count=50, delay=0.01):
    url = base.rstrip('/') + (endpoint or '/api/test')
    def worker(i):
        make_request('GET', url)
    threads = []
    for i in range(int(count)):
        t = threading.Thread(target=worker, args=(i,))
        threads.append(t)
        t.start()
        time.sleep(float(delay))
    for t in threads:
        t.join()


# ---------------------------------------------------------------------------
# iMocha-specific scenario modes
# ---------------------------------------------------------------------------

def mode_coding_compiler(base):
    """Coding compiler failures: send a malformed code execution payload."""
    url = base.rstrip('/') + '/api/coding/execute'
    headers = {'Content-Type': 'application/json'}
    # missing required fields (language, stdin) and broken code body
    payload = '{"code": null, "language": "", "testCases": null, "executionId":'
    print("[coding_compiler] POST malformed code execution payload ->", url)
    make_request('POST', url, data=payload, headers=headers)


def mode_stuck_unscored(base):
    """Reports stuck in unscored state: poll scoring status with invalid assessment ID."""
    url = base.rstrip('/') + '/api/assessments/00000000-0000-0000-0000-000000000000/score-status'
    print("[stuck_unscored] GET scoring status for non-existent assessment ->", url)
    make_request('GET', url)


def mode_score_discrepancy(base):
    """Score discrepancies: POST tampered score payload to score submission endpoint."""
    url = base.rstrip('/') + '/api/assessments/score'
    headers = {'Content-Type': 'application/json'}
    # submitted score intentionally mismatches expected structure
    payload = (
        '{"assessmentId": "test-001", "candidateId": "cand-999", '
        '"totalScore": -999, "maxScore": 0, "sectionScores": "INVALID"}'
    )
    print("[score_discrepancy] POST tampered score data ->", url)
    make_request('POST', url, data=payload, headers=headers)


def mode_upload_500(base):
    """500 errors during question bank uploads: POST malformed question bank payload."""
    url = base.rstrip('/') + '/api/question-bank/upload'
    headers = {'Content-Type': 'application/json'}
    # truncated/corrupt question bank JSON
    payload = '{"bankName": "Test Bank", "questions": [{"type": "mcq", "text": null, "options":'
    print("[upload_500] POST malformed question bank payload ->", url)
    make_request('POST', url, data=payload, headers=headers)


def mode_report_mismatch(base):
    """Report data mismatch: GET report with a non-existent/mismatched result ID."""
    url = base.rstrip('/') + '/api/reports/results/MISMATCH-ID-99999'
    print("[report_mismatch] GET report with mismatched result ID ->", url)
    make_request('GET', url)


def mode_api_blocked(base):
    """API domain access blocked by firewall: send requests with blocked/spoofed headers."""
    url = base.rstrip('/') + '/api/health'
    headers = {
        'Origin': 'https://blocked-external-domain.example.com',
        'X-Forwarded-For': '10.0.0.1',
        'Referer': 'https://blocked-external-domain.example.com/',
    }
    print("[api_blocked] GET with firewall-triggering headers ->", url)
    make_request('GET', url, headers=headers)


def mode_share_report(base):
    """Share report functionality failing: POST with missing required share fields."""
    url = base.rstrip('/') + '/api/reports/share'
    headers = {'Content-Type': 'application/json'}
    # missing reportId and recipient fields
    payload = '{"message": "Please review", "expiresAt": null}'
    print("[share_report] POST share-report with missing required fields ->", url)
    make_request('POST', url, data=payload, headers=headers)


def mode_reviewer_workflow(base):
    """Reviewer workflow malfunction: POST invalid state transition to evaluation workflow."""
    url = base.rstrip('/') + '/api/reviewer/action'
    headers = {'Content-Type': 'application/json'}
    # invalid action type and missing submission reference
    payload = (
        '{"reviewerId": "rev-001", "action": "INVALID_ACTION", '
        '"submissionId": null, "verdict": "UNKNOWN"}'
    )
    print("[reviewer_workflow] POST invalid reviewer action ->", url)
    make_request('POST', url, data=payload, headers=headers)


def mode_invite_email(base):
    """Invite emails not being sent: POST invite with malformed/missing email address."""
    url = base.rstrip('/') + '/api/invites/send'
    headers = {'Content-Type': 'application/json'}
    # malformed email and missing assessment reference
    payload = (
        '{"candidateName": "Test Candidate", "email": "not-an-email@@", '
        '"assessmentId": null, "expiresIn": -1}'
    )
    print("[invite_email] POST invite with malformed email ->", url)
    make_request('POST', url, data=payload, headers=headers)


def main():
    p = argparse.ArgumentParser(description='Simple HTTP error injector for local testing')
    p.add_argument('--url', '-u', default='http://localhost:3000', help='Base URL of backend')
    p.add_argument('--mode', '-m', choices=[
        'bad_path', 'invalid_json', 'bad_method', 'large_payload', 'concurrent',
        'coding_compiler', 'stuck_unscored', 'score_discrepancy', 'upload_500',
        'report_mismatch', 'api_blocked', 'share_report', 'reviewer_workflow', 'invite_email',
    ], default='bad_path')
    p.add_argument('--endpoint', '-e', default='/', help='Endpoint path to target (e.g. /api/auth)')
    p.add_argument('--count', '-c', default=10, type=int, help='Number of requests (for concurrent or load modes)')
    p.add_argument('--size', '-s', default=500000, type=int, help='Payload size for large_payload')
    p.add_argument('--delay', '-d', default=0.01, type=float, help='Delay between concurrent request starts')
    args = p.parse_args()

    print(f"Target: {args.url}  Mode: {args.mode} Endpoint: {args.endpoint}")

    if args.mode == 'bad_path':
        mode_bad_path(args.url)
    elif args.mode == 'invalid_json':
        mode_invalid_json(args.url, args.endpoint)
    elif args.mode == 'bad_method':
        mode_bad_method(args.url, args.endpoint)
    elif args.mode == 'large_payload':
        mode_large_payload(args.url, args.endpoint, size=args.size)
    elif args.mode == 'concurrent':
        mode_concurrent(args.url, args.endpoint, count=args.count, delay=args.delay)
    elif args.mode == 'coding_compiler':
        mode_coding_compiler(args.url)
    elif args.mode == 'stuck_unscored':
        mode_stuck_unscored(args.url)
    elif args.mode == 'score_discrepancy':
        mode_score_discrepancy(args.url)
    elif args.mode == 'upload_500':
        mode_upload_500(args.url)
    elif args.mode == 'report_mismatch':
        mode_report_mismatch(args.url)
    elif args.mode == 'api_blocked':
        mode_api_blocked(args.url)
    elif args.mode == 'share_report':
        mode_share_report(args.url)
    elif args.mode == 'reviewer_workflow':
        mode_reviewer_workflow(args.url)
    elif args.mode == 'invite_email':
        mode_invite_email(args.url)
    else:
        print('Unknown mode')

if __name__ == '__main__':
    main()
