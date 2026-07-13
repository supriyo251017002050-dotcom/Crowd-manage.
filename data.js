// ============================================================
// PULSE — FIFA 2026 AI Survival Brain | Data Layer
// ============================================================

const DATA = {
  venues: [
    { id: 'metlife', name: 'MetLife Stadium', city: 'New York / New Jersey', capacity: 82500, country: 'USA', flag: '🇺🇸', lat: 40.8135, lng: -74.0745, matchesToday: 1 },
    { id: 'sofi',    name: 'SoFi Stadium',    city: 'Los Angeles',          capacity: 70240, country: 'USA', flag: '🇺🇸', lat: 33.9535, lng: -118.3392, matchesToday: 0 },
    { id: 'att',     name: 'AT&T Stadium',    city: 'Dallas',               capacity: 80000, country: 'USA', flag: '🇺🇸', lat: 32.7478, lng: -97.0929, matchesToday: 1 },
    { id: 'arrowhead', name: 'Arrowhead Stadium', city: 'Kansas City',      capacity: 76416, country: 'USA', flag: '🇺🇸', lat: 39.0490, lng: -94.4839, matchesToday: 0 },
    { id: 'lumen',   name: 'Lumen Field',     city: 'Seattle',              capacity: 72000, country: 'USA', flag: '🇺🇸', lat: 47.5952, lng: -122.3316, matchesToday: 0 },
    { id: 'nrg',     name: 'NRG Stadium',     city: 'Houston',              capacity: 72220, country: 'USA', flag: '🇺🇸', lat: 29.6847, lng: -95.4107, matchesToday: 1 },
    { id: 'bc',      name: 'BC Place',        city: 'Vancouver',            capacity: 54500, country: 'CAN', flag: '🇨🇦', lat: 49.2767, lng: -123.1115, matchesToday: 0 },
    { id: 'toront',  name: 'BMO Field',       city: 'Toronto',              capacity: 45736, country: 'CAN', flag: '🇨🇦', lat: 43.6333, lng: -79.4189, matchesToday: 0 },
    { id: 'azteca',  name: 'Estadio Azteca',  city: 'Mexico City',          capacity: 87523, country: 'MEX', flag: '🇲🇽', lat: 19.3030, lng: -99.1505, matchesToday: 1 },
    { id: 'monterrey', name: 'Estadio BBVA',  city: 'Monterrey',            capacity: 51350, country: 'MEX', flag: '🇲🇽', lat: 25.6694, lng: -100.2447, matchesToday: 0 },
  ],

  activeVenue: 'metlife',

  heatZones: {
    metlife:   { risk: 'MODERATE', tempF: 89, humidity: 68, feels: 97 },
    att:       { risk: 'HIGH',     tempF: 103, humidity: 45, feels: 111 },
    nrg:       { risk: 'CRITICAL', tempF: 98,  humidity: 79, feels: 119 },
    azteca:    { risk: 'LOW',      tempF: 74,  humidity: 55, feels: 76 },
    monterrey: { risk: 'HIGH',     tempF: 101, humidity: 52, feels: 109 },
    sofi:      { risk: 'LOW',      tempF: 76,  humidity: 60, feels: 78 },
    bc:        { risk: 'LOW',      tempF: 68,  humidity: 70, feels: 70 },
    toront:    { risk: 'LOW',      tempF: 72,  humidity: 65, feels: 74 },
    lumen:     { risk: 'LOW',      tempF: 70,  humidity: 72, feels: 72 },
    arrowhead: { risk: 'MODERATE', tempF: 91,  humidity: 60, feels: 98 },
  },

  crowdZones: [
    { id: 'gate_a',      label: 'Gate A — Main Entry',      density: 0.92, risk: 'critical', fans: 8200,  color: '#FF2222' },
    { id: 'gate_b',      label: 'Gate B — East Entry',       density: 0.61, risk: 'medium',   fans: 5480,  color: '#FF8C00' },
    { id: 'gate_c',      label: 'Gate C — West Entry',       density: 0.34, risk: 'low',      fans: 3020,  color: '#00FF88' },
    { id: 'gate_d',      label: 'Gate D — VIP Entry',        density: 0.22, risk: 'low',      fans: 1960,  color: '#00FF88' },
    { id: 'concourse_n', label: 'North Concourse',           density: 0.78, risk: 'high',     fans: 6890,  color: '#FF4444' },
    { id: 'concourse_s', label: 'South Concourse',           density: 0.45, risk: 'medium',   fans: 3970,  color: '#FF8C00' },
    { id: 'food_court',  label: 'Food Court Plaza',          density: 0.88, risk: 'high',     fans: 7780,  color: '#FF4444' },
    { id: 'parking_p1',  label: 'Parking P1 — Exit Queue',  density: 0.95, risk: 'critical', fans: 8420,  color: '#FF2222' },
  ],

  emergencyPhrases: {
    en: { help: 'I need help', lost: 'I am lost', medical: 'Medical emergency', child: 'I lost my child', heat: 'I feel dizzy from heat', police: 'Call the police', translate: 'Please help me, I do not speak English' },
    es: { help: 'Necesito ayuda', lost: 'Estoy perdido/a', medical: 'Emergencia médica', child: 'Perdí a mi hijo/a', heat: 'Me siento mareado por el calor', police: 'Llame a la policía', translate: 'Por favor ayúdame, no hablo español' },
    fr: { help: "J'ai besoin d'aide", lost: 'Je suis perdu(e)', medical: 'Urgence médicale', child: "J'ai perdu mon enfant", heat: "Je me sens étourdi(e) à cause de la chaleur", police: 'Appelez la police', translate: "Aidez-moi s'il vous plaît, je ne parle pas français" },
    pt: { help: 'Preciso de ajuda', lost: 'Estou perdido/a', medical: 'Emergência médica', child: 'Perdi minha criança', heat: 'Sinto tontura pelo calor', police: 'Chame a polícia', translate: 'Por favor me ajude, não falo português' },
    de: { help: 'Ich brauche Hilfe', lost: 'Ich habe mich verlaufen', medical: 'Medizinischer Notfall', child: 'Ich habe mein Kind verloren', heat: 'Mir ist schwindelig von der Hitze', police: 'Rufen Sie die Polizei', translate: 'Bitte helfen Sie mir, ich spreche kein Deutsch' },
    ar: { help: 'أحتاج مساعدة', lost: 'أنا ضائع', medical: 'طوارئ طبية', child: 'فقدت طفلي', heat: 'أشعر بالدوار من الحرارة', police: 'اتصل بالشرطة', translate: 'من فضلك ساعدني، لا أتحدث العربية' },
    zh: { help: '我需要帮助', lost: '我迷路了', medical: '医疗紧急情况', child: '我的孩子走失了', heat: '我因高温感到头晕', police: '请叫警察', translate: '请帮帮我，我不会说中文' },
    hi: { help: 'मुझे मदद चाहिए', lost: 'मैं खो गया हूं', medical: 'चिकित्सा आपात स्थिति', child: 'मेरा बच्चा खो गया', heat: 'मुझे गर्मी से चक्कर आ रहे हैं', police: 'पुलिस बुलाओ', translate: 'कृपया मेरी मदद करें, मैं हिंदी नहीं बोलता' },
    ja: { help: '助けてください', lost: '迷子になりました', medical: '医療緊急事態', child: '子供とはぐれました', heat: '暑さで目眩がします', police: '警察を呼んでください', translate: '助けてください、日本語が話せません' },
    ko: { help: '도움이 필요합니다', lost: '길을 잃었습니다', medical: '의료 응급 상황', child: '아이를 잃어버렸습니다', heat: '더위로 어지럽습니다', police: '경찰을 불러주세요', translate: '도와주세요, 한국어를 못합니다' },
    ru: { help: 'Мне нужна помощь', lost: 'Я заблудился', medical: 'Медицинская помощь', child: 'Я потерял ребёнка', heat: 'Мне плохо от жары', police: 'Вызовите полицию', translate: 'Пожалуйста помогите, я не говорю по-русски' },
    tr: { help: 'Yardıma ihtiyacım var', lost: 'Kayboldum', medical: 'Tıbbi acil durum', child: 'Çocuğumu kaybettim', heat: 'Sıcaktan başım dönüyor', police: 'Polisi arayın', translate: 'Lütfen yardım edin, Türkçe bilmiyorum' },
  },

  languages: [
    { code: 'en', name: 'English',    flag: '🇬🇧', nativeName: 'English' },
    { code: 'es', name: 'Spanish',    flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French',     flag: '🇫🇷', nativeName: 'Français' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
    { code: 'de', name: 'German',     flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'ar', name: 'Arabic',     flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'zh', name: 'Chinese',    flag: '🇨🇳', nativeName: '中文' },
    { code: 'hi', name: 'Hindi',      flag: '🇮🇳', nativeName: 'हिन्दी' },
    { code: 'ja', name: 'Japanese',   flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean',     flag: '🇰🇷', nativeName: '한국어' },
    { code: 'ru', name: 'Russian',    flag: '🇷🇺', nativeName: 'Русский' },
    { code: 'tr', name: 'Turkish',    flag: '🇹🇷', nativeName: 'Türkçe' },
  ],

  transport: [
    { id: 'shuttle_a', type: 'Shuttle', name: 'Express Shuttle A', from: 'MetroLink Station', to: 'Gate C', eta: 4, capacity: 82, status: 'ON TIME', co2: 0.8, departures: ['21:50', '22:10', '22:30'] },
    { id: 'metro_1',   type: 'Metro',   name: 'Blue Line Metro',   from: 'Downtown Hub',     to: 'Stadium Stop', eta: 12, capacity: 65, status: 'CROWDED', co2: 0.3, departures: ['21:48', '22:00', '22:12'] },
    { id: 'bus_7',     type: 'Bus',     name: 'Bus Route 7',       from: 'Parking Lot P3',   to: 'Gate A', eta: 8, capacity: 45, status: 'ON TIME', co2: 1.2, departures: ['21:55', '22:15', '22:35'] },
    { id: 'bike',      type: 'Bike',    name: 'CitiBike Share',    from: 'Stadium Plaza',    to: 'City Center', eta: 22, capacity: 100, status: 'AVAILABLE', co2: 0.0, departures: ['Anytime'] },
    { id: 'rideshare', type: 'Ride',    name: 'Official Rideshare', from: 'Drop-off Zone D',  to: 'Custom', eta: 18, capacity: 100, status: 'SURGE', co2: 2.1, departures: ['On demand'] },
  ],

  incidents: [
    { id: 'inc001', time: '21:28', location: 'Gate A Plaza',    type: 'CROWD', severity: 'CRITICAL', description: 'Crowd density at 94% — bottleneck forming at north turnstile cluster', aiScore: 97, status: 'ACTIVE',   assignedTo: 'Team Alpha', aiAction: 'Open Gate B overflow lanes immediately. Dispatch 4 crowd marshals to north turnstiles.' },
    { id: 'inc002', time: '21:31', location: 'Section 112',     type: 'HEAT',  severity: 'HIGH',     description: 'Fan reported dizziness and confusion, 98°F ambient, high humidity zone', aiScore: 88, status: 'ACTIVE',   assignedTo: 'Team Medic', aiAction: 'Dispatch mobile cooling unit and 2 medics. Route to Cooling Zone B via concourse south.' },
    { id: 'inc003', time: '21:15', location: 'Food Court',      type: 'CROWD', severity: 'HIGH',     description: 'Food court at 88% capacity, lines blocking emergency corridor', aiScore: 82, status: 'RESPONDED', assignedTo: 'Team Beta',  aiAction: 'Activate secondary food stand on east concourse. Redirect fans via PA announcement.' },
    { id: 'inc004', time: '21:09', location: 'Parking P1',      type: 'TRAFFIC', severity: 'MEDIUM', description: 'Exit queue buildup, 8400 fans waiting, estimated 45 min delay', aiScore: 71, status: 'RESPONDED', assignedTo: 'Traffic Ctrl', aiAction: 'Open alternate exit route via service road 4. Stagger departure by section.' },
    { id: 'inc005', time: '21:03', location: 'Info Booth West', type: 'LOST',  severity: 'MEDIUM',   description: 'Fan reported lost child, 8yo boy, green shirt, last seen near Gate B', aiScore: 68, status: 'RESOLVED',  assignedTo: 'Security',   aiAction: 'Broadcast description via PA. Child located at Fan Info Point East at 21:11.' },
  ],

  matches: [
    { id: 'm1', time: '21:00', venue: 'MetLife Stadium', home: 'Brazil', homeFlag: '🇧🇷', away: 'Argentina', awayFlag: '🇦🇷', homeScore: 2, awayScore: 1, status: 'LIVE', minute: 78 },
    { id: 'm2', time: '18:00', venue: 'AT&T Stadium', home: 'France', homeFlag: '🇫🇷', away: 'England', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeScore: 1, awayScore: 0, status: 'FT', minute: 90 },
    { id: 'm3', time: '00:00', venue: 'NRG Stadium', home: 'Germany', homeFlag: '🇩🇪', away: 'Spain', awayFlag: '🇪🇸', homeScore: null, awayScore: null, status: 'UPCOMING', minute: null },
    { id: 'm4', time: '03:00', venue: 'Azteca', home: 'Mexico', homeFlag: '🇲🇽', away: 'USA', awayFlag: '🇺🇸', homeScore: null, awayScore: null, status: 'UPCOMING', minute: null },
  ],

  sustainability: {
    carbonToday: 4820,
    carbonTarget: 6000,
    wasteRecycled: 73,
    waterSaved: 128000,
    renewableEnergy: 84,
    greenTransport: 62,
    treeOffset: 1204,
    aiTips: [
      'Take the Blue Line Metro — saves 2.1kg CO₂ vs driving',
      'Use the recycling station at Gate C — 94% waste recycled there',
      'Choose plant-based meals — reduces food carbon by 60%',
      'Bike share available at Plaza — zero emissions, 22 min to city center',
    ],
  },

  groupMembers: [
    { id: 'gm1', name: 'Sarah', relation: 'Partner', lang: 'en', avatar: '👩', status: 'safe', location: 'Section 114, Row 8', lastSeen: '1 min ago', heatRisk: 'LOW' },
    { id: 'gm2', name: 'Arjun', relation: 'Friend',  lang: 'hi', avatar: '👨', status: 'safe', location: 'Concourse N', lastSeen: '3 min ago', heatRisk: 'MODERATE' },
    { id: 'gm3', name: 'Mei',   relation: 'Friend',  lang: 'zh', avatar: '👩', status: 'warning', location: 'Food Court', lastSeen: '8 min ago', heatRisk: 'HIGH' },
    { id: 'gm4', name: 'Luca',  relation: 'Child',   lang: 'it', avatar: '👦', status: 'safe', location: 'Section 114, Row 8', lastSeen: '1 min ago', heatRisk: 'LOW' },
  ],

  navRoutes: {
    standard: {
      name: 'Standard Route', time: '8 min', distance: '620m', congestion: 'High',
      steps: ['Exit Section 114 via Row M', 'Take North Concourse (crowded — merge left)', 'Pass Food Court (use east bypass)', 'Turn right at Info Booth', 'Arrive Gate C — Exit Ramp 3'],
    },
    ai_optimized: {
      name: 'AI-Optimized Route', time: '5 min', distance: '780m', congestion: 'Low',
      steps: ['Exit Section 114 via Row A (rear)', 'Take South Concourse (26% capacity)', 'Through VIP Corridor (open today)', 'Elevator to Plaza Level', 'Arrive Gate D — Direct Exit'],
    },
    accessible: {
      name: 'Accessible Route', time: '7 min', distance: '650m', congestion: 'Low',
      steps: ['Exit via Accessible Aisle 114-ADA', 'Level 2 Accessible Walkway (smooth surface)', 'Elevator Bank B to Ground Level', 'Accessible Gate C — No stairs'],
    },
  },

  aiChatResponses: {
    gate: "Your nearest uncrowded exit is **Gate D** (VIP Entry). It's currently at 22% capacity — just 3 min walk via the South Concourse. Gate A is critically congested right now (92%). I'd strongly recommend Gate D.",
    seat: "Your seat is in **Section 114, Row 8**. From the main concourse, take Elevator B to Level 3, then follow the blue line markers to Section 110-120. Estimated walk: 4 minutes.",
    food: "Top nearby options with short queues right now: 🍕 **Slice Republic** (Concourse E, 8 min wait) · 🌮 **Taco del Mundo** (Level 2, 5 min wait) · 🥤 **Hydration Hub** (every concourse, 2 min wait — free water!)",
    shuttle: "Next **Express Shuttle A** departs at **22:10** from Gate C. It's the fastest option right now — 4 min to MetroLink Station. I recommend leaving your seat at minute 85 to beat the crowd rush.",
    heat: "⚠️ The stadium heat index is **HIGH** right now (97°F feels-like). Nearest cooling zones: **Cooling Station B** (Concourse S, 200m) and **Medical Tent 3** (Gate B, 350m). Drink water every 20 min. I'll monitor your group.",
    lost: "🚨 Activating **Group Safety Protocol**. I'm broadcasting an encrypted BLE signal to nearby staff devices. Nearest security station: **Info Booth East, Gate B**. Show this screen to any staff member — it has your group's details and your location ID.",
    wifi: "Stadium connectivity is congested near Gate A. All my core features are running **offline on your device** right now — including maps, translation, and emergency guidance. You're covered even without internet. 📶",
    ticket: "If your QR code isn't showing, try: 1️⃣ Force-close and reopen the tickets app 2️⃣ Your code was pre-cached — it's in your phone's local storage. 3️⃣ Head to **Ticket Resolution Point** near Gate C. I can guide you there (3 min walk).",
    translate: "I have **50 languages** cached offline. Say your target language and I'll help you communicate. For emergencies, tap the 🆘 button to generate a visual emergency card any staff member worldwide can understand.",
    default: "I'm PULSE, your AI safety companion for FIFA World Cup 2026. I can help with: 📍 Navigation · 🌡️ Heat safety · 👥 Group tracking · 🚌 Transport · 🗣️ Translation · 🎫 Tickets · 🚨 Emergencies. All offline-capable. What do you need?",
  },
};

window.DATA = DATA;
