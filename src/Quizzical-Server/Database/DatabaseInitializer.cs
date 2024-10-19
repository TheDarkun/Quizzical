using DbUp;

namespace Quizzical_Server.Database;


public class DatabaseInitializer
{
    
    public async Task InitializeAsync()
    {
        var upgrader = DeployChanges.To.SQLiteDatabase("Data Source=db.sqlite")
            .WithScriptsEmbeddedInAssembly(typeof(DatabaseInitializer).Assembly)
            .LogToConsole()
            .Build();
        if (upgrader.IsUpgradeRequired())
            upgrader.PerformUpgrade();
    }
}