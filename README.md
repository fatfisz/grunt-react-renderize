# grunt-react-renderize

> Render React components into Grunt config.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-react-renderize --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-react-renderize');
```

## The "react_renderize" task

### Overview
This plugin allows you to render a React component from file into Grunt config. This value can be then used with a template engine of your choosing, that allows providing data to templates through the config. For example let's assume you have a React module:

```js
var React = require('react');

module.exports = React.createElement('p', null, 'I need this in my template.');
```

and a Jade template:
```jade
div!=prerenderedMarkup
```

The result, after providing `'jade.options.data.prerenderedMarkup'` as a destination for the task, would be:

```html
<div><p>I need this in my template.</p></div>
```

### Motivation
I wanted to prerender the React components and reuse them in Jade templates. This gives me the freedom to apply any filter to the rendered markup. The only way I knew to do this was by setting the Grunt config. Thus the plugin was born.

If you know of a better way to solve this problem, please contact me :)

### Options

#### options.separator
Type: `String`
Default value: empty string

Used as a separator when joining multiple rendered components.

### Usage Example

This should render the component from a file into Grunt config.

```js
grunt.initConfig({
  react_renderize: {
    files: {
      'template_engine.options.data.component': 'components/my_component.js',
    },
  },
})
```

The rendered component will be available through grunt.config.get('template_engine.options.data.component')).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 FatFisz. Licensed under the MIT license.
