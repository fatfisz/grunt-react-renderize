# grunt-react-renderize

> Render React components into Grunt config or files.

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
This plugin allows you to render a React component from file into Grunt config or a file.

#### Rendering to a config value
Rendered value can be used with any template engine that allows providing data to templates through the config. For example let's assume you have a React module:

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

#### Rendering into a file
This, of course, outputs the result of the rendering to a file. The option `renderToFile` works best with the option `banner` if you are rendering a whole document - you can provide the doctype through it.
So React module:

```js
var React = require('react');

module.exports = React.createElement('body', null, 'I like to move it.');
```

with option `renderToFile` set to true and option `banner` set to `'<!doctype html>'` will result in a file with a content:

```html
<!doctype html><body>I like to move it.</body>
```

### Options

#### options.renderToFile
Type: `Boolean`
Default value: false

When this option is set to true, the result will be rendered to a file instead of a Grunt config value.
Since a config value name can be similar to a file name, this option is safer than any is-that-a-filename-or-not heuristics.

#### options.banner
Type: `String`
Default: empty string

This string will be prepended to the beginning of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

#### options.footer
Type: `String`
Default: empty string

This string will be appended to the end of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

#### options.removeReactAttrs
Type: `Boolean`
Default value: true

If set to true, then `data-react*` attributes won't be present in the rendered markup (`renderToStaticMarkup` will be used instead of `renderToString`).

With no `data-react*` attributes React won't be able to reuse the rendered data in the browser and will replace `innerHTML` of the target container, which is not quite optimal.

*The default value is set to true for backward compatibility and will be set to false in the next major release.*

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

## Motivation
I wanted to prerender the React components and reuse them in Jade templates. This gives me the freedom to apply any filter to the rendered markup. The only way I knew to do this was by setting the Grunt config. Thus the plugin was born.

If you know of a better way to solve this problem, please contact me :)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 FatFisz. Licensed under the MIT license.

[grunt.template.process]: https://github.com/gruntjs/grunt-docs/blob/master/grunt.template.md#grunttemplateprocess
