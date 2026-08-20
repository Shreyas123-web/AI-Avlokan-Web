const TEAM = [
  {
    id: "mem-01",
    name: "Dr. Priya Deshmukh",
    role: "Faculty Coordinator",
    department: "AIML",
    category: "faculty",
    accentColor: "#facc15",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#" }
  },
  {
    id: "mem-02",
    name: "Arjun Mehta",
    role: "Event Head",
    department: "AIML",
    category: "student",
    showOnHome: true,
    accentColor: "#7c3aed",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "mem-03",
    name: "Riya Singh",
    role: "Technical Lead",
    department: "CSE",
    category: "student",
    showOnHome: true,
    accentColor: "#22d3ee",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#", github: "#" }
  },
  {
    id: "mem-04",
    name: "Vikram Das",
    role: "Design Lead",
    department: "AIML",
    category: "student",
    showOnHome: true,
    accentColor: "#ef4444",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    socials: { instagram: "#", dribbble: "#" }
  },
  {
    id: "mem-05",
    name: "Sneha Reddy",
    role: "Marketing Head",
    department: "AIML",
    category: "student",
    showOnHome: true,
    accentColor: "#facc15",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "mem-06",
    name: "Kabir Khan",
    role: "Logistics Head",
    department: "ECE",
    category: "student",
    showOnHome: true,
    accentColor: "#7c3aed",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#" }
  },
  {
    id: "mem-07",
    name: "Anjali Verma",
    role: "Public Relations",
    department: "CSE",
    category: "student",
    showOnHome: true,
    accentColor: "#22d3ee",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#" }
  }
];

function renderTeamCard(member) {
  return `
    <div class="team-card reveal">
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
            <div class="member-dept" style="color: #00d2ff; font-size: clamp(0.7rem, 2vw, 12px); font-weight: 600; margin-top: 4px; letter-spacing: 1px;">${member.department}</div>
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
