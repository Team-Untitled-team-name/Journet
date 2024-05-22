// import { Database } from './database.types';

// 맵 기본 설정
var mapContainer = document.getElementById('map');
var Center = new kakao.maps.LatLng(36.6364883, 127.4836014);
var options = {
  center: Center,
  level: 7
};
let map = new kakao.maps.Map(mapContainer, options);

// supabase 기본 설정
const supabase_url = "https://kimtuecthichjtenslli.supabase.co";
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbXR1ZWN0aGljaGp0ZW5zbGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMzAxNTAsImV4cCI6MjAzMDcwNjE1MH0.i8gRNNi684LbanM6Ibxf-rcA5Q5ekcxhX53IHd_53HI";

const client = supabase.createClient(
  supabase_url, supabase_key
);

// 맵 세부 설정
map.setMaxLevel(7, { animate: true });
map.setZoomable(true);
map.setDraggable(true);

// 맵 축척 조절 바 생성
var control = new kakao.maps.ZoomControl();
map.addControl(control, kakao.maps.ControlPosition.BOTTOMRIGHT);

// 마우스 클릭 이벤트 설정 - 점검 예정
// kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
//   var latlng = mouseEvent.latLng;
// });

// 생성자 함수 => 객체 > 배열
let map_pin = [];

// DB 로딩하기
async function refrash_mappins() {
  let { data: pins, error } = await client.from("Mappins").select("*");
  console.log('pins', pins);

  function DB_pin(title, lat, lng) {
    this.title = title;
    this.latlng = new kakao.maps.LatLng(lat, lng);
    this.building = function () {
      return title;
    };
  };

  for (let pin of pins) {
    let db_pin = new DB_pin(pin.building_name, pin.latitude, pin.longitude);
    map_pin.push(db_pin);
  }

  console.log(map_pin); // 여기까지는 성공 - DB가 객체 + 매열로 반환되었는데, 이걸 콜하는 방법은 ?
  console.log(map_pin[0].latlng.Ma);

  for (let all_pin of map_pin) {
    var loctions = new kakao.maps.LatLng(all_pin.latlng.La, all_pin.latlng.Ma);

    // var marker = new kakao.maps.Marker({
    //   map: mapContainer, // 마커를 표시할 지도
    //   position: loctions // 마커를 표시할 위치
    // });

    console.log(loctions);
  }
}
refrash_mappins();