namespace Quizzical_Server.Endpoints.Quiz.Responses;

public class PostQuizResultsResponse
{
    public List<List<string>> Results { get; set; } = new();
}