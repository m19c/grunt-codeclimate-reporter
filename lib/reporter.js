var Promise = require('bluebird');
var spawnProcess = Promise.promisify(require('child_process').exec);
var util = require('util');
var path = require('path');
var fs = require('mz/fs');
var defaultExecutable = path.join(__dirname, '..', 'node_modules', '.bin', 'codeclimate');
var defaultToken = process.env.CODECLIMATE_REPO_TOKEN;

var getAllFiles = function(dir, name) {
  var results = [];
  fs.readdirSync(dir).forEach(function(file) {
    var fullname = path.join(dir, file);
    var stat = fs.statSync(fullname);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullname, name));
    } else {
      if (file.match(name)) {
        results.push(fullname);
      }
    }
  });
  return results;
};

/**
 * @param  {object}  options
 * @return {Promise} A bluebird promise
 */
module.exports = function reporter(options) {
  var executable = options.executable || defaultExecutable;
  var token = options.token || defaultToken;
  var file = options.file;
  var files;

  return fs.exists(options.file)
    .then(function isFilePresent(isPresent) {
      if (!isPresent) {
        return Promise.reject(new Error(util.format('The lcov file "%s" does not exist', file)));
      }
      if (fs.lstatSync(file).isDirectory()) {
        files = getAllFiles(file, 'lcov.info');
        if (files.length === 0) {
          return Promise.reject(new Error(util.format('No lcov.info was found when searching "%s"', file)));
        }
        file = files[0]; // Use the first lcov.info found
      }
      return spawnProcess('CODECLIMATE_REPO_TOKEN=' + token + ' ' + executable + ' < \"' + file + '\"');
    })
    .then(function resolveWithResult(res) {
      return res;
    })
    .catch(function catchError(err) {
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
