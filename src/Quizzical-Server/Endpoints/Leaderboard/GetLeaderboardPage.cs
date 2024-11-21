using Quizzical_Server.Endpoints.Leaderboard.Data;
using Quizzical_Server.Endpoints.Leaderboard.Requests;

namespace Quizzical_Server.Endpoints.Leaderboard;

public class GetLeaderboardPage : Endpoint<GetLeaderboardPageRequest>
{
    public LeaderboardDataAccess LeaderboardDataAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/leaderboard/{page}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetLeaderboardPageRequest req, CancellationToken ct)
    {
        var leaderboardPage = await LeaderboardDataAccess.GetLeaderboardPage(req.Page);
    }
}