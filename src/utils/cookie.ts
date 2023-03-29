import { deleteCookie, getCookie, setCookie } from "cookies-next";

export function setUserCookie(data: any) {
  console.log(data);
  setCookie("id", data.user.id);
  setCookie("username", data.user.username);
  setCookie("jwt", data.jwt);
}

export function unsetCookie() {
  deleteCookie("id");
  deleteCookie("username");
  deleteCookie("jwt");
}

export function getDataFromCookie(key: string) {
  return getCookie(key);
}
