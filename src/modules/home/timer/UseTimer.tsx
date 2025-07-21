import { useEffect, useState } from "react";

import useTimerStore from "@/store/timer/timerStore";

// type TimerSettingState = {
//   work: number;
//   shortBreak: number;
//   longBreak: number;
// };

// type TimerSettingAction =
//   | { type: "SET_WORK"; payload: number }
//   | { type: "SET_SHORT_BREAK"; payload: number }
//   | { type: "SET_LONG_BREAK"; payload: number };

// stopped is before anything run
type TimerState = "stopped" | "running" | "paused";

const UseTimer = () => {
  /*======================== UseState ======================== */

  const [time, setTime] = useState(60); // 1 minute in seconds
  const [timerState, setTimerState] = useState<TimerState>("stopped");

  /*======================== Store ======================== */

  // const time = useTimerStore((state) => state.time);
  const flow = useTimerStore((state) => state.flow);
  const timerSetting = useTimerStore((state) => state.setting);
  // const waitingFlow = useTimerStore((state) => state.getFirstWaitingFlow());
  const waitingFlow = useTimerStore((state) => state.getFlowState("waiting"));
  const runningFlow = useTimerStore((state) => state.getFlowState("running"));
  const handleFlow = useTimerStore((state) => state.setFlow);
  const handleSetting = useTimerStore((state) => state.setSetting);
  const resetTimerState = useTimerStore((state) => state.resetState);

  /*======================== Handler ======================== */

  const handleReset = () => {
    setTimerState("stopped");
    resetTimerState("flow");
  };

  const handleTimerState = () => {
    switch (timerState) {
      case "stopped":
        setTime(5);
        if (!runningFlow && waitingFlow) {
          handleFlow(waitingFlow, "running");
        }
        setTimerState("running");
        break;

      case "paused":
        setTimerState("running");
        break;
      // case "running":
      // setTimerState("paused");
      //   break;

      default:
        setTimerState("paused");
        break;
    }
  };

  const formatTime = (seconds: number, type: "min" | "sec") => {
    const mins = Math.floor(seconds / 60).toString();
    const secs = (seconds % 60).toString();
    if (type === "min") {
      return mins.padStart(mins.length > 1 ? 2 : 1, "0");
    }
    if (type === "sec") {
      return secs.padStart(2, "0");
    }
  };

  /*======================== UseEffect ======================== */

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerState === "running" && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && timerState === "running" && runningFlow) {
      handleFlow(runningFlow, "finished");
      setTimerState("stopped");
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerState, time]);

  /*======================== Return ======================== */

  return {
    time,
    timerSetting,
    timerState,
    flow,
    runningFlow,
    handleSetting,
    formatTime,
    handleTimerState,
    handleReset,
  };
};

export default UseTimer;
