# grunt-markdown-to-json

> Extract YAML front-matter from Markdown files to a single JSON file.

The use case for this markdown-to-yaml-to-json task is somewhat narrow.
I use it to strip the YAML front-matter off a set of blog posts written
in Markdown. The metadata for each file is combined into a single
object, then emitted as a JSON file. 

Along the way, a few extra fields are created for each article: 

- an ISO 8601 formatted date
- a preview of the actual body content
- the basename of the file, used as a key to get back to the metadata

It wraps the
[markdown-to-json](https://github.com/scottstanfield/markdown-to-json)
npm module. 

I realize a more descriptive name for this task would be
`markdown-yaml-frontmatter-to-json` but that's pretty wordy. And you
can't have dashes in tasks, so the shortname is `m2j`.

Incidentally, I never had Grunt figured out until I wrote this contrib
module. It finally made sense. Try pulling down the source for this and
running `grunt test` for yourself, and inspect the test input
(test\fixtures) and output (test\expected).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to
check out the [Getting Started](http://gruntjs.com/getting-started)
guide, as it explains how to create a
[Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and
use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

	% npm install grunt-markdown-to-json --save-dev

The plugin should load automatically, since your Gruntfile.js parses
your package.json, which has a reference to the library.


## The "m2j" task

Pretend you have a folder structure like this:

    .
    ├── Gruntfile.coffee
    ├── component.json
    ├── package.json
    └── source
        ├── articles
        │   ├── bellflower.md    <--
        │   ├── fiddler.md       <--
        │   └── lottery.md       <--
        ├── favicon.ico
        ├── index.jade
        ├── style.styl
        ├── styles
        │   ├── h5bp.css
        │   ├── main.css
        │   └── normalize.css
        └── templates
            └── h5bp.jade

Each Markdown file in the articles directory has a bit of YAML metadata, like
the title of the article, author, and tags. We want just the metadata from all
three to be combined into a single JSON stringified file, called articles.json.

Now `grunt release` will build a `release` folder that looks like this:

    .
    ├── Gruntfile.coffee
    ├── component.json
    ├── package.json
    ├── release
    │   ├── articles
    │   │   ├── bellflower.html
    │   │   ├── fiddle.html
    │   │   └── lottery.html
    │   ├── articles.json            <---
    │   ├── favicon.ico
    │   ├── index.html
    │   └── style.css
    └── source


### Configuring your m2j task

In your project's Gruntfile, add a section named `m2j` to
the data object passed into `grunt.initConfig()`.

	m2j: {
		release: {
			options: {
				minify: true,
				width: 60
			},
			files: {
				'release/articles.json': ['source/articles/*.md']
			},
		}
	}

### Options

#### options.minify
Type: `Boolean`
Default value: `false`

If true, then the JSON.stringify is instructed to strip unnecessary
linebreaks, making the resulting .json file smaller.

#### options.width
Type: `Int`
Default value: `70`

No more than `width` charactes from the Markdown file's body is saved in
the `preview` element. Trailing ellipses are added.

#### options.files
This is the common source / destination pairing you see in all Grunt
tasks. Note that you have just one destination, one or more sources, per pair. 

See the [docs](http://gruntjs.com/configuring-tasks#compact-format),
specifically the Compact Format and Files Object Format for examples.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing
coding style. Add unit tests for any new or changed functionality. Lint
and test your code using [Grunt](http://gruntjs.com/).

## Release History
Version 0.4.0 is the initial version, which matches 0.4.1 of the npm
module `m2j`.

> Scott Stanfield  
> scott@vertigo.com  
> April 2014  


