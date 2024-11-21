using DotNetEnv.Extensions;
using Quizzical_Server.Endpoints.User.Data;
using Quizzical_Server.Endpoints.User.Requests;
using Quizzical_Server.Endpoints.User.Responses;
using Quizzical_Server.Helper;

namespace Quizzical_Server.Endpoints.User;

public class LoginUser : Endpoint<LoginUserRequest>
{
    public UserDatabaseAccess UserDatabaseAccess { get; set; } = null!;
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
        var user = await UserDatabaseAccess.GetUserFromEmail(req.Email);
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
        var secretKey = DotNetEnv.Env.Load(@"C:\Users\darkun\Documents\Github\Quizzical\.env").ToDotEnvDictionary()["JWT_SECRET_KEY"];
        var jwtToken = AccountHelper.GenerateJwtToken(user.Id, user.IsAdmin, secretKey);

        var refreshToken = AccountHelper.GenerateRefreshToken(user.Id);
        await UserDatabaseAccess.SaveRefreshToken(user.Id, refreshToken);
        
        await SendAsync(new LoginUserResponse { JwtToken = jwtToken, RefreshToken = refreshToken }, 200, ct);
    }
}