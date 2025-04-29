import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { getBoardRequest, getCommentRequest, postCommentRequest } from 'src/apis';
import { ACCESS_TOKEN, BOARD_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetBoardResponseDto, GetCommentResponseDto } from 'src/apis/dto/response/board';
import { ResponseDto } from 'src/apis/dto/response';
import { Comment } from 'src/types/interfaces';
import { useSignInUserStore } from 'src/stores';
import { PostCommentRequestDto } from 'src/apis/dto/request/board';

interface CommentItemProps {
  comments : Comment;
}

// component : 댓글 컴포넌트 //

function CommentItem({comments}:CommentItemProps){

  const {commentNumber, commentContent, commentWriterId, userLevel, userNickname, commentWriteDate} = comments;
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];
  const { userId } = useSignInUserStore();

  return (
    <div className='comment-body'>
      <div className='comment-writer-level'>레벨 : {userLevel}</div>
      <div className='comment-info-wrapper'>
        <div className='comment-info'>
          <div className='comment-info-detail'>
            <div className='comment-writer-nickname'>{userNickname}</div>
            <div className='comment-write-date'>{commentWriteDate}</div>
          </div>
          {
            userId === commentWriterId && <div className='comment-delete-btn'>삭제</div>
          }
        </div>
        <div className='comment-content'>{commentContent}</div>
      </div>
    </div>
  )
}

export default function BoardDetail() {
  
  const { boardNumber } = useParams();
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];
  const navigate = useNavigate();
  // state: 로그인 사용자 아이디 상태 //
  const { userId } = useSignInUserStore();

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

  // state: 댓글 상태 //
  const [commentContent, setCommentContent] = useState<string>('');
  // state: 댓글 리스트 상태 //
  const [comments, setComments] = useState<Comment[]>([]);

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

    // function: get comment response 처리 함수 //
    const getCommentResponse = (responseBody: GetCommentResponseDto | ResponseDto | null) => {
      const message =
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
      
      const isSuccess = responseBody !== null && responseBody.code === 'SU';
      if (!isSuccess) {
        alert(message);
        return;
      }
  
      const { comments } = responseBody as GetCommentResponseDto;
      setComments(comments);
    };
  
    // function: post comment response 처리 함수 //
    const postCommentResponse = (responseBody: ResponseDto | null) => {
      const message =
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
      
      const isSuccess = responseBody !== null && responseBody.code === 'SU';
      if (!isSuccess) {
        alert(message);
        return;
      }
  
      setCommentContent('');
      if (!boardNumber) return;
      getCommentRequest(Number(boardNumber)).then(getCommentResponse);
    };

    // event handler: 댓글 변경 이벤트 처리 //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setCommentContent(value);
    };

    // event handler: 댓글 작성 클릭 이벤트 처리 //
  const onPostCommentClickHandler = () => {
    if(!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    
    if(!accessToken || !boardNumber || !commentContent.trim()) return;

    const requestBody: PostCommentRequestDto = {
      commentContent
    };
    postCommentRequest(requestBody, boardNumber, accessToken).then(postCommentResponse);
    //console.log('전송할 댓글 내용:', commentContent);
  };
  

  useEffect(() => {
    if (!boardNumber) {
      navigate(BOARD_ABSOLUTE_PATH);
      return;
    }
    getBoardRequest(Number(boardNumber)).then(getBoardResponse);
    getCommentRequest(Number(boardNumber)).then(getCommentResponse);
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
          <textarea value={commentContent} placeholder="댓글을 입력하세요" onChange={onCommentChangeHandler} />
          <button className="comment-btn" onClick={onPostCommentClickHandler}>댓글 작성</button>
        </div>

        <div className="comment-list">
        {comments.map((commentItem, index) => 
            <CommentItem key={index} comments={commentItem} />
        )}
        </div>

      </div>
    </div>
  );
}

