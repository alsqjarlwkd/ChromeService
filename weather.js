const Weather = document.querySelector(".js-weather");//HTML에서 js-weather 클래스를 가진 태그를 weather 변수에 기입
const API_KEY="e52f07a1a34ff433601b3d9288d610e2"//Map API 키 적용
const COORDS = "coords"; //COORDS 변수에 문자열 값 적용

function getWeather(lat ,lng){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)//지도 API를 가져옴
.then(function(response){
    return response.json()//응답을 json형태로 변경
}).then(function(json){
    const temperture = json.main.temp;//json 형태로 변경 후 온도 값을 temperture 변수에 기입
    const place = json.name;//json 형태로 변경 후 온도 값을 place 변수에 기입
    Weather.innerText = `${temperture} ${place}`;//weather 변수 안에 innerText로 temperture와 place의 값을 기입
});

}
function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));//coordsObj객체의 위도와 경도를 세팅해줌
}

function handleGeoSucces(position)
{
    const latitude = position.coords.latitude;//현재 위치의 위도를 latitude 변수에 기입
    const longitude = position.coords.longitude;//현재 위치의 경도를 longitude 변수에 기입
    const coordsObj={//coordsObj 객체 생성
        latitude,//위도
        longitude//경도
    };
    saveCoords(coordsObj);//coordsObj 객체안에 위도와 경도를 저장
    getWeather(latitude,longitude);//getWeather 함수를 호출
    
}

function handlegeoError(){
    console.log("Error")//위치를 가져오지 못했을때 error 로그 출력
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handlegeoError)//현재 위치를 가져오는 객체를 적용(위치 찾는것을 성공했을때,실패했을때)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);//COORDS 변수안에 있는 문자열 값의 value를 loadedCoords 변수에 적용
    if(loadedCoords === null)// 만약 loadedCoords null이면
    {
        askForCoords();//askForCoords() 함수를 호출
    }
    else//null이 아니면 
    {
        const parseCoords = JSON.parse(loadedCoords);//loadedCoords 값에 위도와 경도를 JSON 형식으로 변환하여 parseCoords 변수 안에 기입
        getWeather(parseCoords.latitude,parseCoords.longitude);//JSON 형식으로 변환된 위도와 경도를 argument 로 변경하여 getWeather 함수 실행
    }
}



function init(){
    loadCoords();//loadCoords() 함수 호출
}

init();