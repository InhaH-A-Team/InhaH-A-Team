const BASE_URL = "http://youyeon.p-e.kr/";

// --- User ---
// 회원가입 요청 (POST /users/signup)
export async function signupUser(data) {
  return fetch(`${BASE_URL}users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// 로그인 요청 (POST /users/login)
export async function loginUser(data) {
  return fetch(`${BASE_URL}users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// 회원 정보 조회 (GET /users/)
export async function fetchUserInfo() {
  return fetch(`${BASE_URL}users/`).then(res => res.json());
}

// 회원 정보 수정 (PATCH /users/)
export async function updateUserInfo(data) {
  return fetch(`${BASE_URL}users/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// --- Post ---
// 게시글 생성 (POST /posts)
export async function createPost(data) {
  return fetch(`${BASE_URL}posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// 게시글 수정 (PATCH /posts/{post_id})
export async function updatePost(post_id, data) {
  return fetch(`${BASE_URL}posts/${post_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// 특정 게시글 상세 조회 (GET /posts/{post_id})
export async function fetchPostDetail(post_id) {
  return fetch(`${BASE_URL}posts/${post_id}`).then(res => res.json());
}

// 로그인한 유저의 게시글 목록 조회 (GET /posts/all)
export async function fetchMyPosts() {
  return fetch(`${BASE_URL}posts/all`).then(res => res.json());
}

// 전체 게시글 목록 조회 (GET /posts/all/)
export async function fetchAllPosts() {
  return fetch(`${BASE_URL}posts/all/`).then(res => res.json());
}

// 게시글 필터 검색 (GET /posts/all/?species={species}&address={address}&gender={gender}&age={age})
export async function fetchFilteredPosts(species) {
  return fetch(`${BASE_URL}posts/all/?species={species}&address={address}&gender={gender}&age={age}`).then(res => res.json());
}

// 게시글 삭제 (DELETE /posts/{post_id})
export async function deletePost(post_id) {
  return fetch(`${BASE_URL}posts/${post_id}`, { method: "DELETE" });
}

// --- Comment ---
// 댓글 생성 (POST /comments)
export async function createComment(data) {
  return fetch(`${BASE_URL}comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// 댓글 목록 조회 (GET /comments/{comments_id})
export async function fetchComments(comments_id) {
  return fetch(`${BASE_URL}comments/${comments_id}`).then(res => res.json());
}

// 댓글 상세 목록 조회 (GET /comments/{comment_id})
export async function fetchCommentDetail(comment_id) {
  return fetch(`${BASE_URL}comments/${comment_id}`).then(res => res.json());
}

// 댓글 삭제 (DELETE /comments/{comment_id})
export async function deleteComment(comment_id) {
  return fetch(`${BASE_URL}comments/${comment_id}`, { method: "DELETE" });
}

// 댓글 수정 (PATCH /comments/{comment_id})
export async function updateComment(comment_id, data) {
  return fetch(`${BASE_URL}comments/${comment_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// --- Favorite ---
// 게시글 스크랩 생성 (POST /favorites)
export async function createFavorite(data) {
  return fetch(`${BASE_URL}favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// 스크랩한 게시글 목록 조회 (GET /favorites)
export async function fetchFavorites() {
  return fetch(`${BASE_URL}favorites`).then(res => res.json());
}

// 게시글 스크랩 삭제 (DELETE /favorites/{favorite_id})
export async function deleteFavorite(favorite_id) {
  return fetch(`${BASE_URL}favorites/${favorite_id}`, { method: "DELETE" });
}

// --- Notification ---
// 알림 목록 조회 (GET /notifications)
export async function fetchNotifications() {
  return fetch(`${BASE_URL}notifications`).then(res => res.json());
}

/*
API 명세서 기반으로 한 코드입니다.
404에러가 뜬다면 경로 뒤에 슬래시 유무를 바꿔보시면 될 거 같습니다.
import { 함수명 } from '../api'; 으로 사용할 수 있습니다.
ex) import { createPost, fetchPostDetail, createComment } from '../api';
*/