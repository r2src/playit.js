"use strict";
var index = 0,
    width = 800,
    height = 400,
    id = 'player',
    origin = "http://localhost",
    player;

// Load YouTube Frame API
(function() { //Closure, to not leak to the scope
    var tag = document.createElement("script");
    tag.src = "http://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

// build the iframe element
var newNode = document.createElement('iframe');
newNode.width = width;
newNode.height = height;
newNode.id = id;
// following lines might be necessary for vimeo fullscreen mode..
newNode.webkitAllowFullScreen = true;
newNode.mozallowfullscreen = true;
newNode.allowFullScreen = true;
var oldNode = document.getElementById(id);
oldNode.parentNode.replaceChild(newNode, oldNode);

load();

function onYouTubeIframeAPIReady() {
    player = new YT.Player(id, {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if(event.data === 0) {
        load_next();
    }
}

function load_next() {
    index += 1;
    load();
}

function load() {
    if(playlist[index]) {
        switch(playlist[index].site) {
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
            document.getElementById(id).src = 'http://www.youtube.com/embed/' + playlist[index].id + '?enablejsapi=1&autoplay=1&autohide=1&iv_load_policy=3&origin=' + origin + '&playerapiid=' + id + '&rel=0&showinfo=0';
            break;
        case 'VIMEO':
            // for documentation see http://developer.vimeo.com/player/embedding
            // api: make it possible to react to state changes of the player
            // autoplay: automatically start playing the video
            // title: don't show the video's title
            // byline: don't show the video's byline
            // portrait: don't show the uploader's portrait
            // player_id: the id of this player, to identify the player on callbacks
            document.getElementById(id).src = 'http://player.vimeo.com/video/' + playlist[index].id + '?api=1&title=0&byline=0&portrait=0&autoplay=1&player_id=' + id;
            break;
        }
    }
}
