import React, { useEffect, useState } from 'react';
import './style.css';
import { getBoardRequest } from 'src/apis';
import { ACCESS_TOKEN, BOARD_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetBoardResponseDto } from 'src/apis/dto/response/board';
import { ResponseDto } from 'src/apis/dto/response';

export default function BoardDetail() {
  
  const {boardNumber} = useParams();
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];

  const [boardTitle, setBoardTitle] = useState<string>('');
  const [userLevel, setUserLevel] = useState<number>(1);
  const [userNickname, setUserNickname] = useState<string>('');

  const navigator = useNavigate();

  const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? 'X' :
      responseBody.code === 'DBE' ? 'DBE X' :
      responseBody.code === 'AF' ? 'AF X' :
      responseBody.code === 'NB' ? 'NB X' : 
      responseBody.code === 'VF' ? 'VF X' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      navigator(BOARD_ABSOLUTE_PATH);
      return;
    }

    const { boardTitle, userLevel, userNickname } = responseBody as GetBoardResponseDto;
    setBoardTitle(boardTitle);
    setUserLevel(userLevel);
    setUserNickname(userNickname);
  };

  useEffect(() => {
    if (!boardNumber) {
      navigator(BOARD_ABSOLUTE_PATH);
      return;
    }
    getBoardRequest(Number(boardNumber), accessToken).then(getBoardResponse);
  }, []);
  return (
    <div id='board-detail-wrapper'>
      <div className='detail-container'>
        <div className='location-path'>
          <span>부산광역시 &gt; 부산진구 &gt; 카테고리</span>
        </div>

        <div className='post-meta'>
          <div className='left'>
            <h1 className='post-title'>{boardTitle}</h1>
          </div>
          <div className='right'>
            <span className='badge'>{userLevel}</span>
            <span className='nickname'>{userNickname}</span>
            <button className='location-btn'>위치</button>
          </div>
        </div>
        
        <div className='post-content'>
          게시물 내용
        </div>

        <div className='reaction-bar'>
          조회수 &nbsp; 좋아요 수 &nbsp; 댓글 수 &nbsp; 싫어요 수
        </div>

        <div className='comment-input-section'>
          <label>작성란</label>
          <textarea placeholder='댓글을 입력하세요' disabled />
          <div className='login-warning'>로그인이 필요한 서비스입니다.</div>
          <button className='comment-btn'>댓글 작성</button>
        </div>

        <div className='comment-list'>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className='comment-box'>
              <span className='badge'>회원 등급</span>
              <div className='comment-content'>
                <span className='nickname'>작성자 닉네임</span>
                <p>작성 내용</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

