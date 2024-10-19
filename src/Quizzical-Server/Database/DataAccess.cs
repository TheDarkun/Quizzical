using Dapper;
using Microsoft.Data.Sqlite;
using Quizzical_Server.Models;

namespace Quizzical_Server.Database;

public class DataAccess(SqliteConnection connection)
{
    public async Task<bool> IsNameTakenAsync(string name)
    {
        await connection.OpenAsync();
        var taken = await connection.ExecuteScalarAsync<bool>
        (
            """
            SELECT CASE
                    WHEN COUNT(*) > 0 THEN 1
                    ELSE 0
                END AS name_taken
            FROM profile
            WHERE name = @name
            """, new { name }
        );
        await connection.CloseAsync();
        return taken;
    }

    public async Task<bool> IsEmailTakenAsync(string email)
    {
        await connection.OpenAsync();
        var taken = await connection.ExecuteScalarAsync<bool>
        (
            """
            SELECT CASE
                    WHEN COUNT(*) > 0 THEN 1
                    ELSE 0
                END AS name_taken
            FROM user
            WHERE email = @email
            """, new { email }
        );
        await connection.CloseAsync();
        return taken;
    }

    public async Task CreateUserAsync(string name, string email, string hashedPassword, string saltBase64)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync
        (
            """
            INSERT INTO user (email, password_hash, password_salt)
            VALUES (@email, @hashedPassword, @saltBase64)
            """, new { email, hashedPassword, saltBase64 }
        );
        var id = await connection.ExecuteScalarAsync<int>("SELECT id FROM user WHERE email = @email", new { email });
        await connection.ExecuteAsync
        ("""
            INSERT INTO profile (user_id, name)
            VALUES (@id, @name)
         """, new { id, name });
        await connection.CloseAsync();
    }

    public async Task<UserModel?> GetPasswordHashAndSaltFromEmail(string email)
    {
        await connection.OpenAsync();
        var result = await connection.QuerySingleOrDefaultAsync<UserModel>(
            "SELECT password_hash, password_salt FROM user WHERE email = @email", new { email });
        await connection.CloseAsync();
        return result;
    }
}