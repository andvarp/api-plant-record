module.exports = function(Parse) {
    return {
        login: function(request, response, next) {
            Parse.User.logIn(request.body.user, request.body.passwd, {
                success: function(user) {
                    response.json({
                        login: 'sucess',
                        user: user
                    });
                    request.session.user = user;
                },
                error: function(user, error) {
                    response.json({
                        login: 'error',
                        error: error
                    });
                }
            });
        },
        logout: function(request, response, next) {
            delete request.session.user;
            response.json({
                logout: "Logout"
            });
        }
    }
}