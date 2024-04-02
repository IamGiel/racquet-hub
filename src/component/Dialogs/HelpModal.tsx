import { Dialog, Transition } from "@headlessui/react";
import React, { CSSProperties, Fragment, useState } from "react";
import {
  ChevronDoubleDownIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
// import '../../../../webapp/content/images/'

const HelpModal = ({ close, data }: any) => {
  const dialogName = "Help & Documentation";
  const [localModalSize, setLocalModalSize] = useState<string>("25vw");
  const [hideBtn, setHideBtn] = useState<boolean>(false);

  const toggleDialogWidth = () => {
    const newSize = localModalSize === "25vw" ? "1279px" : "25vw";
    setLocalModalSize(newSize);
    console.log("toggle size newSize ", newSize);
  };

  const onCloseDialog = (value: boolean) => {
    console.log("close the dialog");
    setHideBtn(value);
    setLocalModalSize("25vw");
    console.log("closing modal dispatched to 25vw");
  };

  // const helpModalResizableChild: CSSProperties = {
  //   position: "fixed",
  //   top: "55px",
  //   right: "1px",
  //   height: "calc(100% - 66px)",
  //   transition: "width 0.5s ease",
  //   minWidth: "518px",
  //   width: localModalSize,
  //   background: "#FFFFFF",
  //   padding: "10px 0px",
  //   borderRadius: "10px",
  // };
  // const dialogTitle: CSSProperties = {
  //   fontFamily: "Inter",
  //   fontStyle: "normal",
  //   fontWeight: "800",
  //   fontSize: "21px",
  //   lineHeight: "40px",
  //   display: "flex",
  //   margin: "0px 12px",
  // };

  // const helpModalTitle: CSSProperties = {
  //   display: "grid",
  //   gridTemplateColumns: "1fr 1fr",
  //   borderBottom: "1px solid rgba(206, 207, 208, 1)",
  // };

  return (
    <>
      <Dialog
        as="div"
        className={"help-modal-resizable"}
        onClose={() => {
          close();
        }}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div
          className={`help-modal-resizable-child`}
          // style={helpModalResizableChild}
        >
          <div className="flex items-start sm:items-start justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="dialog-panel-div relative bg-white transition-all modal-style h-[100%] w-[99%]">
                <div className="bg-white">
                  <div
                    className="help-modal-title"
                    // style={helpModalTitle}
                  >
                    <div className="dialogname">
                      <Dialog.Title
                      // style={dialogTitle}
                      >
                        {dialogName}
                      </Dialog.Title>
                    </div>
                    <div
                      className="dialog-btns"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        margin: "0px 12px",
                      }}
                    >
                      <button
                        style={{
                          transform:
                            localModalSize === "25vw"
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          outline: "none",
                          position: "relative",
                          left: "-7px",
                        }}
                        onClick={() => toggleDialogWidth()}
                      >
                        <ChevronDoubleDownIcon
                          stroke={"rgba(101, 107, 124, 1)"}
                          height={"14px"}
                          width={"15px"}
                        />
                      </button>

                      <div
                        className="svg-pipe"
                        style={{
                          width: "15px",
                          padding: "7px 7px",
                        }}
                      >
                        {/* <svg width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0.5" y1="2.18557e-08" x2="0.499999" y2="32" stroke="#CECFD0"/>
                        </svg> */}

                        <PaperAirplaneIcon
                          stroke={"rgba(206, 207, 208, 1)"}
                          height={"32px"}
                          width={"1px"}
                        />
                      </div>

                      <button
                        onClick={() => {
                          close();
                        }}
                      >
                        <LockClosedIcon
                          stroke={"rgba(101, 107, 124, 1)"}
                          height={"19.56px"}
                          width={"19px"}
                        ></LockClosedIcon>
                      </button>
                    </div>
                  </div>
                  <div className="help-dialog-content-container">
                    <span>TEST USER GUIDE HERE</span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default HelpModal;
