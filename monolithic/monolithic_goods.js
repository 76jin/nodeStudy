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
 * 상품 관리의 각 기능별로 분기
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
 * 상품 등록 기능
 * @param method    메서드
 * @param pathname  URI
 * @param params    입력 파라미터
 * @param cb        콜백
 */
function register(method, pathname, params, cb) {
    const response = getSuccessResponse(params);

    if (!isValidParams(params)) {
        response.erorcode = 1;
        response.errormessage = 'Invalid Parameters';
        cb(response);
        return;
    }

    const connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('insert into goods(name, category, price, description) values (?, ?, ?, ?)'
        , [params.name, params.category, params.price, params.description]
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
 * 상품 조회 기능
 * @param method    메서드
 * @param pathname  URI
 * @param params    입력 파라미터
 * @param cb        콜백
 */
function inquiry(method, pathname, params, cb) {
    const response = getSuccessResponse(params);

    const connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('select * from goods', (error, results, fields) => {
        if (error || results.length == 0) {
            response.errorcode = 1;
            response.errormessage = error ? error : 'no data';
        } else {
            response.results = results;
        }

        cb(response);
    });

    connection.end();
}

/**
 * 상품 삭제 기능
 * @param method    메서드
 * @param pathname  URI
 * @param params    입력 파라미터
 * @param cb        콜백
 */
function unregister(method, pathname, params, cb) {
    const response = getSuccessResponse(params);

    if (params.id == null) {
        response.errorcode = 1;
        response.errormessage = 'Invalid parameters';
        cb(response);
        return;
    }

    const connection = mysql.createConnection(conn);
    connection.connect();
    connection.query('delete from goods where id = ?'
        , [params.id]
        , (error, results, fields) => {
            if (error) {
                response.errorcode = 1;
                response.errormessage = error;
            }

            cb(response);
        });
    connection.end();
}

function isValidParams(params) {
    if (params.name == null || params.category == null || params.price == null || params.description == null)
        return false;
    else
        return true;
}