import React, { useState } from 'react';
import './style.css';

const 게시글작성페이지 = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDetailedLocation, setSelectedDetailedLocation] = useState('');

  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setIsLocationModalOpen(false);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSelectedDetailedLocation(''); // 광역시/도 선택 시 하위 지역 초기화
  };

  const handleDetailedLocationSelect = (detailedLocation: string) => {
    setSelectedDetailedLocation(detailedLocation);
  };

  const handleLocationConfirm = () => {
    if (selectedLocation && selectedDetailedLocation) {
      alert(`선택된 지역: ${selectedLocation} ${selectedDetailedLocation}`);
      // 실제로는 상태를 업데이트하거나 다른 처리를 수행
      closeLocationModal();
    } else if (selectedLocation) {
      alert(`선택된 지역 (광역시/도): ${selectedLocation}`);
      closeLocationModal();
    } else {
      alert('지역을 선택해주세요.');
    }
  };

  return (
    <div id='diary-write-wrapper'>
      <div className='write-container'>
        <div className='write-title'>게시글 작성</div>
        <div className='contents-container'>
          {/* 상단 바 */}
          <div className="top-bar">
            <div className="left-icons">
              <div>⚙️</div>
            </div>
            <div className="right-icons">
              <div>👤</div>
              <div>🔑</div>
            </div>
          </div>

          {/* 위치 선택 버튼 */}
          <div className="location-selection">
            <button onClick={openLocationModal}>
              {selectedLocation ? (
                selectedDetailedLocation ? `${selectedLocation} ${selectedDetailedLocation}` : selectedLocation
              ) : '지역을 선택해주세요.'}
            </button>
            {/* 나머지 기존 위치 선택 버튼들은 제거하거나 다른 용도로 사용 */}
            {/* <button>부산광역시</button>
            <button>부산진구</button> */}
          </div>

          {/* 카테고리 선택 */}
          <div className="category-selection">
            <div className="category-label">카테고리 선택</div>
            <div className="category-buttons">
              <button className="selected">✔️ 카테고리 1</button>
              <button>카테고리 2</button>
              <button>카테고리 3</button>
              <button>카테고리 4</button>
              <button>카테고리 5</button>
            </div>
          </div>

          {/* 제목 입력 */}
          <div className='input-column-box'>
            <div className='title'>제목</div>
            <input type='text' placeholder='제목을 입력하세요' />
          </div>

          {/* 내용 입력 툴바 */}
          <div className="content-toolbar">
            <div>🖼️</div>
            <div>🎬</div>
            <div>T</div>
            <div>📎</div>
          </div>

          {/* 내용 입력 */}
          <div className='input-column-box'>
            <div className='title'>내용</div>
            <textarea placeholder="내용을 입력해주세요." />
          </div>

          {/* 하단 버튼들 */}
          <div className='button-box'>
            <div className="cancel-button">취소</div>
            <div className="submit-button">작성 완료</div>
          </div>

          {/* 위치 선택 모달 */}
          {isLocationModalOpen && (
            <div className="location-modal-overlay">
              <div className="location-modal">
                <div className="location-modal-header">
                  지역 선택
                  <button onClick={closeLocationModal} className="modal-close-button">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                <div className="location-modal-body">
                  <div className="location-select-column">
                    <div className="location-select-title">선택 1</div>
                    <button onClick={() => handleLocationSelect('서울')}>서울</button>
                    <button onClick={() => handleLocationSelect('경기')}>경기</button>
                    {/* ... 나머지 광역시/도 버튼들 */}
                    <button onClick={() => handleLocationSelect('부산')}>부산</button>
                    {/* ... */}
                  </div>
                  {selectedLocation && (
                    <div className="location-select-column">
                      <div className="location-select-title">선택 2</div>
                      {selectedLocation === '부산' && (
                        <>
                          <button onClick={() => handleDetailedLocationSelect('해운대구')}>해운대구</button>
                          <button onClick={() => handleDetailedLocationSelect('서면')}>서면</button>
                          {/* ... 부산의 하위 지역 버튼들 */}
                        </>
                      )}
                      {selectedLocation === '서울' && (
                        <>
                          <button onClick={() => handleDetailedLocationSelect('강남구')}>강남구</button>
                          <button onClick={() => handleDetailedLocationSelect('종로구')}>종로구</button>
                          {/* ... 서울의 하위 지역 버튼들 */}
                        </>
                      )}
                      {/* 다른 광역시/도에 따른 하위 지역 버튼들 추가 */}
                    </div>
                  )}
                </div>
                <div className="location-modal-footer">
                  <button onClick={handleLocationConfirm} className="location-confirm-button">선택 완료</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};