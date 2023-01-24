import { classNames, isFunction } from '@damilaredev/utils'
import type {
  ButtonHTMLAttributes,
  Component,
  DetailedHTMLProps,
  ForwardRefExoticComponent,
  ForwardedRef,
  ReactNode,
  Ref,
  RefAttributes,
  RefObject,
} from 'react'
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import Modal from './Modal'
import './index.css'

export type ButtonType<C = any, T = any> = {
  title?: string
  onClick: (
    e?: T,
  ) =>
    | DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
    | T
    | void
  icon?: Component
  className?: string | C
}

export type ConfirmModalType = {
  title?: string
  description?: string
  cancel?: ButtonType
  confirm: ButtonType
  buttons?: ButtonType[]
  children?: ReactNode
}

const ConfirmModal = forwardRef<Ref<any>, ConfirmModalType>(
  (
    { cancel, title, children, confirm }: ConfirmModalType,
    ref: ForwardedRef<any>,
  ) => {
    const modalRef: RefObject<any> = useRef<HTMLDivElement | null>(null)

    useImperativeHandle(ref, () => ({
      open: () => modalRef?.current?.open(),
    }))

    const closeModal = () => {
      setTimeout(() => close(), 200)
      modalRef.current.close()
    }

    return (
      <Modal
        isDismisable={true}
        customClass="w-11/12 sm:w-8/12 xl:w-4/12 pt-10"
        close={closeModal}
        ref={modalRef}
      >
        <h5 className="text-[15px] text-chore-brickred">
          {title ?? 'Are you sure you want to delete this account?'}
        </h5>
        {children}
        <div className="grid grid-cols-2 gap-5">
          <button
            className={classNames([
              'col-span-1 flex items-center justify-center bg-[#FB2000] py-4 px-8',
              confirm.className as string,
            ])}
            onClick={confirm.onClick()}
          >
            {confirm?.title ?? 'Yes'}
          </button>
          <button
            className={classNames([
              'col-span-1 bg-transparent py-4 px-8',
              cancel?.className as string,
            ])}
            onClick={
              isFunction(cancel?.onClick)
                ? () => {
                    cancel?.onClick()
                    closeModal()
                  }
                : (closeModal() as any)
            }
          >
            {cancel?.title ?? 'No'}
          </button>
        </div>
      </Modal>
    )
  },
)

export default memo<
  ForwardRefExoticComponent<ConfirmModalType & RefAttributes<Ref<any>>>
>(ConfirmModal)

ConfirmModal.displayName = 'ConfirmModal'
