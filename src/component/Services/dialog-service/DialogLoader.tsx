import { Transition, Dialog as HDialog } from '@headlessui/react';
import * as React from 'react';
import { Dialog, dialogService } from '.';
export const DialogLoader = () => {
  const [dialogs, setDialogs] = React.useState([]);
  React.useEffect(() => {
    dialogService.setState = [dialogs, setDialogs];
  }, []);
  React.useEffect(() => {
    const closedDialogs = dialogs.filter((f: Dialog) => !f.isOpen);
    console.log('dialogs', dialogs);
    console.log(
      'open dialogs',
      dialogs.filter((f: Dialog) => f.isOpen)
    );
    closedDialogs.map((m: Dialog) => m.callback(m.closeData));
  }, [dialogs]);
  return (
    <div className="App">
      {dialogs.map((d: Dialog, i: number) => {
        const Component = d.component;
        const isOpen = d.isOpen;
        return (
          isOpen && (
            <Transition key={'dl' + d.getIndex()} appear show={isOpen} as={React.Fragment}>
              <HDialog as="div" className="relative z-[300]" onClose={d.close}>
                <Component
                  isOpen={isOpen}
                  close={(closedData: any) => {
                    d.close(closedData);
                  }}
                  data={d.data}
                ></Component>
              </HDialog>
            </Transition>
          )
        );
      })}
    </div>
  );
};
