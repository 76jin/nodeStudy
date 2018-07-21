/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
const http = require('http');

var server = http.createServer((req, res) => {
    res.end("hello world!");
});

server.listen(8888);
