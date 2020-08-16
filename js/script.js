
function message(text) {
    jQuery('#chat-result').append(text);
}

jQuery(document).ready(function($) {

    var socket = new WebSocket("ws://localhost:8090/chat/server.php");

    socket.onopen = function() {
        message("<div>Connection created</div>");
    };

    socket.onerror = function(error) {
        message("<div>Error connection" + (error.message ? error.message : "") + "</div>");
    };

    socket.onclose = function() {
        message("<div>Connection close</div>");
    };

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        message("<div>" + data.type + " - " + data.message + "</div>");
    };

    $("#chat").on('submit',function() {

        var message = {
            chat_message:$("#chat-message").val(),
            chat_user:$("#chat-user").val(),
        };

        $("#chat-user").attr("type","hidden");

        socket.send(JSON.stringify(message));

        return false;
    });
});