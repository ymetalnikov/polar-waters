const { getStatisticsForSelect } = require('../services/Room/statistics');

const select = (request, response) => {
    const cookiesSnakeName = request.cookies.snakeName;
    const statistics =  getStatisticsForSelect(request.query.snakeName, cookiesSnakeName);

    response.render('pages/select', { statistics, name: request.query.name, error: null });
};

module.exports = select;
