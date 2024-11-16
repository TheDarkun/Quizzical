namespace Quizzical_Server.Endpoints.Quiz.Requests;

public class PostQuizResultsRequest
{
    public required int Id { get; set; }
    public required string[][] Response { get; set; }
}