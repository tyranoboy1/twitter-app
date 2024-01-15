import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "firebaseApp";
import React, { useContext } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IPostProps } from "./interface/post.interface";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import AuthContext from "context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import PostHeader from "components/layout/PostHeader";
import useTranslation from "hooks/useTranslation";

/** 게시글 입력 컴포넌트 */
const PostEditForm = () => {
  const params = useParams();
  const [post, setPost] = React.useState<IPostProps | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [hashTag, setHashTag] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [imageFile, setImageFile] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const t = useTranslation();
  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;
    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader?.readAsDataURL(file);

    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageFile(result);
    };
  };
  const navigate = useNavigate();

  /** parms.id에 따라 데이터 가져오는 함수 */
  const getPost = React.useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as IPostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
      setImageFile(docSnap?.data()?.imageUrl);
    }
  }, [params.id]);

  /** 게시글 생성 */
  const onSubmit = async (e: any) => {
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    e.preventDefault();
    try {
      if (post) {
        /** 기존 사진 지우고 새로운 사진 업로드 */
        if (post?.imageUrl) {
          let imageRef = ref(storage, post?.imageUrl);
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
        }
        /** 새로운 파일이 있다면 업로드 */
        let imageUrl = "";
        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, "data_url");
          imageUrl = await getDownloadURL(data?.ref);
        }
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
          hashTags: tags,
          imageUrl: imageUrl,
        });
        navigate(`/posts/${post?.id}`);
        toast.success("게시글을 수정하였습니다.");
      }
      setIsSubmitting(false);
      setImageFile(null);
    } catch (e: any) {
      console.log(e);
    }
  };

  /** textArea onChange 함수 */
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "content") {
      setContent(value);
    }
  };

  /** 스페이스바를 통해 해시태그 추가하는 함수*/
  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      // 만약 같은 태그가 있다면 에러를 띄운다
      // 아니라면 태그를 생성해준다
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };
  /** 해시태그를 제거하는 함수 */
  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  /** 입력한 해시태그 공백 제거 후 상태 저장 함수 */
  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };
  const handleDeleteImage = () => {
    setImageFile(null);
  };

  /** params.id가 있을때 getPost 함수 실행 */
  React.useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost]);
  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onSubmit}>
        <textarea
          className="post-form__textarea"
          required
          name="content"
          id="content"
          placeholder={t("POST_PLACEHOLDER")}
          onChange={onChange}
          value={content}
        />
        <div className="post-form__hashtags">
          <span className="post-form__hashtags-outputs">
            {tags?.map((tag, index) => (
              <span
                className="post-form__hashtags-tag"
                key={index}
                onClick={() => removeTag(tag)}
              >
                #{tag}
              </span>
            ))}
          </span>
          <input
            className="post-form__input"
            name="hashtag"
            id="hashtag"
            placeholder={t("POST_HASHTAG")}
            onChange={onChangeHashTag}
            onKeyUp={handleKeyUp}
            value={hashTag}
          />
        </div>
        <div className="post-form__submit-area">
          <div className="post-form__image-area">
            <label htmlFor="file-input" className="post-form__file">
              <FiImage className="post-form__file-icon" />
            </label>
            <input
              type="file"
              name="file-input"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-input"
            />
            {imageFile && (
              <div className="post-form__attachment">
                <img
                  src={imageFile}
                  alt="attachment"
                  width={100}
                  height={100}
                />
                <button
                  className="post-form__clear-btn"
                  type="button"
                  onClick={handleDeleteImage}
                >
                  {t("BUTTON_DELETE")}
                </button>
              </div>
            )}
          </div>
          <input
            type="submit"
            value="수정"
            className="post-form__submit-btn"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};
export default PostEditForm;
