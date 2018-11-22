export function fadeOutMessage(callback) {
  window.setTimeout(() => {
    callback();
  }, 3000);
}
