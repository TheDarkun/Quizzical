using Quizzical_Server.Endpoints.Leaderboard.Responses;

namespace Quizzical_Server.Endpoints.Leaderboard.Data;

public class LeaderboardDataAccess(SqliteConnection connection)
{
    public async Task<IEnumerable<GetLeaderboardResponseRow>> GetLeaderboardPage()
    {
        await connection.OpenAsync();
        var leaderboard = await connection.QueryAsync<GetLeaderboardResponseRow>("""
            SELECT profile.name,
                   coalesce(created_quizzes.count, 0)   AS created_quizzes,
                   COALESCE(completed_quizzes.count, 0) AS completed_quizzes
            FROM profile
                     LEFT JOIN (SELECT quiz.author_id AS profile_id,
                                       COUNT(*)       AS count
                                FROM quiz
                                GROUP BY quiz.author_id) created_quizzes ON profile.id = created_quizzes.profile_id
                     LEFT JOIN (SELECT completed_quizzes.user_id AS profile_id,
                                       COUNT(*)                  AS count
                                FROM completed_quizzes
                                GROUP BY completed_quizzes.user_id) completed_quizzes ON profile.id = completed_quizzes.profile_id;
            """);
        await connection.CloseAsync();
        return leaderboard;
    }
}