// 파일에 접근하기
const fs = require('fs');

// Express 기본 모듈 불러오기
const express = require('express')
    , http = require('http');

// Express의 미들웨어 불러오기
const bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3301);

var upool = require('./coviddb');
var lookUser = require('./user');

// 라우터 객체 참조
var router = express.Router();

// 사용자 추가 라우팅 함수
router.route('/user/sign').post(function(req, res) {
    
    var paramId = req.body.id || req.query.id;
    var paramToken = req.body.token || req.query.token;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramToken);
    
    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (upool.pool) {
        
        lookUser.authUser(paramId, paramToken, function(err, rows) {
        }
                
        if (rows) {
            console.dir(rows);
            
            var usertoken = rows[1].name;
        });
        
        // 사용자 추가
        lookUser.addUser(paramId, paramToken, function(err, addedUser) {
            // 동일한 id로 추가할 때 오류 발생 - 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 추가 중 오류 발생 : ' + err.stack);
                return;
            }
            
            // 결과 객체 있으면 성공 응답 전송
            if (addedUser) {
                console.dir(addedUser);
                console.log('inserted ' + addedUser.affectedRows + ' rows');
                var insertId = addedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);
            }
        });
    } else {
    }
});
