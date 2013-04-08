/*
 * grunt-markdown-to-json
 * https://github.com/scottstanfield/grunt-markdown-to-json
 *
 * Copyright (c) 2013 Scott Stanfield
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var m2j = require('markdown-to-json');

  grunt.registerMultiTask('m2j', 
    'YAML from Markdown files --> to single JSON file', function() {

    var options = this.options({
      minify: false,
      width: 50
    });

    grunt.verbose.writeflags(options, 'Options');
    
    // Iterate over file groups and parse the markdown files
    this.files.forEach(function(f) {
      options.outfile = f.dest;

      try {
        m2j.parse(f.src, options);
        grunt.log.ok('Created ' + options.outfile);
      } catch (e) {
        grunt.log.error();
        grunt.verbose.error(e);
        grunt.fail.warn('markdown-to-json task failed.');
      }
    });

  });   // registerMultiTask
};      // module.exports
