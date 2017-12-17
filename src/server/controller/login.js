const { clearByCookies } = require('../services/Room');

const login = (request, response) => {
    request
        .checkBody("name", "Name should be is not empty")
        .notEmpty()
    ;

    const errors = request.validationErrors();

    if (errors) {
        response.render('pages/login', { error: errors[0].msg, countOfPlayers: 0, statistics: [] });
    } else {

        const snakeName = request.cookies.snakeName;

        if (snakeName) { // При повторном вводе имени удаляем куки и змею из пула.
            response.clearCookie('snakeRoom');
            response.clearCookie('snakeName');

            clearByCookies(snakeName);
        }


        response.redirect('/select?name=' + request.body.name);
    }
};

module.exports = login;
