const RoomStore = require('./RoomStore');
const Room = require('./Room');
const { singleInstanceHOC } = require('../../hoc');
const roomBuilder = require('./roomBuilder');

module.exports = {
    Room,
    roomBuilder,
    roomStore: singleInstanceHOC(RoomStore).getInstance()
};
