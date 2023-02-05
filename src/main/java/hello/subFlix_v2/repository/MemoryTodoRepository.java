package hello.subFlix_v2.repository;


import hello.subFlix_v2.domain.Todo;

import java.util.*;

//@Repository
public class MemoryTodoRepository implements TodoRepository {

    private static Map<Long, Todo> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public Todo save(Todo todo) {
        todo.setId(++sequence);
        store.put(todo.getId(), todo);
        return todo;
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Todo> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Optional<Todo> findByName(String name) {
        return store.values().stream()
                .filter(todo -> todo.getName().equals(name))
                .findAny();
    }

    public void clearStore() {
        store.clear();
    }
}
