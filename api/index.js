module.exports = function(Parse) {
    return {
        plant: require('./routes/plant')(Parse),
        user: require('./routes/user')(Parse),
        api: function(request, response, next) {
            response.json({
                api: "api"
            });
        },
        test: function(request, response, next) {
            response.json({
                test: "test"
            });
        },
        all: function (req, res, next) {
            var data = {host: req.headers.host,url: req.url,method: req.method, statusCode: req.statusCode, domain: req.domain};
            var Server = Parse.Object.extend("Server");
            var server = new Server();
            server.save(data, {
                success: function(obj) {
                    console.log('Added to server\'s log\n', data)
                    next();
                },
                error: function(obj, error) {
                    console.log('Adding to server\'s log\n', data)
                    next();
                }
            });
        }
    }
}