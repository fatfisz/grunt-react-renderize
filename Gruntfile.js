/*
 * grunt-react-renderize
 * https://github.com/fatfisz/grunt-react-renderize
 *
 * Copyright (c) 2014 FatFisz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
      },
    },

    clean: {
      tests: ['tmp'],
    },

    env: {
      test: {
        NODE_ENV: 'production',
      },
    },

    react_renderize: {
      single_unordered_list: {
        files: {
          'test_result.single_unordered_list': 'test/fixtures/unordered_list.js',
        },
      },
      two_components: {
        files: {
          'test_result.two_components': [
            'test/fixtures/unordered_list.js',
            'test/fixtures/paragraph.js',
          ],
        },
      },
      two_components_br_separator: {
        options: {
          separator: '<br>',
        },
        files: {
          'test_result.two_components_br_separator': [
            'test/fixtures/unordered_list.js',
            'test/fixtures/paragraph.js',
          ],
        },
      },
    },

    react_renderize_fail: {
      not_component: {
        files: {
          'test_result.not_component': 'test/fixtures/not_component.js',
        },
      },
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  grunt.loadTasks('tasks');
  // Duplicate the task for the "fail" tests.
  grunt.renameTask('react_renderize', 'react_renderize_fail');
  // And reload it again
  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'env', 'react_renderize', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
