'use strict';

module.exports = function (Suggestion) {

  Suggestion.getCities = function(q, lat, long, cb) {

    let where = {};

    q ? where.name = { like: q, option: "i"} : null;
    lat ? where.lat = { like: lat, options: "i" } : null;
    long ? where.long = { like: long, options: "i" } : null;

    Suggestion.find({ where, limit: 5 }, function(err, response) {

      response.map(city => {
        city.score = Math.random();
      });

      response.sort(function(a, b) {
        let scoreA = a.score;
        let scoreB = b.score;
        if (scoreB < scoreA) {
          return -1;
        }
        if (scoreB > scoreA) {
          return 1;
        }
        return 0;
      });

      cb(null, response);
    });
  }

  Suggestion.remoteMethod (
        'getCities',
        {
          http: {
            path: '/getCities', 
            verb: 'get'
          },
          accepts: [
            { arg: 'q', type: 'string' },
            { arg: 'lat', type: 'string' },
            { arg: 'long', type: 'string' },
          ],
          returns: {arg: 'suggestions', type: 'object'}
        }
    );
};