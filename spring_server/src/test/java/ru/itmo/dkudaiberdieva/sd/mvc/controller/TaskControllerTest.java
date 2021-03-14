package ru.itmo.dkudaiberdieva.sd.mvc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import ru.itmo.dkudaiberdieva.sd.mvc.repository.TaskRepository;
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class TaskControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskRepository taskRepo;

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void returnListOfTasks() throws Exception {
        var url = "/tasks?login=" + USER1_LOGIN;
        var tasks = List.of(task1, task2);

        when(taskRepo.findByUserLogin(USER1_LOGIN))
                .thenReturn(tasks);

        var expected = mapper.writeValueAsString(Map.of("tasks", tasks));
        mockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(content().string(expected))
                .andDo(document("login"));
    }


    private final static String USER1_LOGIN = "first";
    private final static String USER2_LOGIN = "second";
    private final static Task task1 = new Task(10L,USER1_LOGIN,"uf uf uf", true);
    private final static Task task2 = new Task(10L,USER1_LOGIN,"a a a a a", false);
    private final static Task task3 = new Task(10L,USER2_LOGIN,"pojilaya taska", false);
}

