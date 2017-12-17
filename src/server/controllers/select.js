const { getStatisticsForSelect } = require('../models/Room/statistics');

const select = (request, response) => {
    const cookiesSnakeName = request.cookies.snakeName;
    const statistics = getStatisticsForSelect(cookiesSnakeName);

    response.render('pages/select', { statistics, error: null });
};

module.exports = select;
