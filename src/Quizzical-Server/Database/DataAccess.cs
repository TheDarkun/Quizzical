using Dapper;
using Microsoft.Data.Sqlite;
using Quizzical_Server.Endpoints.Quiz;
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

    public async Task<UserModel?> GetUserFromEmail(string email)
    {
        await connection.OpenAsync();
        var result = await connection.QuerySingleOrDefaultAsync<UserModel>(
            "SELECT id, password_hash, password_salt, is_admin FROM user WHERE email = @email", new { email });
        await connection.CloseAsync();
        return result;
    }

    public async Task<UserModel> GetUserFromId(int id)
    {
        await connection.OpenAsync();
        var user = await connection.QuerySingleOrDefaultAsync<UserModel>
        ("""
            SELECT user.id AS id, password_hash, password_salt, name FROM user 
                JOIN profile ON profile.user_id = user.id 
                WHERE user.id = @id
         """, new { id });
        await connection.CloseAsync();
        return user!;
    }

    public async Task UpdateProfile(string name, int id)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync("UPDATE profile SET name = @name WHERE user_id = @id", new { name, id }); 
        await connection.CloseAsync();
    }

    public async Task CreateQuiz(CreateQuizRequest quiz)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync("INSERT INTO quiz (author_id, title) VALUES (@authorId, @title)",
            new { authorId = quiz.Id, title = quiz.Title });
        var quizId = await connection.ExecuteScalarAsync<int>("SELECT last_insert_rowid()");
        foreach (var question in quiz.Questions)
        {
            await connection.ExecuteAsync("INSERT INTO question (quiz_id, title) VALUES (@quizId, @title)", 
                new { quizId, title = question.Title });
            var questionId = await connection.ExecuteScalarAsync<int>("SELECT last_insert_rowid()");
            foreach (var answer in question.Answers)
            {
                await connection.ExecuteAsync(
                    "INSERT INTO answer (question_id, text, is_correct) VALUES (@questionId, @text, @isCorrect)",
                    new { questionId, text = answer.Text, isCorrect = answer.IsCorrect });
            }
        }
        await connection.CloseAsync();
    }

    public async Task<GetQuizResponse?> GetQuiz(int id)
    {
        await connection.OpenAsync();
        var quiz = await connection.ExecuteScalarAsync<GetQuizResponse>
        ("""
         SELECT author_id, quiz.title AS title, question.title, answer.text FROM quiz
            INNER JOIN question ON question.quiz_id = quiz.id
            INNER JOIN answer ON answer.question_id = question.id
            WHERE quiz.id = 1
         """, new { id });
        await connection.CloseAsync();
        return quiz;
    }
}