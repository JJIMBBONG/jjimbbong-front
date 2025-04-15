import React, { ChangeEvent, useState } from 'react';
import { AuthPage } from 'src/types/aliases';

interface Props {
  onPageChange: (page: AuthPage) => void;
}

export default function SignUp(props: Props) {
  const { onPageChange } = props;

  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const onSignUpButtonClick = () => {
    // 회원가입 로직 구현
    // 회원가입 후 onPageChange('sign-in') 등을 호출하여 페이지를 전환할 수 있음
  };

  return (
    <div id='sign-up-container'>
      {/* 회원가입 폼 및 회원가입 버튼 */}
      <button onClick={() => onPageChange('sign-in')}>로그인</button>
    </div>
  );
}