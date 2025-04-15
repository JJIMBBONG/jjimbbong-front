import React from 'react';

import './style.css';

export default function MyPageUserInfoUpdate() {
  return (
    <div id='user-update-container'>
      <div className='update-image-box'>
        <div className='update-image'></div>
      </div>
      <div className='user-update-box'>
        <div className='user-update-row'>
          <div className='title'>아이디</div>
          <div className='content'>qwer1234</div>
        </div>
        <div className='user-update-row'>
          <div className='title'>닉네임</div>
          <input type='text'/>
        </div>
        <div className='user-update-row'>
          <div className='title'>비밀번호</div>
          <input type='text'/>
        </div>
        <div className='user-update-row'>
          <div className='title'>비밀번호 확인</div>
          <input type='text'/>
        </div>
        <div className='user-update-row'>
          <div className='title'>이름</div>
          <div className='content'>홍길동</div>
        </div>
        <div className='user-update-row'>
          <div className='title'>성별</div>
          <div className='content'>남</div>
        </div>
        <div className='user-update-row'>
          <div className='title'>주소</div>
          <div className='address-area'>
            <input readOnly />
            <div className='address-button'>주소 검색</div>
          </div>
        </div>
        <div className='user-update-row'>
          <div className='title'>상세주소</div>
          <input />
        </div>
      </div>
      <div className='update-button-box'>
        <div className='button'>수정</div>
        <div className='button'>취소</div>
      </div>
    </div>
  )
}
