import "./Modal.css";
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal flex items-center justify-center">
      <div className="modal-content bg-customBlack relative">
        <span 
            className="close-btn absolute right-5 top-5 text-white text-2xl" 
            style={{cursor: "pointer"}} 
            onClick={onClose}
        >&times;</span>
        <div className="mt-10">
            {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;

