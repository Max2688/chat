function message(text) {
    jQuery('#chat-result').append(text);
}

jQuery(document).ready( function () {
 var socket = new WebSocket("ws://localhost:8080/chat/server.php");
    socket.onopen = function () {
        message('<p>Connection created</p>');
    };

    socket.onerror = function (error) {
        message("<p>Error connection: " + (error.message ? error.message : '')+'</p>')
    };

    socket.onclose = function () {
        message('<p>Connection close</p>')
    };

    socket.onmessage = function (event) {
      var data = JSON.parse(event.data);
      message("<p>"+ data.type + "-" + data.message +"</p>")
    }
});