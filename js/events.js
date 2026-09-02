/**
 * ==========================================
 *  EVENTS DATABASE & RENDERING ENGINE
 * ==========================================
 */

const EVENTS = [
  {
    id: "evt-01",
    name: "AI Emerging Quiz",
    shortCode: "AI-QUIZ",
    accentColor: "#cb3b53",
    tagline: "Know AI. Beat the Crowd.",
    poster: "assets/events/posters/AI_EMERGING_QUIZ.png",
    description: "How well do you know the world of AI and ML? Test your knowledge of trends, tools, breakthroughs, and the technologies shaping tomorrow.",
    timings: "10:15 AM – 11:30 AM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: true,
    image: "assets/events/details_image/AI_ML_Quiz.jpeg",
    organizers: [
      { name: "Sinchana K (Semester VII)", phone: "+91 73492 42156" },
      { name: "Amrutha K S (Semester VII)", phone: "+91 95152 91570" }
    ],
    ruleBook: "assets/events/rulebook/AI_EMERGING_QUIZ.pdf"
  },
  {
    id: "evt-02",
    name: "AI Escape Quest",
    shortCode: "AI-ESCAPE",
    accentColor: "#808080",
    tagline: "Think Smart. Escape Faster.",
    poster: "assets/events/posters/AI_ESCAPE_QUEST.png",
    description: "Enter a world of AI-powered puzzles, hidden clues, and mind-bending challenges. Think fast, work smart, and escape before time runs out.",
    timings: "10:15 AM – 11:30 AM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_Escape.jpeg",
    organizers: [
      { name: "Swaroop P (Semester V)", phone: "+91 86185 07413" },
      { name: "Sathvik U S (Semester V)", phone: "+91 63624 94258" }
    ],
    ruleBook: "assets/events/rulebook/AI_ESCAPE_QUEST.pdf"
  },
  {
    id: "evt-03",
    name: "ML Forge",
    shortCode: "NO-CODE",
    accentColor: "#0EA5E9",
    tagline: "Build Intelligence. Skip the Code.",
    poster: "assets/events/posters/ML_FORGE.png",
    description: "Think you need to be a programmer to build AI? Think again. Create, train, and explore a machine learning model using powerful no-code tools.",
    timings: "11:35 AM – 12:50 PM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/No_Code_ML.jpeg",
    organizers: [
      { name: "Devika N D (Semester VII)", phone: "+91 80502 83353" },
      { name: "Nithin G J (Semester VII)", phone: "+91 84315 99031" }
    ],
    ruleBook: "assets/events/rulebook/ML_FORGE.pdf"
  },
  {
    id: "evt-04",
    name: "Neural Clash",
    shortCode: "PROMPT-X",
    accentColor: "#27f727",
    tagline: "Prompt Under Pressure.",
    poster: "assets/events/posters/AI_ESCAPE_QUEST.png",
    description: "Your prompts are your weapons. Think creatively, engineer precisely, and adapt quickly as you battle through a high-speed test of prompt engineering.",
    timings: "11:35 AM – 12:50 PM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/PromptX.jpeg",
    organizers: [
      { name: "Vinay Raj V (Semester VII)", phone: "+91 89714 35054" },
      { name: "Suchet H S (Semester VII)", phone: "+91 82968 91958" }
    ],
    ruleBook: "/AI_ESCAPE_QUEST.pdf"
  },
  {
    id: "evt-05",
    name: "AI Visual Challenge",
    shortCode: "AI-VISION",
    accentColor: "#2323fc",
    tagline: "Imagine It. Generate It. Own It.",
    poster: "assets/events/posters/VISUAL_CHALLENGE.png",
    description: "Put your visual creativity to the test by using AI to transform ideas into striking and innovative visuals.",
    timings: "02:00 PM – 03:30 PM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_Visual.jpeg",
    organizers: [
      { name: "Shreya R Chittaragi (Semester VII)", phone: "+91 77953 65337" },
      { name: "Kaveri (Semester VII)", phone: "+91 72597 41544" }
    ],
    ruleBook: "assets/events/rulebook/VISUAL_CHALLENGE.pdf"
  },
  {
    id: "evt-06",
    name: "Recall Reactor",
    shortCode: "V-HUNT",
    accentColor: "#e45b06",
    tagline: "See What Others Miss.",
    poster: "assets/events/posters/RECALL_REACTOR.jpeg",
    description: "Sharpen your eyes and your AI instincts. Hunt down hidden patterns, decode visual clues, and uncover what lies beyond the obvious.",
    timings: "02:00 PM – 03:30 PM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/Vision_Hunter.jpeg",
    organizers: [
      { name: "Prajna n kulal (Semester VII)", phone: "+91 80953 74237" },
      { name: "Yashaswini S Gowda (Semester VII)", phone: "+91 95357 97006" }
    ],
    ruleBook: "assets/events/rulebook/RECALL_REACTOR.pdf"
  },
  {
    id: "evt-07",
    name: "AI Advertisement Challenge",
    shortCode: "AI-AD",
    accentColor: "#f91f1f",
    tagline: "Prompt. Create. Dominate.",
    poster: "assets/events/posters/AI_AD.PNG",
    description: "Turn ideas into attention-grabbing advertisements using AI. Create smarter campaigns, unleash your creativity, and prove you can sell an idea in the age of AI.",
    timings: "03:40 PM – 05:00 PM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_AD.jpeg",
    organizers: [
      { name: "Rajeshwari H M (Semester VII)", phone: "+91 83174 89509" },
      { name: "Vathsala S H (Semester VII)", phone: "+91 77609 17458" }
    ],
    ruleBook: "assets/events/rulebook/AI_AD.pdf"
  },
  {
    id: "evt-08",
    name: "AI Charades",
    shortCode: "AI-ACT",
    accentColor: "#fafa28",
    tagline: "Act Smart. Guess Smarter.",
    poster: "assets/events/posters/AI_CHARADES.jpeg",
    description: "AI meets charades! Decode concepts, act out clues, and race against the clock in a hilarious battle of creativity, teamwork, and AI knowledge.",
    timings: "03:40 PM – 05:00 PM",
    prize: "₹6,000",
    date: "29 Sept 2026",
    eventCategory: "Technical",
    teamSize: "1-2 Members",
    featured: false,
    image: "assets/events/details_image/AI_Charades.jpeg",
    organizers: [
      { name: "Anagha C (Semester VII)", phone: "+91 70224 43442" },
      { name: "Jeevan H G (Semester VII)", phone: "+91 97316 41555" }
    ],
    ruleBook: "assets/events/rulebook/AI_CHARADES.pdf"
  },
];

// UPGRADE: Render Event Cards with Dynamic 3D Colors
function renderEventCard(event) {
  const verticalTitleSpans = event.shortCode.split('').map(char => `<span>${char}</span>`).join('');
  
  // Uses color-mix to automatically calculate proper light/dark shades for the 3D card borders
  return `
    <article class="game-card reveal" data-aos="flip-up" style="
        --theme: ${event.accentColor}; 
        --theme-light: color-mix(in srgb, ${event.accentColor} 80%, white); 
        --theme-dark: color-mix(in srgb, ${event.accentColor} 60%, black);
    ">
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
                <img 
                    src="${event.poster}" 
                    alt="${event.name}" 
                    class="skeleton" 
                    loading="lazy" 
                    onload="this.classList.remove('skeleton')"
                    onerror="this.classList.remove('skeleton'); this.alt='Image not available';"
                >
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

function renderEvents
