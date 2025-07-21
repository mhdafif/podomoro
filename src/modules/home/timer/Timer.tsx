import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

import { FlowDots } from "./FlowDots";
import { TimerControls } from "./TimerControls";
import UseTimer from "./UseTimer";

import Counter from "@/components/Counter/Counter";
import { Button } from "@/components/ui/button";

const Timer = () => {
  /*======================== Props ======================== */

  const {
    time,
    timerSetting,
    timerState,
    handleSetting,
    formatTime,
    handleTimerState,
    handleReset,
    handleSkip,
    getCurrentStepInfo,
  } = UseTimer();

  /*======================== Return ======================== */

  return (
    <div className="flex flex-col items-center text-white">
      <div className="flex flex-col items-center">
        <div className="mb-2 h-full w-full">
          <div className="flex items-center justify-between gap-1 text-7xl font-bold">
            <div className="group relative h-24 w-[6.5rem]">
              <div
                className={cn(
                  "absolute -top-9 flex h-9 w-full items-start text-lg transition-all duration-300 ease-out",
                  timerState !== "stopped" && "hidden"
                )}
              >
                <Button
                  className="rounded-5 h-8 w-full disabled:opacity-0"
                  size="icon"
                  onClick={() => {
                    const stepInfo = getCurrentStepInfo();
                    if (stepInfo.session === "work") {
                      handleSetting("work", timerSetting.work + 5);
                    } else if (stepInfo.session === "shortBreak") {
                      handleSetting("shortBreak", timerSetting.shortBreak + 1);
                    } else {
                      handleSetting("longBreak", timerSetting.longBreak + 5);
                    }
                  }}
                  disabled={
                    getCurrentStepInfo().session === "work"
                      ? timerSetting.work >= 60
                      : getCurrentStepInfo().session === "shortBreak"
                        ? timerSetting.shortBreak >= 15
                        : timerSetting.longBreak >= 60
                  }
                >
                  <ChevronUp className="size-6 h-6 w-6" size={24} />
                </Button>
              </div>
              <Counter
                value={
                  timerState === "stopped"
                    ? getCurrentStepInfo().session === "work"
                      ? timerSetting.work
                      : getCurrentStepInfo().session === "shortBreak"
                        ? timerSetting.shortBreak
                        : timerSetting.longBreak
                    : Number(formatTime(time, "min"))
                }
                showBg={timerState === "stopped"}
              />
              <div
                className={cn(
                  "absolute -bottom-9 flex h-9 w-full items-end text-lg transition-all duration-300 ease-out",
                  timerState !== "stopped" && "hidden"
                )}
              >
                <Button
                  className="rounded-5 h-8 w-full disabled:opacity-0"
                  size="icon"
                  onClick={() => {
                    const stepInfo = getCurrentStepInfo();
                    if (stepInfo.session === "work") {
                      handleSetting("work", timerSetting.work - 5);
                    } else if (stepInfo.session === "shortBreak") {
                      handleSetting("shortBreak", timerSetting.shortBreak - 1);
                    } else {
                      handleSetting("longBreak", timerSetting.longBreak - 5);
                    }
                  }}
                  disabled={
                    getCurrentStepInfo().session === "work"
                      ? timerSetting.work <= 5
                      : getCurrentStepInfo().session === "shortBreak"
                        ? timerSetting.shortBreak <= 1
                        : timerSetting.longBreak <= 5
                  }
                >
                  <ChevronDown className="size-6 h-6 w-6" size={24} />
                </Button>
              </div>
            </div>

            <div className="h-24 place-content-center text-center">:</div>
            <div className="rounded-5 h-24 w-[6.5rem] place-content-center text-center text-white select-none">
              {timerState === "stopped" ? "00" : formatTime(time, "sec")}
            </div>
          </div>

          {/* Flow label & dots */}
          <FlowDots {...{ time, timerState }} />
        </div>

        {/* Controls */}
        <TimerControls
          {...{ timerState, handleReset, handleSkip, handleTimerState }}
        />
      </div>
      {timerState}
    </div>
  );
};

export default Timer;
