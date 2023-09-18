using TaskManager.Interfaces;
using TaskManager.Models;
using MongoDB.Driver;

namespace TaskManager.Services
{
    public class TaskManagerService : ITaskManager
    {
        private readonly IMongoCollection<TaskManagerModel> _collection;

        public TaskManagerService(IConnectionStrings connection,
            IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(connection.Database);
            _collection = database.GetCollection<TaskManagerModel>(connection.Collection);
        }

        List<TaskManagerModel> ITaskManager.FindAll()
        {
            return _collection.Find(x => true).ToList();
        }

        TaskManagerModel ITaskManager.FindById(string id)
        {
            return _collection.Find(x => x.Id == id).FirstOrDefault();
        }

        TaskManagerModel ITaskManager.Create(TaskManagerModel task)
        {
            _collection.InsertOne(task);
            return task;
        }

        void ITaskManager.Update(string id, TaskManagerModel task)
        {
            _collection.ReplaceOne(x => x.Id == id, task);
        }

        void ITaskManager.Delete(string id)
        {
            _collection.DeleteOne(x => x.Id == id);
        }
    }
}
