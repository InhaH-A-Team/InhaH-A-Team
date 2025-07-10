import React, { useState, useEffect, useRef } from "react";
import { fetchNotifications } from "../api";
import "./NotificationDropdown.css";

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // 벨 클릭 시만 알림 목록 불러오기
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchNotifications()
        .then(data => {
          // 최신순 정렬 (created_at 또는 create_at)
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

  // 읽지 않은 알림 갯수
  const unreadCount = notifications.filter(n => n.checked === false || n.is_read === false).length;

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button className="notification-btn" onClick={() => setOpen(o => !o)}>
        <svg
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#423d34"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
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
                <li key={n.id} className={n.checked === false || n.is_read === false ? "unread" : ""}>
                  <span className="notification-message">{n.message || n.contents || n.content}</span>
                  <span className="notification-date">{n.created_at || n.create_at}</span>
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