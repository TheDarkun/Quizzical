namespace Quizzical_Server.Endpoints.Leaderboard.Responses;


public class GetLeaderboardResponseRow
{
    public string Name { get; set; }
    public int CompletedQuizzes { get; set; }
    public int CreatedQuizzes { get; set; }
}