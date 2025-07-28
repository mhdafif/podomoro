import { useEffect } from "react";

interface IProps {
  enabled: boolean;
  callback: () => void;
  elementRef: React.MutableRefObject<HTMLDivElement | null>;
}
const useClickOutside = (props: IProps) => {
  const { enabled = true, callback, elementRef } = props;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
      callback();
    }
  };

  useEffect(() => {
    if (enabled) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enabled]);
};

export default useClickOutside;
