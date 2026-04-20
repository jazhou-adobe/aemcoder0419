/**
 * Extract YouTube video ID from a URL or link text
 * @param {Element} block
 * @returns {string|null}
 */
function getYouTubeId(block) {
  let videoId = null;
  [...block.querySelectorAll('a')].some((link) => {
    const href = link.href || '';
    const match = href.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) {
      link.closest('p')?.remove();
      [, videoId] = match;
      return true;
    }
    return false;
  });
  return videoId;
}

/**
 * Create YouTube video background using IFrame API for reliable autoplay
 * @param {string} videoId
 * @returns {HTMLElement}
 */
function createVideoBackground(videoId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-homepage-video';

  const playerDiv = document.createElement('div');
  playerDiv.id = 'hero-yt-player';
  wrapper.append(playerDiv);

  // Load YouTube IFrame API
  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.append(tag);
  }

  function initPlayer() {
    // eslint-disable-next-line no-new
    new window.YT.Player('hero-yt-player', {
      videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: videoId,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (e) => e.target.playVideo(),
      },
    });
  }

  if (window.YT && window.YT.Player) {
    initPlayer();
  } else {
    window.onYouTubeIframeAPIReady = initPlayer;
  }

  return wrapper;
}

export default function decorate(block) {
  const videoId = getYouTubeId(block);

  if (videoId) {
    block.classList.add('has-video');
    const videoBg = createVideoBackground(videoId);
    block.prepend(videoBg);
  } else if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }
}
