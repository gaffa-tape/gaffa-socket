var Gaffa = require('gaffa');

function createSocket(behaviour){
    if(!window.WebSocket){
        console.warn('This browser does not support Sockets');
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
    };
    webSocket.onopen = function(){
        behaviour.triggerActions('open');
    };
    webSocket.onerror = function(error){
        var scope = {
            error: error
        };

        behaviour.triggerActions('error', scope);
    };
}

function Socket(){}
Socket = Gaffa.createSpec(Socket, Gaffa.Behaviour);
Socket.prototype.type = 'socket';
Socket.prototype.url = new Gaffa.Property();

// How long to wait before initialising the connection.
Socket.prototype.connect = new Gaffa.Property({
    update: createSocket,
    value: true
});

module.exports = Socket;