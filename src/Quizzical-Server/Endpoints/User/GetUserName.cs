using Quizzical_Server.Endpoints.User.Data;
using Quizzical_Server.Endpoints.User.Requests;

namespace Quizzical_Server.Endpoints.User;

public class GetUserName : Endpoint<GetUserNameRequest>
{
    public UserDatabaseAccess UserDatabaseAccess { get; set; } = null!;

    public override void Configure()
    {
        Get("user/name");
        Roles("User", "Admin");
    }

    public override async Task HandleAsync(GetUserNameRequest req, CancellationToken ct)
    {
        var user = await UserDatabaseAccess.GetUserFromId(req.Id);
        if (user is null)
        {
            await SendAsync(null, 404, ct);
            return;
        }
        await SendAsync(user.Name, 200, ct);
    }
}