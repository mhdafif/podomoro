import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { IUserState, IUserStore } from "./IUserStore";

const initialState: IUserState = {
  loading: false,
  accessToken: null,
  user: null,
};

const userStoreSlice: StateCreator<
  IUserStore,
  [["zustand/devtools", unknown], ["zustand/persist", unknown]]
> = (set) => ({
  ...initialState,
  setState: (type: keyof IUserState, value: any) => {
    set({ [type]: value }, false, `user-set-state-${type}`);
  },
  resetState: (type: keyof IUserState, value?: any) => {
    set(
      {
        [type]: initialState[type as keyof IUserState] || value || undefined,
      },
      false,
      `user-reset-state-${type}`
    );
  },
  setUser: (user, accessToken) => {
    set({ user, accessToken, loading: false }, false, "user-set-user");
  },
  logout: () => {
    set(
      { user: null, accessToken: null, loading: false },
      false,
      "user-logout"
    );
  },
  isAuthenticated: () => {
    const state = useUserStore.getState();
    return !!state.accessToken && !!state.user;
  },
});

const useUserStore = create<IUserStore>()(
  devtools(
    persist(userStoreSlice, {
      name: "user-store",
      // storage: createJSONStorage(() => sessionStorage),

      // exclude some data to persist
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["loading"].includes(key))
        ),

      // or include some data
      // partialize: (state) => ({ cartSummary: state.cartSummary }),
    }),
    {
      name: "user-store",
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      // to enabled or disabled the devtools
      enabled: import.meta.env.VITE_ENVIRONMENT === "local",
      // for annonymous type, can rename with this. default : anonymous
      // anonymousActionType: 'unknown',
      // serialize: { options: true }
    }
  )
);

export default useUserStore;
