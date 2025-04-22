import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { postBoardRequest } from 'src/apis';
import './style.css';

import ImageIcon from 'src/assets/images/image.png';
import PaperclipIcon from 'src/assets/images/Paperclip.png';
import TypeIcon from 'src/assets/images/Type.png';
import VideoIcon from 'src/assets/images/Video.png';

const categories = ['카테고리 1', '카테고리 2', '카테고리 3', '카테고리 4', '카테고리 5'];

const BoardWrite = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    boardTitle: '',
    boardContent: '',
    boardAddressCategory: '',
    boardDetailCategory: '',
    boardAddress: '',
    boardImage: '',
  });

  const [areaSelected, setAreaSelected] = useState('');
  const [districtSelected, setDistrictSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');

  const handleAreaSelect = () => {
    // 실제로는 지역 선택 모달을 띄워야 함
    setAreaSelected('부산광역시');
    setDistrictSelected('부산진구');

    setForm((prev) => ({
      ...prev,
      boardAddressCategory: '부산광역시',
      boardAddress: '부산진구',
    }));
  };

  const handleCategoryClick = (category: string) => {
    setCategorySelected(category);
    setForm((prev) => ({ ...prev, boardDetailCategory: category }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate('/auth');
      return;
    }

    if (!areaSelected || !districtSelected) {
      alert('지역을 선택해주세요.');
      return;
    }

    if (!categorySelected) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    if (!form.boardContent.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      await postBoardRequest(form, accessToken);
      alert('게시글이 작성되었습니다!');
      navigate('/board');
    } catch (error) {
      alert('게시글 작성 실패');
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate('/board');
    }
  };

  return (
    <div className="board-write-container">
      <button className="select-area-button" onClick={handleAreaSelect}>
        지역을 선택해주세요
      </button>

      {areaSelected && districtSelected && (
        <div className="selected-area">{areaSelected} {districtSelected}</div>
      )}

      <div className="category-box">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${categorySelected === category ? 'selected' : 'unselected'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="input-label">제목을 입력해주세요.</div>
      <input
        name="boardTitle"
        value={form.boardTitle}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />

      <div className="editor-tools">
        <img src={ImageIcon} alt="이미지" className="editor-icon" />
        <img src={PaperclipIcon} alt="파일" className="editor-icon" />
        <img src={TypeIcon} alt="텍스트" className="editor-icon" />
        <img src={VideoIcon} alt="비디오" className="editor-icon" />
      </div>

      <div className="input-label">내용을 입력해주세요.</div>
      <textarea
        name="boardContent"
        value={form.boardContent}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
      />

      <div className="button-group">
        <button className="cancel-button" onClick={handleCancel}>취소</button>
        <button className="submit-button" onClick={handleSubmit}>작성 완료</button>
      </div>
    </div>
  );
};

export default BoardWrite;