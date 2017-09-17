'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = {
    port: process.env.PORT || 3000,
    controllerConf: _path2.default.join(__dirname, '../controllers/'),
    log: {
        appenders: {
            everything: { type: 'datefile',
                filename: _path2.default.join(__dirname, '../logs/cheese.log'),
                layout: { type: 'basic' },
                pattern: '.yyyy-MM-dd',
                alwaysIncludePattern: true }
        },
        categories: {
            default: { appenders: ['everything'], level: 'info' }
        }
    }
};

exports.default = config;