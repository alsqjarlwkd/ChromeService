const clockContainer = document.querySelector(".js-clock");//HTML에서 js-clock 클래스를 가진 태그를 clockContainer의 변수로 기입
const clockTitle = clockContainer.querySelector("h1");//HTML에서 h1 클래스를 가진 태그를 clockTitle의 변수로 기입
function getTime(){
    const date = new Date();//객체 생성(생성자)
    const minutes = date.getMinutes();//분
    const hours = date.getHours();//시간
    const seconds = date.getSeconds();//초
    clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//삼항 연산자를 사용하였음 ${hours < 10 ? `0${hours}` : hours} 에서 만약에 Hour 가 10보다작으면 `0${hours}`를 사용하고 아니라면 hours를 사용
}

function init(){
 getTime();//getTime 함수 호출
 setInterval(getTime,1000);//setInterval를 사용하여 1초당 타이머가 흘러가도록 세팅
}
init();