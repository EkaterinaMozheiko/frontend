/* eslint-disable react/require-default-props */
const React = require('react');
const PropTypes = require('prop-types');

class Input extends React.Component {
  getValue() {
    return this.input.value;
  }

  render() {
    const { className, placeholder, onChange } = this.props;
    return (
      <input
        className={className}
        type="text"
        placeholder={placeholder}
        ref={(el) => {
          this.input = el;
        }}
        onChange={onChange}
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

module.exports = Input;
