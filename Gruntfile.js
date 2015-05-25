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
      target: ['tasks/**/*.js', 'Gruntfile.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('coverage', ['codeclimate:coverage']);
  grunt.registerTask('test', ['test']);
  grunt.registerTask('default', ['eslint', 'test']);
};