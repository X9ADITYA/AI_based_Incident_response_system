(function(){
  // Simple hash router
  const routes = ['dashboard','analytics','assessments','candidates','status','settings','login'];
  function showRoute(route){
    routes.forEach(r=>{
      const el=document.getElementById(r);
      if(!el) return;
      el.hidden = (r!==route);
    });
  }
  function parseHash(){
    const h = location.hash.replace('#/','')||'dashboard';
    return routes.includes(h)?h:'dashboard';
  }
  window.addEventListener('hashchange',()=> showRoute(parseHash()));
  // initial
  showRoute(parseHash());

  // basic analytics chart (sparkline)
  function drawChart(){
    const c = document.getElementById('analyticsChart');
    if(!c) return; const ctx=c.getContext('2d');
    const data=[12,18,14,20,24,18,28,22];
    const w=c.width, h=c.height; ctx.clearRect(0,0,w,h);
    ctx.strokeStyle='#0f172a'; ctx.lineWidth=2; ctx.beginPath();
    data.forEach((v,i)=>{
      const x = (i/(data.length-1))*(w-20)+10;
      const y = h - ((v - Math.min(...data))/(Math.max(...data)-Math.min(...data)))*(h-20)-10;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.stroke();
  }
  drawChart();

  // search filter for lists (simple)
  const search = document.getElementById('search');
  if(search){
    search.addEventListener('input',e=>{
      const q=e.target.value.toLowerCase();
      document.querySelectorAll('.candidates li, .activity-list li, .table tbody tr').forEach(el=>{
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(q)?'list-item':'none';
        if(el.tagName==='TR') el.style.display = text.includes(q)?'table-row':'none';
      });
    });
  }

  // simple settings save
  const settingsForm = document.getElementById('settingsForm');
  if(settingsForm){
    settingsForm.addEventListener('submit', e=>{
      e.preventDefault();
      const org = document.getElementById('orgName').value;
      const notif = document.getElementById('notifToggle').checked;
      localStorage.setItem('imocha.org',org);
      localStorage.setItem('imocha.notif',notif);
      alert('Settings saved');
    });
  }

  // login form demo
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', e=>{
      e.preventDefault();
      alert('Demo login — no backend');
      location.hash='#/dashboard';
    });
  }

  // initialize progress bars (reads data-percent)
  function initProgressBars(){
    document.querySelectorAll('.progress').forEach(el=>{
      const pct = parseFloat(el.getAttribute('data-percent'))||0;
      const bar = el.querySelector('.bar');
      if(bar){
        bar.style.width = Math.max(0,Math.min(100,pct)) + '%';
      }
    });
  }
  initProgressBars();
})();