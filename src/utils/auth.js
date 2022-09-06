import { PATH_DASHBOARD } from "../routes/paths";
import { createUserProfile } from "../redux/slices/userAccess";
import { store } from "../redux/store";
import { internalLogin, internalProfile } from "./requests";

export const handleLogin = async (loginPayload = {}) => {
    await internalLogin(loginPayload);
    const dataProfile = await internalProfile();
    store.dispatch(createUserProfile(dataProfile.data.data));
    window.location = PATH_DASHBOARD.root;
    return dataProfile;
}