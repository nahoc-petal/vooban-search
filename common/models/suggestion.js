'use strict';

module.exports = function (Suggestion) {

  function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist > 1 ? dist = 1 : null;
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    unit === "K" ? dist = dist * 1.609344 : null;
    unit === "N" ? dist = dist * 0.8684 : null;
    return dist
  }

  function calculateScore(distance, furthestDistance) {
    let score = distance * 100 / furthestDistance;
    return (100 - score);
  }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  function sortByScore(cities) {
    return cities.sort(function(obj1, obj2) {
      return obj1.score - obj2.score;
    }).reverse();
  }

  function getMyLatitude() {
    return 43.70011;
  }

  function getMyLongitude() {
    return -79.4163;
  }

  function findMultiple(q, lat, long, cb) {
    let where = {};
    let myLat = getMyLatitude(); // this is static for now
    let myLong = getMyLongitude(); // this is static for now
    let qLike = '.*' + q + '.*';

    where.name = { like: qLike, options: "i" };
    lat ? where.lat = { like: lat, options: "i" } : null;
    long ? where.long = { like: long, options: "i" } : null;

    Suggestion.find({ where }, function(err, response) {

      let distances = [];
      response.forEach(city => {
        let distance = calculateDistance(lat || myLat, long || myLong, city.lat, city.long, "K");
        distances.push(distance);
      });

      let furthestDistance = Math.max(...distances);

      response.map((city, index) => {
        let score = calculateScore(distances[index], furthestDistance);
        city.score = score / 100;
      });

      sortByScore(response);
      response.splice(5, response.length - 5); // return 5 results
      cb(null, response);
    });
  }

  Suggestion.getCities = function(q, lat, long, cb) {

    let where = {};
    where.name = q.capitalize();
    lat ? where.lat = { like: lat, options: "i" } : null;
    long ? where.long = { like: long, options: "i" } : null;

    let myLat = getMyLatitude(); // this is static for now
    let myLong = getMyLongitude(); // this is static for now

    Suggestion.find({ where }, function(err, response) {

      let distances = [];
      response.forEach(city => {
        let distance = calculateDistance(lat || myLat, long || myLong, city.lat, city.long, "K");
        distances.push(distance);
      });

      let furthestDistance = Math.max(...distances);

      // assign individual scores
      response.map((city, index) => {
        let score = calculateScore(distances[index], furthestDistance);
        city.score = score / 100;
      });

      sortByScore(response);
      response.splice(1, response.length - 1); // return only one result
      response.length > 0 ? cb(null, response) : findMultiple(q, lat, long, cb);
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