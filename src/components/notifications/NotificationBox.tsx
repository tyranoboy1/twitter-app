import styles from "components/notifications/styles/Notification.module.scss";
import { INotificationsProps } from "./interface/notifications.interface";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";

/** 알람 박스 컴포넌트 */
const NotificationBox = ({
  notification,
}: {
  notification: INotificationsProps;
}) => {
  const navigate = useNavigate();

  /** 알람 클릭 함수 */
  const onClickNotification = async (url: string) => {
    // isRead 업데이트
    const ref = doc(db, "notifications", notification.id);
    await updateDoc(ref, {
      isRead: true,
    });
    // url로 이동
    navigate(url);
  };
  return (
    <div key={notification.id} className={styles.notification}>
      <div onClick={() => onClickNotification(notification?.url)}>
        <div className={styles.notification__flex}>
          <div className={styles.notification__createdAt}>
            {notification?.createdAt}
          </div>
          {notification?.isRead === false && (
            <div className={styles.notification__unread} />
          )}
        </div>
        <div className="notification__content">{notification.content}</div>
      </div>
    </div>
  );
};

export default NotificationBox;
