var chai           = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    assert         = chai.assert,
    codeCliMate    = require('../lib/codeclimate');

chai.use(chaiAsPromised);

describe('tasks/codeclimate', function () {
  'use strict';

  it('throws an error if the file does not exist', function () {
    assert.isRejected(codeCliMate('path/to/nowhere'), new Error('Cannot find coverage report file "path/to/nowhere"'));
  });

  it('throws an error if something went wrong during the execution of codeclimate');
  it('resolves the result');
});