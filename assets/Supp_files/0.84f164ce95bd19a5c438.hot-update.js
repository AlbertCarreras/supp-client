webpackHotUpdate(0,{

/***/ "./src/Components/NewMessageForm.js":
/*!******************************************!*\
  !*** ./src/Components/NewMessageForm.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Adapters_AdapterChats__ = __webpack_require__(/*! ./../Adapters/AdapterChats */ "./src/Adapters/AdapterChats.js");
var _jsxFileName = '/Users/alberto/Desktop/supp/src/Components/NewMessageForm.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




//ADAPTERS


var mapStateToProps = function mapStateToProps(state) {
  return {
    userId: state.userId,
    selectedConversation: state.selectedConversation
  };
};

var NewMessageForm = function (_React$Component) {
  _inherits(NewMessageForm, _React$Component);

  function NewMessageForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, NewMessageForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewMessageForm.__proto__ || Object.getPrototypeOf(NewMessageForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      text: ''
    }, _this.componentWillReceiveProps = function (nextProps) {
      _this.setState({ conversation_id: nextProps.conversation_id });
    }, _this.handleChange = function (e) {
      _this.setState({ text: e.target.value });
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      var body = {
        text: _this.state.text,
        conversation_id: _this.props.selectedConversation.id
      };

      __WEBPACK_IMPORTED_MODULE_2__Adapters_AdapterChats__["a" /* default */].fetchToWebsocket("messages", body);
      _this.setState({ text: '' });
    }, _this.render = function () {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'new-message-form', __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          },
          __self: _this2
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'form',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            },
            __self: _this2
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            type: 'text',
            value: _this.state.text,
            onChange: _this.handleChange,
            placeholder: 'Enter new message',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 43
            },
            __self: _this2
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'submit', __source: {
              fileName: _jsxFileName,
              lineNumber: 49
            },
            __self: _this2
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              className: 'ui submit button logo',
              onClick: _this.handleSubmit,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 50
              },
              __self: _this2
            },
            'Suppmit'
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //PROPS FUNCTIONALITY: Button handlers


  _createClass(NewMessageForm, [{
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return NewMessageForm;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var _default = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, null)(NewMessageForm);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapStateToProps, 'mapStateToProps', '/Users/alberto/Desktop/supp/src/Components/NewMessageForm.js');
  reactHotLoader.register(NewMessageForm, 'NewMessageForm', '/Users/alberto/Desktop/supp/src/Components/NewMessageForm.js');
  reactHotLoader.register(_default, 'default', '/Users/alberto/Desktop/supp/src/Components/NewMessageForm.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=0.84f164ce95bd19a5c438.hot-update.js.map