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
  var React = require('react');

  var defaults = {
    separator: '',
  };

  var filterFiles = function (filepath) {
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file ' + filepath.cyan + ' not found.');
      return false;
    } else {
      return true;
    }
  };

  var renderComponentFromFile = function (filepath) {
    var absoluteSrc = path.resolve(filepath);
    var component = require(absoluteSrc);
    return React.renderToStaticMarkup(component);
  };

  grunt.registerMultiTask('react_renderize', 'Render React components into Grunt config.', function () {
    var options = this.options(defaults);
    var normalizedSeparator = grunt.util.normalizelf(options.separator);

    this.files.forEach(function (file) {
      var result = file.src.filter(filterFiles)
        .map(renderComponentFromFile)
        .join(normalizedSeparator);

      var dest = file.dest;
      grunt.config.set(dest, result);
      grunt.log.writeln('Config value ' + dest.bold + ' set.');
    });
  });

};
