const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const pagination = require('metalsmith-pagination');
const metadata = require('metalsmith-filemetadata');
const permalinks = require('metalsmith-permalinks');
const helpers = require('metalsmith-register-helpers');
const layouts = require('metalsmith-layouts');

process.env.TZ = 'Pacific';

const app = metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown({
    gfm: true,
    smartypants: true
  }))
  .use(helpers())
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    partials: 'layouts/partials'
  }))

if (module.parent) {
  module.exports = app;
} else {
  app.build(function (err) {
    if (err) {
      throw err;
    }
  });
}