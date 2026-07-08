This folder contains a simple static conversion of the `IMOCHA` React/TSX app into a single-page HTML/CSS/JS bundle.

Files:
- `index.html` — main single-file UI
- `styles.css` — minimal styling
- `app.js` — tiny router and interactive bits

How to preview locally:

Using Python (if available):

```bash
python -m http.server 8080
# open http://localhost:8080 in your browser
```

Or with Node (if you have `npx`):

```bash
npx serve . -l 8080
```

Notes:
- This is a hand-converted, minimal demo. It captures layout and basic interactions only.
- If you want more precise, pixel-matched conversion of specific components, tell me which components to prioritize.