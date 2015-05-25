var codeCliMate  = require('../lib/codeclimate');

module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('codeclimate', 'Send your coverage to codeclimate.', function () {
    var done, options;

    done    = this.async();
    options = this.options({
      token: false,
      file:  ''
    });

    codeCliMate(options)
      .then(function (res) {
        grunt.log.ok(res);
      })
      .catch(function (err) {
        throw err;
      })
      .finally(done)
    ;
  });
};