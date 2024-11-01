using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using FastEndpoints.Security;

namespace Quizzical_Server.Helper;

public static class AccountHelper
{
    public static bool IsEmailValid(string email)
    {
        try
        {
            _ = new MailAddress(email);
            return true;
        }
        catch (FormatException)
        {
            return false;
        }
    }

    public static string HashPassword(string password, byte[] salt)
    {
        using var sha = SHA512.Create();
        var combinedBytes = new byte[salt.Length + Encoding.UTF8.GetBytes(password).Length];
        Buffer.BlockCopy(salt, 0, combinedBytes, 0, salt.Length);
        Buffer.BlockCopy(Encoding.UTF8.GetBytes(password), 0, combinedBytes, salt.Length, Encoding.UTF8.GetBytes(password).Length);
        var hash = sha.ComputeHash(combinedBytes);
        var hashedPassword = Convert.ToBase64String(hash);
        return hashedPassword;
    }
    
    public static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
    {
        var saltBytes = Convert.FromBase64String(storedSalt);
        var enteredPasswordHash = HashPassword(enteredPassword, saltBytes);
        return enteredPasswordHash == storedHash;
    }
    
    public static string GenerateJwtToken(int id, bool isAdmin, string secretKey)
    {
        var jwtToken = JwtBearer.CreateToken(
            o =>
            {
                o.SigningKey = secretKey;
                o.ExpireAt = DateTime.UtcNow.AddHours(1);
                o.User.Roles.Add(isAdmin ? "Admin" : "User");
                o.User.Claims.Add(("Id", id.ToString()));
            });
        return jwtToken;
    }
}