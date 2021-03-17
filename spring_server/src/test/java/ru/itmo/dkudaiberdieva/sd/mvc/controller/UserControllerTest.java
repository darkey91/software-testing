package ru.itmo.dkudaiberdieva.sd.mvc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import ru.itmo.dkudaiberdieva.sd.mvc.model.Task;
import ru.itmo.dkudaiberdieva.sd.mvc.model.User;
import ru.itmo.dkudaiberdieva.sd.mvc.repository.TaskRepository;
import ru.itmo.dkudaiberdieva.sd.mvc.repository.UserRepository;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs(outputDir = "target/doc")
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepo;

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void reRegister() throws Exception {
        var errMsg = "User with such login already exists";
        var url = "/register";
        var user = new User(null, "Aragorn");
        var exception = new IllegalStateException(errMsg);

        when(userRepo.save(user))
                .thenThrow(exception);

        var expected = mapper.writeValueAsString(Map.of("errors", List.of(exception.getMessage().toString())));
        mockMvc.perform(
                post(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(user))
                ).andExpect(content().string(expected))
                .andDo(document("userController"));
    }
}

