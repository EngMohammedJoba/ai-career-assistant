// ===== CONFIG =====
const USE_MOCK = true;
const BASE_URL = "http://localhost:8000";

// ===== MOCK CV =====
const mockCV = {
  skills: ["Python", "SQL"],
  projects: ["AI Project"],
  experience: [{ role: "Data Analyst", years: 1 }]
};

// ===== ROLES DATABASE =====
const rolesDB = [
  {
    title: "Data Analyst",
    skills: ["Python", "SQL", "Excel", "Power BI", "Statistics"]
  },
  {
    title: "ML Engineer",
    skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow"]
  },
  {
    title: "Data Scientist",
    skills: ["Python", "Statistics", "Machine Learning", "Pandas", "Data Visualization"]
  }
];

// ===== QUIZ MOCK =====
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

// ===== RESULT MOCK =====
const mockResult = {
  score: 78,
  gaps: ["SQL", "Power BI", "Statistics"]
};

// ===== AI LOGIC =====

// Calculate role score
function calculateRoleScore(userSkills, roleSkills) {
  const matched = roleSkills.filter(skill =>
    userSkills.includes(skill)
  );

  return matched.length / roleSkills.length;
}

// ===== API FUNCTIONS =====

// Upload CV
export async function uploadCV(file) {
  if (USE_MOCK) {
    return new Promise(resolve =>
      setTimeout(() => resolve(mockCV), 1000)
    );
  }

  const formData = new FormData();
  formData.append("cv", file);

  const res = await fetch(`${BASE_URL}/upload-cv`, {
    method: "POST",
    body: formData
  });

  return res.json();
}

// Get Roles (SMART NOW)
export async function getRoles(skills) {
  return new Promise(resolve => {
    setTimeout(() => {

      const roles = rolesDB.map(role => {
        const score = calculateRoleScore(skills, role.skills);

        return {
          title: role.title,
          score: score,
          matchedSkills: role.skills.filter(s => skills.includes(s)),
          missingSkills: role.skills.filter(s => !skills.includes(s))
        };
      });

      // Sort by best match
      roles.sort((a, b) => b.score - a.score);

      resolve({ roles });

    }, 500);
  });
}

// Get Quiz
export async function getQuiz(role) {
  if (USE_MOCK) {
    return new Promise(resolve =>
      setTimeout(() => resolve(mockQuiz), 500)
    );
  }

  const res = await fetch(`${BASE_URL}/quiz`);
  return res.json();
}

// Submit Answers
export async function submitAnswers(answers) {
  if (USE_MOCK) {
    return new Promise(resolve =>
      setTimeout(() => resolve(mockResult), 700)
    );
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