'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passthroughCounter = require('passthrough-counter');

var _passthroughCounter2 = _interopRequireDefault(_passthroughCounter);

var _humanizeNumber = require('humanize-number');

var _humanizeNumber2 = _interopRequireDefault(_humanizeNumber);

var _bytes = require('bytes');

var _bytes2 = _interopRequireDefault(_bytes);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Expose logger.
 */

exports.default = dev;

/**
 * Color map.
 */

const colorCodes = {
    7: 'magenta',
    5: 'red',
    4: 'yellow',
    3: 'cyan',
    2: 'green',
    1: 'green',
    0: 'yellow'

    /**
     * Development logger.
     */

};function dev(opts, logFile) {
    if (logFile) {
        logFile.configure(opts);
        logFile = logFile.getLogger();
    }
    return async function logger(ctx, next) {
        // request
        const start = Date.now();
        console.log('  ' + _chalk2.default.gray('<--') + ' ' + _chalk2.default.bold('%s') + ' ' + _chalk2.default.gray('%s'), ctx.method, ctx.originalUrl);

        try {
            await next();
        } catch (err) {
            // log uncaught downstream errors
            log(logFile, ctx, start, null, err);
            throw err;
        }

        // calculate the length of a streaming response
        // by intercepting the stream with a counter.
        // only necessary if a content-length header is currently not set.
        const length = ctx.response.length;
        const body = ctx.body;
        let counter;
        if (length == null && body && body.readable) {
            ctx.body = body.pipe(counter = (0, _passthroughCounter2.default)()).on('error', ctx.onerror);
        }

        // log when the response is finished or closed,
        // whichever happens first.
        const res = ctx.res;

        const onfinish = done.bind(null, 'finish');
        const onclose = done.bind(null, 'close');

        res.once('finish', onfinish);
        res.once('close', onclose);

        function done(event) {
            res.removeListener('finish', onfinish);
            res.removeListener('close', onclose);
            log(logFile, ctx, start, counter ? counter.length : length, null, event);
        }
    };
}

/**
 * Log helper.
 */

function log(logFile, ctx, start, len, err, event) {
    // get the status code of the response
    const status = err ? err.status || 500 : ctx.status || 404;

    // set the color of the status code;
    const s = status / 100 | 0;
    const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0;

    // get the human readable response length
    let length;
    if (~[204, 205, 304].indexOf(status)) {
        length = '';
    } else if (len == null) {
        length = '-';
    } else {
        length = (0, _bytes2.default)(len).toLowerCase();
    }

    const upstream = err ? _chalk2.default.red('xxx') : event === 'close' ? _chalk2.default.yellow('-x-') : _chalk2.default.gray('-->');
    const msg = ['  ' + upstream + ' ' + _chalk2.default.bold('%s') + ' ' + _chalk2.default.gray('%s') + ' ' + _chalk2.default[color]('%s') + ' ' + _chalk2.default.gray('%s') + ' ' + _chalk2.default.gray('%s'), ctx.method, ctx.originalUrl, status, time(start), length];
    console.log(...msg);
    if (err) {
        logFile && logFile.error(ctx.method, ctx.originalUrl, status, length, __filename, err.toString());
    } else {
        logFile && logFile.info(ctx.method, ctx.originalUrl, status, length);
    }
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
    const delta = Date.now() - start;
    return (0, _humanizeNumber2.default)(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's');
}