using Quizzical_Server.Endpoints.User.Data;
using Quizzical_Server.Endpoints.User.Requests;

namespace Quizzical_Server.Endpoints.User;

public class UpdateUser : Endpoint<UpdateUserRequest>
{
    public UserDatabaseAccess UserDatabaseAccess { get; set; } = null!;

    public override void Configure()
    {
        Patch("/user");
        Roles("User", "Admin");
    }

    public override async Task HandleAsync(UpdateUserRequest req, CancellationToken ct)
    {
        var currentUser = await UserDatabaseAccess.GetUserFromId(req.Id);
        if (currentUser.Name == req.Name)
        {
            await SendAsync("name already set", 400, ct);
            return;
        }
        if (await UserDatabaseAccess.IsNameTakenAsync(req.Name))
        {
            await SendAsync("name is already taken", 400, ct);
            return;
        }
        await UserDatabaseAccess.UpdateProfile(req.Name, req.Id);
        await SendOkAsync(ct);
    }
}

