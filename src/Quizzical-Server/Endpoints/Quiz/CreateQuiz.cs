using Quizzical_Server.Database;
using Quizzical_Server.Models;

namespace Quizzical_Server.Endpoints.Quiz;

public class CreateQuiz : Endpoint<CreateQuizRequest>
{
    public DataAccess DataAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Post("/quiz");
        Roles("Admin", "User");
    }

    public override async Task HandleAsync(CreateQuizRequest req, CancellationToken ct)
    {
        if (string.IsNullOrEmpty(req.Title))
        {
            await SendAsync("quiz title is required", 400, ct);
            return;
        }
        if (req.Questions.Count < 3)
        {
            await SendAsync("questions must be at least 3", 400, ct);
            return;
        }
        foreach (var question in req.Questions)
        {
            if (string.IsNullOrEmpty(question.Title))
            {
                await SendAsync("question titles are required", 400, ct);
                return;
            }
            if (question.Answers.Any(answer => string.IsNullOrEmpty(answer.Text)))
            {
                await SendAsync("every answer must have some text", 400, ct);
                return;
            }
            if (!question.Answers.Any(answer => answer.IsCorrect))
            {
                await SendAsync("every question must have at least one correct answer", 400, ct);
                return;
            }
        }
        await DataAccess.CreateQuiz(req);
        await SendOkAsync(req);
    }
}

public class CreateQuizRequest
{
    [FromClaim]
    public int Id { get; set; }
    public required string Title { get; set; }
    public required List<QuestionModel> Questions { get; set; }
}