// recoilUtils.js

import { getRecoil } from "recoil-nexus";
import { LoggedInUserTokenJwt, PersonalDetailsData } from "./Store";

export const getJwtToken = () => getRecoil(LoggedInUserTokenJwt);
export const getUserDetail = () => getRecoil(PersonalDetailsData);
