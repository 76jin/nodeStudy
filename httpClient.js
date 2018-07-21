/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
var http = require('http');

// 호출 페이지 정보 설정
var options = {
    host: "127.0.0.1",
    port: 8888,
    path: "/"
};

// 페이지 호출
var req = http.request(options, (res) => {
    var data = '';
    res.on('data', (chunk) => {     // 서버가 보내는 데이터 수신
        data += chunk;
    });

    res.on('end', () => {           // 수신 완료하면 화면에 출력
        console.log(data);
    });
});

req.end();      // 명시적 완료.
