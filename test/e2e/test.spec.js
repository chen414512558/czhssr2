module.exports = {
    'Demo test Google' : function (browser) {
        browser
            .url('https://www.baidu.com')
            .waitForElementVisible('body', 1000)
            .setValue('input[name=wd]', 'nightwatch')
            .waitForElementVisible('input[type=submit]', 1000)
            .click('input[type=submit]')
            .pause(1000)
            .assert.title('nightwatch_百度搜索')
            .end();
    }
};