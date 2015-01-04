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

    this.files.forEach(function (file) {
      var result = file.src.map(renderComponentFromFile)
        .join(normalizedSeparator);

      var dest = file.dest;
      grunt.config.set(dest, result);
      grunt.log.writeln('Config value ' + dest.bold + ' set.');
    });
  });

};
