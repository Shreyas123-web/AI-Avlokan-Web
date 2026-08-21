const EVENTS = [
  {
    id: "evt-01",
    name: "CodeStorm — Competitive Programming",
    shortCode: "CODESTORM",
    accentColor: "#7c3aed", // Crimson
    tagline: "Crack the code before the clock runs out.",
    poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", // Placeholder code image
    description: "A high-intensity competitive programming contest testing algorithmic thinking, speed, and accuracy across multiple rounds of increasing difficulty.",
    timings: "10:00 AM – 1:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: true,
    organizers: [
      { name: "Rohan Sharma", phone: "+91 90000 00001" },
      { name: "Ananya Rao", phone: "+91 90000 00002" }
    ],
    rulebookLink: "#",
    registerLink: "#"
  },
  {
    id: "evt-02",
    name: "AI Hackfest — 12hr Hackathon",
    shortCode: "AI HACKFEST",
    accentColor: "#22d3ee", // Cyan
    tagline: "Build. Break. Ship. Repeat.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    description: "A 12-hour on-site hackathon where teams build AI/ML powered solutions to real-world problem statements, judged by industry mentors.",
    timings: "9:00 AM – 9:00 PM",
    prize: "₹15,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    organizers: [
      { name: "Kavya Nair", phone: "+91 90000 00003" },
      { name: "Aditya Verma", phone: "+91 90000 00004" }
    ],
    rulebookLink: "#",
    registerLink: "#"
  },
  {
    id: "evt-03",
    name: "RoboWars — Arena Combat",
    shortCode: "ROBOWARS",
    accentColor: "#facc15", // Gold
    tagline: "Metal meets metal in the ultimate showdown.",
    poster: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop",
    description: "Design and build your combat robot to battle in the arena. Only the strongest survives.",
    timings: "11:00 AM – 4:00 PM",
    prize: "₹10,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    organizers: [
      { name: "Rahul Singh", phone: "+91 90000 00005" }
    ],
    rulebookLink: "#",
    registerLink: "#"
  },
  {
    id: "evt-04",
    name: "Tech Debate — AI Ethics",
    shortCode: "ETHICS",
    accentColor: "#ef4444 ", // Violet
    tagline: "Is AI our doom or salvation?",
    poster: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
    description: "A formal debate competition exploring the ethical implications of artificial intelligence and machine learning in modern society.",
    timings: "2:00 PM – 4:00 PM",
    prize: "₹4,000",
    date: "25 Sept 2026",
    eventCategory: "Non-Technical",
    teamSize: "1-2 Members",
    featured: false,
    organizers: [
      { name: "Neha Gupta", phone: "+91 90000 00006" }
    ],
    rulebookLink: "#",
    registerLink: "#"
  }
];

function renderEventCard(event) {
  const verticalTitleSpans = event.shortCode.split('').map(char => `<span>${char}</span>`).join('');
  return `
    <article class="game-card reveal" data-aos="flip-up" style="--theme: ${event.accentColor}; --theme-light: ${event.accentColor}; --theme-dark: ${event.accentColor};">
        <div class="card-background"></div>
        <div class="event-category">${event.eventCategory}</div>
        
        <div class="left-indicators">
            <span class="indicator"></span>
            <span class="indicator"></span>
            <span class="indicator"></span>
            <span class="indicator"></span>
            <span class="indicator"></span>
        </div>

        <div class="vertical-title">
            ${verticalTitleSpans}
        </div>

        <div class="card-panel">
            <div class="card-image">
                <img src="${event.poster}" alt="${event.name}" class="skeleton" loading="lazy" onload="this.classList.remove('skeleton')">
            </div>

            <div class="content">
                <div class="event-title">${event.name}</div>
                <div class="description">${event.tagline}</div>
                <button class="details-btn" onclick="openEventModal('${event.id}')">VIEW DETAILS</button>
                <div class="prize-title">PRIZES WORTH</div>
                <div class="prize">${event.prize} *</div>
            </div>

            <div class="default-title">${event.name}</div>
        </div>
    </article>
  `;
}

function renderEvents(containerId, isFeaturedOnly = false, filter = 'all') {
  const container = document.getElementById(containerId);
  if (!container) return;

  let eventsToRender = isFeaturedOnly ? EVENTS.filter(e => e.featured) : EVENTS;
  
  if (filter !== 'all') {
    eventsToRender = eventsToRender.filter(e => e.eventCategory === filter);
  }
  
  container.innerHTML = eventsToRender.map(e => renderEventCard(e)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const filterSlider = document.querySelector('.filter-slider');

  function updateSlider(activeTab) {
    if (!filterSlider || !activeTab) return;
    const tabRect = activeTab.getBoundingClientRect();
    filterSlider.style.width = `${tabRect.width}px`;
    filterSlider.style.left = `${activeTab.offsetLeft}px`;
  }

  if (filterTabs.length > 0) {
    const initialActive = document.querySelector('.filter-tab.active');
    setTimeout(() => updateSlider(initialActive), 100);

    filterTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        filterTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        updateSlider(e.target);

        const filterValue = e.target.getAttribute('data-filter');
        renderEvents('all-events-container', false, filterValue);
        
        // Make new cards visible immediately
        setTimeout(() => {
          document.querySelectorAll('#all-events-container .reveal').forEach(el => {
            el.classList.add('is-visible');
          });
        }, 50);
      });
    });

    window.addEventListener('resize', () => {
      const activeTab = document.querySelector('.filter-tab.active');
      if (activeTab) updateSlider(activeTab);
    });
  }
});

function openEventModal(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event) return;

  document.getElementById('modal-title').textContent = event.name;
  document.getElementById('modal-poster').src = event.poster;
  document.getElementById('modal-desc').innerHTML = `${event.description}<br><br><span style="color: var(--accent-secondary); font-weight: bold;">Team: ${event.teamSize}</span>`;
  document.getElementById('modal-time').textContent = event.timings;
  document.getElementById('modal-prize').textContent = event.prize;

  const orgContainer = document.getElementById('modal-organizers');
  orgContainer.innerHTML = event.organizers.map(org => `
    <div class="organizer">
      <span>${org.name}</span>
      <a href="tel:${org.phone}">${org.phone}</a>
    </div>
  `).join('');

  document.getElementById('modal-rulebook').href = event.rulebookLink;
  document.getElementById('modal-register').href = event.registerLink;

  const modal = document.getElementById('event-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEventModal() {
  const modal = document.getElementById('event-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
