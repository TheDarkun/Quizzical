namespace Quizzical_Server.Endpoints.Leaderboard.Responses;

public class GetLeaderboardResponse
{
    public List<GetLeaderboardResponseRow> Rows { get; set; } = [];
}

public class GetLeaderboardResponseRow
{
    public string Name { get; set; }
    public int CompletedQuizzes { get; set; }
    public int CreatedQuizzes { get; set; }
}