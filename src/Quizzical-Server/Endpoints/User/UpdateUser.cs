using FastEndpoints;
using Quizzical_Server.Database;

namespace Quizzical_Server.Endpoints.User;

public class UpdateUser : Endpoint<UpdateUserRequest>
{
    public DataAccess DataAccess { get; set; } = null!;

    public override void Configure()
    {
        Patch("/user");
        Roles("User", "Admin");
    }

    public override async Task HandleAsync(UpdateUserRequest req, CancellationToken ct)
    {
        var currentUser = await DataAccess.GetUserFromId(req.Id);
        if (currentUser.Name == req.Name)
        {
            await SendAsync("name already set", 400, ct);
            return;
        }
        if (await DataAccess.IsNameTakenAsync(req.Name))
        {
            await SendAsync("name is already taken", 400, ct);
            return;
        }
        await DataAccess.UpdateProfile(req.Name, req.Id);
        await SendOkAsync(ct);
    }
}

public class UpdateUserRequest
{
    [FromClaim]
    public int Id { get; set; }
    public required string Name { get; set; }
}