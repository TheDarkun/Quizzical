using FastEndpoints;
using Quizzical_Server.Database;

namespace Quizzical_Server.Endpoints.User;

public class UpdateUser : Endpoint<UpdateUserRequest>
{
    public DataAccess DataAccess { get; set; } = null!;

    public override void Configure()
    {
        Patch("/user");
    }

    public override async Task HandleAsync(UpdateUserRequest command, CancellationToken ct)
    {
        await SendOkAsync(ct);
    }
}

public class UpdateUserRequest
{
    public required string Name { get; set; }
}