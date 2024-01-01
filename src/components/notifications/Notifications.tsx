import React, { useContext } from "react";
import { INotificationsProps } from "./interface/notifications.interface";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import NotificationBox from "components/notifications/NotificationBox";

/** 알람 화면 컴포넌트 */
const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = React.useState<
    INotificationsProps[]
  >([]);

  React.useEffect(() => {
    if (user) {
      let ref = collection(db, "notifications");
      let notificationQuery = query(
        ref,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(notificationQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setNotifications(dataObj as INotificationsProps[]);
      });
    }
  }, [user]);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="hoome__title-text">Notification</div>
        </div>
      </div>
      <div className="post">
        {notifications?.length > 0 ? (
          notifications?.map((noti) => (
            <NotificationBox notification={noti} key={noti.id} />
          ))
        ) : (
          <div className="post__no-posts">
            <div className="post__text">알림이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
