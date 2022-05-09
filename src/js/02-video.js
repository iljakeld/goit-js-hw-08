import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', onPlay);
player.on('loaded', updateTime)

function onPlay() {
    player.getCurrentTime().then(function(seconds) {
    localStorage.setItem(LOCALSTORAGE_KEY, seconds)
});
}
function updateTime() {
    const savedPlaybackTime = localStorage.getItem(LOCALSTORAGE_KEY);
    console.log(savedPlaybackTime);
    player.setCurrentTime(savedPlaybackTime).then(function (seconds) {
    console.log(seconds);
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                break;
        }
    });
};