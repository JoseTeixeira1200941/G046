﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Services.IServices;
using Xunit.Sdk;

namespace RobDroneAndGOAuth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("Vigilance")]
        public async Task<TaskVigilanceDto> taskVigilance(TaskVigilanceDto dto)
        {
            return await _taskService.CreateVigilanceTask(dto);
        }

        [HttpPost("PickDelivery")]
        public async Task<TaskPickDeliveryDto> taskPickDelivery(TaskPickDeliveryDto dto)
        {
            return await _taskService.TaskCreatePickDeliveryTask(dto);
        }
        [HttpPatch("PickDelivery/Approve/{taskId}")]
        public async Task<IActionResult> ApprovePickDeliveryTask(Guid taskId)
        {
            var result = await _taskService.ApproveTaskPickDelivery(taskId);

            if (result)
            {
                return Ok("Task approved successfully");
            }
            else
            {
                return NotFound("Task not found or could not be approved");
            }
        }

        [HttpPatch("PickDelivery/Deny/{taskId}")]
        public async Task<IActionResult> DenyPickDeliveryTask(Guid taskId)
        {
            var result = await _taskService.DenyTaskPickDelivery(taskId);

            if (result)
            {
                return Ok("Task denied successfully");
            }
            else
            {
                return NotFound("Task not found or could not be denied");
            }
        }

        [HttpPatch("Vigilance/Approve/{taskId}")]
        public async Task<IActionResult> ApproveVigilanceTask(Guid taskId)
        {
            var result = await _taskService.ApproveTaskVigilance(taskId);

            if (result)
            {
                return Ok("Task approved successfully");
            }
            else
            {
                return NotFound("Task not found or could not be approved");
            }
        }

        [HttpPatch("Vigilance/Deny/{taskId}")]
        public async Task<IActionResult> DenyVigilanceTask(Guid taskId)
        {
            var result = await _taskService.DenyTaskVigilance(taskId);

            if (result)
            {
                return Ok("Task denied successfully");
            }
            else
            {
                return NotFound("Task not found or could not be denied");
            }
        }
        [Authorize]
        [HttpGet("GetAllNonAproved")]
        public async Task<ActionResult> GetTasksNonAprovedAsync()
        {
            var (vigilanceTasks, pickDeliveryTasks) = await _taskService.GetTasksNonAprovedAsync();

            var result = new
            {
                VigilanceTasks = vigilanceTasks,
                PickDeliveryTasks = pickDeliveryTasks
            };

            return Ok(result);
        }

        [HttpGet("LessTime")]
        public async Task<AnyType> lessTimeTasks()
        {
            throw new NotImplementedException("Method is not implemented.");
        }

        [HttpGet("Genetic")]
        public async Task<AnyType> geneticTasks()
        {
            throw new NotImplementedException("Method is not implemented.");
        }
    }
}