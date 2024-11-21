using Quizzical_Server.Endpoints.Leaderboard.Data;

namespace Quizzical_Server.Endpoints.Leaderboard;

public class GetLeaderboardPage : EndpointWithoutRequest
{
    public LeaderboardDataAccess LeaderboardDataAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/leaderboard");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var leaderboardPage = await LeaderboardDataAccess.GetLeaderboardPage();
        await SendAsync(leaderboardPage, 200, ct);
    }
}