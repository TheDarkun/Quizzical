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
    
    public async Task<GetQuizResponse> GetQuiz(int id)
    {
        await connection.OpenAsync();

        GetQuizResponse response = new();
        await connection.QueryAsync<GetQuizResponse, GetQuizResponseQuestions, GetQuizResponseAnswers, GetQuizResponse>
        (
            """
            SELECT quiz.id AS quiz_id, profile.name AS author, quiz.title, question.id AS question_id, question.prompt, answer.id AS answer_id, answer.text AS text FROM quiz
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
}