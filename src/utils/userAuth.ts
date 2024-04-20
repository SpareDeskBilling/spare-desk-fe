import { ACCESS_TOKEN, IsLoggedInValues } from "constants/common";
import { updateIsUserAuthenticated } from "reducers/userAuth";
import { removeLocalData, setLocalData } from "./localStorage";
import store from "store/store";

export const setUserLogout = () => {
    store.dispatch(updateIsUserAuthenticated(IsLoggedInValues.LOGGED_OUT));
    setLocalData(IsLoggedInValues.IS_LOGGED_IN, IsLoggedInValues.LOGGED_OUT);
    removeLocalData(ACCESS_TOKEN);
};