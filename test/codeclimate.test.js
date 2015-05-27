var chai           = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    assert         = chai.assert,
    path           = require('path'),
    codeCliMate    = require('../lib/codeclimate');

chai.use(chaiAsPromised);

describe('tasks/codeclimate', function () {
  'use strict';

  it('throws an error if the file does not exist', function () {
    assert.isRejected(codeCliMate({
      file: 'path/to/nowhere'
    }), 'Cannot find coverage report file "path/to/nowhere"');
  });

  it('throws an error if something went wrong during the execution of codeclimate', function () {
    assert.isRejected(
      codeCliMate({
        file: path.join(__dirname, 'coverage.lcov')
      }),
      'Something went wrong during the execution of codeclimate. ' +
      'Make sure your configuration is valid'
    );
  });
});