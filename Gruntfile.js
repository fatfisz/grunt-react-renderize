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

    react_renderize: {
      single_element: {
        options: { removeReactAttrs: true },
        src: 'test/fixtures/element.js',
        dest: 'test_result.single_element',
      },
      two_elements: {
        options: { removeReactAttrs: true },
        src: [
          'test/fixtures/element.js',
          'test/fixtures/element2.js',
        ],
        dest: 'test_result.two_elements',
      },
      two_elements_br_separator: {
        options: {
          separator: '<br>',
          removeReactAttrs: true,
        },
        src: [
          'test/fixtures/element.js',
          'test/fixtures/element2.js',
        ],
        dest: 'test_result.two_elements_br_separator',
      },
      component: {
        options: { removeReactAttrs: true },
        src: 'test/fixtures/component.js',
        dest: 'test_result.component',
      },
      tag: {
        options: { removeReactAttrs: true },
        src: 'test/fixtures/tag.js',
        dest: 'test_result.tag',
      },
      render_to_file: {
        options: {
          renderToFile: true,
          removeReactAttrs: true,
        },
        src: 'test/fixtures/element.js',
        dest: 'tmp/element.html',
      },
      with_banner: {
        options: {
          renderToFile: true,
          banner: grunt.file.read('test/fixtures/banner.txt'),
          removeReactAttrs: true,
        },
        src: 'test/fixtures/body.js',
        dest: 'tmp/body_with_banner.html',
      },
      with_footer: {
        options: {
          renderToFile: true,
          footer: grunt.file.read('test/fixtures/footer.txt'),
          removeReactAttrs: true,
        },
        src: 'test/fixtures/body.js',
        dest: 'tmp/body_with_footer.html',
      },
      leave_react_attrs: {
        src: 'test/fixtures/element.js',
        dest: 'test_result.with_attrs',
      },
    },

    react_renderize_fail: {
      not_a_function: {
        src: 'test/fixtures/invalid/not_a_function.js',
        dest: 'nowhere',
      },
      invalid_tag: {
        src: 'test/fixtures/invalid/invalid_tag.js',
        dest: 'nowhere',
      },
      function_returns_invalid_value: {
        src: 'test/fixtures/invalid/function_returns_invalid_value.js',
        dest: 'nowhere',
      },
      missing_render_method: {
        src: 'test/fixtures/invalid/missing_render_method.js',
        dest: 'nowhere',
      },
      invalid_render_result: {
        src: 'test/fixtures/invalid/invalid_render_result.js',
        dest: 'nowhere',
      },
      no_src: {},
      nonexistent_src: {
        src: 'nowhere',
      },
      no_dest: {
        src: 'test/fixtures/component.js',
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

  grunt.registerTask('test', ['clean', 'react_renderize', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
