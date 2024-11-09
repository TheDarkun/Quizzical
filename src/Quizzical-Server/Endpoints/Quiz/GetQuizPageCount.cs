using Quizzical_Server.Endpoints.Quiz.Data;
using Quizzical_Server.Endpoints.Quiz.Requests;

namespace Quizzical_Server.Endpoints.Quiz;

public class GetQuizPageCount : EndpointWithoutRequest
{
    public QuizDatabaseAccess QuizDatabaseAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/quiz/page");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var count = await QuizDatabaseAccess.GetQuizPageCount();
        await SendAsync(count, 200, ct);
    }
}