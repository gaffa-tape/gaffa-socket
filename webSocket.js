var Gaffa = require('gaffa'),
    behaviourType = 'webSocket';

function createSocket(behaviour){
    if(!window.WebSocket){
        console.warn('This browser does not support WebSockets');
        return;
    }

    if(!behaviour.url.value || !behaviour.connect.value){
        return;
    }

    if(behaviour.webSocket){
        behaviour.webSocket.close();
    }

    var webSocket = behaviour.webSocket = new window.WebSocket(behaviour.url.value);

    webSocket.onmessage = function(message){
        var data = JSON.parse(message.data);

        var scope = {
            data: data
        };

        behaviour.triggerActions('message', scope);
    }
    webSocket.onerror = function(error){
        var scope = {
            error: error
        };

        behaviour.triggerActions('error', scope);
    }
}

function WebSocket(){}
WebSocket = Gaffa.createSpec(WebSocket, Gaffa.Behaviour);
WebSocket.prototype.type = behaviourType;
WebSocket.prototype.url = new Gaffa.Property();

// How long to wait before initialising the connection.
WebSocket.prototype.connect = new Gaffa.Property({
    update: createSocket,
    value: true
});

module.exports = WebSocket;