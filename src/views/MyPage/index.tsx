import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { createPortal } from 'react-dom';
import Modal from 'src/components/Modal';
import MyPageUserInfo from './UserInfo';
import MyPageUserInfoUpdate from './UserInfoUpdate';
import { getMyLevelRequest, getMyPageBoardRequest, passwordReCheckRequest } from 'src/apis';
import { ACCESS_TOKEN, BOARD_VIEW_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_ABSOLUTE_PATH, MY_PAGE_MAIN_ABSOLUTE_PATH } from 'src/constants';
import Pagination from 'src/components/Pagination';
import { Comment, MyPageBoard } from 'src/types/interfaces';
import { usePasswordReCheckStore, useSignInUserStore } from 'src/stores';
import { useMyPageInfo, usePagination} from 'src/hooks';
import { GetMyLevelResponseDto, GetMyPageBoardResponseDto } from 'src/apis/dto/response/mypage';
import { ResponseDto } from 'src/apis/dto/response';
import BasicIcon from 'src/assets/images/basic-level-icon.png';
import TreeIcon from 'src/assets/images/tree-level-icon.png';
import ForestIcon from 'src/assets/images/forest-level-icon.png';
import MountainIcon from 'src/assets/images/mountain-level-icon.png';
import EarthIcon from 'src/assets/images/earth-level-icon.png';

import './style.css';
import { PasswordReCheckRequestDto } from 'src/apis/dto/request/mypage';

// component: 사용자 등급 모달 컴포넌트 //
function MyLevel() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 로그인 유저 등급 상태 //
  const [userLevel, setUserLevel] = useState<number>(1);
  // state: 로그인 유저 점수 상태 //
  const [userScore, setUserScore] = useState<number>(0);

  // variable: accessToken //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: get my level response 처리 함수 //
  const getMyLevelResponse = (responseBody: GetMyLevelResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
    
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { userLevel, userScore } = responseBody as GetMyLevelResponseDto;
    setUserLevel(userLevel);
    setUserScore(userScore);
  };

  // effect: //
  useEffect(() => {
    if (!accessToken) return;
    getMyLevelRequest(accessToken).then(getMyLevelResponse);
  }, []);

  // render: 사용자 등급 모달 컴포넌트 렌더링 //
  return(
    <div className='user-level-container'>
      <div className='user-level-box'>
        <div className='user-level'>👊회원 등급: Lv.{userLevel}</div>
        <div className='user-score'>🍀회원 점수: {userScore}점</div>
      </div>
    </div>
  )
}

// interface: 마이페이지 테이블 레코드 컴포넌트 속성 //
interface TableItemProps {
  myBoards: MyPageBoard;
}

// component: 마이페이지 테이블 레코드 컴포넌트 //
function TableItem({ myBoards }: TableItemProps) {

  // state: my boards 정보 상태//
  const { boardNumber, boardImage, boardTitle, boardWriteDate, boardViewCount } = myBoards;

  // state: Good 사용자 리스트 상태 //
  const [goods, setGoods] = useState<string[]>([]);

  // state: comment 리스트 상태 //
  const [comments, setComments] = useState<Comment[]>([]);

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    if (!boardNumber) return;
    navigator(BOARD_VIEW_ABSOLUTE_PATH(boardNumber));
  };

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    
  }, []);

  // render: 마이페이지 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='board-box' onClick={onClick}>
      <div className='board-image'>{boardImage}</div>
      <div className='board-info-container'>
        <div className='title'>{boardTitle}</div>
        <div className='write-date'>{boardWriteDate}</div>
        <div className='sub-container'>
          <div className='sub-box'>
            <div className='icon view-count'/> {boardViewCount}
          </div>
          <div className='sub-box'>
            <div className='icon good-count'/> {goods.length}
          </div>
          <div className='sub-box'>
            <div className='icon comment-count'/> {comments.length}
          </div>
        </div>
      </div>
    </div>
  )
}

