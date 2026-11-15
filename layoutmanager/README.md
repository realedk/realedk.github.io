# Layout Manager website

This folder is the Layout Manager app page in the `realedk.github.io` repository. Serve the repository root, then open `/layoutmanager/`.

`index.html`, `styles.css`, and `app.js` are separate. The appearance button switches the website, app screenshot, favicon, and full-size screenshot links together. Dark is the default; the selected appearance is saved in this browser.

`assets/layout-manager-dark.png` and `assets/layout-manager-light.png` are the original desktop screenshots supplied by Ephraim, copied without edits. The files on the Desktop remain in place.

`downloads/Layout-Manager-macOS.zip` contains the current Apple silicon Mac app. No signed IPA is available. To add one, put it in `downloads` and set the `ios` object in `downloads.json` with its relative `url` and actual `size`. Update the installation instructions for its distribution method.

No framework, build step, or external font is required. The repository's personal homepage and other projects remain separate.
