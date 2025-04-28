import React, { useEffect, useState } from 'react';
import './style.css';
import { getBoardRequest } from 'src/apis';
import { ACCESS_TOKEN, BOARD_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetBoardResponseDto } from 'src/apis/dto/response/board';
import { ResponseDto } from 'src/apis/dto/response';

export default function BoardDetail() {
  
  const { boardNumber } = useParams();
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];
  const navigate = useNavigate();

  // 필요한 state 추가
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [boardAddressCategory, setBoardAddressCategory] = useState('');
  const [boardDetailCategory, setBoardDetailCategory] = useState('');
  const [boardAddress, setBoardAddress] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userLevel, setUserLevel] = useState(1);
  const [boardWriteDate, setBoardWriteDate] = useState('');
  const [boardViewCount, setBoardViewCount] = useState(0);
  const [boardScore, setBoardScore] = useState(0);
  const [boardImage, setBoardImage] = useState<string | null>(null);

  const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? 'X' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' :
      responseBody.code === 'NB' ? '게시글이 존재하지 않습니다.' :
      responseBody.code === 'VF' ? 'VF X' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      navigate(BOARD_ABSOLUTE_PATH);
      return;
    }

    const {
      boardTitle, boardContent, boardAddressCategory, boardDetailCategory, boardAddress,
      userNickname, userLevel, boardWriteDate, boardViewCount, boardScore, boardImage
    } = responseBody as GetBoardResponseDto;

    setBoardTitle(boardTitle);
    setBoardContent(boardContent);
    setBoardAddressCategory(boardAddressCategory);
    setBoardDetailCategory(boardDetailCategory);
    setBoardAddress(boardAddress);
    setUserNickname(userNickname);
    setUserLevel(userLevel);
    setBoardWriteDate(boardWriteDate);
    setBoardViewCount(boardViewCount);
    setBoardScore(boardScore);
    setBoardImage(boardImage);
  };

  useEffect(() => {
    if (!boardNumber) {
      navigate(BOARD_ABSOLUTE_PATH);
      return;
    }
    getBoardRequest(Number(boardNumber), accessToken).then(getBoardResponse);
  }, []);

  return (
    <div id="board-detail-wrapper">
      <div className="detail-container">
        <div className="location-path">
          <span>{boardAddressCategory} &gt; {boardAddress} &gt; {boardDetailCategory}</span>
        </div>

        <div className="post-meta">
          <div className="left">
            <h1 className="post-title">{boardTitle}</h1>
            <span className="post-date">{boardWriteDate}</span>
          </div>
          <div className="right">
            <span className="badge">{userLevel}</span>
            <span className="nickname">{userNickname}</span>
            <button className="location-btn">위치</button>
          </div>
        </div>

        {boardImage && (
          <div className="board-image">
            <img src={boardImage} alt="게시글 이미지" />
          </div>
        )}

        <div className="post-content">
          {boardContent}
        </div>

        <div className="reaction-bar">
          조회수 {boardViewCount} &nbsp; 좋아요 점수 {boardScore}
        </div>

        <div className="comment-input-section">
          <label>댓글 작성란</label>
          <textarea placeholder="댓글을 입력하세요" disabled />
          <div className="login-warning">로그인이 필요한 서비스입니다.</div>
          <button className="comment-btn">댓글 작성</button>
        </div>

        <div className="comment-list">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="comment-box">
              <span className="badge">회원 등급</span>
              <div className="comment-content">
                <span className="nickname">작성자 닉네임</span>
                <p>작성 내용</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

