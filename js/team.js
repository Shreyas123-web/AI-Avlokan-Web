const TEAM = [
  {
    id: "mem-01",
    name: "Dr. Chetan K R",
    role: "Prof. and Head of the Department",
    department: "Dept of AIML",
    category: "faculty",
    showOnHome: true,
    photo: "assets/teams/faculty/chetan.jpg"
  },
  {
    id: "mem-02",
    name: "Dr. Ashwini J P",
    role: "Associate Professor",
    department: "Dept of AIML",
    category: "faculty",
    showOnHome: true,
    photo: "assets/teams/faculty/ashwini.jpg"
  },
  {
    id: "mem-03",
    name: "Mr. Sayyed Johar",
    role: "Assistant Professor",
    department: "Dept of AIML",
    category: "faculty",
    showOnHome: true,
    photo: "assets/teams/faculty/johar.jpg"
  },
  {
    id: "mem-04",
    name: "Mr. Ranjan V",
    role: "Assistant Prof. and team Coordinator",
    department: "Dept of AIML",
    category: "faculty",
    showOnHome: true,
    photo: "assets/teams/faculty/ranjan.jpeg"
  },
  {
    id: "mem-05",
    name: "Mrs. Shaziya Banu S",
    role: "Assistant Professor",
    department: "Dept of AIML",
    category: "faculty",
    showOnHome: true,
    photo: "assets/teams/faculty/shaziya.jpg"
  },
  {
    id: "mem-06",
    name: "Mr. Nishanth S",
    role: "Assistant Professor",
    department: "Dept of AIML",
    category: "faculty",
    showOnHome: true,
    photo: "assets/teams/faculty/nishanth.jpg"
  },
  {
    id: "mem-07",
    name: "Ms. Aaliya Waseem",
    role: "Assistant Professor",
    department: "Dept of AIML",
    category: "faculty",
    showOnHome: true,
    photo: "assets/teams/faculty/aaliya.jpg"
  },
  {
    id: "mem-08",
    name: "Vidhaat Mallappa Chavalagi",
    role: "Chairman",
    department: "Dept. of AIML",
    category: "student",
    photo: "assets/teams/students/vidhaat.jpg"
  },
  {
    id: "mem-09",
    name: "Anagha C",
    role: "Vice Chairman",
    department: "Dept of AIML",
    category: "student",
    photo: "assets/teams/students/anagha.png"
  },
  {
    id: "mem-10",
    name: "Shreya R Chittaragi",
    role: "Secretary",
    department: "Dept of AIML",
    category: "student",
    photo: "assets/teams/students/shreya.jpg"
  },
  {
    id: "mem-11",
    name: "Thrishanth H S",
    role: "Joint Secretary",
    department: "Dept of AIML",
    category: "student",
    photo: "assets/teams/students/thrishanth.jpg"
  },
  {
    id: "mem-12",
    name: "Vinay N V",
    role: "Treasurer",
    department: "Dept of AIML",
    category: "student",
    photo: "assets/teams/students/vinaynv.jpg"
  },
  {
    id: "mem-13",
    name: "Kaveri",
    role: "Joint Treasurer",
    department: "Dept of AIML",
    category: "student",
    photo: "assets/teams/students/kaveri.jpg"
  }
];

function renderTeamCard(member) {
  return `
    <div class="team-card reveal" data-aos="fade-up">
        <!-- Decorative background -->
        <div class="red-panel"></div>

        <!-- Side red section -->
        <div class="side-accent"></div>

        <!-- Team member image -->
        <img
            class="team-image"
            src="${member.photo}"
            alt="${member.name}"
            loading="lazy"
        >

        <!-- Image darkening -->
        <div class="image-overlay"></div>

        <!-- Inner angular border -->
        <div class="inner-border"></div>

        <!-- Bottom red design -->
        <div class="bottom-red"></div>

        <!-- Corner details -->
        <span class="corner tl"></span>
        <span class="corner tr"></span>
        <span class="corner bl"></span>
        <span class="corner br"></span>

        <!-- Team information -->
        <div class="content">
            <h2 class="member-name">${member.name}</h2>
            <div class="member-role">${member.role}</div>
            <div class="member-dept" style="color: #00d2ff; font-size: clamp(0.9rem, 2.5vw, 14px); font-weight: 600; margin-top: 4px; letter-spacing: 1px;">${member.department}</div>
        </div>
    </div>
  `;
}

function renderTeam(containerId, categoryFilter = null, showOnHomeOnly = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let members = TEAM;
  if (categoryFilter) {
    members = members.filter(m => m.category === categoryFilter);
  }
  if (showOnHomeOnly) {
    members = members.filter(m => m.showOnHome);
  }

  container.innerHTML = members.map(m => renderTeamCard(m)).join('');
}
