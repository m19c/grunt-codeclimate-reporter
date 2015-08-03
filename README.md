[![Build Status](https://travis-ci.org/MrBoolean/grunt-codeclimate-reporter.svg)](https://travis-ci.org/MrBoolean/grunt-codeclimate-reporter)

grunt-codeclimate-reporter
==========================
> Send your coverage to codeclimate.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-codeclimate-reporter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-codeclimate-reporter');
```

Setup:
```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  // ...
  codeclimate: {
    main: {
      options: {
        file: 'path/to/your/lcov.info',
        token: 'your_token'
      }
    }
  }
  // ...
});
```

**Note** that, `grunt-codeclimate-reporter` is registered as a multi task. So it is required to define your sub task e.g. `main` (or something else).