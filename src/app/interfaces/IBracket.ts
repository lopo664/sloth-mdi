import { IMap } from "./IMap";
import { IMatch } from "./IMatch";
import { ITeam } from "./ITeam";

export interface IBracket {
    matchId: string,
    match: IMatch,
    teamId1?: ITeam,
    teamId2?: ITeam,
    winner?: ITeam,
    loser?: ITeam,
    teamId1Ban?: IMap,
    teamId2Ban?: IMap,
    nextBracketWinner?: IBracket,
    nextBracketLoser?: IBracket
}