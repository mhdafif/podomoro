import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type {
  FlowType,
  ITimerState,
  ITimerStore,
  SessionType,
  TimerSetting,
} from "./ITimerStore";

const initialState: ITimerState = {
  time: 30,
  setting: {
    work: 5,
    shortBreak: 10,
    longBreak: 15,
    autoStart: false,
  },
  flow: {
    1: "waiting",
    2: "waiting",
    3: "waiting",
    4: "waiting",
  },
  currentStep: 1,
  currentSession: "work",
};

const TimerStoreSlice: StateCreator<
  ITimerStore,
  [
    // ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", unknown],
    ["zustand/persist", unknown],
  ]
> = (set, get) => ({
  ...initialState,
  getFlowState: (state: FlowType) => {
    const flow = get().flow;
    for (let i = 1; i <= 4; i++) {
      if (flow[i as 1 | 2 | 3 | 4] === state) {
        return i as 1 | 2 | 3 | 4;
      }
    }
    return null;
  },
  setSetting: (type: keyof TimerSetting, value: any) => {
    set({
      setting: {
        ...get().setting,
        [type]: value,
      },
    });
  },
  setFlow: (flow: 1 | 2 | 3 | 4, value: "waiting" | "running" | "finished") => {
    set({
      flow: {
        ...get().flow,
        [flow]: value,
      },
    });
  },
  setState: (type: keyof ITimerState, value: any) => {
    set({ [type]: value }, false, `timer-set-state-${type}`);
  },
  resetState: (type: keyof ITimerState, value?: any) => {
    set(
      {
        [type]: initialState[type as keyof ITimerState] || value || undefined,
      },
      false,
      `timer-reset-state-${type}`
    );
  },
  getFlowSequence: () => {
    return [
      { step: 1, session: "work" as SessionType },
      { step: 2, session: "shortBreak" as SessionType },
      { step: 3, session: "work" as SessionType },
      { step: 4, session: "shortBreak" as SessionType },
      { step: 5, session: "work" as SessionType },
      { step: 6, session: "shortBreak" as SessionType },
      { step: 7, session: "work" as SessionType },
      { step: 8, session: "longBreak" as SessionType },
    ];
  },
  getCurrentStepInfo: () => {
    const { currentStep, currentSession } = get();
    return { step: currentStep, session: currentSession };
  },
  getNextStepInfo: () => {
    const flowSequence = get().getFlowSequence();
    const currentStep = get().currentStep;
    const nextIndex =
      flowSequence.findIndex((item) => item.step === currentStep) + 1;

    if (nextIndex < flowSequence.length) {
      return flowSequence[nextIndex];
    }
    return null; // End of sequence
  },
  setCurrentStep: (step: number) => {
    set({ currentStep: step }, false, "flow/setCurrentStep");
  },
  setCurrentSession: (session: SessionType) => {
    set({ currentSession: session }, false, "flow/setCurrentSession");
  },
  resetFlow: () => {
    set(
      {
        currentStep: 1,
        currentSession: "work",
        flow: {
          1: "waiting",
          2: "waiting",
          3: "waiting",
          4: "waiting",
        },
      },
      false,
      "flow/resetFlow"
    );
  },
});

const useTimerStore = create<ITimerStore>()(
  devtools(
    persist(TimerStoreSlice, {
      name: "timer-store",
      // partialize: (state) =>
      //   Object.fromEntries(
      //     Object.entries(state).filter(([key]) => !["loading"].includes(key))
      //   ),
      // or include some data
      // partialize: (state) => ({ cartSummary: state.cartSummary }),
    }),
    {
      name: "timer-store",
      enabled: import.meta.env.VITE_ENVIRONMENT === "local",
    }
  )
);

export default useTimerStore;
