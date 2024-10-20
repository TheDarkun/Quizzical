using DotNetEnv.Extensions;
using FastEndpoints;
using Quizzical_Server.Database;
using Quizzical_Server.Helper;

namespace Quizzical_Server.Endpoints.User;

public class LoginUser : Endpoint<LoginUserRequest>
{
    public DataAccess DataAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Post("user/login");
        AllowAnonymous();
    }

    public override async Task HandleAsync(LoginUserRequest req, CancellationToken ct)
    {
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
        var user = await DataAccess.GetUserFromEmail(req.Email);
        if (user?.PasswordHash is null || user?.PasswordSalt is null)
        {
            await SendAsync("user does not exist", 400, ct);
            return;
        }
        if (!AccountHelper.VerifyPassword(req.Password, user.PasswordHash, user.PasswordSalt))
        {
            await SendAsync("invalid password", 401, ct);
            return;
        }

        // TODO: store path somewhere
        var secretKey = DotNetEnv.Env.Load(@"C:\Users\vasek\Documents\Github\Quizzical\.env").ToDotEnvDictionary()["JWT_SECRET_KEY"];
        var jwtToken = AccountHelper.GenerateJwtToken(user.Id, user.IsAdmin, secretKey);
        await SendAsync(new { token = jwtToken }, 200, ct);
    }
}

public class LoginUserRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}