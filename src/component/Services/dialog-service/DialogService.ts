import { Dialog, IDialogRef } from ".";
import React from "react";
class DialogService {
  private static instance: DialogService;
  setState: any;
  private index = 0;
  public static buildInstance(): DialogService {
    if (DialogService.instance) {
      return DialogService.instance;
    }
    return new DialogService();
  }
  getIndex() {
    this.index += 1;
    return this.index;
  }
  openDialog(
    Component: React.ElementType,
    data?: any,
    onCloseCallback?: (data: any) => void
  ): IDialogRef {
    const dialog = new Dialog(Component, true, data);
    this.setState[1]((dialogs: Dialog[]) => {
      const openDialogs = dialogs.filter((f) => f.isOpen);
      dialog.setIndex();
      if (onCloseCallback) {
        dialog.callback = onCloseCallback;
      }
      openDialogs.push(dialog);
      return [...openDialogs];
    });
    return dialog as IDialogRef;
  }
  closeAll() {
    if (this.setState[1]) {
      this.setState[1]((dialogs: Dialog[]) => {
        const closed = dialogs.map((m) => {
          m.isOpen = false;
          return m;
        });
        return closed;
      });
    }
  }
}
export const dialogService = (() => {
  return DialogService.buildInstance();
})();
