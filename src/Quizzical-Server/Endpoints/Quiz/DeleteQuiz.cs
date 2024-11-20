using Quizzical_Server.Endpoints.Quiz.Data;
using Quizzical_Server.Endpoints.Quiz.Requests;

namespace Quizzical_Server.Endpoints.Quiz;

public class DeleteQuiz : Endpoint<DeleteQuizRequest>
{
    public QuizDatabaseAccess QuizDatabaseAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Delete("/quiz/{id}");
        Roles("Admin");
    }

    public override async Task HandleAsync(DeleteQuizRequest req, CancellationToken ct)
    {
        await QuizDatabaseAccess.DeleteQuiz(req.Id);
        await SendAsync(200, 200, ct);
    }
}