import PostHeader from "components/layout/PostHeader";
import AuthContext from "context/AuthContext";
import React, { useContext } from "react";
import { FiImage } from "react-icons/fi";

const ProfileEditForm = () => {
  const [displayName, setDisplayName] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const onChange = () => {};
  const onSubmit = () => {};
  /** 파일 업로드 함수 */
  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageUrl(result);
    };
  };
  const handleDeleteImage = () => {
    setImageUrl(null);
  };

  React.useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user?.photoURL);
    }
  }, [user?.photoURL]);
  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onSubmit}>
        <div className="post-form__profile">
          <input
            type="text"
            name="displayName"
            className="post-form__input"
            placeholder="이름"
            onChange={onChange}
            value={displayName}
          />
          {imageUrl && (
            <div className="post-form__attachment">
              <img src={imageUrl} alt="attachment" width={100} height={100} />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="post-form__clear-btn"
              >
                삭제
              </button>
            </div>
          )}
          <div className="post-form__submit-area">
            <div className="post-form__image-area">
              <label className="post-form__file" htmlFor="file-input">
                <FiImage className="post-form__file-icon" />
              </label>
            </div>
            <input
              type="file"
              name="file-input"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input type="submit" className="post-form__submit-btn" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
