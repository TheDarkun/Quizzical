namespace Quizzical_Server.Endpoints.User.Data;

public class UserDatabaseAccess(SqliteConnection connection)
{
    public async Task SaveRefreshToken(int id, string refreshToken)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync(
            "INSERT INTO refresh_token (user_id, refresh_token, expires_at) VALUES (@id, @refreshToken, datetime('now', '+14 days'));",
            new { refreshToken, id });
        await connection.CloseAsync();
    }

    public async Task UpdateRefreshToken(string refreshToken, string newRefreshToken)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync(
            "UPDATE refresh_token SET refresh_token = @newRefreshToken, expires_at = datetime('now', '+14 days') WHERE refresh_token = @refreshToken",
                new { newRefreshToken, refreshToken });
        await connection.CloseAsync();
    }
    
    public async Task<DateTime> GetRefreshExpireAtTimestamp(string refreshToken)
    {
        await connection.OpenAsync();

        var result = await connection.QuerySingleOrDefaultAsync<DateTime>(
            "SELECT expires_at FROM refresh_token WHERE refresh_token = @refreshToken",
            new { refreshToken });

        await connection.CloseAsync();
            
        return result;
    }

    public async Task DeleteRefreshToken(string refreshToken)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync("DELETE FROM refresh_token WHERE refresh_token = @refreshToken",
            new { refreshToken });
        await connection.CloseAsync();
    }
    
    public async Task<UserModel?> GetUserFromId(int id)
    {
        await connection.OpenAsync();
        var user = await connection.QuerySingleOrDefaultAsync<UserModel>
        ("""
            SELECT user.id AS id, password_hash, password_salt, name FROM user 
                JOIN profile ON profile.user_id = user.id 
                WHERE user.id = @id
         """, new { id });
        await connection.CloseAsync();
        return user;
    }
    
    public async Task UpdateProfile(string name, int id)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync("UPDATE profile SET name = @name WHERE user_id = @id", new { name, id });
        await connection.CloseAsync();
    }
    
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
    
    public async Task<UserModel?> GetUserFromEmail(string email)
    {
        await connection.OpenAsync();
        var result = await connection.QuerySingleOrDefaultAsync<UserModel>(
            "SELECT id, password_hash, password_salt, is_admin FROM user WHERE email = @email", new { email });
        await connection.CloseAsync();
        return result;
    }
}