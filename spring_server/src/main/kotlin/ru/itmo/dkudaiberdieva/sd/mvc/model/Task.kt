package ru.itmo.dkudaiberdieva.sd.mvc.model

import com.fasterxml.jackson.annotation.JsonProperty

class Task(
    var id: Long? = null,
    var name: String = "",
    @JsonProperty("userLogin") var login: String? = null,
    var completed: Boolean = false,
) {
    companion object {
        const val TABLE_NAME = "task"
    }
}