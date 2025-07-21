import { cn } from "@/lib/utils";
import { Pause, Play, SkipForward, TimerReset, Volume2 } from "lucide-react";

import TimerSettings from "./TimerSettings";
import UseTimer from "./UseTimer";

import { Button } from "@/components/ui/button";

export interface TimerControlsProps {
  timerState: "stopped" | "running" | "paused";
  handleTimerState: () => void;
  handleReset: () => void;
  handleSkip: () => void;
}

export const TimerControls = (props: TimerControlsProps) => {
  /*======================== Props ======================== */

  const { timerState, handleReset, handleSkip, handleTimerState } = props;
  const { getCurrentStepInfo } = UseTimer();

  /*======================== Return ======================== */

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className={cn("text-white")}
        onClick={handleReset}
        disabled={
          getCurrentStepInfo().session === "work" &&
          getCurrentStepInfo().step === 1
        }
      >
        <TimerReset className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={handleTimerState}
      >
        {timerState === "running" ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={handleSkip}
        disabled={timerState === "stopped"}
      >
        <SkipForward className="h-5 w-5" />
      </Button>

      <TimerSettings />

      <Button variant="ghost" size="icon" className="text-white">
        <Volume2 className="h-5 w-5" />
      </Button>
    </div>
  );
};
