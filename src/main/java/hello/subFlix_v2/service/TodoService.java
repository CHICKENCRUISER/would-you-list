package hello.subFlix_v2.service;

import hello.subFlix_v2.domain.Todo;
import hello.subFlix_v2.repository.TodoRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

//@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    //@Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * 투두 등록
     */

    public Long join(Todo todo) {

        validateDuplicateTodo(todo);
        todoRepository.save(todo);
        return todo.getId();
    }

    public void validateDuplicateTodo(Todo todo) {
        todoRepository.findByName(todo.getName())
                .ifPresent(e -> {
                    throw new IllegalStateException("이미 존재하는 컨텐츠입니다.");
                });
    }

    /**
     * 전체 투두 조회
     */
    public List<Todo> findTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> findOne(Long todoId) {
        return todoRepository.findById(todoId);
    }

}
