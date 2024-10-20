namespace Quizzical_Server.Models;

public class UserModel
{
    public int Id { get; set; }
    public string? PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }
    public bool IsAdmin { get; set; }
    public string? Name { get; set; }
}