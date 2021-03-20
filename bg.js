const body = document.querySelector("body");//body 태그를 가진 body를 body라는 변수에 저장

const IMG_NUMBER = 5; //총 이미지 개수는 6개지만 5개로 지정 이유:imgNumber+1이기 때문에

function paintImage(imgNumber)
{
    const image = new Image();//image 라는 객체를 생성(생성자)
    image.src = `imgs/${imgNumber +1}.jpg`//init() 부분에 randomNumber 의 값을 imgNumber에서 받아와서 imgNumber를 넣고 +1을 해줌
    image.classList.add("bgImage");//bgImage 라는 클래스를 하나 생성
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);//총 이미지 6개에서 랜덤으로 내림값을 주어서 1~6까지 랜덤으로 값을 생성
    return number;//랜덤으로 만들어진 숫자를 반환
}

function init(){
    const randomNumber = genRandom();//랜덤으로 반환된 숫자를 randomNumber 변수에 저장
    paintImage(randomNumber);//랜덤으로 만들어진 숫자를 이용하여 paintImage() 호출

}
init();