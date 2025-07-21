import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Settings,
  SkipForward,
  TimerReset,
  Volume2,
} from "lucide-react";

import UseTimer from "./UseTimer";

import Counter from "@/components/Counter/Counter";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Timer = () => {
  /*======================== Props ======================== */

  const {
    time,
    timerSetting,
    timerState,
    flow,
    runningFlow,
    handleSetting,
    formatTime,
    handleTimerState,
    handleReset,
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
                  onClick={() => handleSetting("work", timerSetting.work + 5)}
                  disabled={timerSetting.work >= 60}
                >
                  <ChevronUp className="size-6 h-6 w-6" size={24} />
                </Button>
              </div>
              <Counter
                value={
                  timerState === "stopped"
                    ? timerSetting.work
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
                  onClick={() => handleSetting("work", timerSetting.work - 5)}
                  disabled={timerSetting.work <= 5}
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
          <div className="flex items-center justify-between gap-1">
            <div className="w-[6.5rem] shrink-0 px-4 text-center">
              {timerState !== "stopped" && `Flow #${runningFlow}`}
            </div>
            <div className="dots-timer flex w-full items-center justify-end gap-2 py-3">
              {Object.entries(flow).map(([flowNum, flowState]) => {
                return (
                  <div
                    key={flowNum}
                    className={cn(
                      "dot relative size-3 overflow-hidden rounded-full bg-slate-400 transition-all duration-300 ease-out",
                      flowState === "running" && "active",
                      flowState === "finished" && "finished"
                    )}
                  >
                    {flowState === "running" && (
                      <div
                        className="bg-blue-tertiary absolute z-[1] h-full animate-pulse transition-all duration-300 ease-out"
                        style={{
                          width: 100 - (time / 5) * 100 + "%",
                        }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn("text-white")}
            onClick={handleReset}
            disabled={timerState === "stopped"}
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
            // onClick={handleReset}
            // disabled={timerState === "stopped"}
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 border-slate-700 bg-slate-800 text-white">
              <div className="space-y-4">
                <h3 className="font-medium">Timer Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Work Duration</label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSetting("work", timerSetting.work - 5)
                        }
                        disabled={timerSetting.work <= 5}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">
                        {timerSetting.work}m
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSetting("work", timerSetting.work + 5)
                        }
                        disabled={timerSetting.work >= 60}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Short Break Duration</label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSetting(
                            "shortBreak",
                            timerSetting.shortBreak - 1
                          )
                        }
                        disabled={timerSetting.shortBreak <= 5}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">
                        {timerSetting.shortBreak}m
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSetting(
                            "shortBreak",
                            timerSetting.shortBreak + 1
                          )
                        }
                        disabled={timerSetting.shortBreak >= 15}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Long Break Duration</label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSetting("longBreak", timerSetting.longBreak - 5)
                        }
                        disabled={timerSetting.longBreak <= 20}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">
                        {timerSetting.longBreak}m
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSetting("longBreak", timerSetting.longBreak + 5)
                        }
                        disabled={timerSetting.longBreak >= 60}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" className="text-white">
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {timerState}
    </div>
  );
};

export default Timer;
