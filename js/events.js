const EVENTS = [
  {
    id: "evt-01",
    name: "AI Advertisement Challenge",
    shortCode: "AI-AD",
    accentColor: "#fafa28ff",
    tagline: "Prompt. Create. Dominate.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407740/64431c95-bea4-41ef-8d67-ad4c8cb2bd2c.png", // Placeholder code image
    description: "Turn ideas into attention-grabbing advertisements using AI. Create smarter campaigns, unleash your creativity, and prove you can sell an idea in the age of AI.",
    timings: "10:00 AM – 1:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: true,
    image: "assets/events/details_image/AI_AD.jpeg",
    organizers: [
      { name: "Rohan Sharma (Semister V)", phone: "+91 90000 00001" },
      { name: "Ananya Rao (Semister VI)", phone: "+91 90000 00002" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
  {
    id: "evt-02",
    name: "AI/ML Trend Quiz",
    shortCode: "AI-QUIZ",
    accentColor: "#f91f1fff",
    tagline: "Know AI. Beat the Crowd.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407758/edc39e35-231d-4308-9c36-083abdb9e8b3.png",
    description: "How well do you know the world of AI and ML? Test your knowledge of trends, tools, breakthroughs, and the technologies shaping tomorrow.",
    timings: "9:00 AM – 9:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_ML_Quiz.jpeg",
    organizers: [
      { name: "Kavya Nair", phone: "+91 90000 00003" },
      { name: "Aditya Verma", phone: "+91 90000 00004" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
  {
    id: "evt-03",
    name: "AI Visual Challenge",
    shortCode: "AI-VISION",
    accentColor: "#2323fcff",
    tagline: "Imagine It. Generate It. Own It.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407768/c497ec8a-f279-4482-b5ee-7539867e1254.png",
    description: "Put your visual creativity to the test by using AI to transform ideas into striking and innovative visuals.",
    timings: "11:00 AM – 4:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Non-Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_Visual.jpeg",
    organizers: [
      { name: "Rahul Singh", phone: "+91 90000 00005" },
      { name: "Ananya Rao", phone: "+91 90000 00002" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
  {
    id: "evt-04",
    name: "AI Escape Quest",
    shortCode: "AI-ESCAPE",
    accentColor: "#27f727ff",
    tagline: "Think Smart. Escape Faster.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407774/410abeaf-8baf-4072-b487-f70de2df4204.png",
    description: "Enter a world of AI-powered puzzles, hidden clues, and mind-bending challenges. Think fast, work smart, and escape before time runs out.",
    timings: "2:00 PM – 4:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_Escape.jpeg",
    organizers: [
      { name: "Neha Gupta", phone: "+91 90000 00006" },
      { name: "Ananya Rao", phone: "+91 90000 00002" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
  {
    id: "evt-05",
    name: "No-Code ML Model",
    shortCode: "NO-CODE",
    accentColor: "#e45b06ff ",
    tagline: "Build Intelligence. Skip the Code.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407818/4a3542fb-bebb-4fb6-8e4d-1304526df5ca.png",
    description: "Think you need to be a programmer to build AI? Think again. Create, train, and explore a machine learning model using powerful no-code tools.",
    timings: "2:00 PM – 4:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/No_Code_ML.jpeg",
    organizers: [
      { name: "Neha Gupta", phone: "+91 90000 00006" },
      { name: "Rohan Sharma", phone: "+91 90000 00001" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
  {
    id: "evt-06",
    name: "Prompt Panic",
    shortCode: "PROMPT-X",
    accentColor: "#cb3b53ff",
    tagline: "Prompt Under Pressure.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407837/4b450c24-b3c6-4d03-8af4-78f234ebf822.png",
    description: "Your prompts are your weapons. Think creatively, engineer precisely, and adapt quickly as you battle through a high-speed test of prompt engineering.",
    timings: "2:00 PM – 4:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/PromptX.jpeg",
    organizers: [
      { name: "Rohan Sharma", phone: "+91 90000 00001" },
      { name: "Ananya Rao", phone: "+91 90000 00002" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
  {
    id: "evt-07",
    name: "AI Charades",
    shortCode: "AI-ACT",
    accentColor: "#808080",
    tagline: "Act Smart. Guess Smarter.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407822/2baff31a-d312-4e9e-bbc6-72c35a4eb97f.png",
    description: "AI meets charades! Decode concepts, act out clues, and race against the clock in a hilarious battle of creativity, teamwork, and AI knowledge.",
    timings: "2:00 PM – 4:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Non-Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_Charades.jpeg",
    organizers: [
      { name: "Neha Gupta", phone: "+91 90000 00006" },
      { name: "Rohan Sharma", phone: "+91 90000 00001" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
  {
    id: "evt-08",
    name: "Vision Hunter",
    shortCode: "V-HUNT",
    accentColor: "#0EA5E9",
    tagline: "See What Others Miss.",
    poster: "https://res.cloudinary.com/dsojrrb9j/image/upload/v1787407855/4a6afd1d-f909-4782-bf8d-949025dd5725.png",
    description: "Sharpen your eyes and your AI instincts. Hunt down hidden patterns, decode visual clues, and uncover what lies beyond the obvious.",
    timings: "2:00 PM – 4:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    eventCategory: "Non-Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/Vision_Hunter.jpeg",
    organizers: [
      { name: "Aditya Verma", phone: "+91 90000 00004" },
      { name: "Ananya Rao", phone: "+91 90000 00002" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf",
    registerLink: "#"
  },
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
                <div class="event-title" style="color: ${event.accentColor}">${event.name}</div>
                <div class="description">${event.tagline}</div>
                <button class="details-btn" onclick="openEventModal('${event.id}')">VIEW DETAILS</button>
                <div class="prize-title">PRIZES WORTH</div>
                <div class="prize">${event.prize} *</div>
            </div>

            <div class="default-title" style="color: ${event.accentColor}">${event.name}</div>
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
  document.getElementById('modal-poster').src = event.image;
  document.getElementById('modal-desc').innerHTML = `${event.description}<br><br><span style="color: var(--accent-secondary); font-weight: bold;">Team: ${event.teamSize}</span>`;
  document.getElementById('modal-time').textContent = event.timings;
  document.getElementById('modal-prize').textContent = event.prize;

  const orgContainer = document.getElementById('modal-organizers');
  orgContainer.innerHTML = event.organizers.map(org => {
    let nameHtml = org.name;
    if (org.name.includes('(')) {
      const parts = org.name.split('(');
      nameHtml = `${parts[0].trim()} <span class="org-semester">(${parts[1]}</span>`;
    }
    return `
    <div class="organizer">
      <span class="org-name">${nameHtml}</span>
      <a href="tel:${org.phone}" class="org-phone">${org.phone}</a>
    </div>
    `;
  }).join('');

  const rulebookBtn = document.getElementById('modal-rulebook');
  if (event.ruleBook && event.ruleBook !== "#") {
    rulebookBtn.href = "javascript:void(0);";
    rulebookBtn.onclick = (e) => {
      e.preventDefault();
      if (window.openPDF) window.openPDF(event.ruleBook);
    };
    rulebookBtn.style.display = "inline-flex";
  } else {
    rulebookBtn.style.display = "none";
  }

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

