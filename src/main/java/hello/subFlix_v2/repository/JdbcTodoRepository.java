package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Todo;
import org.springframework.jdbc.datasource.DataSourceUtils;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcTodoRepository implements TodoRepository {

    private final DataSource dataSource;

    public JdbcTodoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Todo save(Todo todo) {
        String sql = "insert into todo(name) values(?)";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, todo.getName());
            pstmt.executeUpdate();
            rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                todo.setId(rs.getLong(1));
            } else {
                throw new SQLException("id 조회 실패");
            }
            return todo;
        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }

    @Override
    public Optional<Todo> findById(Long id) {
        String sql = "select * from todo where id = ?";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);

            rs = pstmt.executeQuery();

            if(rs.next()) {
                Todo todo = new Todo();
                todo.setId(rs.getLong("id"));
                todo.setName(rs.getString("name"));
                return Optional.of(todo);
            } else {
                return Optional.empty();
            }

        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }
    @Override
    public List<Todo> findAll() {
        String sql = "select * from todo";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);

            rs = pstmt.executeQuery();

            List<Todo> todos = new ArrayList<>();
            while(rs.next()) {
                Todo todo = new Todo();
                todo.setId(rs.getLong("id"));
                todo.setName(rs.getString("name"));
                todos.add(todo);
            }
            return todos;

        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }
    @Override
    public Optional<Todo> findByName(String name) {
        String sql = "select * from todo where name = ?";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);

            rs = pstmt.executeQuery();

            if(rs.next()) {
                Todo todo = new Todo();
                todo.setId(rs.getLong("id"));
                todo.setName(rs.getString("name"));
                return Optional.of(todo);
            }
            return Optional.empty();

        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }
    private Connection getConnection() {
        return DataSourceUtils.getConnection(dataSource);
    }
    private void close(Connection conn, PreparedStatement pstmt, ResultSet rs)
    {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (pstmt != null) {
                pstmt.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (conn != null) {
                close(conn);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    private void close(Connection conn) throws SQLException {
        DataSourceUtils.releaseConnection(conn, dataSource);
        //열 때와 닫을 때, DataSourceUtils를 통해 해야함
        //Database 트랜잭션 같은거에 걸리면 연결을 유지해야하므로
    }
}
