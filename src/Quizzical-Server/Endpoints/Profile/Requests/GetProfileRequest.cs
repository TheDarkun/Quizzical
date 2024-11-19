namespace Quizzical_Server.Endpoints.Profile.Requests;

public class GetProfileRequest
{
    [FromClaim]
    public int Id { get; set; }
}