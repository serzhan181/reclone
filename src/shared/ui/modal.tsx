"use client";

import { Dialog } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title?: string;
  children?: ReactNode;
  canLeave?: boolean;
}

export const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  canLeave,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {/* ! HERE ! */}
      {isOpen && (
        <Dialog
          open={isOpen}
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClose={() => setIsOpen(false)}
        >
          {/* Overlay */}

          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Full-screen scrollable container */}
          <div className="fixed inset-0 overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex items-center justify-center min-h-full p-4">
              <Dialog.Panel
                className="min-w-[325px] flex flex-col gap-3 p-2 rounded bg-primary shadow-md"
                as={motion.div}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {title && (
                  <Dialog.Title className="text-lg font-semibold">
                    {title}
                  </Dialog.Title>
                )}
                {children && typeof children === "string" ? (
                  <p>{children}</p>
                ) : (
                  children
                )}

                {canLeave && (
                  <button
                    className="self-end btn btn-sm btn-error btn-outline w-fit"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                )}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
