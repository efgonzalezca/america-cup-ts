import { IMatch } from '../types';

export const  getPointsMatch = (match: IMatch, local_score: number, visitor_score: number) => {
  const matchIsATie = match.local_team.result === match.visiting_team.result;
  const userMatchIsATie = local_score === visitor_score;
  const localTeamIsWinner = match.local_team.result > match.visiting_team.result;
  const userSelectLocalAsWinner = local_score > visitor_score;
  const userSelectVisitorAsWinner = local_score < visitor_score;

  if(local_score === null || visitor_score === null) {
    return 0;
  }

  if(matchIsATie) {
    return (userMatchIsATie)
      ? (local_score === match.local_team.result) ? 9 : 5
      : (match.local_team.result === local_score || match.visiting_team.result === visitor_score) ? 2 : 0
  } else {
    if(localTeamIsWinner) {
      return (userSelectLocalAsWinner) 
        ? (match.local_team.result === local_score && match.visiting_team.result === visitor_score)
          ? 9
          : (match.local_team.result === local_score || match.visiting_team.result === visitor_score) ? 5 : 3
        : (match.local_team.result === local_score || match.visiting_team.result === visitor_score) ? 2 : 0
    } else {
      return (userSelectVisitorAsWinner) 
        ? (match.local_team.result === local_score && match.visiting_team.result === visitor_score)
          ? 9
          : (match.local_team.result === local_score || match.visiting_team.result === visitor_score) ? 5 : 3
        : (match.local_team.result === local_score || match.visiting_team.result === visitor_score) ? 2 : 0
    }
  }
}