import React from 'react'
import { useState, useEffect } from 'react';
import regionData from 'src/assets/data/regionCodes.json'
import { Region } from 'src/types/interfaces';

type Props = {
    onSelect: (areaCode: number | null, sigunguCode: number | null) => void;
};

export default function AddressCategory({ onSelect }: Props) {
    const regions: Region[] = regionData;
    const [selectedAreaCode, setSelectedAreaCode] = useState<number | null>(null);
    const [selectedSigunguCode, setSelectedSigunguCode] = useState<number | null>(null);

    const areaCodeMap: Record<number, string> = {
        1: "서울특별시",
        2: "인천광역시",
        3: "대전광역시",
        4: "대구광역시",
        5: "광주광역시",
        6: "부산광역시",
        7: "울산광역시",
        8: "세종특별자치시",
        31: "경기도",
        32: "강원도",
        33: "충청북도",
        34: "충청남도",
        35: "경상북도",
        36: "경상남도",
        37: "전라북도",
        38: "전라남도",
        39: "제주특별자치도",
    };


    //regions.forEach((region) => {
    //    console.log(region.areaCode, region.regionName);
    //});


    // 중복 제거된 areaCode 리스트
    const uniqueAreaCodes = Array.from(
        new Set(regionData.map((region) => region.areaCode))
    );

    const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Number(event.target.value);
        setSelectedAreaCode(selected || null);
        setSelectedSigunguCode(null); // 지역 바뀌면 구 초기화
        onSelect(selected, null);
    };

    const handleSigunguChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Number(event.target.value) || null;
        setSelectedSigunguCode(selected);
        onSelect(selectedAreaCode, selected);
    };

    // 선택된 areaCode에 따른 구/군 필터링
    const filteredSigungu = regionData.filter(
        (region) => region.areaCode === selectedAreaCode
    );

    return (
        <div className="regionSelect-wrapper">

            <label>지역</label>
            <select defaultValue="" onChange={handleAreaChange}>
                <option value="">-- 시/도 선택 --</option>
                {uniqueAreaCodes.map((code) => (
                <option key={code} value={code}>
                    {areaCodeMap[code]}
                </option>
                ))}
            </select>

        {selectedAreaCode && (
            <select onChange={handleSigunguChange}>
                <option value="">선택하세요</option>
                {filteredSigungu.map((region) => (
                <option key={region.sigunguCode} value={region.sigunguCode}>
                    {region.regionName}
                </option>
                ))}
            </select>
        )}
    </div>
    )
}
