import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { IDummyState, IDummyStore } from "./IDummyStore";

// import http from "@/config/http";

const initialState: IDummyState = {
  loading: false,
  data: undefined,
};

// simple store like just using devtools, easier like this
// const useDummyStore = create<IDummyStore>()(
//   // to track data on redux dev tools
//   devtools((set) => ({
//     ...initialState,
//     loadData: async () => {
//       try {
//         set({ loading: true });
//         const response = await http({
//           url: "/api/dummy",
//         });
//         set({
//           data: response.data.data,
//         });
//       } finally {
//         set({ loading: false });
//       }
//     },
//     reset: () => set(initialState),
//   }))
// );

// export default useDummyStore;

// complicated store
// separate the middleware bellow
const dummyStoreSlice: StateCreator<
  IDummyStore,
  [
    // ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", unknown],
    ["zustand/persist", unknown],
  ]
> = (set) => ({
  ...initialState,
  loadData: async () => {
    try {
      set({ loading: true }, false, "loading");
      // const response = await http({
      //   url: "/users/serializer",
      //   // url: "/users/admin/serializer",
      //   headers: {
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impob25kb2VAZ21haWwuY29tIiwiaWQiOiJjbWNmMDhpcTQwMDAwMHNhMjI4MWtvZTAzIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE3NTIxMjczNTksImV4cCI6MTc1MjIxMzc1OX0.zoqbgxs572VMOIMYJ2Z-VAGtqwwom7HxAMyZz9Cd3qA`,
      //   },
      // });
      // console.log("response", response);
      // set(
      //   {
      //     data: response.data.data,
      //   },
      //   false,
      //   "loadData"
      // );
    } finally {
      set({ loading: false }, false, "loading");
    }
  },
  setState: (type: keyof IDummyState, value: any) => {
    set({ [type]: value }, false, `dummy-set-state-${type}`);
  },
  resetState: (type: keyof IDummyState, value?: any) => {
    set(
      {
        [type]: initialState[type as keyof IDummyState] || value || undefined,
      },
      false,
      `dummy-reset-state-${type}`
    );
  },
});

const useDummyStore = create<IDummyStore>()(
  // devtools documentation https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#serialize
  devtools(
    // persist is to persistent data (in storage)
    // https://docs.pmnd.rs/zustand/integrations/persisting-store-data

    persist(dummyStoreSlice, {
      name: "dummy-store",
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
      // devtools is to monitor the store throught redux devtools
      // redux devtools name
      name: "dummy-store",

      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used

      // to enabled or disabled the devtools
      enabled: import.meta.env.VITE_ENVIRONMENT === "local",

      // for annonymous type, can rename with this. default : anonymous
      // anonymousActionType: 'unknown',

      // serialize: { options: true }
    }
  )
);

export default useDummyStore;

// full documentation can be seen here https://github.com/pmndrs/zustand
