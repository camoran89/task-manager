using Microsoft.AspNetCore.Mvc;
using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskManagerController : ControllerBase
    {
        private readonly ITaskManager _taskManager;
        public TaskManagerController(ITaskManager taskManager)
        {
            _taskManager = taskManager;
        }

        [HttpGet]
        public ActionResult<List<TaskManagerModel>> FindAll()
        {
            var values = _taskManager.FindAll();
            return values is null ? NotFound() : values;
        }

        [HttpGet("{id}")]
        public ActionResult<TaskManagerModel> FindById(string id)
        {
            var value = _taskManager.FindById(id);
            return value is null ? NotFound() : value;
        }

        [HttpPost]
        public ActionResult<TaskManagerModel> Create([FromBody] TaskManagerModel task)
        {
            _taskManager.Create(task);

            return CreatedAtAction(nameof(FindById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public ActionResult Update(string id, [FromBody] TaskManagerModel task)
        {
            var found = _taskManager.FindById(id);

            if (found is null)
            {
                return NotFound();
            }

            _taskManager.Update(id, task);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var found = _taskManager.FindById(id);

            if (found is null)
            {
                return NotFound();
            }

            _taskManager.Delete(id);

            return NoContent();
        }
    }
}
