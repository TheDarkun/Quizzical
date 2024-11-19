namespace Quizzical_Server.Endpoints.User.Requests;

public class GetUserNameRequest
{
    [FromClaim]
    public int Id { get; set; }
}