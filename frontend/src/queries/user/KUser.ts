export const K_USER = {
  all: ["user"],
  signin: () => [...K_USER.all, "signin"],
  signup: () => [...K_USER.all, "signup"],
} as const;
