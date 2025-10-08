// recoilUtils.js

import { getRecoil } from "recoil-nexus";
import { LoggedInUserTokenJwt } from "./Store";

export const getJwtToken = () => getRecoil(LoggedInUserTokenJwt);
