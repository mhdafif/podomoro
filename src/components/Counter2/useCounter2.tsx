import type React from "react";
import { useEffect, useRef, useState } from "react";

interface NumberCounterProps {
  min?: number;
  max?: number;
  initialValue?: number;
  jumpValue?: number;
  onChange?: (value: number) => void;
}

const useCounter = ({
  min = 1,
  max = 60,
  initialValue = 1,
  jumpValue = 1,
  onChange,
}: NumberCounterProps) => {
  /*======================== Props ======================== */

  /*======================== Queries ======================== */

  /*======================== Store ======================== */

  /*======================== Form ======================== */

  /*======================== UseState ======================== */

  const [currentValue, setCurrentValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(
    initialValue.toString().padStart(2, "0")
  );
  const [isInputFocused, setIsInputFocused] = useState(false);

  /*======================== Refs ======================== */

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  /*======================== Handler ======================== */

  // Format number to always show 2 digits
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  // Get previous value (no wrapping, respects boundaries)
  const getPrevValue = (value: number): number | null => {
    const prevValue = value - jumpValue;
    return prevValue < min ? null : prevValue;
  };

  // Get next value (no wrapping, respects boundaries)
  const getNextValue = (value: number): number | null => {
    const nextValue = value + jumpValue;
    return nextValue > max ? null : nextValue;
  };

  // Handle value change
  const handleValueChange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setCurrentValue(newValue);
      setInputValue(formatNumber(newValue));
      onChange?.(newValue);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // Handle input validation and commit
  const handleInputCommit = () => {
    const numValue = Number.parseInt(inputValue, 10);

    if (isNaN(numValue)) {
      // Reset to current value if invalid
      setInputValue(formatNumber(currentValue));
    } else if (numValue < min) {
      // Clamp to minimum
      handleValueChange(min);
    } else if (numValue > max) {
      // Clamp to maximum
      handleValueChange(max);
    } else {
      // Valid value
      handleValueChange(numValue);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsInputFocused(true);
    // Select all text when focused
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    setIsInputFocused(false);
    handleInputCommit();
  };

  // Handle input key press
  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputCommit();
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setInputValue(formatNumber(currentValue));
      inputRef.current?.blur();
    }
  };

  // Handle wheel scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (isInputFocused) return; // Don't scroll when input is focused

    e.preventDefault();
    const delta = e.deltaY > 0 ? jumpValue : -jumpValue;
    const newValue = currentValue + delta;

    // Clamp to boundaries without wrapping
    if (newValue >= min && newValue <= max) {
      handleValueChange(newValue);
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isInputFocused) return; // Don't drag when input is focused

    isDragging.current = true;
    startY.current = e.clientY;
    startValue.current = currentValue;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaY = startY.current - e.clientY;
    const sensitivity = 60; // Increased from 40 to make it even slower
    const steps = Math.round(deltaY / sensitivity) * jumpValue;
    const newValue = startValue.current + steps;

    // Clamp to boundaries without wrapping
    if (newValue >= min && newValue <= max) {
      handleValueChange(newValue);
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isInputFocused) return; // Don't drag when input is focused

    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    startValue.current = currentValue;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const deltaY = startY.current - e.touches[0].clientY;
    const sensitivity = 60; // Increased from 40 to make it even slower
    const steps = Math.round(deltaY / sensitivity) * jumpValue;
    const newValue = startValue.current + steps;

    // Clamp to boundaries without wrapping
    if (newValue >= min && newValue <= max) {
      handleValueChange(newValue);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handlePrevClick = () => {
    if (isInputFocused) return;
    const prevValue = getPrevValue(currentValue);
    if (prevValue !== null) {
      handleValueChange(prevValue);
    }
  };

  const handleNextClick = () => {
    if (isInputFocused) return;
    const nextValue = getNextValue(currentValue);
    if (nextValue !== null) {
      handleValueChange(nextValue);
    }
  };

  /*======================== UseEffect ======================== */

  // Cleanup event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  /*======================== Return ======================== */

  return {
    // State
    currentValue,
    inputValue,
    isInputFocused,

    // Refs
    containerRef,
    inputRef,

    // Handlers
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleInputKeyPress,
    handleWheel,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePrevClick,
    handleNextClick,

    // Utilities
    formatNumber,
    getPrevValue,
    getNextValue,
  };
};

export default useCounter;
