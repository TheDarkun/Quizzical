using DotNetEnv.Extensions;
using Microsoft.Data.Sqlite;
using Quizzical_Server.Database;
using Scalar.AspNetCore;


var dict = DotNetEnv.Env.Load(@"C:\Users\vasek\Documents\Github\Quizzical\.env").ToDotEnvDictionary();
var url = $"{dict["SERVER_PROTOCOL"]}://{dict["SERVER_HOST"]}:{dict["SERVER_PORT"]}";
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls(url);

builder.Services.AddLogging();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped(x => new SqliteConnection("Data Source=db.sqlite"));
builder.Services.AddSingleton<DatabaseInitializer>();

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

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
    {
        var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                (
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)]
                ))
            .ToArray();
        return forecast;
    })
    .WithName("GetWeatherForecast")
    .WithOpenApi();

var databaseInitializer = app.Services.GetRequiredService<DatabaseInitializer>();
await databaseInitializer.InitializeAsync();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}