import { v4 as uuidv4 } from 'uuid';

class EventChat {
    constructor(database, eventKey) {
        this.database = database;
        this.eventKey = eventKey;
    }

    push (msg) {
        const time =  (new Date()).getTime();
        this.database.ref(this.eventKey + "/" + time + "_" + uuidv4()).set({
            user: msg.user,
            text: msg.text,
            at: time,
        });
    }
}
export default EventChat;