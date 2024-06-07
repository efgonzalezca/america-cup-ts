import { discriminatedPoints } from '../services/userMatches.service';
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

export const getPointsMatchDiscriminated = (match: IMatch, local_score: number, visitor_score: number): discriminatedPoints => {
  if(local_score === null || visitor_score === null) {
    return {
      matchPoints: 0,
      localScorePoints: 0,
      visitorScorePoints: 0,
      exactScore: 0,
      addPoints: 0
    }
  }
  const matchIsATie = match.local_team.result === match.visiting_team.result;
  const userMatchIsATie = local_score === visitor_score;
  const localTeamIsWinner = match.local_team.result > match.visiting_team.result;
  const userSelectLocalAsWinner = local_score > visitor_score;
  const userSelectVisitorAsWinner = local_score < visitor_score;
  const matchPoints = matchIsATie && userMatchIsATie
    ? 3
    : matchIsATie
      ? 0
      : localTeamIsWinner && userSelectLocalAsWinner
        ? 3
        : !localTeamIsWinner && userSelectVisitorAsWinner
          ? 3 : 0
  const localScorePoints = match.local_team.result === local_score ? 2 : 0;
  const visitorScorePoints = match.visiting_team.result === visitor_score ? 2 : 0;
  const exactScore = localScorePoints && visitorScorePoints ? 5 : 0;
  const addPoints = (matchIsATie && userMatchIsATie) && !exactScore ? 2 : 0;
  const disriminatedPoints: discriminatedPoints = {
    matchPoints: matchPoints,
    localScorePoints: localScorePoints,
    visitorScorePoints: visitorScorePoints,
    exactScore: exactScore,
    addPoints: addPoints
  }
  return disriminatedPoints;
}