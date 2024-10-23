
using Quizzical_Server.Database;

namespace Quizzical_Server.Endpoints.Quiz;

public class GetQuiz : EndpointWithoutRequest
{
    public DataAccess DataAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/quiz");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        int id = Query<int>("id");
        Console.WriteLine("yo");
        // if (req.Id is null)
        // {
        //     await SendAsync("no id", 400, ct);
        //     return;
        // }
        var quiz = await DataAccess.GetQuiz(id);
        if (quiz is null)
        {
            await SendNotFoundAsync(ct);
            return;
        }
        await SendOkAsync(quiz, ct);
    }
}