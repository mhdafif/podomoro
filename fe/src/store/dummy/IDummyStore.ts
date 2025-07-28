export interface IData {
  code: string;
  id: number;
}
export interface IDummyState {
  loading: boolean;
  data?: IData[];
}

export interface IDummyStore extends IDummyState {
  loadData(): Promise<any>;
  setState(type: keyof IDummyState, value: any): void;
  resetState(type: keyof IDummyState, value?: any): void;
}
