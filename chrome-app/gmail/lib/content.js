'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _devTools = require('./dev-tools');

var _devTools2 = _interopRequireDefault(_devTools);

var _inboxsdkAppId = require('./inboxsdk-app-id');

var _inboxsdkAppId2 = _interopRequireDefault(_inboxsdkAppId);

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

InboxSDK.load('1.0', _inboxsdkAppId2.default).then(function (sdk) {

  var container = document.createElement('div');
  container.setAttribute('id', 'react-transport-app');
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(container);

  var state = _extends({}, _reducers.initial, { app: { sdk: sdk } });
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: (0, _store2.default)(state) },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_app2.default, null)
    )
  ), container);
});