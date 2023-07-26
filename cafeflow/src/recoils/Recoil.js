import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const ageState = atom({
  key: "ageState",
  default: null,
});

export const emailState = atom({
  key: "emailState",
  default: null,
});

export const nameState = atom({
  key: "nameState",
  default: null,
});
