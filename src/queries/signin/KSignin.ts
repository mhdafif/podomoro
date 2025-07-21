export const K_SIGNIN = {
  all: ["signin"],
  signin: () => [...K_SIGNIN.all, "signin"],
} as const;
