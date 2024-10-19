using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

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
    
    public static string GenerateJwtToken(string email, string secretKey)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, email),
                // Add other claims as needed
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}