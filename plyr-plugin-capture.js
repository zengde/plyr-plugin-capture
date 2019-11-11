(function init(document) {
  function saveScreenShot(data, filename) {
    const saveLink = document.createElement('a');
    saveLink.href = data;
    saveLink.download = filename;
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    saveLink.dispatchEvent(event);
  }
  function capture(player, label) {
    const width = player.media.videoWidth;
    const height = player.media.videoHeight;
    const canvas = Object.assign(document.createElement('canvas'), { width, height });
    const canvasCtx = canvas.getContext('2d');

    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = (function onload() {
      canvasCtx.drawImage(player.media, 0, 0, width, height);
      img.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      saveScreenShot(screenShotImg, `${label}.png`);
    }());
    // Set as poster (will show if you run `player.stop()` for example)
    // player.elements.poster.style.backgroundImage = `url(${imgURI})`;
  }

  document.addEventListener('ready', (event) => {
    const curPlayer = event.detail.plyr;
    const { config } = curPlayer;
    if (Array.isArray(config.controls) && config.controls.includes('capture')) {
      const captureLabel = config.i18n.capture || 'Capture';

      const menu = document.querySelector('.plyr__controls__item.plyr__menu');
      const btn = `
            <button class="plyr__controls__item plyr__control" type="button" data-plyr="capture">
                <svg role="presentation" focusable="false">
                    <path d="M9.098,7.566c0.758,0,1.408,0.27,1.946,0.809c0.539,0.538,0.809,1.188,0.809,1.946c0,0.758-0.27,1.406-0.809,1.946
                    c-0.538,0.539-1.188,0.81-1.946,0.81c-0.759,0-1.408-0.271-1.947-0.81c-0.539-0.54-0.808-1.188-0.808-1.946
                    c0-0.759,0.27-1.408,0.808-1.946C7.689,7.835,8.339,7.566,9.098,7.566z M14.862,3.471c0.59,0,1.093,0.241,1.511,0.723
                    C16.79,4.676,17,5.258,17,5.939v8.646c0,0.682-0.21,1.264-0.627,1.747c-0.418,0.481-0.921,0.724-1.511,0.724H3.107
                    c-0.59,0-1.095-0.242-1.511-0.724c-0.417-0.483-0.627-1.065-0.627-1.747V5.939c0-0.682,0.21-1.264,0.627-1.746
                    c0.417-0.482,0.921-0.723,1.511-0.723h1.87l0.426-1.313c0.105-0.315,0.299-0.587,0.58-0.815C6.264,1.114,6.552,1,6.846,1h4.274
                    c0.297,0,0.584,0.114,0.866,0.342c0.28,0.228,0.475,0.5,0.58,0.815l0.424,1.313H14.862L14.862,3.471z M9.098,14.606
                    c1.179,0,2.188-0.419,3.026-1.258c0.84-0.839,1.258-1.847,1.258-3.027c0-1.18-0.418-2.188-1.258-3.027
                    c-0.839-0.839-1.848-1.259-3.026-1.259c-1.18,0-2.189,0.42-3.028,1.259c-0.838,0.839-1.258,1.847-1.258,3.027
                    c0,1.181,0.42,2.188,1.258,3.027C6.909,14.188,7.917,14.606,9.098,14.606z"/>
                </svg>
                <span class="plyr__sr-only">${captureLabel}</span>
            </button>
            `;
      menu.insertAdjacentHTML('beforebegin', btn);
      const btnElement = document.querySelector('button[data-plyr="capture"]');
      btnElement.addEventListener('click', () => {
        capture(curPlayer, captureLabel);
      });
    }
  });
}(document));
