import TeamModel from '../Models/Team.model';
import MatchModel from '../Models/Match.model';
import Leaderboard from '../Utils/Leaderboard';

export default class LeaderboardService {
  public getResultOfHome = async () => {
    const teams = await new TeamModel().getAllTeams();
    const matches = await new MatchModel().getAllMatches();

    const allTeamsOfHome = await Promise.all(teams.map((team) => {
      const allMatchesOfHomeTeam = matches.filter((match) => match.homeTeam === team.id);
      return new Leaderboard().leaderboard(team, allMatchesOfHomeTeam);
    }));

    return new Leaderboard().putInOrder(allTeamsOfHome);
  };
}
