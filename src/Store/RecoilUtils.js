// recoilUtils.js

import { getRecoil } from "recoil-nexus";
<<<<<<< HEAD
import { LoggedInUserTokenJwt } from "./Store";

export const getJwtToken = () => getRecoil(LoggedInUserTokenJwt);
=======
import { LoggedInUserTokenJwt, PersonalDetailsData } from "./Store";

export const getJwtToken = () => getRecoil(LoggedInUserTokenJwt);
export const getUserDetail = () => getRecoil(PersonalDetailsData);
>>>>>>> origin/master