// component: 마이페이지 메인 화면 컴포넌트 //
export default function MyPageMain() {

  // state: 경로 상태 //
  const {pathname} = useLocation();
  // state: 로그인 사용자 비밀번호 재확인 상태 - 마이페이지로 이동시 //
  const { isVerified } = usePasswordReCheckStore();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 페이지네이션 상태 //
  const {
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList
  } = usePagination<MyPageBoard>();

  // state: 로그인 유저 닉네임 정보 상태 //
  const { userNickname } = useSignInUserStore();

  // state: 로그인 유저 등급 상태 //
  const [userLevel, setUserLevel] = useState<number>(1);
  // state: 로그인 유저 점수 상태 //
  const [userScore, setUserScore] = useState<number>(0);

  // state: 사용자 등급 모달 오픈 상태 //
  const [isLevelOpen, setLevelOpen] = useState<boolean>(false);
  // state: 사용자 정보 모달 오픈 상태 //
  const [isInfoOpen, setInfoOpen] = useState<boolean>(false);
  // state: 사용자 정보 수정 모달 오픈 상태 //
  const [isInfoUpdateOpen, setInfoUpdateOpen] = useState<boolean>(false);

  // variable: accessToken //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 사용자 등급 이미지 스타일 //
  const userLevelStyle = { backgroundImage: `url(${
    userLevel === 5 ? EarthIcon : 
    userLevel === 4 ? MountainIcon : 
    userLevel === 3 ? ForestIcon : 
    userLevel === 2 ? TreeIcon : BasicIcon })` };

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: 로그인 사용자 등급 갱신 정보 //
  const updateMyPageInfo = useMyPageInfo();

  // function: get my level response 처리 함수 //
  const getMyLevelResponse = (responseBody: GetMyLevelResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
    
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { userLevel } = responseBody as GetMyLevelResponseDto;
    setUserLevel(userLevel);
    setUserScore(userScore);
  };

  // function: get my page board response 처리 함수 //
  const getMyPageBoardResponse = (responseBody: GetMyPageBoardResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' : 
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { myBoards } = responseBody as GetMyPageBoardResponseDto;
    setTotalList(myBoards);
  };

  // event handler: 유저 등급 및 점수 보기 버튼 클릭 이벤트 처리 //
  const onUserLevelClickHandler = () => {
    if (!accessToken) return;
    setLevelOpen(!isLevelOpen);
  };

  // event handler: 내 정보 버튼 클릭 이벤트 처리 //
  const onUserInfoClickHandler = () => {
    setInfoOpen(!isInfoOpen);
  };

  // event handler: 내 정보 수정 버튼 클릭 이벤트 처리 //
  const onUserInfoUpdateClickHandler = () => {
    setInfoUpdateOpen(!isInfoUpdateOpen);
  };

  // effect: cookie의 accessToken과 경로가 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!accessToken) navigator(MAIN_ABSOLUTE_PATH);
  }, [accessToken, pathname]);

  // effect: 비밀번호 재확인 인증이 없을 시 실행할 함수 //
  useEffect(() => {
    if (!isVerified) navigator(MY_PAGE_ABSOLUTE_PATH, { replace: true });
  }, [isVerified, navigator]);

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    updateMyPageInfo();
    getMyLevelRequest(accessToken).then(getMyLevelResponse);
    getMyPageBoardRequest(accessToken).then(getMyPageBoardResponse);
  }, []);

  // render: 마이페이지 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='mypage-main-wrapper'>
      <div className='user-container'>
        <div className='user-card'>
          <div className='user-box'>
            <div className='user-level-icon' style={userLevelStyle} onClick={onUserLevelClickHandler}></div>
            {isLevelOpen && createPortal(
            <Modal title='사용자 등급' onClose={onUserLevelClickHandler}>
              <MyLevel />
            </Modal>,
            document.body
            )}
            <div className='user-nickname'>{userNickname}</div>
          </div>
          <div className='user-button-box'>
            <div className='info-button' onClick={onUserInfoClickHandler}>내 정보</div>
            {isInfoOpen && createPortal(
            <Modal title='사용자 정보' onClose={onUserInfoClickHandler}>
              <MyPageUserInfo onModalViewChange={onUserInfoClickHandler} />
            </Modal>,
            document.body
            )}
            <div className='info-button' onClick={onUserInfoUpdateClickHandler}>내 정보 수정</div>
            {isInfoUpdateOpen && createPortal(
            <Modal title='사용자 정보 수정' onClose={onUserInfoUpdateClickHandler}>
              <MyPageUserInfoUpdate onModalViewChange={onUserInfoUpdateClickHandler} />
            </Modal>,
            document.body
            )}
          </div>
        </div>
      </div>
      <div className='my-board-container'>
        <div className='my-board-title'>나의 게시물
          <div className='divider'></div>
        </div>
        {viewList.length === 0 ? 
        <div className='no-boards-message'>작성하신 게시글이 없습니다.</div> : 
        viewList.map((myBoards, index) => <TableItem key={index} myBoards={myBoards} />)}
        <div className='pagination-container'>
          {totalSection !== 0 &&
          <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            totalSection={totalSection}
            pageList={pageList}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
          />
          }
        </div>
      </div>
    </div>
  )
}
