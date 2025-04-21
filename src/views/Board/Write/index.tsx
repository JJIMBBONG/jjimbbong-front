import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postBoardRequest } from 'src/apis'; // API 호출 파일
import './style.css';


const BoardWrite = () => {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    boardAddressCategory: '',
    boardDetailCategory: '',
    boardTitle: '',
    boardContent: '',
    boardAddress: '',
    boardImage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, boardImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('token') ?? '';
      await postBoardRequest(form, accessToken);
      alert('게시글이 작성되었습니다!');
      navigate('/board');
    } catch (error) {
      console.error(error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="board-write-container">
      <h2>게시글 작성</h2>

      <select name="boardAddressCategory" value={form.boardAddressCategory} onChange={handleChange}>
        <option value="">주소 카테고리 선택</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
      </select>

      <select name="boardDetailCategory" value={form.boardDetailCategory} onChange={handleChange}>
        <option value="">상세 카테고리 선택</option>
        <option value="맛집">맛집</option>
        <option value="여행지">여행지</option>
      </select>

      <input
        type="text"
        name="boardTitle"
        value={form.boardTitle}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />

      <textarea
        name="boardContent"
        value={form.boardContent}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
      />

      <input
        type="text"
        name="boardAddress"
        value={form.boardAddress}
        onChange={handleChange}
        placeholder="주소 입력 (선택)"
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {form.boardImage && <img src={form.boardImage} alt="미리보기" style={{ width: 200, marginTop: '10px' }} />}

      <button onClick={handleSubmit}>작성하기</button>
    </div>
  );

};

export default BoardWrite;

