import React, { FC, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalProps } from './types';

const SideModal: FC<ModalProps> = props => {
  const {
    children,
    isOpen,
    handleClose = () => null,
    clickOutSideClose = true,
    testId = 'sideModal'
  } = props;

  const modalRootElement = document.getElementById('modal-root');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let timerInstance: ReturnType<typeof setTimeout>;
    if (!isOpen) {
      // added a setState time delay if isOpen value is false, for showing the close animation
      timerInstance = setTimeout(() => setIsModalOpen(isOpen), 710);
    } else {
      setIsModalOpen(isOpen);
      modalRootElement.style.overflow = 'hidden';
    }

    return () => {
      clearTimeout(timerInstance);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const Popup = useCallback(({ children: portalChildren }) => {
    return ReactDOM.createPortal(portalChildren, modalRootElement);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modalCloseHandler = () => {
    if (!clickOutSideClose) {
      return;
    }
    // added a setState time delay for closing , inorder to show animation properly
    setTimeout(() => {
      setIsModalOpen(false);
    }, 710);
    handleClose();
  };

  return (
    isModalOpen && (
      <Popup>
        <div
          className={`flex fixed top-0 left-0 justify-end 
        w-full h-full bg-secondaryColor/[0.4] overflow-auto`}
          role="presentation"
          onClick={modalCloseHandler}
          data-testid={testId}>
          {children}
        </div>
      </Popup>
    )
  );
};

export default SideModal;
