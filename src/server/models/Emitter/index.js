const EventEmitter = require('events');
const { singleInstanceHOC } = require('../../hoc/index');

class Emitter extends EventEmitter {}

module.exports = {
    constants: {
        OPEN_ROOM: 'OPEN_ROOM',
        CLOSE_ROOM: 'CLOSE_ROOM'
    },
    emitter: singleInstanceHOC(Emitter).getInstance(),
};