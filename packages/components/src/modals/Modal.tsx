import {
 ReactNode,
 useState,
 forwardRef,
 useImperativeHandle,
 Ref,
 memo,
} from 'react';
import { useHandleEscape } from '@damilaredev/hooks';
import { classNames } from '@damilaredev/utils';

export type ModalType = {
 children?: ReactNode;
 customClass?: string;
 close?: (e?: unknown) => void;
 isDismisable?: boolean;
};

const Modal = forwardRef<Ref<HTMLDivElement | null>, ModalType>(
 ({ children, customClass, isDismisable, close }: ModalType, ref: Ref<any>) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  if (typeof close !== 'function') {
   throw new Error(
    'You provided an onClose prop to the Modal, but the value is not a function.',
   );
  }

  if (typeof isDismisable !== 'boolean') {
   throw new Error(
    'You provided an isDismisable prop to the Dialog, but the value is not a boolean.',
   );
  }

  const closeModal = (event: any) => {
   if (event.target.matches('.modal')) {
    if (isDismisable) {
     close();
    }
   }
  };

  const closeEscapeKey = () => {
   if (isDismisable) {
    close();
   }
  };

  useImperativeHandle(ref, () => ({
   open: () => setOpen(true),
   close: () => setOpen(false),
  }));

  useHandleEscape(closeEscapeKey);

  return (
   <div className={`modal ${isOpen && 'open'}`} onClick={closeModal}>
    <div className={classNames(['modal-content', customClass as string])}>
     {isDismisable && (
      <div className="modal-close" onClick={() => close()}>
       <div className="text-lg text-white">X</div>
      </div>
     )}
     {children}
    </div>
   </div>
  );
 },
);

export default memo(Modal);

Modal.displayName = 'Modal';
