export interface IGlobalState {
  loading: boolean;
  error: any;

  notif: {
    isOpen: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
  };
}

export interface IGlobalStore extends IGlobalState {
  setState(type: keyof IGlobalState, value: any): void;
  resetState(type: keyof IGlobalState, value?: any): void;
}
