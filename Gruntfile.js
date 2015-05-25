module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    eslint: {
      target: ['tasks/**/*.js', 'lib/**/*.js', 'Gruntfile.js']
    },
    mocha: {
      test: {
        src: ['test/**/*.test.js']
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha:test']);
  grunt.registerTask('default', ['eslint', 'test']);
};