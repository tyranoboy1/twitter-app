import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

/** 뒤로가기 버튼 헤더 컴포넌트 */
const PostHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="post__header">
      <button type="button" onClick={() => navigate(-1)}>
        <IoIosArrowBack className="post__header-btn" />
      </button>
    </div>
  );
};

export default PostHeader;
