var classNames = require("classnames");
var React = require("react/addons");

var TabPaneComponent = React.createClass({
  name: "TabPaneComponent",

  propTypes: {
    isActive: React.PropTypes.bool,
    onActivate: React.PropTypes.func
  },

  componentDidUpdate: function (prevProps) {
    if (!prevProps.isActive && this.props.isActive) {
      this.props.onActivate();
    }
  },

  getDefaultProps: function () {
    return {
      isActive: false,
      onActivate: function () {}
    };
  },

  render: function () {
    var classSet = classNames({
      "active": this.props.isActive,
      "tab-pane": true
    });

    return (
      <div className={classSet}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TabPaneComponent;
