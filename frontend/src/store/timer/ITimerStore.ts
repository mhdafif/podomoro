export interface TimerSetting {
  work: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
}

export type FlowType = "waiting" | "running" | "finished";
export type SessionType = "work" | "shortBreak" | "longBreak";

export type FlowSequenceStep = {
  step: number;
  session: SessionType;
};

export type ITimerState = {
  time: number;
  setting: TimerSetting;
  flow: {
    1: FlowType;
    2: FlowType;
    3: FlowType;
    4: FlowType;
  };
  currentStep: number;
  currentSession: SessionType;
  timerState: "stopped" | "running" | "paused";
};

export interface ITimerStore extends ITimerState {
  getFlowState: (state: FlowType) => 1 | 2 | 3 | 4 | null;
  getFlowSequence: () => FlowSequenceStep[];
  getCurrentStepInfo: () => FlowSequenceStep;
  getNextStepInfo: () => FlowSequenceStep | null;
  setSetting(type: keyof TimerSetting, value: any): void;
  setFlow(flow: 1 | 2 | 3 | 4, value: FlowType): void;
  setCurrentStep(step: number): void;
  setCurrentSession(session: SessionType): void;
  resetFlow(): void;
  setTimerState(state: "stopped" | "running" | "paused"): void;
  setState(type: keyof ITimerState, value: any): void;
  resetState(type: keyof ITimerState, value?: any): void;
}
