/* global naver */ // 현재 파일 전체 코드를 naver maps로 지정한다.
import { useEffect, useState } from "react";

function NaverMap() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionData, setRegionData] = useState(null); // 관광 정보 등

  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      console.error("네이버 지도 API가 아직 로드되지 않았어요.");
      return;
    }

    const koreaBounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(33.0, 124.5),
      new naver.maps.LatLng(39.5, 132.0)
    );

    const mapDiv = document.getElementById("map");
    const map = new naver.maps.Map(mapDiv, {
      center: new naver.maps.LatLng(35.1796, 129.0756), // 부산 중심 좌표
      zoom: 10,
      minZoom: 7,
      maxZoom: 14,
      maxBounds: koreaBounds,
    });

    fetch("/data/korea-sgg.geojson")  // 지도 경계 데이터
      .then((res) => res.json())
      .then((data) => {
        data.features.forEach((feature) => {
          const name = feature.properties.SGG_NM;
          const coords = feature.geometry.coordinates;
          const type = feature.geometry.type;

          let paths = [];

          if (type === "Polygon") {
            paths = coords.map((ring) =>
              ring.map(([lng, lat]) => new naver.maps.LatLng(lat, lng)) // 각 폴리곤을 naver.maps.LatLng 객체로 변환하여 paths 배열에 저장합니다.
            );
          } else if (type === "MultiPolygon") {
            paths = coords.flat().map((ring) =>
              ring.map(([lng, lat]) => new naver.maps.LatLng(lat, lng))
            );
          }

          const polygon = new naver.maps.Polygon({
            map,
            paths,
            clickable: true,
            strokeColor: "#fff",
            strokeWeight: 1,
            fillColor: "#b4e2d5",
            fillOpacity: 0.4,
          });

          naver.maps.Event.addListener(polygon, "mouseover", () => {
            polygon.setOptions({ fillColor: "#fca5a5", fillOpacity: 0.6 });
          });

          naver.maps.Event.addListener(polygon, "mouseout", () => {
            polygon.setOptions({ fillColor: "#b4e2d5", fillOpacity: 0.4 });
          });

          naver.maps.Event.addListener(polygon, "click", () => {
            setSelectedRegion(name);

            // ✅ 지역 관련 관광정보 불러오기
            fetch(`/api/region-info?region=${encodeURIComponent(name)}`) // API 정해지면 수정
              .then((res) => res.json())
              .then((data) => {
                setRegionData(data); // 맛집, 관광지, 축제 등
              })
              .catch((err) => {
                console.error("지역 정보 로딩 실패:", err);
              });
          });
        });
      });
  }, []);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100vh" }} />

      {selectedRegion && regionData && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            padding: "1rem 2rem",
            border: "1px solid #ccc",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxWidth: "500px",
          }}
        >
          <h2>{selectedRegion} 지역 정보</h2>
          <h4>🍽 맛집</h4>
          <ul>
            {regionData.restaurants?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <h4>🗺 관광지</h4>
          <ul>
            {regionData.sights?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <h4>🎉 지역축제</h4>
          <ul>
            {regionData.festivals?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <button onClick={() => setSelectedRegion(null)} style={{ marginTop: "1rem" }}>
            닫기
          </button>
        </div>
      )}
    </>
  );
}

export default NaverMap;

