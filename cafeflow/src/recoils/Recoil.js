import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const usernameState = atom({
  key: "usernameState",
  default: "",
});
