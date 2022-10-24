const successHTML = `<p><span style="color: var(--palette-accent-secondary); font-size: 2rem; display: block;">Success!</span> Clipboard conversion complete. Press <span style="color: var(--palette-text-primary)">enter</span> to reset or just paste again.</p>`
const failureHTML =
  '<p><span style="color: red; font-size: 2rem; display: block;">Error</span> Clipboard already formatted (or empty). No action taken.</p>'

export { successHTML, failureHTML }
