namespace Quizzical_Server.Endpoints.Quiz.Requests;

public class PostQuizResultsRequest
{
    [FromClaim]
    public int Id { get; set; }
    public required int QuizId { get; set; }
    public required string[][] Response { get; set; }
}