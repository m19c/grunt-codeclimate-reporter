/* eslint block-scoped-var: 0 */

var chai           = require('chai'),
    sinon          = require('sinon'),
    chaiAsPromised = require('chai-as-promised'),
    assert         = chai.assert,
    path           = require('path'),
    proxyquire     = require('proxyquire'),
    codeCliMate    = null;

chai.use(chaiAsPromised);

describe('tasks/codeclimate', function () {
  'use strict';

  it('throws an error if the file does not exist', function () {
    codeCliMate = require('../lib/codeclimate');
    assert.isRejected(codeCliMate({
      file: 'path/to/nowhere'
    }), 'Cannot find coverage report file "path/to/nowhere"');
  });

  it('throws an error if something went wrong during the execution of codeclimate', function () {
    codeCliMate = require('../lib/codeclimate');
    assert.isRejected(
      codeCliMate({
        file: path.join(__dirname, 'coverage.lcov')
      }),
      'Something went wrong during the execution of codeclimate. ' +
      'Make sure your configuration is valid'
    );
  });

  describe('invocation of codeclimate bin', function() {
    var fakeToken,
        execStub;

    beforeEach(function() {
      fakeToken = 'abcde';
      execStub = sinon.stub();
      codeCliMate = proxyquire('../lib/codeclimate', {
        'child_process': {
          exec: execStub
        }
      });
    });

    it('spawns a child process with the correct executable', function (done) {
      var basePath = path.join(__dirname, '..'),
          bin = path.join(basePath, 'node_modules/.bin/codeclimate'),
          lcovFile = path.join(basePath, 'test/coverage.lcov'),
          command = 'CODECLIMATE_REPO_TOKEN=' + fakeToken + ' ' + bin + ' < ' + lcovFile;

      execStub.callsArg(1);
      codeCliMate({
        token: fakeToken,
        file:  path.join(__dirname, 'coverage.lcov')
      }).then(function() {
        assert.equal(execStub.getCall(0).args[0], command);
      }).then(done).catch(done);
    });

    it('rejects with error from exec', function(done) {
      var fakeError = new Error('Fake');

      execStub.callsArgWith(1, fakeError);
      codeCliMate({
        token: fakeToken,
        file:  path.join(__dirname, 'coverage.lcov')
      }).catch(function(err) {
        assert.equal(err.message, fakeError.message);
        done();
      });
    });
  });
});