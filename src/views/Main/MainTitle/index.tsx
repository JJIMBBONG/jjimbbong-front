import React, { useState } from 'react'

import TitleLogo from 'src/assets/images/white_rough_logo.png';

import './style.css'
import AddressCategory from 'src/components/AddressCategory';
import DetailCatebory from 'src/components/DetailCategory';
import { getFillterdBoardRequest } from 'src/apis';

export default function MainTitle() {

  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string>('');

  const handleSearch = async () => {
    const response = await getFillterdBoardRequest(selectedRegion, selectedDetail);
    console.log(response);
  };
  
  return (
    <div id='wrapper-title'>
        <div className='title-box'>
            <div className='title'>찜뽕!</div>
            <img className='title-logo' src={TitleLogo}/>
        </div>
        <div className='category-wrapper'>
          <div className='category-select'>
          <div className='category-address'>
            <AddressCategory onSelect={setSelectedRegion}/>
          </div>
          <div className='category-detail'>
            <DetailCatebory onSelect={setSelectedDetail}/>
          </div>
          </div>
          <div className='category-search-button' onClick={handleSearch}>검색하기</div>
        </div>
        
    </div>
  )
}
