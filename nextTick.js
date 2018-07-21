/**
 * Created by ranian129@gmail.com on 2018. 7. 17.
 * Blog : http://76jin.tistory.com
 * Github : http://github.com/76jin
 */
// nextTick을 사용한 비동기 프로그래밍
function func(callback) {
    process.nextTick(callback, "callback!!");
}

try {
    func((param) => {
        a.a = 0;
    });
} catch (e) {
    console.log("exception!!");     // 같은 스레드일 경우 호출
}

/* 실행 결과
 --> a is not defined
 --> 의미: process.nextTick 함수는 특정 함수를 호출하기 전 CPU가 다른 높은 우선순위의 명령을 수행한다.

 */
