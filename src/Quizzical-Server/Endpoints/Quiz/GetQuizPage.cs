using Quizzical_Server.Endpoints.Quiz.Data;
using Quizzical_Server.Endpoints.Quiz.Requests;

namespace Quizzical_Server.Endpoints.Quiz;

public class GetQuizPage : Endpoint<GetQuizPageRequest>
{
    public QuizDatabaseAccess QuizDatabaseAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/quiz/page/{page}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetQuizPageRequest req, CancellationToken ct)
    {
        if (req.Page < 1)
        {
            await SendAsync(null, 400, ct);
            return;
        }

        var quizzes = await QuizDatabaseAccess.GetQuizPage(req.Page);
        if (!quizzes.Any())
        {
            await SendAsync(null, 404, ct);
            return;
        }
        await SendAsync(quizzes, 200, ct);
    }
}