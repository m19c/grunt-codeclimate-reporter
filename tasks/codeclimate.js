var reporter = require('../lib/reporter');

module.exports = function task(grunt) {
  grunt.registerMultiTask('codeclimate', 'Send your coverage to codeclimate.', function codeclimate() {
    var done = this.async();
    var options = this.options({
      token: false,
      file: '',
      executable: null
    });

    reporter(options)
      .then(function respondWithRes(res) {
        grunt.log.ok(res);
      })
      .catch(function catchErr(err) {
        throw err;
      })
      .finally(done)
    ;
  });
};
