const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const screenshot = document.querySelector('#app-screenshot');
function applyTheme(theme) {
  root.dataset.theme = theme;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const source = `assets/layout-manager-${theme}.png`;
  screenshot.src = source;
  screenshot.alt = `Layout Manager on macOS in ${theme} mode, showing the Quad template with Side A and Side B, spools, blocks, valves, and ports.`;
  document.querySelectorAll('.screenshot-link').forEach(link => { link.href = source; });
  document.querySelector('link[rel="icon"]').href = `assets/icon-${theme}.png`;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#19191b' : '#faf9f7';
  document.querySelector('#theme-label').textContent = `${nextTheme === 'light' ? 'Light' : 'Dark'} mode`;
  themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
}
let savedTheme;
try { savedTheme = localStorage.getItem('lm-site-theme'); } catch {}
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
themeToggle.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('lm-site-theme', theme); } catch {}
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
  link.className = 'button';
  link.id = button.id;
  link.href = release.ios.url;
  link.download = '';
  link.textContent = 'Download for iPhone & iPad ↓';
  button.replaceWith(link);
  document.querySelector('#ios-meta').textContent = `iOS / iPadOS 18+ · Signed .ipa${release.ios.size ? ` · ${release.ios.size}` : ''}`;
  document.querySelector('#ios-install').textContent = 'iPhone & iPad: Download the signed IPA and follow the installation method supplied with the build. Downloading the file alone does not install the app.';
}).catch(() => {});
