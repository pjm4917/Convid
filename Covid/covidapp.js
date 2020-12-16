// 파일에 접근하기
const fs = require('fs');

// Express 기본 모듈 불러오기
const express = require('express')
    , http = require('http')
    , path = require('path');

// Express의 미들웨어 불러오기
const bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static');

// Session 미들웨어 불러오기
const expressSession = require('express-session');

//======== MySQL 데이터베이스를 사용할 수 있는 mysql 모듈 불러오기 =========//
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    
})

// 익스프레스 객체 생성
const app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3306);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

const data = fs.readFile('./databse.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('./api/', (req, res) => {
    connection.query(
        "SELECT * FROM USERTB"
    )
})

// 라우터 객체 참조
var router = express.Router();

// 사용자 추가 라우팅 함수
router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAge = req.body.age || req.query.age;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramAge);
    
    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        addUser(paramId, paramName, paramAge, paramPassword, function(err, addedUser) {
            // 동일한 id로 추가할 때 오류 발생 - 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 추가 중 오류 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                
                return;
            }
            
            // 결과 객체 있으면 성공 응답 전송
            if (addedUser) {
                console.dir(addedUser);
                
                console.log('inserted ' + addedUser.affectedRows + ' rows');
                
                var insertId = addedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 실패</h2>');
                res.end();
            }
        });
    } else { // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
});

// 사용자를 인증하는 함수
var authUser = function(id, password, callback) {
    console.log('authUser 호출됨.');
    
    // 커넥션 풀에서 연결 객체를 가져옵니다.
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); // 반드시 해제해야 합니다.
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var columns = ['id', 'name', 'age'];
        var tablename = 'users';
        
        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where id = ? and password = ?",
                             [columns, tablename, id, password], function(err, rows) {
            conn.release(); // 반드시 해제해야 합니다.
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
                console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
                callback(null, rows);
            } else {
                console.log("일치하는 사용자를 찾지 못함.");
                callback(null, null);
            }
        });
    });
}

// 라우터 객체 등록
app.use('/', router);

//====== 서버 시작 =======//
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});