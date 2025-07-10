import React, { useState, useEffect, useRef } from "react";
import { fetchNotifications } from "../api";
import "./NotificationDropdown.css";

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // 알림 목록 불러오기
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchNotifications()
        .then(data => {
          setNotifications(Array.isArray(data) ? data : []);
        })
        .catch(() => setNotifications([]))
        .finally(() => setLoading(false));
    }
  }, [open]);

  // 드롭다운 외부 클릭 시 닫기
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

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button className="notification-btn" onClick={() => setOpen(!open)}>
        🔔
        {notifications.some(n => !n.read) && <span className="notification-dot" />}
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
                <li key={n.id} className={n.read ? "" : "unread"}>
                  <span>{n.message}</span>
                  <span className="notification-date">{n.created_at}</span>
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