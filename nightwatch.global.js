const HtmlReporter = require('nightwatch-html-reporter');
// const chromedriver = require('chromedriver');
let reporter = new HtmlReporter({
    openBrowser: true,
    themeName: 'cover',
    reportsDirectory: __dirname + '/reports/e2e',
});

module.exports = {
    reporter: reporter.fn,
}