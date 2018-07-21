/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
function func(callback) {
    process.nextTick(callback, "callback!!");
}

try {
    func((param) => {
        a.a = 0;
    });
} catch (e) {
    console.log("exception!!");
}

process.on("uncaughtException", (error) => {    // 모든 스레드에서 발생하는 예외 처리.
    console.log("uncaughtException!!");
});

