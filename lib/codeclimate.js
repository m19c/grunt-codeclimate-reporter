var Promise      = require('bluebird'),
    spawnProcess = Promise.promisify(require('child_process').exec),
    exists       = require('./file-exists'),
    path         = require('path'),
    executable   = path.join(__dirname, '..', 'node_modules', '.bin', 'codeclimate');

/**
 * @param  {object}  options
 * @return {Promise} A bluebird promise
 */
module.exports = function (options) {
  'use strict';

  return exists(options.file)
    .then(function (isPresent) {
      if (!isPresent) {
        return Promise.reject(new Error('Cannot find coverage report file "' + options.file + '"'));
      }

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