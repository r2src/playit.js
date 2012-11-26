var container = 'player';
var index = 0;
var waiting_for_yt_player = false;

load_yt_player_async();
load();

function load() {
    switch (playlist[index].site) {
    case 'GOOGLE':
	if ('YT' in window && 'Player' in window.YT) {
	    load_yt_video(playlist[index].id);
	} else {
	    waiting_for_yt_player = true;
	}
	break;
    case 'VIMEO':
	load_vimeo_video(playlist[index].id);
	break;
    }
}

function load_next() {
    index += 1;
    load();
}

// YOUTUBE
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
	height: '390',
	width: '640',
	events: {
            'onReady': function() {
		if (waiting_for_yt_player) {
		    waiting_for_yt_player = false;
		    load();
		}
	    },
            'onStateChange': function(event) {
		if (event.data == YT.PlayerState.ENDED) {
		    load_next();
		}
	    }
        }
    });
}

function load_yt_video(id) {
    player.loadVideoById(id);
}

function load_yt_player_async() {
    // asynchrously download player api, calls onYouTubeIframeAPIReady when finished
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// VIMEO
function load_vimeo_video(id) {
    document.getElementById('player') = '<iframe id="player" src="http://player.vimeo.com/video/VIDEO_ID?portrait=0&color=333" width=390 height=640></iframe>';
}