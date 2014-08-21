module.exports = function (grunt) {
    'use strict';

    // Project configuration.
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
        codeclimate: {
            coverage: {
                options: {
                    file: __dirname + '/../../segony-build/dist/lcov.info',
                    token: 'ec3ee6b4447b58b59a914d887acfef6706a0a072b36188b254fa54f48d24b9a5 '
                }
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('coverage', ['codeclimate:coverage']);
    grunt.registerTask('test', ['test']);
    grunt.registerTask('default', ['jshint', 'test']);
};