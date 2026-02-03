// recoilUtils.js

import { getRecoil } from "recoil-nexus";
import {
  defaultUrl,
  GoalsDetail,
  GQState,
  LoggedInUserData,
  LoggedInUserTokenJwt,
  PersonalDetailsData,
  QuestionDetail,
} from "./Store";

export const getJwtToken = () => getRecoil(LoggedInUserTokenJwt);
export const getUserDetail = () => getRecoil(PersonalDetailsData);
export const getQuestionDetail = () => getRecoil(QuestionDetail);
export const getGoalsDetail = () => getRecoil(GoalsDetail);
export const getDefaultUrl = () => getRecoil(defaultUrl);
export const getLoggedInUserData = () => getRecoil(LoggedInUserData);
export const getGQState = () => getRecoil(GQState);
