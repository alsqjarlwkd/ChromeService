const todoform = document.querySelector(".js-todoForm"),//html 에서 js-todoForm 클래스로 지정된 태그를 todoform 변수에 저장
todoinput = todoform.querySelector("input"),//html에서 input 태그로 지정된 태그를 todoinput 변수에 저장
todoList = document.querySelector(".js-todoList");//html에서 js-todoList 클래스로 지정된 태그를 todoList 변수에 저장

const TODOS_LS = "toDos"; //TODOS_LS 변수에 toDos라는 문자열 값을 저장

let toDos = []; //toDos 라는 배열을 선언

function deleteToDo(event){
    const btn = event.target;//어떤 버튼을 클릭했는지를 알기위해
    const li = btn.parentNode;//li에 지정되어있는 id값중에 어떤 아이디를 삭제할것인지를 인지
    todoList.removeChild(li);//todoList에서 li 태그를 삭제
    const CleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);//toDos 배열안에 존재하는 id와 li 태그안에 있는 id가 동일하지 않다면 true를 반환
    });
    toDos = CleanToDos;//return toDo.id !== parseInt(li.id);에 조건이 부합하는 배열만 따로 추려내어 toDos 배열에 값을 재배치
    saveToDos();//로컬 저장소에 저장되어 있는 TODOS_LS 의 키값과 value 값을 스트링으로 저장
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//로컬 저장소에 저장되어 있는 TODOS_LS 의 키값과 value 값을 스트링으로 저장
}

function PanintTodo(text){
    const li = document.createElement("li");//li 태그를 가진 엘리먼트를 생성
    const delBtn = document.createElement("button");//button 태그를 가진 엘리먼트를 생성하여 delBtn 변수에 저장
    delBtn.innerText ="❌"; //delBtn 안의 텍스트를 지정
    delBtn.style.border="0px none";// delBtn 의 테두리를 0px로 변경
    const span = document.createElement("span");//span 태그를 가진 엘리멘트를 생성
    const newId = toDos.length+1;//toDos의 빈 배열에 +1씩 아이디 값을 부여
    span.innerText = text;//span 태그 안에 입력 받는 텍스트를 text 파라미터로 전달
    delBtn.addEventListener("click",deleteToDo);//delBtn을 클릭했을때 클릭 이벤트가 발생하며 deleteToDo 함수 실행
    li.appendChild(span);//li 태그 안에 span 태그를 추가
    li.id = newId;//li 태그 안에 id를 지정하는데 toDos.length+1 만큼 id를 지정해줌
    li.appendChild(delBtn);//li 태그 안에 delBtn을 추가
    todoList.appendChild(li);//toDOList안에 li 태그를 추가
    const toDoObj = {//toDoObj의 객체를 생성
        text:text,//toDoObj의 객체 안에 text의 값을 추가
        id:newId//toDOObj 객체 안에 newId의 id 값을 추가
    };
    toDos.push(toDoObj);//submit을 할때마다 toDoObj 객체를 배열안에 push 해줌
    saveToDos();//saveToDos() 함수를 호출

}

function handleSubmit(event){
    event.preventDefault();//submit 이벤트가 발생했을때 해당 이벤트를 막아줌 ex)submit 이벤트 발생 시 아무런 동작을 하지 않음
    const currentValue = todoinput.value;//todoinput안에 있는 value 값을 currentValue 변수에 저장
    PanintTodo(currentValue);//todoinput 안에 있는 value 값을 currentValue 인자로 전달
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);//TODOS_LS가 가진 문자열 값의 value값을 가져와서 loadedToDos 변수에 저장
    if(loadedToDos !== null)//만약에 loadedToDos가 널이 아니면
    {
        const parsedToDos = JSON.parse(loadedToDos);//TODOS_LS가 가진 문자열 값의 value를 JSON 객체로 반환
        parsedToDos.forEach(function(toDo)//각 개개인이 객체로 반환되어 하나하나 forEach문을 돌게됨
        {
            PanintTodo(toDo.text);//PaintTodo() 함수 호출
        });
    }
}

function init(){
    loadToDos(); //loadToDos() 라는 함수를 호출
    todoform.addEventListener("submit",handleSubmit);
}

init();