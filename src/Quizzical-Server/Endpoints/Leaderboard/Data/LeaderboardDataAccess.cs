using Quizzical_Server.Endpoints.Leaderboard.Responses;

namespace Quizzical_Server.Endpoints.Leaderboard.Data;

public class LeaderboardDataAccess(SqliteConnection connection)
{
    public async Task<GetLeaderboardResponse> GetLeaderboardPage(int page)
    {
        await connection.OpenAsync();
        var leaderboard = await connection.QueryAsync<GetLeaderboardResponseRow>("");
        await connection.CloseAsync();
        return new GetLeaderboardResponse { Rows = leaderboard.ToList() };
    }
}