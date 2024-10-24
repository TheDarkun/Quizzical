namespace Quizzical_Server.Endpoints.User.Requests;

public class UpdateUserRequest
{
    [FromClaim]
    public int Id { get; set; }
    public required string Name { get; set; }
}