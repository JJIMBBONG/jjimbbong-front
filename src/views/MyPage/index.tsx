import React, { useState } from 'react';
import Modal from 'src/components/Modal';
import MyPageUserInfo from './UserInfo';
import MyPageUserInfoUpdate from './UserInfoUpdate';
import { useNavigate, useParams } from 'react-router';
import { BOARD_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { usePagination } from 'src/hooks';
import { useCookies } from 'react-cookie';
import { useSignInUserStore } from 'src/stores';
import { MyPageBoard } from 'src/types/interfaces';
import Pagination from 'src/components/Pagination';

import './style.css';

// interface: 마이페이지 테이블 레코드 컴포넌트 속성 //
interface TableItemProps {
  myBoards: MyPageBoard;
}

// component: 마이페이지 테이블 레코드 컴포넌트 //
function TableItem({ myBoards }: TableItemProps) {

  // state: my boards 정보 상태//
  const { boardNumber, boardImage, boardTitle, boardWriteDate, boardViewCount } = myBoards;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    if (!boardNumber) return;
    navigator(BOARD_VIEW_ABSOLUTE_PATH(boardNumber));
  };

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
            <div className='icon good-count'/> 0
          </div>
          <div className='sub-box'>
            <div className='icon comment-count'/> 0
          </div>
        </div>
      </div>
    </div>
  )
}

// component: 마이페이지 메인 화면 컴포넌트 //
export default function MyPageMain() {

  // state: cookie 상태 //
  // const [cookies] = useCookies();

  // state: 페이지네이션 상태 //
  const {
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList
  } = usePagination<MyPageBoard>();

  // state: 로그인 유저 정보 상태 //
  const { userLevel, userNickname } = useSignInUserStore();

  // state: 유저 정보 모달 오픈 상태 //
  const [isInfoOpen, setInfoOpen] = useState<boolean>(false);

  // state: 유저 정보 수정 모달 오픈 상태 //
  const [isInfoUpdateOpen, setInfoUpdateOpen] = useState<boolean>(false);

  // variable: 회원 등급 이미지 스타일 //
  let testLevel = 1; /*test 용*/
  const userLevelStyle = {
    backgroundColor: `${
      testLevel === 0 ? 'red' :
      testLevel === 1 ? 'orange' : 
      testLevel === 2 ? 'yellow' :
      testLevel === 3 ? 'green' : ''
    }`
  };

  // event handler: 내 정보 버튼 클릭 이벤트 처리 //
  const onUserInfoClickHandler = () => {
    setInfoOpen(!isInfoOpen);
  };

  // event handler: 내 정보 수정 버튼 클릭 이벤트 처리 //
  const onUserInfoUpdateClickHandler = () => {
    setInfoUpdateOpen(!isInfoUpdateOpen);
  };

  // render: 마이페이지 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='mypage-main-wrapper'>
      <div className='user-container'>
        <div className='user-card'>
          <div className='user-box'>
            <div className='user-level' style={userLevelStyle}></div>
            <div className='user-nickname'>{userNickname}홍길홍길동</div>
          </div>
          <div className='user-button-box'>
            <div className='info-button' onClick={onUserInfoClickHandler}>내 정보</div>
            {isInfoOpen &&
            <Modal title='사용자 정보' onClose={onUserInfoClickHandler}>
              <MyPageUserInfo onModalViewChange={onUserInfoClickHandler} />
            </Modal>
            }
            <div className='info-button' onClick={onUserInfoUpdateClickHandler}>내 정보 수정</div>
            {isInfoUpdateOpen &&
            <Modal title='사용자 정보 수정' onClose={onUserInfoUpdateClickHandler}>
              <MyPageUserInfoUpdate onModalViewChange={onUserInfoUpdateClickHandler} />
            </Modal>
            }
          </div>
        </div>
      </div>
      <div className='my-board-container'>
        <div className='my-board-title'>나의 게시물</div>
          {viewList.map((myBoards, index) => <TableItem key={index} myBoards={myBoards} />)}
          <div className='board-box'>
            <div className='board-image'></div>
            <div className='board-info-container'>
              <div className='title'>게시글 제목</div>
              <div className='write-date'>게시글 작성 날짜</div>
              <div className='sub-container'>
                <div className='sub-box'>
                  <div className='icon view-count'/> 0
                </div>
                <div className='sub-box'>
                  <div className='icon good-count'/> 0
                </div>
                <div className='sub-box'>
                  <div className='icon comment-count'/> 0
                </div>
              </div>
            </div>
          </div>
          <div className='board-box'>
            <div className='board-image'></div>
            <div className='board-info-container'>
              <div className='title'>게시글 제목</div>
              <div className='write-date'>게시글 작성 날짜</div>
              <div className='sub-container'>
                <div className='sub-box'>
                  <div className='icon view-count'/> 0
                </div>
                <div className='sub-box'>
                  <div className='icon good-count'/> 0
                </div>
                <div className='sub-box'>
                  <div className='icon comment-count'/> 0
                </div>
              </div>
            </div>
          </div>
        <div className='pagination-container'>
          {/* {totalSection !== 0 && */}
          <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            totalSection={totalSection}
            pageList={pageList}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
          />
          {/* } */}
        </div>
      </div>
    </div>
  )
}
