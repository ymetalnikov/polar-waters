const server = require('./src/server');
const PORT = process.env.PORT || 5000;


server.listen(PORT, function (err) {
    if (err) {
        throw err
    }
    console.log(`server is listening on ${PORT}...`);
});