'use strict';

var grunt = require('grunt');
var React = require('React');

// Components used in tests
var element = require('./fixtures/element');
var element2 = require('./fixtures/element2');
var component = require('./fixtures/component');
var tag = require('./fixtures/tag');

exports.react_renderize = {

  single_element: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.single_element');
    var expected = React.renderToStaticMarkup(element);
    test.equal(actual, expected,
      'should render an element to a grunt config value.');

    test.done();
  },

  two_elements: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.two_elements');
    var expected =
      React.renderToStaticMarkup(element) +
      React.renderToStaticMarkup(element2);
    test.equal(actual, expected,
      'should render two elements and join them.');

    test.done();
  },

  two_elements_br_separator: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.two_elements_br_separator');
    var expected =
      React.renderToStaticMarkup(element) + '<br>' +
      React.renderToStaticMarkup(element2);
    test.equal(actual, expected,
      'should render two elements and join them with a custom separator (<br>).');

    test.done();
  },

  component: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.component');
    var expected = React.renderToStaticMarkup(React.createElement(component));
    test.equal(actual, expected,
      'should render one component.');

    test.done();
  },

  tag: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.tag');
    var expected = React.renderToStaticMarkup(React.createElement(tag));
    test.equal(actual, expected,
      'should render one tag.');

    test.done();
  },

  not_a_function: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['react_renderize_fail:not_a_function', '--no-color'],
    }, function (err, result) {
      test.notEqual(result.stdout.indexOf('is not a function'), -1,
        'test should fail because exported value is not a function.');

      test.done();
    });
  },

  invalid_tag: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['react_renderize_fail:invalid_tag', '--no-color'],
    }, function (err, result) {
      test.notEqual(result.stdout.indexOf('Invalid tag'), -1,
        'test should fail because exported string is not a valid tag.');

      test.done();
    });
  },

  function_returns_invalid_value: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['react_renderize_fail:function_returns_invalid_value', '--no-color'],
    }, function (err, result) {
      test.notEqual(result.stdout.indexOf('You must pass a valid ReactElement'), -1,
        'test should fail because exported function doesn\'t return a valid ReactElement.');

      test.done();
    });
  },

  missing_render_method: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['react_renderize_fail:missing_render_method', '--no-color'],
    }, function (err, result) {
      test.notEqual(result.stdout.indexOf('Class specification must implement a `render` method.'), -1,
        'test should fail because exported component is missing a `render` method.');

      test.done();
    });
  },

  invalid_render_result: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['react_renderize_fail:invalid_render_result', '--no-color'],
    }, function (err, result) {
      test.notEqual(result.stdout.indexOf('ReactCompositeComponent.render(): A valid ReactComponent must be returned.'), -1,
        'test should fail because the `render` method isn\'t returning a valid ReactComponent.');

      test.done();
    });
  },

};
