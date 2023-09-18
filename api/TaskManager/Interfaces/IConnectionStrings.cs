namespace TaskManager.Interfaces
{
    public interface IConnectionStrings
    {
        string Collection { get; set; }
        string Database { get; set; }
        string Server { get; set; }
    }
}
