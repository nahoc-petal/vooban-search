'use strict';

module.exports = function (Suggestion) {

  Suggestion.getCities = function(q, lat, long, cb) {

    let where = {};

    where.name = {
      like: q,
      options: "i",
    };

    if(lat) {
      where.lat = { 
        like: lat,
        options: "i",
      }
    }

    if(long) {
      where.long = { 
        like: long,
        options: "i",
      }
    }

    Suggestion.find({
      where,
      limit: 5
    }, function(err, response) {
      cb(null, response);
    });
  }

  Suggestion.remoteMethod (
        'getCities',
        {
          http: {path: '/getCities', verb: 'get'},
          accepts: [
            { arg: 'q', type: 'string' },
            { arg: 'lat', type: 'string' },
            { arg: 'long', type: 'string' },
          ],
          returns: {arg: 'suggestions', type: 'object'}
        }
    );
};