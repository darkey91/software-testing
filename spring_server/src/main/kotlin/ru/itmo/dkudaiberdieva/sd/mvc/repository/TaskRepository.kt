package ru.itmo.dkudaiberdieva.sd.mvc.repository

import ru.itmo.dkudaiberdieva.sd.mvc.model.Task

interface TaskRepository {

    fun findAll(): List<Task>

    fun findByNameAndLogin(name: String, login: String): Task?

    fun findByUserLogin(login: String): List<Task>

    fun complete(id: Long)

    fun add(task: Task): Task
}