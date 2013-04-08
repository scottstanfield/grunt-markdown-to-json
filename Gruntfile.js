/*
 * grunt-markdown-to-json
 * https://github.com/scottstanfield/grunt-markdown-to-json
 *
 * Copyright (c) 2013 Scott Stanfield
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    m2j: {
      custom: {
        options: { minify: false, width: 60 },
        src: ['test/fixtures/*.md'],
        dest: 'tmp/custom.json',
      },
      complex: {
        options: { minify: false, width: 80 },
        files: {
            'tmp/two.json': ['test/fixtures/bellflower.md', 'test/fixtures/lottery.md'],
            'tmp/lottery.json': ['test/fixtures/lottery.md']
        }
      }
    },

    mkdir: ['tmp'],

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('mkdir', 'Make a new directory', function() {
    var dirs = grunt.config('mkdir');
    dirs.forEach(function(name) {
        grunt.file.mkdir(name);
        grunt.log.writeln("Folder \'" + name + "\' created.");
    });
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mkdir', 'm2j', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['mkdir', 'jshint', 'test']);

};
