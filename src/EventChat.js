import { v4 as uuidv4 } from 'uuid';

class EventChat {
    constructor(database, eventKey) {
        this.database = database;
        this.eventKey = eventKey;
    }

    push (msg) {
        this.database.ref(this.eventKey + "/" + uuidv4()).set({
            user: msg.user,
            text: msg.text,
            at: (new Date()).getTime(),
        });
    }
}
export default EventChat;