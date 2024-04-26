import React from "react";
import { dialogService } from ".";
export interface IDialogProps {
  isOpen: boolean;
  close?: any;
  data?: any;
}
export interface IDialogRef {
  close: () => void;
}
export class Dialog {
  public closeData: any;
  constructor(
    public component: React.ElementType,
    public isOpen: boolean,
    public data?: any,
    private index?: number
  ) {
    this.close = this.close.bind(this); // Bind `this` to the `close` method
  }
  public callback: (data?: any) => void = (data) => {};
  public close(data?: any) {
    // console.log("index ", this.index);
    dialogService.setState[1]((currentDialogs: Dialog[]) => {
      return currentDialogs.map((m: Dialog) => {
        // console.log("this ", this, m);
        if (m.index === this.index) {
          m.closeData = data;
          m.isOpen = false;
        }
        return m;
      });
    });
  }
  setIndex() {
    this.index = dialogService.getIndex();
  }
  getIndex() {
    return this.index;
  }
}
