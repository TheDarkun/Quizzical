using System.Security.Cryptography;
using Quizzical_Server.Database;
using Quizzical_Server.Endpoints.User.Requests;
using Quizzical_Server.Helper;
namespace Quizzical_Server.Endpoints.User;

public class RegisterUser : Endpoint<RegisterUserRequest>
{
    public DataAccess DataAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Post("user/register");
        AllowAnonymous();
    }

    public override async Task HandleAsync(RegisterUserRequest req, CancellationToken ct)
    {
        if (string.IsNullOrEmpty(req.Name))
        {
            await SendAsync("name is required", 400, ct);
            return;
        }
        if (string.IsNullOrEmpty(req.Email))
        {
            await SendAsync("email is required", 400, ct);
            return;
        }
        if (!AccountHelper.IsEmailValid(req.Email))
        {
            await SendAsync("email is not valid", 400, ct);
            return;
        }
        if (string.IsNullOrEmpty(req.Password))
        {
            await SendAsync("password is required", 400, ct);
            return;
        }
        if (!IsPasswordValid(req.Password, out var error))
        {
            await SendAsync(error, 400, ct);
            return;
        }
        if (req.Password != req.RepeatedPassword)
        {
            await SendAsync("passwords do not match", 400, ct);
            return;
        }
        if (await DataAccess.IsNameTakenAsync(req.Name))
        {
            await SendAsync("name is taken", 400, ct);
            return;
        }
        if (await DataAccess.IsEmailTakenAsync(req.Email))
        {
            await SendAsync("email is taken", 400, ct);
            return;
        }
        var salt = GenerateSalt();
        var hashedPassword = AccountHelper.HashPassword(req.Password, salt);
        var saltBase64 = Convert.ToBase64String(salt);
        await DataAccess.CreateUserAsync(req.Name, req.Email, hashedPassword, saltBase64);
        await SendOkAsync(ct);
    }

    private bool IsPasswordValid(string password, out string error)
    {
        if (password.Length < 8)
        {
            error = "password must be at least 8 characters long";
            return false;
        }
        if (password.Length > 32)
        {
            error = "password must be between 8 and 32 characters long";
            return false;
        }
        if (!password.Any(char.IsUpper))
        {
            error = "password must contain at least one uppercase letter";
            return false;
        }
        if (!password.Any(char.IsLower))
        {
            error = "password must contain at least one lowercase letter";
            return false;
        }
        if (!password.Any(char.IsDigit))
        {
            error = "password must contain at least one digit";
            return false;
        }
        char[] allowedSpecialCharacters = { '&', '@', '#', '*', '!', '?' };
        if (!password.Any(ch => allowedSpecialCharacters.Contains(ch)))
        {
            error = "password must contain at least one special character (&, @, #, *, !, ?)";
            return false;
        }

        error = "";
        return true;
    }
    
    private byte[] GenerateSalt()
    {
        using var rng = RandomNumberGenerator.Create();
        var salt = new byte[16];
        rng.GetBytes(salt);
        return salt;
    }
}