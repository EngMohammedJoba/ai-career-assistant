// ===== CONFIG =====
const USE_MOCK = true;
const BASE_URL = "http://localhost:8000";

// ===== MOCK DATA =====
const mockCV = {
  skills: ["Python", "SQL"],
  projects: ["AI Project"],
  experience: [{ role: "Data Analyst", years: 1 }]
};

const mockRoles = {
  roles: [
    { title: "Data Analyst", score: 0.85 },
    { title: "ML Engineer", score: 0.65 }
  ],
  missing_skills: ["Power BI", "Deep Learning"]
};

const mockQuiz = {
  questions: [
    {
      question: "What is overfitting?",
      type: "text"
    },
    {
      question: "Which library is used for data analysis?",
      type: "mcq",
      options: ["TensorFlow", "Pandas", "Keras", "OpenCV"]
    }
  ]
};

const mockResult = {
  score: 78,
  gaps: ["SQL", "Power BI", "Statistics"]
};

// ===== API FUNCTIONS =====

export async function uploadCV(file) {
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(mockCV), 1000));
  }

  const formData = new FormData();
  formData.append("cv", file);

  const res = await fetch(`${BASE_URL}/upload-cv`, {
    method: "POST",
    body: formData
  });

  return res.json();
}

export async function getRoles(skills) {
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(mockRoles), 500));
  }

  const res = await fetch(`${BASE_URL}/roles`);
  return res.json();
}

export async function getQuiz(role) {
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(mockQuiz), 500));
  }

  const res = await fetch(`${BASE_URL}/quiz`);
  return res.json();
}

export async function submitAnswers(answers) {
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(mockResult), 700));
  }

  const res = await fetch(`${BASE_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answers })
  });

  return res.json();
}