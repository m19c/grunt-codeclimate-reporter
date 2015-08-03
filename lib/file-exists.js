var fs      = require('fs'),
    util    = require('util'),
    Promise = require('bluebird');

/**
 * @param {string} path
 * @return {Promise} A bluebird promise
 */
module.exports = function fileExists(path) {
  'use strict';

  return new Promise(function (resolve, reject) {
    fs.exists(path, function (isPresent) {
      if (!isPresent) {
        return reject(new Error(util.format('Cannot find coverage report file "%s"', path)));
      }

      resolve();
    });
  });
};