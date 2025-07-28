import { useCallback, useState } from "react";

const useToggleState = (initialState: boolean) => {
  /*======================== UseState ======================== */

  const [state, setState] = useState(initialState);

  /*======================== Handler ======================== */

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  /*======================== Return ======================== */

  return [state, toggle] as const;
};

export default useToggleState;
