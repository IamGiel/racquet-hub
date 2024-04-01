import React, { createContext, useState, useContext, ReactNode } from "react";

// Define an interface for the context value
interface DialogServiceContextValue {
  openDialog: (component: React.ReactNode) => void;
  closeDialog: () => void;
}

// Create a context for the dialog service and provide the interface
const DialogServiceContext = createContext<
  DialogServiceContextValue | undefined
>(undefined);

// Dialog service component
export const DialogService = ({ children }: { children: ReactNode }) => {
  const [dialogComponent, setDialogComponent] =
    useState<React.ReactNode | null>(null);

  // Method to open a dialog with a specified component
  const openDialog = (component: ReactNode) => {
    setDialogComponent(component);
  };

  // Method to close the dialog
  const closeDialog = () => {
    setDialogComponent(null); // Ensure dialogComponent is reset to null
  };

  return (
    <DialogServiceContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {/* Render dialog container */}
      {dialogComponent && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeDialog}
          >
            <div className="z-10 bg-white p-4 rounded shadow-md">
              {dialogComponent}
            </div>
          </div>
        </div>
      )}
    </DialogServiceContext.Provider>
  );
};

// Custom hook to access the dialog service
export const useDialogService = () => {
  const context = useContext(DialogServiceContext);
  if (!context) {
    throw new Error(
      "useDialogService must be used within a DialogServiceProvider"
    );
  }
  return context;
};
