namespace Quizzical_Server.Endpoints.Quiz.Requests;

public class CreateQuizRequest
{
    [FromClaim]
    public int Id { get; set; }
    public required string Title { get; set; }
    public required List<QuestionModel> Questions { get; set; }
}