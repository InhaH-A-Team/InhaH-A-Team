const BASE_URL = "https://youyeon.p-e.kr/";

// 🔒 토큰 가져오는 유틸
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- User ---
export async function signupUser(data) {
  return fetch(`${BASE_URL}users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export async function loginUser(data) {
  return fetch(`${BASE_URL}users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export async function fetchUserInfo() {
  return fetch(`${BASE_URL}users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  }).then(res => {
    if (!res.ok) throw new Error("인증 실패");
    return res.json();
  });
}

export async function updateUserInfo(data) {
  return fetch(`${BASE_URL}users/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// --- Post ---
export async function createPost(form) {
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("species", form.species);
  formData.append("gender", form.gender);
  formData.append("age", form.age);
  formData.append("health_status", form.health_status);
  formData.append("provider_type", form.provider_type);
  formData.append("address", form.address);
  formData.append("phone_number", form.phone_number);
  formData.append("contents", form.contents);
  formData.append("photo", form.image);

  return fetch(`${BASE_URL}posts/`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
    },
    body: formData,
  }).then(res => res.json());
}

export async function updatePost(post_id, data) {
  return fetch(`${BASE_URL}posts/${post_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export async function fetchPostDetail(post_id) {
  return fetch(`${BASE_URL}posts/${post_id}`, {
    method: "GET",
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

export async function fetchMyPosts() {
  return fetch(`${BASE_URL}posts/all`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

export async function fetchAllPosts() {
  return fetch(`${BASE_URL}posts/all/`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

export async function fetchFilteredPosts(species) {
  return fetch(`${BASE_URL}posts/all/?species={species}&address={address}&gender={gender}&age={age}`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

export async function deletePost(post_id) {
  return fetch(`${BASE_URL}posts/${post_id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
}

// --- Comment ---
export async function createComment(data) {
  return fetch(`${BASE_URL}comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export async function fetchComments(post_id) {
  return fetch(`${BASE_URL}comments/${post_id}/`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

export async function fetchCommentDetail(comment_id) {
  return fetch(`${BASE_URL}comments/${comment_id}/`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

export async function deleteComment(comment_id) {
  return fetch(`${BASE_URL}comments/${comment_id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
}

export async function updateComment(comment_id, data) {
  return fetch(`${BASE_URL}comments/${comment_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// --- Favorite ---
export async function createFavorite(data) {
  return fetch(`${BASE_URL}favorites/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export async function fetchFavorites() {
  return fetch(`${BASE_URL}favorites/`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

export async function deleteFavorite(favorite_id) {
  return fetch(`${BASE_URL}favorites/${favorite_id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
}

// --- Notification ---
export async function fetchNotifications() {
  return fetch(`${BASE_URL}notifications/`, {
    headers: {
      ...getAuthHeader(),
    },
  }).then(res => res.json());
}

/*
⚠️ 인증이 필요한 모든 요청에 Authorization 헤더가 추가됨.
import { 함수명 } from '../api'; 으로 가져다 쓰면 됨.
예: import { createPost, fetchPostDetail, createComment } from '../api';
*/
