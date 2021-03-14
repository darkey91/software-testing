package ru.itmo.dkudaiberdieva.sd.mvc.model

data class User(
    var id: Long? = null,
    var login: String? = null
) {
    companion object {
        const val TABLE_NAME = "user"
    }
}
