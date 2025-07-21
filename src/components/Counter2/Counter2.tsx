"use client";

import useCounter from "./useCounter2";

interface NumberCounterProps {
  min?: number;
  max?: number;
  initialValue?: number;
  jumpValue?: number;
  onChange?: (value: number) => void;
}

export default function NumberCounter(props: NumberCounterProps) {
  /*======================== Props ======================== */

  const {
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
  } = useCounter(props);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-32 w-24 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50 select-none"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isInputFocused ? "default" : "grab" }}
    >
      {/* Previous value */}
      <div
        className="absolute top-2 right-0 left-0 cursor-pointer rounded text-center transition-colors hover:bg-gray-100"
        onClick={handlePrevClick}
      >
        <span className="font-mono text-lg text-gray-400">
          {getPrevValue(currentValue) !== null
            ? formatNumber(getPrevValue(currentValue)!)
            : ""}
        </span>
      </div>

      {/* Current value - now an input */}
      <div className="absolute top-1/2 right-0 left-0 -translate-y-1/2 transform bg-blue-500 py-2 text-center text-white">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyPress}
          className="w-full border-none bg-transparent text-center font-mono text-2xl font-bold text-white placeholder-blue-200 outline-none"
          style={{ width: "100%" }}
          maxLength={2}
        />
      </div>

      {/* Next value */}
      <div
        className="absolute right-0 bottom-2 left-0 cursor-pointer rounded text-center transition-colors hover:bg-gray-100"
        onClick={handleNextClick}
      >
        <span className="font-mono text-lg text-gray-400">
          {getNextValue(currentValue) !== null
            ? formatNumber(getNextValue(currentValue)!)
            : ""}
        </span>
      </div>

      {/* Visual indicators */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-8 bg-gradient-to-b from-gray-50 to-transparent"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
}
