package ru.itmo.dkudaiberdieva.sd.mvc.repository.impl

import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.jdbc.support.KeyHolder
import org.springframework.stereotype.Component
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task
import ru.itmo.dkudaiberdieva.sd.mvc.model.User
import ru.itmo.dkudaiberdieva.sd.mvc.repository.UserRepository

@Component("userRepository")
class UserRepositoryImpl(private val jdbcTemplate: JdbcTemplate): UserRepository {

    override fun save(user: User): User {
        if (findByLogin(user.login!!) != null)
            error("User with such login already exists")

        val sql = "INSERT INTO ${User.TABLE_NAME} (login) VALUES (?)"

        val keyHolder: KeyHolder = GeneratedKeyHolder()
        jdbcTemplate.update(
            { connection ->
                connection.prepareStatement(sql).apply {
                    setString(1, user.login)
                }
            },
            keyHolder
        )

        return user.apply { id = keyHolder.key?.toLong() }
    }

    override fun findByLogin(login: String): User? {
        val sql = "SELECT * FROM ${User.TABLE_NAME} WHERE login = '$login'"
        return jdbcTemplate.query(sql, BeanPropertyRowMapper(User::class.java)).firstOrNull()
    }

}