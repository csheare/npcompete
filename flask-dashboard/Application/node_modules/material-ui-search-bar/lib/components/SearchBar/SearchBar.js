'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _search = require('material-ui/svg-icons/action/search');

var _search2 = _interopRequireDefault(_search);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getStyles = function getStyles(props, state) {
  var disabled = props.disabled,
      iconButtonStyle = props.iconButtonStyle;
  var value = state.value;

  var nonEmpty = value.length > 0;

  return {
    root: {
      height: 48,
      display: 'flex',
      justifyContent: 'space-between'
    },
    iconButtonClose: {
      style: _extends({
        opacity: !disabled ? 0.54 : 0.38,
        transform: nonEmpty ? 'scale(1, 1)' : 'scale(0, 0)',
        transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
      }, iconButtonStyle),
      iconStyle: {
        opacity: nonEmpty ? 1 : 0,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
      }
    },
    iconButtonSearch: {
      style: _extends({
        opacity: !disabled ? 0.54 : 0.38,
        transform: nonEmpty ? 'scale(0, 0)' : 'scale(1, 1)',
        transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        marginRight: -48
      }, iconButtonStyle),
      iconStyle: {
        opacity: nonEmpty ? 0 : 1,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
      }
    },
    input: {
      width: '100%'
    },
    searchContainer: {
      margin: 'auto 16px',
      width: '100%'
    }
  };
};

/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */

var SearchBar = function (_Component) {
  _inherits(SearchBar, _Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this.state = {
      focus: false,
      value: _this.props.value,
      active: false
    };
    return _this;
  }

  _createClass(SearchBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState(_extends({}, this.state, { value: nextProps.value }));
      }
    }

    /**
     * Focus the search field.
     * @public
     */

  }, {
    key: 'focus',
    value: function focus() {
      this.autoComplete.focus();
    }

    /**
     * Blurs the search field.
     * @public
     */

  }, {
    key: 'blur',
    value: function blur() {
      this.autoComplete.blur();
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState({ focus: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({ focus: false });
      if (this.state.value.trim().length === 0) {
        this.setState({ value: '' });
      }
    }
  }, {
    key: 'handleInput',
    value: function handleInput(e) {
      this.setState({ value: e });
      this.props.onChange(e);
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.setState({ active: false, value: '' });
      this.props.onChange('');
    }
  }, {
    key: 'handleKeyPressed',
    value: function handleKeyPressed(e) {
      if (e.charCode === 13) {
        this.props.onRequestSearch();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = getStyles(this.props, this.state);
      var value = this.state.value;

      var _props = this.props,
          closeIcon = _props.closeIcon,
          disabled = _props.disabled,
          onRequestSearch = _props.onRequestSearch,
          searchIcon = _props.searchIcon,
          style = _props.style,
          inputProps = _objectWithoutProperties(_props, ['closeIcon', 'disabled', 'onRequestSearch', 'searchIcon', 'style']);

      return _react2.default.createElement(
        _Paper2.default,
        {
          style: _extends({}, styles.root, style)
        },
        _react2.default.createElement(
          'div',
          { style: styles.searchContainer },
          _react2.default.createElement(_AutoComplete2.default, _extends({
            ref: function ref(_ref) {
              _this2.autoComplete = _ref;
            },
            onBlur: function onBlur() {
              return _this2.handleBlur();
            },
            searchText: value,
            onUpdateInput: function onUpdateInput(e) {
              return _this2.handleInput(e);
            },
            onKeyPress: function onKeyPress(e) {
              return _this2.handleKeyPressed(e);
            },
            onFocus: function onFocus() {
              return _this2.handleFocus();
            },
            fullWidth: true,
            style: styles.input,
            underlineShow: false,
            disabled: disabled
          }, inputProps))
        ),
        _react2.default.createElement(
          _IconButton2.default,
          {
            onClick: onRequestSearch,
            iconStyle: styles.iconButtonSearch.iconStyle,
            style: styles.iconButtonSearch.style,
            disabled: disabled
          },
          searchIcon
        ),
        _react2.default.createElement(
          _IconButton2.default,
          {
            onClick: function onClick() {
              return _this2.handleCancel();
            },
            iconStyle: styles.iconButtonClose.iconStyle,
            style: styles.iconButtonClose.style,
            disabled: disabled
          },
          closeIcon
        )
      );
    }
  }]);

  return SearchBar;
}(_react.Component);

exports.default = SearchBar;


SearchBar.defaultProps = {
  closeIcon: _react2.default.createElement(_close2.default, { color: _colors.grey500 }),
  dataSource: [],
  dataSourceConfig: { text: 'text', value: 'value' },
  disabled: false,
  hintText: 'Search',
  searchIcon: _react2.default.createElement(_search2.default, { color: _colors.grey500 }),
  value: ''
};

SearchBar.propTypes = {
  /** Override the close icon. */
  closeIcon: _propTypes2.default.node,
  /** Array of strings or nodes used to populate the list. */
  dataSource: _propTypes2.default.array,
  /** Config for objects list dataSource. */
  dataSourceConfig: _propTypes2.default.object,
  /** Disables text field. */
  disabled: _propTypes2.default.bool,
  /** Sets hintText for the embedded text field. */
  hintText: _propTypes2.default.string,
  /** Override the inline-styles of the button element. */
  iconButtonStyle: _propTypes2.default.object,
  /** Fired when the text value changes. */
  onChange: _propTypes2.default.func.isRequired,
  /** Fired when the search icon is clicked. */
  onRequestSearch: _propTypes2.default.func.isRequired,
  /** Override the search icon. */
  searchIcon: _propTypes2.default.node,
  /** Override the inline-styles of the root element. */
  style: _propTypes2.default.object,
  /** The value of the text field. */
  value: _propTypes2.default.string
};