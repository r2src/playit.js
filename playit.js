var id = 'player';

// Add function to execute when the API is ready
YT_ready(function() { new YT.Player(id, { events: { "onStateChange": stateChanged } }); });

// Example: function stopCycle, bound to onStateChange
function stateChanged(event) {
    alert("onStateChange has fired!\nNew state:" + event.data);
}