import React, { useState } from 'react'
import {Outlet} from 'react-router';

import './style.css';

// component : 공통 레이아웃 컴포넌트 //
export default function Layout() {

    const [login, setLogin] = useState<boolean>(false);
  return (
    <div id='layout-wrapper'>
        <div id='top-bar'>
            <div className='navigation'>
                <div className='navigation-list'>
                    <div className='logo'>로고</div>
                    
                            { login ? 
                                <div className='my-content'>
                                    <div className='map-logo'>지도 로고</div>
                                    <div className='profile'>프사</div>
                                    <div>마이페이지</div>
                                </div>
                                :
                                <div className='my-content'>
                                    <div className='map-logo'>지도 로고</div>
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
