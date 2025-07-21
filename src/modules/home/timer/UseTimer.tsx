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

  const flow = useTimerStore((state) => state.flow);
  const timerSetting = useTimerStore((state) => state.setting);
  const currentStep = useTimerStore((state) => state.currentStep);
  const currentSession = useTimerStore((state) => state.currentSession);

  const runningFlow = useTimerStore((state) => state.getFlowState("running"));
  const handleFlow = useTimerStore((state) => state.setFlow);
  const handleSetting = useTimerStore((state) => state.setSetting);
  const getFlowSequence = useTimerStore((state) => state.getFlowSequence);
  const getCurrentStepInfo = useTimerStore((state) => state.getCurrentStepInfo);
  const getNextStepInfo = useTimerStore((state) => state.getNextStepInfo);
  const setCurrentStep = useTimerStore((state) => state.setCurrentStep);
  const setCurrentSession = useTimerStore((state) => state.setCurrentSession);
  const resetFlow = useTimerStore((state) => state.resetFlow);

  /*======================== Handler ======================== */

  const startNextSession = () => {
    const nextStep = getNextStepInfo();
    const currentStepInfo = getCurrentStepInfo();

    // Mark current work session as finished if it's a work session
    if (currentStepInfo.session === "work") {
      // Find which flow number corresponds to this step
      const flowNumber = Math.ceil(currentStep / 2);
      handleFlow(flowNumber as 1 | 2 | 3 | 4, "finished");
    }

    // Move to next step
    if (nextStep) {
      setCurrentStep(nextStep.step);
      setCurrentSession(nextStep.session);

      // Set timer duration based on session type
      switch (nextStep.session) {
        case "work": {
          setTime(timerSetting.work);
          // Set the flow as running for work sessions
          const workFlowNumber = Math.ceil(nextStep.step / 2);
          handleFlow(workFlowNumber as 1 | 2 | 3 | 4, "running");
          break;
        }
        case "shortBreak":
          setTime(timerSetting.shortBreak);
          break;
        case "longBreak":
          setTime(timerSetting.longBreak);
          break;
      }

      // Auto-start next session if enabled, otherwise stop
      if (timerSetting.autoStart) {
        setTimerState("running");
      } else {
        setTimerState("stopped");
      }
    } else {
      // Completed full cycle, reset
      resetFlow();
      setTimerState("stopped");
    }
  };

  const handleSkip = () => {
    // Skip current session and move to next
    startNextSession();
  };

  const toggleAutoStart = () => {
    handleSetting("autoStart", !timerSetting.autoStart);
  };

  const handleReset = () => {
    resetFlow();
    setTimerState("stopped");
  };

  const handleTimerState = () => {
    switch (timerState) {
      case "stopped": {
        const currentStepInfo = getCurrentStepInfo();

        // Set timer duration based on current session type
        switch (currentStepInfo.session) {
          case "work": {
            setTime(timerSetting.work);
            // Set the flow as running for work sessions
            const workFlowNumber = Math.ceil(currentStep / 2);
            handleFlow(workFlowNumber as 1 | 2 | 3 | 4, "running");
            break;
          }
          case "shortBreak":
            setTime(timerSetting.shortBreak);
            break;
          case "longBreak":
            setTime(timerSetting.longBreak);
            break;
        }

        setTimerState("running");
        break;
      }

      case "paused":
        setTimerState("running");
        break;

      default:
        setTimerState("paused");
        break;
    }
  };

  const handleTimeChange = (newTime: number | ((prev: number) => number)) => {
    if (typeof newTime === "function") {
      setTime(newTime);
    } else {
      setTime(newTime);
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
    } else if (time === 0 && timerState === "running") {
      // Timer completed, start next session in the flow
      startNextSession();
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerState, time, currentStep]);

  /*======================== Return ======================== */

  return {
    time,
    timerSetting,
    timerState,
    flow,
    runningFlow,
    currentSession,
    currentStep,
    handleSetting,
    formatTime,
    handleTimerState,
    handleReset,
    handleSkip,
    toggleAutoStart,
    getCurrentStepInfo,
    getFlowSequence,
    handleTimeChange,
  };
};

export default UseTimer;
