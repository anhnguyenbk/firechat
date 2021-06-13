class MessageBuilder {
    constructor() {}

    timeSince (date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " năm trước";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " tháng trước";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " ngày trước";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " giờ trước";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " phút trước";
        }
        return Math.floor(seconds) + " giây trước";
    }

    message(msg) {
        this.msg = msg;
        return this;
    }

    user(_user) {
        this._user = _user;
        return this;
    }

    at (_at) {
        this._at = _at;
        return this;
    }

    isStart(_isStart) {
        this._isStart = _isStart;
        return this;
    }

    build() {
        if (this._isStart) {
            return '<div class="d-flex justify-content-start mb-4">' +
                '<div class="msg_user">' + this._user + '</div>' +
                // '<div class="img_cont_msg">'+ 
                // '<span class="rounded-circle user_img_msg">' +  + '</span>' +
                // '</div>' +
                '<div class="msg_cotainer">' + this.msg +
                '<span class="msg_time">' + this.timeSince(new Date(this._at)) + '</span>' +
                '</div>' +
                '</div>'
        } else {
            return '<div class="d-flex justify-content-end mb-4">' +
                '<div class="msg_cotainer_send">' + this.msg +
                '<span class="msg_time_send">9:10 AM, Today</span>' +
                '</div>' +
                '<div class="img_cont_msg">' +
                '</div>' +
                '</div>'
        }
    }
}
export default MessageBuilder;