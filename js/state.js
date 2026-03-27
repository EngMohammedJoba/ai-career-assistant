// ===== GLOBAL STATE =====
export const state = {
  cv: null,
  roles: [],
  selectedRole: null,
  quiz: [],
  answers: [],
  result: null
};

// ===== SETTERS =====
export function setCV(data) {
  state.cv = data;
  saveState();
}

export function setRoles(data) {
  state.roles = data.roles;
  saveState();
}

export function setSelectedRole(role) {
  state.selectedRole = role;
  saveState();
}

export function setQuiz(data) {
  state.quiz = data.questions;
  saveState();
}

export function addAnswer(answer) {
  state.answers.push(answer);
  saveState();
}

export function setResult(data) {
  state.result = data;
  saveState();
}

// ===== RESET =====
export function resetState() {
  state.cv = null;
  state.roles = [];
  state.selectedRole = null;
  state.quiz = [];
  state.answers = [];
  state.result = null;

  localStorage.removeItem("appState");
}

// ===== STORAGE =====
function saveState() {
  localStorage.setItem("appState", JSON.stringify(state));
}

export function loadState() {
  const saved = localStorage.getItem("appState");
  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }
}