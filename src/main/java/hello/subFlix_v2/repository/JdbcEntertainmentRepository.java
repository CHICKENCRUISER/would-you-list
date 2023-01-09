package hello.subFlix_v2.repository;

import hello.subFlix_v2.domain.Entertainment;
import org.springframework.jdbc.datasource.DataSourceUtils;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcEntertainmentRepository implements EntertainmentRepository {

    private final DataSource dataSource;

    public JdbcEntertainmentRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Entertainment save(Entertainment entertainment) {
        String sql = "insert into entertainment(title) values(?)";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, entertainment.getTitle());
            pstmt.executeUpdate();
            rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                entertainment.setId(rs.getLong(1));
            } else {
                throw new SQLException("id 조회 실패");
            }
            return entertainment;
        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }

    @Override
    public Optional<Entertainment> findById(Long id) {
        String sql = "select * from entertainment where id = ?";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);

            rs = pstmt.executeQuery();

            if(rs.next()) {
                Entertainment entertainment = new Entertainment();
                entertainment.setId(rs.getLong("id"));
                entertainment.setTitle(rs.getString("title"));
                return Optional.of(entertainment);
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
    public List<Entertainment> findAll() {
        String sql = "select * from entertainment";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);

            rs = pstmt.executeQuery();

            List<Entertainment> entertainments = new ArrayList<>();
            while(rs.next()) {
                Entertainment entertainment = new Entertainment();
                entertainment.setId(rs.getLong("id"));
                entertainment.setTitle(rs.getString("title"));
                entertainments.add(entertainment);
            }
            return entertainments;

        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }
    @Override
    public Optional<Entertainment> findByTitle(String title) {
        String sql = "select * from entertainment where title = ?";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, title);

            rs = pstmt.executeQuery();

            if(rs.next()) {
                Entertainment entertainment = new Entertainment();
                entertainment.setId(rs.getLong("id"));
                entertainment.setTitle(rs.getString("title"));
                return Optional.of(entertainment);
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
