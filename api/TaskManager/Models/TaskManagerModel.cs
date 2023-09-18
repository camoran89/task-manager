using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TaskManager.Models
{
    public class TaskManagerModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String id { get; set; } = String.Empty;

        [BsonElement("userName")]
        public string userName { get; set; } = String.Empty;

        [BsonElement("title")]
        public string title { get; set; } = String.Empty;

        [BsonElement("description")]
        public string description { get; set; } = String.Empty;

        [BsonElement("category")]
        public string category { get; set; } = String.Empty;

        [BsonElement("completed")]
        public bool completed { get; set; } = false;

        [BsonElement("finishDate")]
        public DateTime finishDate { get; set; } = DateTime.Now;

        [BsonElement("createdAt")]
        public DateTime createdAt { get; set; } = DateTime.Now;
    }
}
