namespace Quizzical_Server.Endpoints.User.Requests;

public class RefreshUserRequest
{
    public required string RefreshToken { get; set; }
}