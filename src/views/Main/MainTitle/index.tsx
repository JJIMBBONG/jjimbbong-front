import React from 'react'

import TitleLogo from 'src/assets/images/white_rough_logo.png';

import './style.css'

export default function MainTitle() {
  return (
    <div id='wrapper-title'>
        <div className='title-box'>
            <div className='title'>찜뽕</div>
            <img className='title-logo' src={TitleLogo}/>
        </div>
        <div>
          <label htmlFor="">지역</label>
          <select name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
        <div>
          <label htmlFor="">분야</label>
          <select name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
    </div>
  )
}
