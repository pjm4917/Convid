var upool = require('./coviddb');


// 사용자 추가
exports.addUser = function(id, token, callback) {
    console.log('addUser 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다.
    upool.pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); // 반드시 해체해야 합니다.
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        // 데이터를 객체로 만듭니다.
        var data = {id:id, token:token};

        // SQL문을 실행합니다.
        var exec = conn.query('insert into users set ?', data, function(err, result) {
            conn.release(); // 반드시 해제해야 합니다.
            console.log('실행 대상 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행 시 오류 발생함.');
                console.dir(err);

                callback(err, null);

                return;
            }

            callback(null, result);
        });
    });
}

// 사용자 인증
exports.authUser = function(token, callback) {
    console.log('authUser 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다.
    upool.pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); // 반드시 해제해야 합니다.
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var column = 'token';
        var tablename = 'user_id';

        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where id = ? and password = ?",
                                 [column, tablename, token], function(err, rows) {
            conn.release(); // 반드시 해제해야 합니다.
            console.log('실행 대상 SQL : ' + exec.sql);

            if (rows.length > 0) {
                console.log('토큰 [%s] 가 일치하는 사용자 찾음.', token);
                callback(null, rows);
            } else {
                console.log("일치하는 사용자를 찾지 못함.");
                callback(null, null);
            }
        });
    });
}