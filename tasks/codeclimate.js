var spawnProcess = require('child_process').exec,
    fs           = require('fs'),
    path         = require('path'),
    codeCliMate  = path.join(__dirname, '..', 'node_modules', '.bin', 'codeclimate');

module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('codeclimate', 'Send your coverage to codeclimate.', function () {
    var done    = this.async(),
        options = this.options({
          token: false,
          file: ''
        });

    fs.exists(options.file, function (isPresent) {
      if (false === isPresent) {
        throw new Error('Cannot find coverage report file "' + options.file + '"');
      }

      var command = 'CODECLIMATE_REPO_TOKEN=' + options.token + ' ' + codeCliMate + ' < ' + options.file;

      spawnProcess(command, function (error, result) {
        if (error) {
          throw new Error(
            'Something went wrong during the execution of codeclimate. ' +
            'Make sure your configuration is valid'
          );
        }

        grunt.log.ok(result);
        done();
      });
    });
  });
};