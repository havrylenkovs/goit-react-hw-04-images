import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, onClose, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    console.log(event.code);
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackDropClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string,
};
