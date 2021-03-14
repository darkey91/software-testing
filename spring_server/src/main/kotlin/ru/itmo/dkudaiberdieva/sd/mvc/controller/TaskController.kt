package ru.itmo.dkudaiberdieva.sd.mvc.controller

import org.springframework.stereotype.Controller
import ru.itmo.dkudaiberdieva.sd.mvc.repository.TaskRepository
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.web.bind.annotation.*
import ru.itmo.dkudaiberdieva.sd.mvc.dto.CompleteTask
import java.lang.IllegalStateException


@Controller
class TaskController(
    private val taskRepo: TaskRepository
) {
    private val mapper = ObjectMapper()

    @GetMapping("/tasks")
    @ResponseBody
    @CrossOrigin(origins = ["http://localhost:3000"])
    fun tasks(@RequestParam("login") login: String): String {
        val tasks =  taskRepo.findByUserLogin(login)
        return mapper.writeValueAsString(mapOf("tasks" to tasks))
    }

    @PostMapping("/add-task")
    @ResponseBody
    @CrossOrigin(origins = ["http://localhost:3000"])
    fun addTask(@RequestBody task: Task): String {
        val savedTask: Task
        try {
            savedTask = taskRepo.add(task)
        } catch (e: IllegalStateException) {
            return mapper.writeValueAsString(mapOf("errors" to listOf(e.cause)))
        }
        return mapper.writeValueAsString(savedTask)
    }

    @PostMapping("/complete-task")
    @ResponseBody
    @CrossOrigin(origins = ["http://localhost:3000"])
    fun completeTask(@RequestBody task: CompleteTask): String {
        val dbTask = taskRepo.findByNameAndLogin(task.taskName, task.userLogin)!!
        taskRepo.complete(dbTask.id!!)
        return mapper.writeValueAsString(mapOf("msg" to "Task was completed"))
    }
}

