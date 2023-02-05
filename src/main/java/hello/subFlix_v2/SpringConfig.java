package hello.subFlix_v2;

import hello.subFlix_v2.repository.TodoRepository;
import hello.subFlix_v2.service.TodoService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

//    private final DataSource dataSource;
//    private final EntityManager em;

//    public SpringConfig(DataSource dataSource, EntityManager em) {
//        this.dataSource = dataSource;
//        this.em = em;
//    }

    private final TodoRepository todoRepository;

    public SpringConfig(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Bean
    public TodoService todoService() {
        return new TodoService(todoRepository);
    }
}

//    @Bean
//    public TodoRepository todoRepository() {
//        return new MemoryTodoRepository();
//        return new JdbcTodoRepository(dataSource);
//        return new JpaTodoRepository(em);
//    }
//}
