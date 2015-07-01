var _plantData = {"birth":null,"vegetation_phase":null,"flowering_phase":null,"height":null,"gender":null,"strain":null,"irrigation":[{"date":null,"nutrients":null}],"prune":[{"date":null,"description":null}],"user": "3HwjE7cho3"};
var _plantDataToUpdate = {"birth": new Date(),"flowering_phase": null,"gender": null,"height": null,"irrigation": [{"date": null,"nutrients": null}],"prune": [{"date": null,"description": null}],"strain": null,"user": "3HwjE7cho3","vegetation_phase": null,"objectId": "MTCbfXk6ro","createdAt": "2015-06-27T21:50:16.476Z","updatedAt": "2015-06-30T16:24:49.611Z"};

function checkUser(request){
    return request.session.user!==undefined;
}
function noUser(response){
    response.json({
        error: "Please login"
    });
}

module.exports = function(Parse) {
    var Plant = Parse.Object.extend("Plant");

    return {
        add: function(request, response, next) {
            if(checkUser(request)){
                var plant = new Plant();
                //Remove later, include field on the request
                _plantData.user =  request.session.user.objectId;
                plant.save(_plantData, {
                    success: function(obj) {
                        response.json({
                            plant: obj
                        });
                    },
                    error: function(obj, error) {
                        response.json({
                            plant: obj,
                            error: error
                        });
                    }
                });
            }else{
                noUser(response);
            }
        },
        getAll: function(request, response, next) {
            if(checkUser(request)){
                var query = new Parse.Query(Plant);
                query.equalTo("user", request.session.user.objectId);
                query.find({
                  success: function(results) {
                    response.json({
                        plants: results
                    });
                  },
                  error: function(error) {
                    response.json({
                        error: results
                    });
                  }
                });
            }else{
                noUser(response);
            }
        },
        getSingle: function(request, response, next) {
            if(checkUser(request)){
                var query = new Parse.Query(Plant);
                query.equalTo("user", request.session.user.objectId);
                query.equalTo("objectId", request.params.id);
                query.find({
                  success: function(results) {
                    response.json({
                        plants: results
                    });
                  },
                  error: function(error) {
                    response.json({
                        error: results
                    });
                  }
                });
            }else{
                noUser(response);
            }
        },
        saveSingle: function(request, response, next) {
            if(checkUser(request)){
                var plant = new Plant();
                plant.save(_plantDataToUpdate, {
                    success: function(obj) {
                        response.json({
                            plant: obj
                        });
                    },
                    error: function(obj, error) {
                        response.json({
                            plant: obj,
                            error: error
                        });
                    }
                });
            }else{
                noUser(response);
            }
        },
        deleteSingle: function(request, response, next) {
            if(checkUser(request)){
                var plant = new Plant();
                plant.set("objectId", request.params.id);
                plant.destroy({
                    success: function(obj) {
                        response.json({
                            plant: obj
                        });
                    },
                    error: function(obj, error) {
                         response.json({
                            plant: obj,
                            error: error
                        });
                    }
                });
            }else{
                noUser(response);
            }
        }
    }

}