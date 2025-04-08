import React, { useRef, useState } from 'react'
import {Outlet, useNavigate} from 'react-router';
import NavLogo from 'src/assets/images/small_logo.png'

import './style.css';
import { MAIN_ABSOLUTE_PATH } from 'src/constants';

// component : 공통 레이아웃 컴포넌트 //
export default function Layout() {

    const navigator = useNavigate();

    // state : 로그인 상태
    const [login, setLogin] = useState<boolean>(true);

    // state: My Content 드롭다운 상태 //
    const [showMyContent, setShowMyContent] = useState<boolean>(false);

    // event handler: 홈 클릭 이벤트 처리 //
    const onHomeClickHandler = () => {
        navigator(MAIN_ABSOLUTE_PATH);
    };

    // event handler: My Content 클릭 이벤트 처리 //
    const onMyContentClickHandler = () => {
        setShowMyContent(!showMyContent);
    };

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
                                    <div className='map-logo'>지도</div>
                                    <div className='my-content' onClick={onMyContentClickHandler}>
                                    {showMyContent &&
                                        <div ref={myContentListRef} className='my-content-list'>
                                            <div className='my-content-item'>마이페이지</div>
                                            <div className='my-content-item'>로그아웃</div>
                                        </div>
                                    }
                                    </div>
                                    
                                </div>
                                :
                                <div className='nav-right-content'>
                                    <div className='map-logo'>지도</div>
                                    <div className='login'>Login</div>
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
