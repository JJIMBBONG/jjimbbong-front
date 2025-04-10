import React, { useRef, useState } from 'react'
import {Outlet, useNavigate} from 'react-router';
import NavLogo from 'src/assets/images/small_logo.png'

import './style.css';
import { AUTH_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MAP_ABSOLUTE_PATH, MY_PAGE_ABSOLUTE_PATH } from 'src/constants';

// component : 공통 레이아웃 컴포넌트 //
export default function Layout() {

    const navigator = useNavigate();

    // state : 로그인 상태 //
    const [login, setLogin] = useState<boolean>(true);

    // state: My Content 드롭다운 상태 //
    const [showMyContent, setShowMyContent] = useState<boolean>(false);

    // event handler: 홈 클릭 이벤트 처리 //
    const onHomeClickHandler = () => {
        navigator(MAIN_ABSOLUTE_PATH);
    };

    // event handler : 지도 클릭 이벤트 처리 //
    const onMapClickHandler = () => {
        navigator(MAP_ABSOLUTE_PATH);
    }

    // event handler: My Content 클릭 이벤트 처리 //
    const onMyContentClickHandler = () => {
        setShowMyContent(!showMyContent);
    };

    // event handler : 마이페이지 클릭 이벤트 처리 //
    const onMyPageClickHandler = () => {
        // 비밀번호 입력 란이 먼저 나옴 //
        navigator(MY_PAGE_ABSOLUTE_PATH);
    }

    // event handler : 로그아웃 클릭 이벤트 처리 //
    const onSignOutClickHandler = () => {
        setLogin(false);
    }

    // event handler : 로그인 이벤트 처리 //
    const onSignInClickHandler = () => {
        navigator(AUTH_ABSOLUTE_PATH);
    }

    // state: My Content List 요소 참조 //
    const myContentListRef = useRef<HTMLDivElement | null>(null);

  return (
    <div id='layout-wrapper'>
        <div id='top-bar'>
            <div className='navigation'>
                <div className='navigation-list'>
                    <img className='nav-logo' src={NavLogo} width='50px' onClick={onHomeClickHandler}/>
                    
                            { login ? 
                                <div className='nav-right-content'>
                                    <div className='map-logo' onClick={onMapClickHandler}>Map</div>


                                    <div className='my-content' onClick={onMyContentClickHandler}>
                                    {showMyContent &&
                                        <div ref={myContentListRef} className='my-content-list'>
                                            <div className='my-content-item' onClick={onMyPageClickHandler}>마이페이지</div>
                                            <div className='my-content-item' onClick={onSignOutClickHandler}>로그아웃</div>
                                        </div>
                                    }
                                    </div>
                                    
                                </div>
                                :
                                <div className='nav-right-content'>

                                    <div className='map-logo' onClick={onMapClickHandler}>Map</div>
                                    <div className='login' onClick={onSignInClickHandler}>Login</div>

                                </div>
                        }
                </div>
            </div>
        </div>
        <div id='main'>
            <Outlet />
        </div>
        <div id='footer'>
            <hr />
            <div>
                footer 내용
            </div>
        </div>
    </div>
  )
}
