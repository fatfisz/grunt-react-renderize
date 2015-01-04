/*
 * grunt-react-renderize
 * https://github.com/fatfisz/grunt-react-renderize
 *
 * Copyright (c) 2014 FatFisz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var path = require('path');

  var defaults = {
    separator: '',
  };

  var renderComponentFromFile = function (filepath) {
    var absoluteSrc = path.resolve(filepath);
    var component = require(absoluteSrc);
    var React = require('react');

    if (!React.isValidElement(component)) {
      // try to create an element first
      component = React.createElement(component);
    }
    return React.renderToStaticMarkup(component);
  };

  grunt.registerMultiTask('react_renderize', 'Render React components into Grunt config.', function () {
    var options = this.options(defaults);
    var normalizedSeparator = grunt.util.normalizelf(options.separator);

    if (this.files.length === 0) {
      // For when user didn't specify any files in the config
      grunt.fail.warn('No source files specified.');
    }

    this.files.forEach(function (file) {
      if (file.src.length === 0) {
        // For when the specified files weren't found (don't exist)
        grunt.fail.warn('No source files found.');
      }

      var dest = file.dest;
      if (!dest) {
        /* Having no dest set will only trigger another warning later and makes
         * the whole task useless, so this should be fatal.
         */
        grunt.fail.fatal('No destination is set.');
      }

      var result = file.src.map(renderComponentFromFile)
        .join(normalizedSeparator);

      grunt.config.set(dest, result);
      grunt.log.writeln('Config value ' + dest.bold + ' set.');
    });
  });

};
