using DotNetEnv.Extensions;
using FastEndpoints.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Quizzical_Server.Database;
using Quizzical_Server.Endpoints.Leaderboard.Data;
using Quizzical_Server.Endpoints.Profile.Data;
using Quizzical_Server.Endpoints.Quiz.Data;
using Quizzical_Server.Endpoints.User.Data;
using Scalar.AspNetCore;

// TODO: Use args instead of this
var dict = DotNetEnv.Env.Load(@"C:\Users\darkun\Documents\Github\Quizzical\.env").ToDotEnvDictionary();
var url = $"{dict["SERVER_PROTOCOL"]}://{dict["SERVER_HOST"]}:{dict["SERVER_PORT"]}";
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls(url);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => { policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
});
builder.Services.AddAuthenticationJwtBearer(s => s.SigningKey = dict["JWT_SECRET_KEY"]);
builder.Services.AddAuthentication(o =>
{
    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
});
builder.Services.AddAuthorization();
builder.Services.AddFastEndpoints();
builder.Services.AddLogging();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped(x => new SqliteConnection("Data Source=db.sqlite"));
builder.Services.AddSingleton<DatabaseInitializer>();
builder.Services.AddScoped<QuizDatabaseAccess>();
builder.Services.AddScoped<UserDatabaseAccess>();
builder.Services.AddScoped<ProfileDatabaseAccess>();
builder.Services.AddScoped<LeaderboardDataAccess>();
var app = builder.Build();

var logger = app.Services.GetRequiredService<ILogger<Program>>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options =>
    {
        options.RouteTemplate = "openapi/{documentName}.json";
    });
    app.MapScalarApiReference();
    logger.Log(LogLevel.Information ,$"You can access scalar at: {url}/scalar/v1");
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseFastEndpoints();

var databaseInitializer = app.Services.GetRequiredService<DatabaseInitializer>();
await databaseInitializer.InitializeAsync();
Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
app.Run();