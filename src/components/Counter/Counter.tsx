import { cn } from "@/lib/utils";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span
      className="counter-number absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
      style={{ y }}
    >
      {number}
    </motion.span>
  );
}

interface DigitProps {
  place: number;
  value: number;
  height: number;
}

function Digit({ place, value, height }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);
  return (
    <div className="relative w-[1ch] tabular-nums" style={{ height }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

interface CounterProps {
  value: number;
  fontSize?: number;
  places?: number[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: React.CSSProperties["fontWeight"];
  containerStyle?: React.CSSProperties;
  counterStyle?: React.CSSProperties;
  digitStyle?: React.CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
  className?: string;
  showBg?: boolean;
}

export default function Counter({
  value,
  fontSize = 72,
  places = [10, 1],
  textColor = "white",
  fontWeight = "bold",
  showBg = true,
}: CounterProps) {
  const height = fontSize;
  const defaultCounterStyle: React.CSSProperties = {
    fontSize,
    color: textColor,
    fontWeight: fontWeight,
  };
  return (
    <div
      className={cn(
        "rounded-5 time-card relative flex h-full w-full items-center justify-center overflow-hidden text-center leading-none text-white select-none",
        showBg && "bg-black"
      )}
    >
      <div
        className="flex overflow-hidden leading-none"
        style={{ ...defaultCounterStyle }}
      >
        {places.map((place) => (
          <Digit key={place} place={place} value={value} height={height} />
        ))}
      </div>
    </div>
  );
}
