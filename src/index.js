import html from './template/default.html';
import './template/style.css';
import EventChat from "./EventChat";
import MessageBuilder from './MessageBuilder';
import firebase from "firebase/app";
import "firebase/database";

var config = {};

function firechat(parentElement, _config) {
    config = _config;
    if (!_config.eventKey) {
        throw Error("Event key was not configured!")
    }
    if (!_config.user) {
        throw Error("User was not configured!")
    }
    if (!_config.firebaseConfig) {
        throw Error("Firebase was not configured!")
    }

    firebase.initializeApp(_config.firebaseConfig);
    // Get the Database service for the default app
    $(parentElement).html(html);
    $(document).ready(handleEvents);
}

function handleEvents() {
    var eventKey = config.eventKey;
    var user = config.user;

    var database = firebase.database();
    var eventChat = new EventChat(database, eventKey);

    $("#firechat-input").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        //alert(code);
        if (code == 13) {
            $("#btnFireChatSend").trigger('click');
            return true;
        }
    });

    $('#btnFireChatSend').on('click', function (e) {
        e.preventDefault();
        var text = $('#firechat-input').val();
        if (text) {
            eventChat.push({user: user, text: text})
            $('#firechat-input').val('');
        }
    });

    // Attach an asynchronous callback to read the data at our posts reference
    var eventRef = database.ref(eventKey);
    eventRef.on('child_added', (snapshot) => {
        console.log(snapshot.val());
        var message = snapshot.val();

        const messageBuilder = new MessageBuilder();
        var html = messageBuilder
                            .message(message.text)
                            .user(message.user)
                            .at (message.at)
                            .isStart(true)
                            .build();
        console.log (html);

        // var html =
        //     '<tr>' +
        //     '<td><i class="glyphicon glyphicon-user"></i> ' + message.user + ': </td>' +
        //     '<td>' + message.text + '</td>' +
        //     '</tr>';
        $('#messageContainer').append(html);
        // $('#messageContainerScrollDiv').animate({
        //     scrollTop: $('#messageContainerScrollDiv')[0].scrollHeight
        // }, 0);

    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
}

window.firechat = firechat;