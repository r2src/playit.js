var index = 0;
var width = 800;
var height = 400;
var id = 'player';
var origin = "example.com";
var playerapiid = 1;

init();
load();

function init() {
    var newNode = document.createElement('iframe');
    newNode.width = width;
    newNode.height = height;
    newNode.id = id;
    var oldNode = document.getElementById(id);
    oldNode.parentNode.replaceChild(newNode,oldNode);
}

function load() {
    switch (playlist[index].site) {
    case 'GOOGLE':
        // for documentation see https://developers.google.com/youtube/player_parameters
        // enablejsapi: make it possible to react to state changes of the player
        // autoplay: automatically start playing the video
        // autohide: hide the player controls after a couple of seconds
        // iv_load_policy: do not show video annotations
        // origin: the domain on which the iframe is loaded
        // playerapiid: the id of this player, to identify the player on callbacks
        // rel: don't show related videos when video finishes
        // showinfo: don't show title bar at the top of the player
        document.getElementById(id).src = 'http://www.youtube.com/embed/' + playlist[index].id + '?enablejsapi=1&autoplay=1&autohide=1&iv_load_policy=3&origin=' + origin + '&playerapiid=' + playerapiid + '&rel=0&showinfo=0';
        break;
    case 'VIMEO':
	document.getElementById(id).src = 'http://player.vimeo.com/video/' + playlist[index].id;
	break;
    }
}

function load_next() {
    index += 1;
    load();
}
