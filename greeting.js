const form = document.querySelector(".js-form"),//HTML에서 js-form의 클래스를 가진 태그를 선택하여 form 변수에 기입
input = document.querySelector("input"),//HTML에서 input의 태그를 가진 것을 선택하여 input 변수에 기입
greeting = document.querySelector(".js-greetings");//HTML에서 js-greeting의 클래스를 가진 태그를 선택하여 greeting 변수에 기입

const USER_LS = "currentUser", //USER_LS변수값에 currentUser 이라는 문자열 값을 지정
SHOWING_CN = "showing";//HTML에서 별다른 클래스를 선언하지 않아도 CSS에 선언이 되어있다면 즉각적으로 SHOWING_CN = "showing";를 사용하여 클래스를 변수에 추가할수 있음

function saveName(text){
    localStorage.setItem(USER_LS,text); //로컬 저장소에 User_LS key 값의 text를 저장
}

function HandleSubmit(event)
{
    event.preventDefault();//submit 이벤트가 발생했을때 해당 이벤트를 막아줌 ex)submit 이벤트 발생 시 아무런 동작을 하지 않음
    const currentValue = input.value;//input태그 안의 value 값을 currentValue 값으로 저장
    paintGreeting(currentValue);//input 박스 안의 value 값을 paintGreeting()를 통해 값으로 변환
    saveName(currentValue);//사이트를 새로 고침 하였을때에도 정보를 그대로 담고 있기 위해 saveName() 호출
}
function askForName(){
    form.classList.add(SHOWING_CN);//텍스트 박스를 보여준다
    form.addEventListener("submit",HandleSubmit);//엔터 즉 submit 이벤트가 발생될때 handleSubmit() 호출
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);//텍스트 박스를 지운다
    greeting.classList.add(SHOWING_CN);//h4 태그에 text를 추가한다
    greeting.innerText = `Hello!! ${text}`;//h4태그안에 들어갈 텍스트는 ex)Hello! Minbeomgi
}

function loadName(){
const currentUser = localStorage.getItem(USER_LS);//USER_LS에 들어가있는 key값의 value를 변수값에 넣는다
console.log(currentUser);
//USER_LS에 currentUser 문자열 값을 가진 키값의 Value값을 currentUser 변수에 넣는다.
if(currentUser === null)//만약에 currentUser가 존재하지 않으면
{
    askForName()//askForName() 호출

}else//존재한다면
{
    paintGreeting(currentUser);//USER_LS에 들어가있는 key 값의 value를 호출한다
}
}

function init(){
loadName();//loadName() 호출
}
init();