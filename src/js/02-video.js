import Vimeo from '@vimeo/player';
import lThrottle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const options = {};
const player = new Vimeo(iframe, options);

const throttle = lThrottle(ev => {
  localStorage.setItem('videoplayer-current-time', `${ev.seconds}`);
}, 1000);

player.on('timeupdate', throttle);

const setStartTime = () => {
  let startTime = parseFloat(localStorage.getItem('videoplayer-current-time'));
  player
    .setCurrentTime(startTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'the time was less than 0 or greater than the video’s duration'
          );
          break;
        default:
          console.log('some other error occurred');
          break;
      }
    });
};
document.addEventListener('DOMContentLoaded', setStartTime());
