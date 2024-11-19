namespace Quizzical_Server.Endpoints.Profile.Responses;

public class GetProfileResponse
{
    public string Name { get; set; }
    public int CompletedQuizzes { get; set; }
    public int CreatedQuizzes { get; set; }
}