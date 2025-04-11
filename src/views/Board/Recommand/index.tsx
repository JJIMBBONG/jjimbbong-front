import React from 'react'
import { useNavigate } from 'react-router';
import { BOARD_VIEW_ABSOLUTE_PATH } from 'src/constants';
import type { RecommandBoard } from 'src/types/interfaces'

interface TableItemProps {
  recommandBoards : RecommandBoard;
}

// component : 추천 게시물 레코드 컴포넌트 //

function TableItem({recommandBoards} : TableItemProps){

  const {boardNumber, addressCategory, detailCategory, writeDate, title, viewCount, score, image} = recommandBoards;

  const onclick = () => {
    navigator(BOARD_VIEW_ABSOLUTE_PATH(boardNumber));
  }
  // function : 네비게이터 함수 //
  const navigator = useNavigate();
  return (
    <div className='card-body' onClick={onclick}>
      <div className='card-first-wrap'>
        <img className='card-image' src={image} alt="" />
      </div>
      <div className='card-second-wrap'>
        <div className='card-title'>{title}</div>
        <div className='card-good'>
          <img className='good-image' src="" />
          <div className='good-length'></div>
        </div>
      </div>
      <div className='card-third-wrap'>
        <div className='card-writer-tier'></div>
        <div className='card-writer-nickname'></div>
      </div>
    </div>
  )
}

  

// 추천 게시물 //
export default function RecommandBoard() {
  return (
    <div>RecommandBoard</div>
  )
}
