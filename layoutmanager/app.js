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
