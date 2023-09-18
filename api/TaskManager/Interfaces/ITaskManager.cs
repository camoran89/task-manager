using TaskManager.Models;

namespace TaskManager.Interfaces
{
    public interface ITaskManager
    {
        List<TaskManagerModel> FindAll();
        TaskManagerModel FindById(string templateId);
        TaskManagerModel Create(TaskManagerModel template);
        void Update(string templateId, TaskManagerModel template);
        void Delete(string templateId);
    }
}
