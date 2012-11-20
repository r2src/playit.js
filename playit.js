/**
 * Config:
 * - playlist (required):
 * - container (optional): the id of the div in which the embed-code should be
 *   placed. Default is 'player'.
 */

function play(config) {
	if(!config.playlist) throw Error('Missing key "playlist" in config');
	// Container is the DOM element that will hold the iframe.
	var container = $('#' + (config.container ? config.container : 'player'));

	alert(container.html());
}