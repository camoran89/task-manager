using TaskManager.Interfaces;

namespace TaskManager.Models
{
    public class ConnectionStrings : IConnectionStrings
    {
        public string Collection { get; set; } = String.Empty;
        public string Database { get; set; } = String.Empty;
        public string Server { get; set; } = String.Empty;
    }
}
