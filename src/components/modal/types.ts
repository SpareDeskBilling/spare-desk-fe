export type ModalProps = {
  isOpen: boolean;
  handleClose?: () => void;
  clickOutSideClose?: boolean;
  testId?: string;
};
