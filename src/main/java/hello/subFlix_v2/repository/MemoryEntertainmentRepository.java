package hello.subFlix_v2.repository;


import hello.subFlix_v2.domain.Entertainment;
import org.springframework.stereotype.Repository;

import java.util.*;

//@Repository
public class MemoryEntertainmentRepository implements EntertainmentRepository{

    private static Map<Long, Entertainment> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public Entertainment save(Entertainment entertainment) {
        entertainment.setId(++sequence);
        store.put(entertainment.getId(), entertainment);
        return entertainment;
    }

    @Override
    public Optional<Entertainment> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Entertainment> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Optional<Entertainment> findByTitle(String title) {
        return store.values().stream()
                .filter(entertainment -> entertainment.getTitle().equals(title))
                .findAny();
    }

    public void clearStore() {
        store.clear();
    }
}
