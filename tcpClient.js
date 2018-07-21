/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
let net = require('net');
let options = {
    host: '127.0.0.1',
    port: 8888
};

let client = net.connect(options, () => {
    console.log("connected.");
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log("disconnected.");
});
