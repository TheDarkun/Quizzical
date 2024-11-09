
using Quizzical_Server.Database;
using Quizzical_Server.Endpoints.Quiz.Data;
using Quizzical_Server.Endpoints.Quiz.Requests;

namespace Quizzical_Server.Endpoints.Quiz;

public class GetQuiz : Endpoint<GetQuizRequest>
{
    public QuizDatabaseAccess QuizDatabaseAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/quiz/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetQuizRequest req, CancellationToken ct)
    {
        if (req.Id == 0)
        {
            await SendAsync(null, 400, ct);
            return;
        }
        var quiz = await QuizDatabaseAccess.GetQuiz(req.Id);
        if (string.IsNullOrEmpty(quiz.Title))
        {
            await SendNotFoundAsync(ct);
            return;
        }

        foreach (var question in quiz.Questions)
        {
            var correctCount = question.Answers.Count(x => x.IsCorrect);
            if (correctCount > 1)
            {
                question.MultipleChoices = true;
            }
        }
        await SendOkAsync(quiz, ct);
    }
}