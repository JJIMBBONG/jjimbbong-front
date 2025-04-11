/* global naver */ // 현재 파일 전체 코드를 naver maps로 지정한다.
import { useEffect, useState } from "react";
import regionCodes from "./regionCodes.json"
import "./NaverMap.css";

function NaverMap() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionData, setRegionData] = useState(null); // 관광 정보 등
  // Check 여기가봤어, 길찾기 토글 상태
  const [showCheck, setShowCheck] = useState(false);

  // 축제 일정기간 
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4,6)}-${dateStr.slice(6, 8)}`;
  };

  const fetchFestivalData = async (areaCode, sigunguCode) => {
    try {
      // 백엔드 연결시 제거
      const serviceKey = "vvbWIqafswD60L%2Fz5l1eUwiu835Akri6p5UQFwTnGcPwd8J%2FNQzaNgtzPiwatqxbdu%2BQk0por8jYm0UopoVUtA%3D%3D";
      const url = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${serviceKey}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=MapApp&eventStartDate=20250401&areaCode=${areaCode}&sigunguCode=${sigunguCode}&_type=json`;

      const res = await fetch(url);
      const data = await res.json();
      // 여기서 data는 공공데이터에서 받아온 원본 JSON
      const items = data?.response?.body?.items?.item || [];

      return items.map((item) => ({
        title: item.title,
        startDate: item.eventstartdate,
        endDate: item.eventenddate,
        image: item.firstimage,
        address: item.addr1
      }))
    } catch (err) {
      console.error("축제정보 불러오기 실패:", err);
      return [];
    }
  }

  useEffect(() => {
    if (!window.naver || !window.naver.maps) return;

    const mapDiv = document.getElementById("map");
    const map = new naver.maps.Map(mapDiv, {
      center: new naver.maps.LatLng(35.1796, 129.0756), // 부산 중심 좌표
      zoom: 10,
      minZoom: 7,
      maxZoom: 14,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(33.0, 124.5),
        new naver.maps.LatLng(39.5, 132.0)
      ),
    });

    // GeoJSON 파일을 가져와서 각 지역의 폴리곤을 지도에 표시
    fetch("/data/korea-sgg.geojson")
      .then((res) => res.json())
      .then((data) => {
        data.features.forEach((feature) => {
          const name = feature.properties.SGG_NM; // 시 군 구 이름
          const coords = feature.geometry.coordinates;
          const paths = (feature.geometry.type === "Polygon" 
            ? coords.map((ring) => ring.map(([lng, lat]) => new naver.maps.LatLng(lat, lng)))
            : coords.flat().map((ring) => ring.map(([lng, lat]) => new naver.maps.LatLng(lat, lng))));


          const polygon = new naver.maps.Polygon({
            map,
            paths,
            clickable: true,
            strokeColor: "#fff",
            strokeWeight: 1,
            fillColor: "#b4e2d5",
            fillOpacity: 0.4,
          });

          naver.maps.Event.addListener(polygon, "mouseover", () => {polygon.setOptions({ fillColor: "#fca5a5", fillOpacity: 0.6 });});

          naver.maps.Event.addListener(polygon, "mouseout", () => {polygon.setOptions({ fillColor: "#b4e2d5", fillOpacity: 0.4 });});

          naver.maps.Event.addListener(polygon, "click", async () => {
            setSelectedRegion(name);
            const cleanName = name.trim().replace(/^(서울특별시|부산광역시|대구광역시|인천광역시|광주광역시|대전광역시|울산광역시|세종특별자치시|경기도|강원도|충청북도|충청남도|전라북도|전라남도|경상북도|경상남도|제주특별자치도)\s*/, "")
            const normalize = (s) => s.replace(/\s/g, "").replace(/시|군|구/g, "").trim();
            const cleanNorm = normalize(cleanName);

            // const 사용시 값을 바꿀수없어 다음 축제 정보가 재할당 되지않음
            let region = regionCodes.find((r) => normalize(r.regionName) === cleanNorm) || 
                         regionCodes.find((r) => normalize(r.regionName).includes(cleanName) || cleanNorm.includes(r.regionName));

            if (!region) {
              setRegionData({ festivals: [], popups: [], restaurants: []});
              return;
            }

            const festivals = await fetchFestivalData(region.areaCode, region.sigunguCode);
            const filteredFestivals = festivals.filter(f => f.address?.includes(cleanName) || f.address?.includes(name));

            // 팝업정보 추후 데이터베이스 연결
            const popupRes = await fetch("/data/popup.json");
            const allPopups = await popupRes.json();

            const matchedPopups = allPopups.filter(p => 
              p.region === name || name.includes(p.region) || p.region.includes(name)
            );

            // 맛집
            const restaurantRes = await fetch("/data/restauran.json");
            const allRestarant = await restaurantRes.json();

            const matchedRestarant = allRestarant.filter(r => 
              r.region === name || name.includes(r.region) || r.region.includes(name));

            // 지역 관련 관광정보 불러오기
            const testData = {
              festivals: filteredFestivals,
              popups: matchedPopups,
              restaurants: matchedRestarant
            };
            setRegionData(testData);
          });
        });
      });
  }, []);

  return (
    <div className="map-container">
      <div id="map" className="map" />

      <div className="panel">
        {selectedRegion && regionData ? (
          <>
          {/* Check! 여기 가봤어? 카드 */}
          <div className="card">
            <button className="toggle-header" onClick={()=> setShowCheck(!showCheck)}>📍 Check! 여기 가봤어? <span>{showCheck ? "▲" : "▼"}</span></button>
            {showCheck && (
                <button className="action-button">추억 보러 가기</button>
            )}
          </div>

          {/* 길찾기 카드 */}
          <div className="card">
            <button className="action-button" onClick={() => window.open("https://map.naver.com/v5/direction", "_blank")}>🗺 길찾기</button>
          </div>
            
          {/* 지역 정보 카드들 */}
            <h2 className="title">{selectedRegion} 지역 정보</h2>

            <div className="card">
              <h3 className="card-title">🎉 지역 행사</h3>
              <ul className="list">
                {regionData.festivals.length > 0 ? (
                  regionData.festivals.map((f, i) => (
                    <li key={i}>
                      <p>{f.title}</p>
                      <p>{formatDate(f.startDate)} ~ {formatDate(f.endDate)}</p>
                      {f.image && <img src={f.image} alt={f.title} style={{ width: "100px" }} />}
                      <p>{f.address}</p>
                    </li>
                  )) 
                ) : (<li className="text-gray-500">등록된 축제가 없습니다.</li>)
                }
              </ul>
            </div>

            <div className="card">
              <h3 className="card-title">🛍 팝업스토어</h3>
              <ul className="list">
                {regionData.popups?.length > 0 ? (
                  regionData.popups.map((p, i) => (
                    <li key={i}>
                      <p>{p.title}</p>
                      <p>{p.region}</p>
                      <p>{p.date}</p>
                      {p.image && <img src={p.image} alt={p.title} style={{ width: "100px"}} />}
                    </li>
                  ))
                ) : (
                  <li>등록된 팝업스토어가 없습니다.</li>
                )}
              </ul>
            </div>

            <div className="card">
              <h3 className="card-title">🍽 맛집</h3>
                <ul className="list">
                  {regionData.restaurants?.length > 0 ? (
                    regionData.restaurants.map((r, i) => (
                      <li key={i}>
                        <p>{r.title}</p>
                        <p>{r.region}</p>
                        <p>{r.address}</p>
                      </li>
                    ))
                  ) : (
                    <li>등록된 맛집이 없습니다.</li>
                  )}
                </ul>
            </div>

            <button onClick={() => setSelectedRegion(null)} className="close-button">
              닫기
            </button>
          </>
        ) : (
          <p style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>지역을 누르면 지역정보가 나옵니다.</p>
        )}
      </div>
    </div>
  );
}

export default NaverMap;

