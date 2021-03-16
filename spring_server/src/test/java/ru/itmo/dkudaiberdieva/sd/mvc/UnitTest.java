package ru.itmo.dkudaiberdieva.sd.mvc;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task;
import ru.itmo.dkudaiberdieva.sd.mvc.model.User;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class UnitTest {

    @Test
    public void createTask() {
        final String taskName = "Return and be the King";
        final User user = new User(1L, "Aragorn");

        final Task task = new Task(taskName, user);

        assertEquals(taskName, task.getName());
        assertEquals(user.getLogin(), task.getLogin());
    }
}
