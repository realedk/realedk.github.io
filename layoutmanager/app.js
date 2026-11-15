const root = document.documentElement;
const themeButton = document.querySelector('#theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let chosenTheme;
try { chosenTheme = localStorage.getItem('lm-site-theme'); } catch {}
function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} appearance`);
  document.querySelector('link[rel="icon"]').href = `assets/icon-${theme}.png`;
}
applyTheme(chosenTheme || (systemTheme.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  chosenTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(chosenTheme);
  try { localStorage.setItem('lm-site-theme', chosenTheme); } catch {}
});
systemTheme.addEventListener('change', event => {
  if (!chosenTheme) applyTheme(event.matches ? 'dark' : 'light');
});
const dialog = document.querySelector('#install-dialog');
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', selected);
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
}
document.querySelectorAll('[data-guide]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelectorAll('.close-button, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});
fetch('downloads.json').then(response => {
  if (!response.ok) throw new Error('Download manifest unavailable');
  return response.json();
}).then(release => {
  if (release.mac?.url) {
    document.querySelector('#mac-download').href = release.mac.url;
    document.querySelector('#mac-meta').textContent = `macOS 13+ · Apple silicon · .app in ZIP · ${release.mac.size}`;
  }
  if (!release.ios?.url) return;
  const button = document.querySelector('#ios-download');
  const link = document.createElement('a');
  link.className = 'button primary download-link';
  link.id = button.id;
  link.href = release.ios.url;
  link.download = '';
  link.textContent = 'Download for iPhone & iPad ↓';
  button.replaceWith(link);
  const status = document.querySelector('#ios-status');
  status.classList.remove('pending');
  status.textContent = 'Available';
  document.querySelector('#ios-meta').textContent = `iOS / iPadOS 18+ · Signed .ipa${release.ios.size ? ` · ${release.ios.size}` : ''}`;
  document.querySelector('#ios-guide > p').textContent = 'Download the signed IPA, then follow the installation instructions supplied with your distribution build.';
}).catch(() => {});
