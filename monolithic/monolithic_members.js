/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
const mysql = require('mysql');
const conn = {
    host: 'localhost',
    user: 'doit',
    password: 'doit',
    database: 'monolithic'
};

/**
 * 회원 관리의 각 기능별로 분기
 */
exports.onRequest = function (res, method, pathname, params, cb) {
    switch (method) {
        case 'POST':
            return register(method, pathname, params, (response) => {
                process.nextTick(cb, res, response);
            });
        case 'GET':
            return inquiry(method, pathname, params, (response) => {
                process.nextTick(cb, res, response);
            });
        case 'DELETE':
            return unregister(method, pathname, params, (response) => {
                process.nextTick(cb, res, response);
            });
        default:
            return process.nextTick(cb, res, null);     // 정의되지 않은 메서드면 Null 리턴
    }

};

function getSuccessResponse(params) {
    return {
        key: params.key,
        erorcode: 0,
        errormessage: 'success'
    };
}

/**
 * 회원 등록 기능
 * @param method    메서드
 * @param pathname  URI
 * @param params    입력 파라미터
 * @param cb        콜백
 */
function register(method, pathname, params, cb) {
    const response = getSuccessResponse(params);

    if (params.username == null || params.password == null) {
        response.errorcode = 1;
        response.errormessage = 'Invalid parameters';
        cb(response);
        return;
    }

    const connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('insert into members(username, password) values (?, ?)'
        , [params.username, params.password]
        , (error, results, fields) => {
            if (error) {
                response.errorcode = 1;
                response.errormessage = error;
            }

            cb(response);
        });

    connection.end();
}

/**
 * 회원 인증 기능
 * @param method    메서드
 * @param pathname  URI
 * @param params    입력 파라미터
 * @param cb        콜백
 */
function inquiry(method, pathname, params, cb) {
    const response = getSuccessResponse(params);

    if (params.username == null || params.password == null) {
        response.errorcode = 1;
        response.errormessage = 'Invalid parameters';
        cb(response);
        return;
    }

    const connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('select id from members where username = ? and password = ?'
        , [params.username, params.password]
        , (error, results, fields) => {
            if (error || results.length == 0) {
                response.errorcode = 1;
                response.errormessage = error ? error : 'invalid password';
            } else {
                response.results = results[0].id;
            }
            cb(response);
        });

    connection.end();
}

/**
 * 회원 탈퇴 기능
 * @param method    메서드
 * @param pathname  URI
 * @param params    입력 파라미터
 * @param cb        콜백
 */
function unregister(method, pathname, params, cb) {
    const response = getSuccessResponse(params);

    if (params.username == null) {
        response.errorcode = 1;
        response.errormessage = 'Invalid parameters';
        cb(response);
        return;
    }

    const connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('delete from members where username = ?', [params.username], (error, results, fields) => {
        if (error) {
            response.errorcode = 1;
            response.errormessage = error;
        }
        cb(response);
    });

    connection.end();
}