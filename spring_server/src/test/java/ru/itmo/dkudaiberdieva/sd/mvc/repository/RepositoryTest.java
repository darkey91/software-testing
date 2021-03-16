package ru.itmo.dkudaiberdieva.sd.mvc.repository;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.MySQLContainer;
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task;
import ru.itmo.dkudaiberdieva.sd.mvc.model.User;
import ru.itmo.dkudaiberdieva.sd.mvc.repository.impl.TaskRepositoryImpl;
import ru.itmo.dkudaiberdieva.sd.mvc.repository.impl.UserRepositoryImpl;

import javax.sql.DataSource;

import static org.junit.Assert.*;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;

//@RunWith(SpringRunner.class)
@SpringBootTest
//@SqlGroup({
//        @Sql(value = "/database/create-tables.sql", executionPhase = BEFORE_TEST_METHOD),
//        @Sql(value = "/database/clean-database.sql", executionPhase = AFTER_TEST_METHOD)
//})
public class RepositoryTest {
    public DataSource dataSource() {
        final MySQLContainer<?> mysql = new MySQLContainer<>("mysql:5.6.42")
                .withDatabaseName("task")
                .withInitScript("create-tables.sql");

        mysql.start();
        final HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setDriverClassName(mysql.getDriverClassName());
        hikariConfig.setJdbcUrl(mysql.getJdbcUrl());
        hikariConfig.setUsername(mysql.getUsername());
        hikariConfig.setPassword(mysql.getPassword());

        return new HikariDataSource(hikariConfig);
    }

//    private DataSource dataSource = dataSource();
    private JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource());
    private UserRepository userRepo = new UserRepositoryImpl(jdbcTemplate);
    private TaskRepository taskRepo = new TaskRepositoryImpl(jdbcTemplate);


    @Test
    public void addUser() {
        final String login = "Aragorn";

        final User savedUser = userRepo.save(new User(null, login));

        assertNotNull(savedUser);
        assertNotNull(savedUser.getId());
        assertNotNull(savedUser.getLogin());

        final User user = userRepo.findByLogin(login);
        assertNotNull(user);
        assertEquals(savedUser.getId(), user.getId());
        assertEquals(savedUser.getLogin(), user.getLogin());
    }

    @Test
    public void addTask() {
        final String login = "Aragorn";
        final Task task = new Task(null, "Return and be the King", login, false);

        final Task savedTask = taskRepo.add(task);

        assertNotNull(savedTask);
        assertNotNull(savedTask.getId());
        assertNotNull(savedTask.getName());
        assertNotNull(savedTask.getLogin());
        assertFalse(savedTask.getCompleted());
        assertEquals(task.getName(), savedTask.getName());
        assertEquals(task.getLogin(), savedTask.getLogin());

        final Task foundTask = taskRepo.findByNameAndLogin(task.getName(), task.getLogin());
        assertNotNull(foundTask);
        assertEquals(savedTask.getId(), foundTask.getId());
        assertEquals(savedTask.getName(), foundTask.getName());
        assertEquals(savedTask.getLogin(), foundTask.getLogin());
    }
}
