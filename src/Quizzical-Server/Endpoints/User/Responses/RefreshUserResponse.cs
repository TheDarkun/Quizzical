namespace Quizzical_Server.Endpoints.User.Responses;

public class RefreshUserResponse
{
    public required string JwtToken { get; set; }
    public required string RefreshToken { get; set; }
}