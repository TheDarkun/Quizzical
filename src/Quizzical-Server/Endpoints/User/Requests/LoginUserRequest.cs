namespace Quizzical_Server.Endpoints.User.Requests;

public class LoginUserRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}