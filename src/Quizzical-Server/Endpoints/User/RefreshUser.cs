using DotNetEnv.Extensions;
using Quizzical_Server.Endpoints.User.Data;
using Quizzical_Server.Endpoints.User.Requests;
using Quizzical_Server.Endpoints.User.Responses;
using Quizzical_Server.Helper;

namespace Quizzical_Server.Endpoints.User;

public class RefreshUser : Endpoint<RefreshUserRequest>
{
    public UserDatabaseAccess UserDatabaseAccess { get; set; } = null!;

    public override void Configure()
    {
        Post("user/refresh");
        AllowAnonymous();
    }

    public override async Task HandleAsync(RefreshUserRequest req, CancellationToken ct)
    {
        var tokenId = req.RefreshToken.Split("-")[0];
        if (!int.TryParse(tokenId, out _))
        {
            await SendAsync("Invalid refresh token", 400, ct);
            return;
        }
        var id = int.Parse(tokenId);
        
        var timestamp = await UserDatabaseAccess.GetRefreshExpireAtTimestamp(req.RefreshToken);
        
        if (DateTime.Now > timestamp)
        {
            await SendAsync("Expired refresh token", 401, ct);
            await UserDatabaseAccess.DeleteRefreshToken(req.RefreshToken);
            return;
        }
        
        var secretKey = DotNetEnv.Env.Load(@"C:\Users\darkun\Documents\Github\Quizzical\.env").ToDotEnvDictionary()["JWT_SECRET_KEY"];
        var user = await UserDatabaseAccess.GetUserFromId(id);
        if (user is null)
        {
            await SendAsync("User not found", 404, ct);
            return;
        }
        
        var jwtToken = AccountHelper.GenerateJwtToken(id, user.IsAdmin, secretKey);
        var newRefreshToken = AccountHelper.GenerateRefreshToken(id);
        
        await UserDatabaseAccess.UpdateRefreshToken(req.RefreshToken, newRefreshToken);
        await SendAsync(new RefreshUserResponse { JwtToken = jwtToken, RefreshToken = newRefreshToken }, 200, ct);
    }
}