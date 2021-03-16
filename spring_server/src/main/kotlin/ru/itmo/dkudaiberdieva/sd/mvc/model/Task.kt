package ru.itmo.dkudaiberdieva.sd.mvc.model

import com.fasterxml.jackson.annotation.JsonProperty

class Task(
    var id: Long? = null,
    var name: String = "",
    @JsonProperty("userLogin") var login: String? = null,
    var completed: Boolean = false,
) {
    constructor(name: String, user: User): this(name = name, login = user.login)

    companion object {
        const val TABLE_NAME = "task"
    }
}