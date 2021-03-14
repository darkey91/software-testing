package ru.itmo.dkudaiberdieva.sd.mvc.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.datasource.DriverManagerDataSource
import javax.sql.DataSource
import org.springframework.jdbc.core.JdbcTemplate


@Configuration
open class JdbcDaoContextConfiguration {

    @Bean
    open fun getJdbcTemplate(dataSource: DataSource): JdbcTemplate {
        return JdbcTemplate(dataSource)
    }

    @Bean
    open fun dataSource(): DataSource =
        DriverManagerDataSource().apply {
            setDriverClassName("org.sqlite.JDBC")
            url = "jdbc:sqlite:task.db"
            username = ""
            password = ""
        }
}
