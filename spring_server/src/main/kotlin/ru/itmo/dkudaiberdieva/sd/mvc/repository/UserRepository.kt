package ru.itmo.dkudaiberdieva.sd.mvc.repository

import ru.itmo.dkudaiberdieva.sd.mvc.model.User

interface UserRepository {

    fun save(user: User): User

    fun findByLogin(login: String): User?
}