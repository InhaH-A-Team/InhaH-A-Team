import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ← 추가
import { fetchNotifications, NotificationRead } from "../api";
import "./NotificationDropdown.css";

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchNotifications()
        .then(data => {
          let arr = Array.isArray(data) ? data : [];
          arr.sort((a, b) => new Date(b.created_at || b.create_at) - new Date(a.created_at || a.create_at));
          setNotifications(arr);
        })  
        .catch(() => setNotifications([]))
        .finally(() => setLoading(false));
    }
  }, [open]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // 읽지 않은 알림 수
  const unreadCount = notifications.filter(n => n.checked === false || n.is_read === false).length;

  const formatDate = (isoString) => {
    return isoString ? isoString.slice(0, 10) : "";
  };

const handleNotificationClick = async (postId, notifId) => {
    try {
      await NotificationRead(notifId);
      setNotifications(prev => prev.filter(n => n.id !== notifId)); 
       navigate(`/details/${postId}`);
    } catch (err) {
      console.error("읽음 처리 실패:", err);
      alert("알림 읽음 처리에 실패했습니다.");
    }
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button className="notification-btn" onClick={() => setOpen(o => !o)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#423d34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {unreadCount > 0 && <span className="notification-dot" />}
      </button>
      {open && (
        <div className="notification-list">
          {loading ? (
            <div className="notification-loading">로딩 중...</div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">알림이 없습니다.</div>
          ) : (
            <ul>
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={n.checked === false || n.is_read === false ? "unread" : ""}
                  onClick={() => handleNotificationClick(n.post_id, n.id)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="notification-message">{n.message || n.comment_contents || n.contents || n.content}</span>
                  <span className="notification-date">{formatDate(n.created_at || n.create_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
