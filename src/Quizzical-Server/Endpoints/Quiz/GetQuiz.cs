
using Quizzical_Server.Database;

namespace Quizzical_Server.Endpoints.Quiz;

public class GetQuiz : Endpoint<GetQuizRequest, GetQuizResponse>
{
    public DataAccess DataAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/quiz");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetQuizRequest req, CancellationToken ct)
    {
        var quiz = DataAccess.GetQuiz(req.Id);
        if (quiz is null)
        {
            await SendNotFoundAsync(ct);
            return;
        }
        await SendOkAsync(quiz, ct);
    }
}

public class GetQuizRequest
{
    [FromQueryParams]
    public int Id { get; set; }
}

public class GetQuizResponse
{
    public int AuthorId { get; set; }
    public required string Title { get; set; }
    public required List<QuestionModel> Questions { get; set; }
}