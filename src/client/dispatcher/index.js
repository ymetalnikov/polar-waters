export const Dispatcher = {
    //хранилище всех подписчиков
    _subscribers: Object.create(null),

    //метод для подписки на какое-либо событие
    on: function (event, handler) {

        if (typeof handler !== 'function') {
            new Error('Type of handler is not a function');
        }

        if (this._subscribers[event]) {
            this._subscribers[event].push(handler);
        } else {
            this._subscribers[event] = [handler];
        }
    },

    //метод для вызова обработчиков на некое событие
    trigger: function (event, payload) {
        for (const ev in this._subscribers) {
            if (ev !== event) {
                continue;
            }
            if (this._subscribers[ev]) {
                this._subscribers[ev].forEach(function (handler) {
                    handler(payload);
                });
            }
        }
    }
};
