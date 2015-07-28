var Promise      = require('bluebird'),
    spawnProcess = Promise.promisify(require('child_process').exec),
    fs           = require('fs'),
    path         = require('path'),
    executable   = path.join(__dirname, '..', 'node_modules', '.bin', 'codeclimate');

/**
 * @param  {object}  options
 * @return {Promise} A bluebird promise
 */
module.exports = function (options) {
  'use strict';

  function exists(file) {
    return new Promise(function (resolve, reject) {
      fs.exists(file, function (fileExists) {
        if (fileExists) {
          resolve();
        } else {
          reject(new Error('Cannot find coverage report file "' + file + '"'));
        }
      });
    });
  }

  return exists(options.file)
    .then(function () {
      return spawnProcess('CODECLIMATE_REPO_TOKEN=' + options.token + ' ' + executable + ' < ' + options.file);
    })
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      if (err) {
        return Promise.reject(err);
      }

      return Promise.reject(new Error(
        'Something went wrong during the execution of codeclimate. ' +
        'Make sure your configuration is valid'
      ));
    })
  ;
};