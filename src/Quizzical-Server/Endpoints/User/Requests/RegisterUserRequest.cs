namespace Quizzical_Server.Endpoints.User.Requests;

public class RegisterUserRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string RepeatedPassword { get; set; }
    public required string Name { get; set; }
}