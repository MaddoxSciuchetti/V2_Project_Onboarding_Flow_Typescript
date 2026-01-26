export let navigate = (): any => {};

export const setNavigate = (fn: any) => {
  navigate = fn;
};
