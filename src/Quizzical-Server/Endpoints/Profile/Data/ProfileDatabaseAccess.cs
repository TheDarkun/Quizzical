using Quizzical_Server.Endpoints.Profile.Responses;

namespace Quizzical_Server.Endpoints.Profile.Data;

public class ProfileDatabaseAccess(SqliteConnection connection)
{
    public async Task<GetProfileResponse> GetProfile(int id)
    {
        await connection.OpenAsync();
        var profile = await connection.QueryFirstAsync<GetProfileResponse>
        ("""
         SELECT
         (SELECT COUNT(*)
          FROM completed_quizzes
          WHERE user_id = @id) AS completed_quizzes,
         (SELECT COUNT(*)
          FROM quiz
          WHERE author_id = @id) AS created_quizzes;
         """, new { id });
        await connection.CloseAsync();
        return profile;
    }
}