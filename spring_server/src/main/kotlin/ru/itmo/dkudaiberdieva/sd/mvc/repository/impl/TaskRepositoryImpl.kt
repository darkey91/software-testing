package ru.itmo.dkudaiberdieva.sd.mvc.repository.impl

import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.jdbc.support.KeyHolder
import org.springframework.stereotype.Component
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task
import ru.itmo.dkudaiberdieva.sd.mvc.repository.TaskRepository
import java.sql.Statement

@Component("taskRepository")
open class TaskRepositoryImpl(private val jdbcTemplate: JdbcTemplate) : TaskRepository {

    override fun findAll(): List<Task> {
        val sql = "SELECT * FROM ${Task.TABLE_NAME}"
        return jdbcTemplate.query(sql, BeanPropertyRowMapper(Task::class.java))
    }

    override fun findByNameAndLogin(name: String, login: String): Task? {
        val sql = "SELECT * FROM ${Task.TABLE_NAME} WHERE name = '$name' AND login = '$login'"
        return jdbcTemplate.query(sql, BeanPropertyRowMapper(Task::class.java)).firstOrNull()
    }

    override fun findByUserLogin(login: String): List<Task> {
        val sql = "SELECT * FROM ${Task.TABLE_NAME} WHERE login = '$login'"
        return jdbcTemplate.query(sql, BeanPropertyRowMapper(Task::class.java))
    }

    override fun complete(id: Long) {
        val sql = "UPDATE ${Task.TABLE_NAME} SET completed = TRUE WHERE id = ?"
        jdbcTemplate.update(sql, id)
    }

    override fun add(task: Task): Task {
        if (findByNameAndLogin(task.name, task.login!!) != null)
            error("Task Name should be unique for user")


        val sql = "INSERT INTO ${Task.TABLE_NAME} (name, login) VALUES (?, ?)"

        val keyHolder: KeyHolder = GeneratedKeyHolder()
        jdbcTemplate.update(
            { connection ->
                connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS).apply {
                    setString(1, task.name)
                    setString(2, task.login)
                }
            },
            keyHolder
        )

        return task.apply { id = keyHolder.key?.toLong() }
    }

}