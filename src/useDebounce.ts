import { useRef } from 'react';

interface DebounceOptions {
  leading: boolean;
  trailing: boolean;
}
/*
* Takes a function to execute and returnes a debounced version.
* Calls on both the leading and trailing edges.
* @param {object} options - Both leading and trailing edges are defaulted to true.
*   @prop {bool} leading - Allows you to only call on the leading edge.
*   @prop {bool} trailing - Allows you to only call on the trailing edge.
*/
function useDebounce(
  functionToExecute: (...args: any[]) => void,
  timing: number = 500,
  options: DebounceOptions = { leading: true, trailing: true },
) {
  const timerRef = useRef<NodeJS.Timeout>();
  const firstCallFlag = useRef<Boolean>();

  const debouncedFunction = (...args: any[]) => {
    if (!firstCallFlag.current && options.leading) {
      setTimeout(() => {
        functionToExecute(...args);
      }, 10);
      firstCallFlag.current = true;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (options.trailing) {
        functionToExecute(...args);
      }
      firstCallFlag.current = false;
    }, timing);
  };

  return debouncedFunction;
}

export default useDebounce;
