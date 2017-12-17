const singleInstanceHOC = function (EntityClass) {
    let instance;

    function createInstance() {
        return new EntityClass();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    };
};

module.exports = {
    singleInstanceHOC,
};