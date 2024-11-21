using Quizzical_Server.Endpoints.Quiz.Requests;
using Quizzical_Server.Endpoints.Quiz.Responses;

namespace Quizzical_Server.Endpoints.Quiz.Data;

public class QuizDatabaseAccess(SqliteConnection connection)
{
    public async Task CreateQuiz(CreateQuizRequest quiz)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync("INSERT INTO quiz (author_id, title) VALUES (@authorId, @title)",
            new { authorId = quiz.Id, title = quiz.Title });
        var quizId = await connection.ExecuteScalarAsync<int>("SELECT last_insert_rowid()");
        foreach (var question in quiz.Questions)
        {
            await connection.ExecuteAsync("INSERT INTO question (quiz_id, prompt) VALUES (@quizId, @prompt)",
                new { quizId, prompt = question.Prompt });
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

    public async Task<GetQuizResponse> GetQuiz(int id)
    {
        await connection.OpenAsync();

        GetQuizResponse response = new();
        await connection.QueryAsync<GetQuizResponse, GetQuizResponseQuestions, GetQuizResponseAnswers, GetQuizResponse>
        (
            """
            SELECT quiz.id AS quiz_id, profile.name AS author, quiz.title, question.id AS question_id, question.prompt, answer.id AS answer_id, answer.text AS text, answer.is_correct AS is_correct FROM quiz
                INNER JOIN user ON user.id = quiz.author_id
                INNER JOIN profile ON profile.user_id = user.id
                INNER JOIN question ON question.quiz_id = quiz.id
                INNER JOIN answer ON answer.question_id = question.id
                WHERE quiz.id = @id
            """, (quiz, question, answer) =>
            {
                if (string.IsNullOrEmpty(response.Title))
                {
                    response.Title = quiz.Title;
                    response.Author = quiz.Author;
                    response.QuizId = quiz.QuizId;
                    response.Questions = new();
                }

                if (!response.Questions.Any(x => x.QuestionId == question.QuestionId))
                {
                    response.Questions.Add(
                        new GetQuizResponseQuestions()
                        {
                            QuestionId = question.QuestionId,
                            Prompt = question.Prompt,
                            Answers = new()
                        });
                }

                response.Questions.Find(x => x.QuestionId == question.QuestionId)?.Answers.Add(answer);
                return quiz;
            }, new { id },
            splitOn: "question_id,answer_id"
        );

        await connection.CloseAsync();

        return response;
    }

    public async Task<IEnumerable<GetQuizPageResponse>> GetQuizPage(int page)
    {
        await connection.OpenAsync();
        var quizzes = await connection.QueryAsync<GetQuizPageResponse>(
            "SELECT quiz.id, quiz.title, profile.name AS author FROM quiz JOIN profile ON quiz.author_id = profile.user_id LIMIT 8 OFFSET @page",
            new { page = (page - 1) * 8 });
        await connection.CloseAsync();
        return quizzes;
    }

    public async Task<int> GetQuizPageCount()
    {
        await connection.OpenAsync();
        var count = await connection.ExecuteScalarAsync<int>("SELECT (COUNT(*) + 7) / 8 FROM quiz;");
        await connection.CloseAsync();
        return count;
    }

    public async Task DeleteQuiz(int id)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync("PRAGMA foreign_keys = ON; DELETE FROM quiz WHERE id = @id;", new { id });
        await connection.CloseAsync();
    }

    public async Task AddCompletedQuiz(int id, int quizId)
    {
        await connection.OpenAsync();
        await connection.ExecuteAsync("""
                                      INSERT INTO completed_quizzes (user_id, quiz_id)
                                      SELECT @id, @quizId
                                      WHERE NOT EXISTS (
                                          SELECT 1
                                          FROM completed_quizzes
                                          WHERE user_id = @id AND quiz_id = @quizId
                                      );
                                      """, new { id, quizId });
        await connection.CloseAsync();
    }
}