import { twMerge } from 'tailwind-merge';
import React, { ReactNode, useEffect, useRef } from 'react';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: string;
  onClose?: () => void;
  className?: string;
}

const CloseButton = ({ onClick }: { onClick?: () => void }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      type="button"
      className="group absolute right-4 top-4 flex h-[2rem] w-[2rem] items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
      onClick={handleClick}
      aria-label="Close dialog"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

export function Dialog({ open, title, onClose, className, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Focus management: focus the dialog when opened
  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  // Close on backdrop click
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!dialogRef.current || !target.closest('.modal-dialog')) {
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mergedClasses = twMerge('', className);

  if (!open) return null;

  return (
    <div 
      className="modal-dialog flex items-center justify-center min-h-screen w-full overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm"
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="relative z-50 w-full max-w-lg">
        <dialog
          ref={dialogRef}
          className={`modal-content w-full overflow-hidden rounded-xl bg-white dark:bg-gray-950 shadow-lg ring-1 ring-black/5 ${mergedClasses}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          {title && (
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
              <h2 id="dialog-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <CloseButton onClick={onClose} />
            </div>
          )}

          {/* Content area */}
          <div className="p-6">
            {children}
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Dialog;