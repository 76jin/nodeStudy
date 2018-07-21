/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
let net = require('net');
let server = net.createServer((socket) => {
    socket.end("node hello.");
});

server.on('error', (err) => {
    console.log(err);
});

server.listen(8888, () => {
    console.log('listen ', server.address());
});
