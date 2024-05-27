import PropTypes from "prop-types";

const Message = ({ variant, children }) => {
  return (
    <div className={`alert alert-${variant}`} role="alert">
      {children}
    </div>
  );
};

Message.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
