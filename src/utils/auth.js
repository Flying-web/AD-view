import Cookies from "js-cookie";
const personalToken = "CENTERTOKEN";

const detailInfo = "DETAILINFO";

export function getPersonalToken() {
    return Cookies.get(personalToken);
  }
  
  export function setPersonalToken(token) {
    return Cookies.set(personalToken, token);
  }
  
  export function removePersonalToken() {
    return Cookies.remove(personalToken);
  }


  export function setDetailInfo(token) {
    return Cookies.set(detailInfo, JSON.stringify(token));
  }

  export function getDetailInfo(token) {
    return JSON.parse( Cookies.get(detailInfo)|| '{}')
  }