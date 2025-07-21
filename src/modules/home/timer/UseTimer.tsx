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
type SessionType = "work" | "shortBreak" | "longBreak";

const UseTimer = () => {
  /*======================== UseState ======================== */

  const [time, setTime] = useState(60); // 1 minute in seconds
  const [timerState, setTimerState] = useState<TimerState>("stopped");
  const [currentSession, setCurrentSession] = useState<SessionType>("work");
  const [currentStep, setCurrentStep] = useState(1); // Track current step in the flow
  // const [autoStart, setAutoStart] = useState(true); // Auto-start next session

  /*======================== Store ======================== */

  // const time = useTimerStore((state) => state.time);
  const flow = useTimerStore((state) => state.flow);
  const timerSetting = useTimerStore((state) => state.setting);
  // const waitingFlow = useTimerStore((state) => state.getFirstWaitingFlow());
  // const waitingFlow = useTimerStore((state) => state.getFlowState("waiting"));
  const runningFlow = useTimerStore((state) => state.getFlowState("running"));
  const handleFlow = useTimerStore((state) => state.setFlow);
  const handleSetting = useTimerStore((state) => state.setSetting);
  const resetTimerState = useTimerStore((state) => state.resetState);

  /*======================== Handler ======================== */

  // Get the flow sequence: work1 → short1 → work2 → short2 → work3 → short3 → work4 → long
  const getFlowSequence = () => [
    { type: "work" as SessionType, flow: 1 }, // Flow 1
    { type: "shortBreak" as SessionType, flow: 1 }, // Short Rest 1
    { type: "work" as SessionType, flow: 2 }, // Flow 2
    { type: "shortBreak" as SessionType, flow: 2 }, // Short Rest 2
    { type: "work" as SessionType, flow: 3 }, // Flow 3
    { type: "shortBreak" as SessionType, flow: 3 }, // Short Rest 3
    { type: "work" as SessionType, flow: 4 }, // Flow 4
    { type: "longBreak" as SessionType, flow: 4 }, // Long Rest
  ];

  const getCurrentStepInfo = () => {
    const sequence = getFlowSequence();
    return sequence[currentStep - 1] || sequence[0];
  };

  const getNextStepInfo = () => {
    const sequence = getFlowSequence();
    const nextIndex = currentStep < sequence.length ? currentStep : 0;
    return sequence[nextIndex];
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setCurrentSession("work");
    setTimerState("stopped");
    resetTimerState("flow");
  };

  const startNextSession = () => {
    const nextStep = getNextStepInfo();
    const currentStepInfo = getCurrentStepInfo();

    // Mark current work session as finished if it's a work session
    if (currentStepInfo.type === "work") {
      handleFlow(currentStepInfo.flow as 1 | 2 | 3 | 4, "finished");
    }

    // Move to next step
    if (currentStep < getFlowSequence().length) {
      setCurrentStep(currentStep + 1);
      setCurrentSession(nextStep.type);

      // Set timer duration based on session type
      switch (nextStep.type) {
        case "work":
          setTime(timerSetting.work);
          if (nextStep.flow) {
            handleFlow(nextStep.flow as 1 | 2 | 3 | 4, "running");
          }
          break;
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
    }
  };

  const handleSkip = () => {
    // Skip current session and move to next
    startNextSession();
  };

  const toggleAutoStart = () => {
    // setAutoStart(!autoStart);
    handleSetting("autoStart", !timerSetting.autoStart);
  };

  const handleReset = () => {
    resetFlow();
  };

  const handleTimerState = () => {
    switch (timerState) {
      case "stopped": {
        const currentStepInfo = getCurrentStepInfo();

        // Set timer duration based on current session type
        switch (currentStepInfo.type) {
          case "work":
            // setTime(timerSetting.work * 60);
            setTime(timerSetting.work);
            if (currentStepInfo.flow) {
              handleFlow(currentStepInfo.flow as 1 | 2 | 3 | 4, "running");
            }
            break;
          case "shortBreak":
            // setTime(timerSetting.shortBreak * 60);
            setTime(timerSetting.shortBreak);
            break;
          case "longBreak":
            setTime(timerSetting.longBreak);
            // setTime(timerSetting.longBreak * 60);
            break;
        }

        setCurrentSession(currentStepInfo.type);
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
    // currentStep,
    handleSetting,
    formatTime,
    handleTimerState,
    handleReset,
    handleSkip,
    toggleAutoStart,
    getCurrentStepInfo,
    getFlowSequence,
  };
};

export default UseTimer;
