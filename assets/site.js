const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  menu.querySelector('span').textContent = open ? '−' : '+';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.click(); menu.focus();
  }
});
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href') === current) a.setAttribute('aria-current', 'page');
});
document.querySelectorAll('.photo img').forEach(img => {
  const fallback = () => { img.style.display = 'none'; };
  img.addEventListener('error', fallback);
  if (img.complete && !img.naturalWidth) fallback();
});
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#brief-form');
if (form) {
  const requested = new URLSearchParams(location.search).get('service');
  const select = form.querySelector('select');
  if ([...select.options].some(o => o.value === requested)) select.value = requested;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const brief = `NEXGEN — PROJECT BRIEF\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nBrand: ${data.get('brand')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('message')}\n`;
    const url = URL.createObjectURL(new Blob([brief], {type: 'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'nexgen-project-brief.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.querySelector('#form-status').textContent = 'Your brief is ready to download. Nothing has been sent to the studio.';
  });
}
