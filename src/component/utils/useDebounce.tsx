import * as React from "react";

const useDebounce = (init: any, debounce: number) => {
  const [item, setItem] = React.useState(init);
  const [debouncedState, setDebouncedState] = React.useState(init);
  const [timer, setTimer] = React.useState(null as unknown as any);

  React.useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        setDebouncedState(item);
      }, debounce)
    );
  }, [item]);

  const setState = setItem;

  return [item, debouncedState, setState, setDebouncedState] as const;
};

export default useDebounce;
