var Promise      = require('bluebird'),
    spawnProcess = Promise.promisify(require('child_process').exec),
    exists       = Promise.promisify(require('fs').exists),
    path         = require('path'),
    executable  = path.join(__dirname, '..', 'node_modules', '.bin', 'codeclimate');

module.exports = function (options) {
  'use strict';

  return exists(options.file)
    .then(function (isPresent) {
      if (!isPresent) {
        return Promise.reject(new Error('Cannot find coverage report file "' + options.file + '"'));
      }

      return spawnProcess('CODECLIMATE_REPO_TOKEN=' + options.token + ' ' + executable + ' < ' + options.file);
    })
    .then(
      function (res) {
        return res;
      },
      function () {
        return Promise.reject(new Error(
          'Something went wrong during the execution of codeclimate. ' +
          'Make sure your configuration is valid'
        ));
      }
    )
  ;
};