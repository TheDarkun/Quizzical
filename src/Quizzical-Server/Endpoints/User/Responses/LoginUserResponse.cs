﻿namespace Quizzical_Server.Endpoints.User.Responses;

public class LoginUserResponse
{
    public required string JwtToken { get; set; }
    public required string RefreshToken { get; set; }
}