/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const members = require('./monolithic_members');
const goods = require('./monolithic_goods');
const purchases = require('./monolithic_purchases');

const server = http.createServer((req, res) => {
    console.log("created server...");
    const method = req.method;
    const uri = url.parse(req.url, true);
    const pathname = uri.pathname;

    // POST와 PUT이면 데이터를 읽음
    if (method === 'POST' || method === 'PUT') {
        let body = '';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            let params;
            // 헤더 정보가 json 이면 처리
            if (req.headers['content-type'] == 'application/json') {
                params = JSON.parse(body);
            } else {
                params = querystring.parse(body);
            }

            onRequest(res, method, pathname, params);
        });
    } else {    // GET, DELETE 이면 query 정보를 읽음
        onRequest(res, method, pathname, uri.query);
    }
}).listen(8888);

/**
 * 요청에 대해 회원 관리, 상품 관리, 구매 관리 모듈별로 분기
 * @param res       response 객체
 * @param method    메서드
 * @param pathname  URI
 * @param params    입력 파라미터
 */
function onRequest(res, method, pathname, params) {
    switch (pathname) {
        case '/members':
            members.onRequest(res, method, pathname, params, response);
            break;
        case '/goods':
            goods.onRequest(res, method, pathname, params, response);
            break;
        case '/purchases':
            purchases.onRequest(res, method, pathname, params, response);
            break;
        default:
            res.writeHead(404);
            return res.end();       // 정의되지 않은 요청에 404 에러 리턴.
    }
}

/**
 * HTTP 헤더에 JSON 형식으로 응답
 * @param res       response 객체
 * @param packet    결과 파라미터
 */
function response(res, packet) {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(packet));
}

