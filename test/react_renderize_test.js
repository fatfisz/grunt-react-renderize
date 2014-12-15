'use strict';

var grunt = require('grunt');
var React = require('React');

// Components used in tests
var paragraph = require('./fixtures/paragraph');
var unorderedList = require('./fixtures/unordered_list');

exports.react_renderize = {

  single_unordered_list: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.single_unordered_list');
    var expected = React.renderToStaticMarkup(unorderedList);
    test.equal(actual, expected,
      'should render a component to a grunt config value.');

    test.done();
  },

  two_components: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.two_components');
    var expected =
      React.renderToStaticMarkup(unorderedList) +
      React.renderToStaticMarkup(paragraph);
    test.equal(actual, expected,
      'should render two components and join them.');

    test.done();
  },

  two_components_br_separator: function (test) {
    test.expect(1);

    var actual = grunt.config.get('test_result.two_components_br_separator');
    var expected =
      React.renderToStaticMarkup(unorderedList) + '<br>' +
      React.renderToStaticMarkup(paragraph);
    test.equal(actual, expected,
      'should render two components and join them with a custom separator (<br>).');

    test.done();
  },

  not_component: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['react_renderize_fail:not_component', '--no-color'],
    }, function (err, result) {
      test.ok(
        // This will happen when NODE_ENV !== 'production'
        result.stdout.indexOf('You must pass a valid ReactElement') !== -1 ||
        // This will happen when NODE_ENV === 'production'
        // Only the value of `ReactElement.isValidElement(element)` will be
        // passed as an argument to the `invariant` function. If this is true,
        // nothing should happen. Otherwise there will be an error.
        //
        result.stdout.indexOf('Minified exception occurred') !== -1,
        'test should fail because the required module is not a valid component.');

      test.done();
    });
  },

};
