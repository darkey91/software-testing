package ru.itmo.dkudaiberdieva.sd.mvc.controller

import org.springframework.stereotype.Controller
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.web.bind.annotation.*
import ru.itmo.dkudaiberdieva.sd.mvc.model.User
import ru.itmo.dkudaiberdieva.sd.mvc.repository.UserRepository
import java.lang.IllegalStateException


@Controller
class UserController(
    private val userRepo: UserRepository
) {
    private val mapper = ObjectMapper()

    @PostMapping("/register")
    @ResponseBody
    @CrossOrigin(origins = ["http://localhost:3000"])
    fun register(@RequestBody user: User): String {
        val savedUser: User
        try {
            savedUser = userRepo.save(user)
        } catch (e: IllegalStateException) {
            return mapper.writeValueAsString(mapOf("errors" to listOf(e.message.toString())))
        }

        return mapper.writeValueAsString(savedUser)
    }

    @PostMapping("/login")
    @ResponseBody
    @CrossOrigin(origins = ["http://localhost:3000"])
    fun login(@RequestBody user: User): String {
        userRepo.findByLogin(user.login!!)
            ?: return mapper.writeValueAsString(mapOf("errors" to listOf("wrong login")))

        return mapper.writeValueAsString(mapOf("msg" to "user successfully logged in"))
    }

}

