import { cn } from "@/lib/utils";

import UseTimer from "./UseTimer";

export interface FlowDotsProps {
  time: number;
  timerState: "stopped" | "running" | "paused";
}

export const FlowDots = (props: FlowDotsProps) => {
  /*======================== Props ======================== */

  const { time, timerState } = props;
  const { timerSetting, flow, runningFlow, currentSession } = UseTimer();

  /*======================== Return ======================== */

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="w-[6.5rem] shrink-0 px-4 text-center text-sm">
        {timerState !== "stopped" && (
          <div className="space-y-1">
            <div className="text-nowrap">
              {currentSession === "work"
                ? `Flow #${runningFlow}`
                : currentSession === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
            </div>
            {/* <div className="text-xs text-nowrap opacity-70">
                    Step {currentStep}/8
                  </div> */}
          </div>
        )}
        {/* {timerState === "stopped" && currentStep > 1 && !autoStart && (
                <div className="space-y-1">
                  <div className="text-xs text-yellow-400">Ready to start</div>
                  <div className="text-xs opacity-70">
                    {getCurrentStepInfo().type === "work"
                      ? `Flow #${getCurrentStepInfo().flow}`
                      : getCurrentStepInfo().type === "shortBreak"
                        ? "Short Break"
                        : "Long Break"}
                  </div>
                </div>
              )} */}
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
                    width:
                      100 -
                      (time /
                        (currentSession === "work"
                          ? timerSetting.work * 60
                          : currentSession === "shortBreak"
                            ? timerSetting.shortBreak * 60
                            : timerSetting.longBreak * 60)) *
                        100 +
                      "%",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
