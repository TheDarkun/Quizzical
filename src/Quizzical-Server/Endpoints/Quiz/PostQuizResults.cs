using Quizzical_Server.Endpoints.Quiz.Data;
using Quizzical_Server.Endpoints.Quiz.Requests;
using Quizzical_Server.Endpoints.Quiz.Responses;

namespace Quizzical_Server.Endpoints.Quiz;

public class PostQuizResults : Endpoint<PostQuizResultsRequest>
{
    public QuizDatabaseAccess QuizDatabaseAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Post("quiz/results");
    }

    public override async Task HandleAsync(PostQuizResultsRequest req, CancellationToken ct)
    {
        var quiz = await QuizDatabaseAccess.GetQuiz(req.Id);
        if (string.IsNullOrEmpty(quiz.Title))
        {
            await SendAsync(null, 400, ct);
            return;
        }

        if (quiz.Questions.Count != req.Response.Length)
        {
            await SendAsync(null, 400, ct);
            return;
        }

        var result = new List<List<string>>();

        for (int i = 0; i < quiz.Questions.Count; i++)
        {
            var correctAnswers = quiz.Questions[i].Answers
                .Where(a => a.IsCorrect)
                .Select(a => a.Text)
                .ToList();

            var userAnswers = req.Response[i];
            var isCorrect = correctAnswers.All(userAnswers.Contains) && userAnswers.All(correctAnswers.Contains);

            if (isCorrect)
            {
                result.Add(new List<string>()); // Empty array for correct answer
            }
            else
            {
                result.Add(correctAnswers); // List of correct answers for incorrect response
            }
        }

        var response = new PostQuizResultsResponse
        {
            Results = result
        };

        await SendAsync(response, 200, ct);
    }

}