namespace Quizzical_Server.Models;

public class UserModel
{
    public string? PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }
}