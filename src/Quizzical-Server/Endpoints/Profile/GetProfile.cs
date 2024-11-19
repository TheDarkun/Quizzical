using Quizzical_Server.Endpoints.Profile.Data;
using Quizzical_Server.Endpoints.Profile.Requests;

namespace Quizzical_Server.Endpoints.Profile;

public class GetProfile  : Endpoint<GetProfileRequest>
{
    public ProfileDatabaseAccess ProfileDatabaseAccess { get; set; } = null!;
    
    public override void Configure()
    {
        Get("/profile");
        Roles("Admin", "User");
    }

    public override async Task HandleAsync(GetProfileRequest req, CancellationToken ct)
    {
        var profile = await ProfileDatabaseAccess.GetProfile(req.Id);
        await SendAsync(profile, 200, ct);
    }
}