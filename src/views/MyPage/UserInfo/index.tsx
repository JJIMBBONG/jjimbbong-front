import React from 'react';

import './style.css';

// interface: 로그인 사용자 정보 컴포넌트 속성 //
interface UserInfoProps {
  onModalViewChange: () => void;
}

// component: 로그인 사용자 정보 컴포넌트 //
export default function MyPageUserInfo({onModalViewChange}: UserInfoProps) {

  // event handler: 나가기 버튼 클릭 이벤트 처리 //
  const onExitClickHandler = () => {
    onModalViewChange();
  };

  // render: 로그인 사용자 정보 컴포넌트 렌더링 //
  return (
    <div id='user-info-container'>
      <div className='image-box'>
        <div className='profile-image'/>
      </div>
      <div className='user-info-box'>
        <div className='user-info-row'>
          <div className='title'>아이디</div>
          <div className='content'>qwer1234</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>닉네임</div>
          <div className='content'>qwer1234</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>이름</div>
          <div className='content'>홍길동</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>성별</div>
          <div className='content'>남</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>주소</div>
          <div className='content'>부산광역시 부산진구 중앙대로 668</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>상세주소</div>
          <div className='content'>402호</div>
        </div>
      </div>
      <div className='button-box'>
        <div className='button' onClick={onExitClickHandler}>나가기</div>
      </div>
    </div>
  )
}
