import { RootState } from "../reducers";
import { GetTeams } from "../actions";

export const selectTeams = (state:RootState) => state.teams;

export const getTeams = () => GetTeams()
