(function () {
  "use strict";

  // Configuration & Links
  const HOME_PAGE_URL = "https://tileworksgamesstudio.github.io/Curling-Menu/"; 
  const STORAGE_KEY = "word_guess_data_v1";
  const CSV_FILE = "puzzles.csv";

  // Built-in fallback puzzle dataset for offline & resilient operation
  const FALLBACK_PUZZLES = [
    { date: "2025-05-18", word: "PRIDE", definition: "A feeling of deep satisfaction from one's achievements." },
    { date: "2025-05-19", word: "CLEAN", definition: "Free from dirt, marks, or unwanted matter." },
    { date: "2025-05-20", word: "LIGHT", definition: "The natural agent that stimulates sight." },
    { date: "2025-05-21", word: "BRAVE", definition: "Ready to face danger or pain; showing courage." },
    { date: "2025-05-22", word: "SHARP", definition: "Having an edge or point that is able to cut or pierce." },
    { date: "2025-05-23", word: "SWIFT", definition: "Happening quickly or moving with great speed." },
    { date: "2025-05-24", word: "CRANE", definition: "A large tall machine used for moving heavy objects." }
  ];

  const VALID_WORDS = new Set([
    "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN",
    "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE",
    "ALONG", "ALTER", "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA",
    "ARGUE", "ARISE", "ARMED", "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID", "AWARD",
    "AWARE", "BADLY", "BAKER", "BASES", "BASIC", "BASIS", "BEACH", "BEGAN", "BEGIN", "BEGUN",
    "BEING", "BELOW", "BENCH", "BILLY", "BIRTH", "BLACK", "BLAME", "BLIND", "BLOCK", "BLOOD",
    "BOARD", "BOOST", "BOOTH", "BOUND", "BRAIN", "BRAND", "BRAVE", "BREAD", "BREAK", "BREED",
    "BRIEF", "BRING", "BROAD", "BROKE", "BROWN", "BUILD", "CABLE", "CARRY", "CATCH", "CAUSE",
    "CHAIN", "CHAIR", "CHART", "CHASE", "CHEAP", "CHECK", "CHEST", "CHIEF", "CHILD", "CHOSE",
    "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLICK", "CLOCK", "CLOSE", "COAST", "COULD",
    "COUNT", "COURT", "COVER", "CRAFT", "CRANE", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN",
    "CURVE", "CYCLE", "DAILY", "DANCE", "DATED", "DEALT", "DEATH", "DEBUT", "DELAY", "DEPTH",
    "DOING", "DOUBT", "DOZEN", "DRAFT", "DRAMA", "DRAWN", "DREAM", "DRESS", "DRILL", "DRINK",
    "DRIVE", "DROVE", "DYING", "EAGER", "EARLY", "EARTH", "EIGHT", "ELITE", "EMPTY", "ENEMY",
    "ENJOY", "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA",
    "FAITH", "FALSE", "FAULT", "FIBER", "FIELD", "FIFTH", "FIFTY", "FIGHT", "FINAL", "FIRST",
    "FIXED", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS", "FORCE", "FORTH", "FORTY", "FORUM",
    "FOUND", "FRAME", "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT",
    "GIVEN", "GLASS", "GLOBE", "GOING", "GRACE", "GRADE", "GRAIN", "GRAND", "GRANT", "GRASS",
    "GREAT", "GREEN", "GROSS", "GROUP", "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY",
    "HEART", "HEAVY", "HENCE", "HONEY", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE",
    "INDEX", "INNER", "INPUT", "ISSUE", "JOINT", "JUDGE", "JUICE", "KNIFE", "KNOWN", "LABEL",
    "LARGE", "LASER", "LATER", "LAUGH", "LAYER", "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL",
    "LEMON", "LEVEL", "LIGHT", "LIMIT", "LINKS", "LIVES", "LOCAL", "LOGIC", "LOOSE", "LOWER",
    "LUCKY", "LUNCH", "MAGIC", "MAJOR", "MAKER", "MARCH", "MATCH", "MAYBE", "MAYOR", "MEANT",
    "MEDIA", "METAL", "MIGHT", "MINOR", "MINUS", "MIXED", "MODEL", "MONEY", "MONTH", "MORAL",
    "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVIE", "MUSIC", "NEEDS", "NEVER", "NEWLY", "NIGHT",
    "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE", "OCCUR", "OFFER", "OFTEN", "ORDER", "OTHER",
    "OUGHT", "PAINT", "PANEL", "PAPER", "PARTY", "PEACE", "PHASE", "PHONE", "PHOTO", "PIECE",
    "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND", "POWER",
    "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR", "PRIZE", "PROOF", "PROUD", "PROVE",
    "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE", "RANGE", "RAPID", "RATIO", "REACH",
    "READY", "REFER", "RIGHT", "RIVAL", "RIVER", "ROUGH", "ROUND", "ROUTE", "ROYAL", "RURAL",
    "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN", "SHALL", "SHAPE", "SHARE",
    "SHARP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOWN",
    "SIGHT", "SINCE", "SIXTH", "SIXTY", "SIZED", "SKILL", "SLEEP", "SLIDE", "SMALL", "SMART",
    "SMILE", "SMOKE", "SOLID", "SOLVE", "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK",
    "SPEED", "SPEND", "SPENT", "SPLIT", "SPOKE", "SPORT", "STAFF", "STAGE", "STAKE", "STAND",
    "START", "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK", "STONE", "STOOD", "STORE",
    "STORM", "STORY", "STRIP", "STUDY", "STUFF", "STYLE", "SUGAR", "SUITE", "SUPER", "SWEET",
    "SWIFT", "TABLE", "TAKEN", "TASTE", "TAXES", "TEACH", "TEETH", "THANK", "THEFT", "THEIR",
    "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD", "THOSE", "THREE", "THREW",
    "THROW", "TIGHT", "TIMES", "TIRED", "TITLE", "TODAY", "TOPIC", "TOTAL", "TOUCH", "TOUGH",
    "TOWER", "TRACK", "TRADE", "TRAIN", "TREAT", "TREND", "TRIAL", "TRIED", "TRIES", "TRUCK",
    "TRULY", "TRUST", "TRUTH", "TWICE", "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL", "UPON",
    "UPPER", "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT",
    "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WHEEL", "WHERE", "WHICH", "WHILE", "WHITE",
    "WHOLE", "WHOSE", "WOMAN", "WOMEN", "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD",
    "WOUND", "WRITE", "WRONG", "WROTE", "YIELD", "YOUNG", "YOUTH"
  ]);

  // ==========================================================================
  // LIGHTWEIGHT SOUND SYSTEM (Web Audio Synthesizer, Safe & Gesture-Initiated)
  // ==========================================================================
  class CurlingAudioEngine {
    constructor() {
      this.ctx = null;
      this.isInitialized = false;
    }

    init() {
      if (this.isInitialized) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.isInitialized = true;
        }
      } catch (e) {}
    }

    resume() {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    }

    // Gentle tactile click for key taps
    playKeyTap() {
      if (!this.ctx) return;
      try {
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = "sine";
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }

    // Tactile button press (solid stone tap)
    playButtonTap() {
      if (!this.ctx) return;
      try {
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
      } catch (e) {}
    }

    // Subdued error thud
    playError() {
      if (!this.ctx) return;
      try {
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.setValueAtTime(120, now + 0.08);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.18);
      } catch (e) {}
    }

    // Elegant championship completion chime
    playSuccess() {
      if (!this.ctx) return;
      try {
        this.resume();
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const start = this.ctx.currentTime + idx * 0.09;

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0.05, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(start);
          osc.stop(start + 0.35);
        });
      } catch (e) {}
    }
  }

  // ==========================================================================
  // EXACTLY 12 CURLING ICONS + AUTHORITATIVE MAPLE LEAF SVG DEFINITIONS
  // ==========================================================================
  const CURLING_ICONS = [
    // 1. Curling Stone
    `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="58" rx="42" ry="24" fill="#132B4A" opacity="0.85"/><ellipse cx="50" cy="56" rx="40" ry="22" fill="#DCEFFC"/><ellipse cx="50" cy="50" rx="34" ry="16" fill="#D71920"/><path d="M42 42 C 42 26, 58 26, 58 42" stroke="#0A192F" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
    // 2. Curling House / Rings
    `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="#132B4A" stroke-width="4"/><circle cx="50" cy="50" r="32" fill="#DCEFFC" stroke="#132B4A" stroke-width="3"/><circle cx="50" cy="50" r="16" fill="#D71920" stroke="#0A192F" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="#FFFFFF"/></svg>`,
    // 3. Curling Broom
    `<svg viewBox="0 0 100 100"><line x1="22" y1="84" x2="78" y2="16" stroke="#0A192F" stroke-width="4" stroke-linecap="round"/><rect x="14" y="76" width="22" height="10" rx="3" transform="rotate(-40 25 81)" fill="#D71920" stroke="#0A192F" stroke-width="2"/></svg>`,
    // 4. Brush Head
    `<svg viewBox="0 0 100 100"><rect x="18" y="38" width="64" height="24" rx="6" fill="#FFC400" stroke="#0A192F" stroke-width="3"/><line x1="24" y1="50" x2="76" y2="50" stroke="#0A192F" stroke-width="2" stroke-dasharray="4 2"/><circle cx="50" cy="38" r="4" fill="#0A192F"/></svg>`,
    // 5. Hack (Foot Hold)
    `<svg viewBox="0 0 100 100"><rect x="25" y="30" width="50" height="40" rx="4" fill="#132B4A"/><line x1="32" y1="40" x2="68" y2="40" stroke="#DCEFFC" stroke-width="3"/><line x1="32" y1="50" x2="68" y2="50" stroke="#DCEFFC" stroke-width="3"/><line x1="32" y1="60" x2="68" y2="60" stroke="#DCEFFC" stroke-width="3"/></svg>`,
    // 6. Stone Handle
    `<svg viewBox="0 0 100 100"><path d="M25 65 L25 45 C25 30, 75 30, 75 45 L75 65" fill="none" stroke="#FFC400" stroke-width="8" stroke-linecap="round"/><circle cx="25" cy="65" r="5" fill="#0A192F"/><circle cx="75" cy="65" r="5" fill="#0A192F"/></svg>`,
    // 7. Hog Line
    `<svg viewBox="0 0 100 100"><rect x="5" y="44" width="90" height="12" fill="#D71920" rx="2"/><line x1="5" y1="50" x2="95" y2="50" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6 4"/></svg>`,
    // 8. Back Line
    `<svg viewBox="0 0 100 100"><line x1="10" y1="50" x2="90" y2="50" stroke="#132B4A" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="50" r="10" fill="none" stroke="#132B4A" stroke-width="3"/></svg>`,
    // 9. Centre Line
    `<svg viewBox="0 0 100 100"><line x1="50" y1="5" x2="50" y2="95" stroke="#132B4A" stroke-width="4"/><line x1="35" y1="50" x2="65" y2="50" stroke="#132B4A" stroke-width="4"/></svg>`,
    // 10. Pebble / Ice Texture Motif
    `<svg viewBox="0 0 100 100"><circle cx="30" cy="25" r="4" fill="#B7D9EE"/><circle cx="65" cy="35" r="3" fill="#B7D9EE"/><circle cx="45" cy="60" r="5" fill="#B7D9EE"/><circle cx="75" cy="70" r="4" fill="#B7D9EE"/><circle cx="25" cy="75" r="3" fill="#B7D9EE"/></svg>`,
    // 11. Scoreboard / End Marker
    `<svg viewBox="0 0 100 100"><rect x="15" y="20" width="70" height="60" rx="4" fill="#FFFFFF" stroke="#0A192F" stroke-width="3"/><line x1="15" y1="45" x2="85" y2="45" stroke="#0A192F" stroke-width="2"/><text x="50" y="38" font-size="14" font-weight="900" text-anchor="middle" fill="#D71920" font-family="sans-serif">END</text><text x="50" y="70" font-size="18" font-weight="900" text-anchor="middle" fill="#0A192F" font-family="sans-serif">8</text></svg>`,
    // 12. Skip / Throwing Position Silhouette
    `<svg viewBox="0 0 100 100"><circle cx="60" cy="25" r="8" fill="#0A192F"/><path d="M52 35 L40 50 L20 52 M40 50 L58 60 L78 72" stroke="#0A192F" stroke-width="5" stroke-linecap="round" fill="none"/><ellipse cx="18" cy="60" rx="10" ry="5" fill="#D71920"/></svg>`
  ];

  // Mandatory Canadian Maple Leaf SVG Geometry (Section 65.6)
  function createMapleLeafSvg(color) {
    const fill = color || "#D71920";
    return `<svg viewBox="0 0 298.72 341.12" aria-hidden="true" focusable="false">
      <g transform="translate(-250.85 -233.44)">
        <path
          d="m325.8 480.69 8.1527-20.11-65.765-60.873 17.392-9.2397-7.6092-44.568 39.676 4.3481 11.957-16.849 30.98 39.133-17.392-84.788 26.089 8.6962 25.001-45.655 23.371 44.568 27.719-7.6092-17.936 84.244 30.98-38.046 10.87 16.305 39.133-3.8046-5.9786 42.937 17.936 11.414-65.765 60.33 7.0656 21.197-58.699-9.7832 1.6305 72.83h-22.284l3.2611-73.374z"
          fill="${fill}"
        />
      </g>
    </svg>`;
  }

  // ==========================================================================
  // STORAGE & HELPERS
  // ==========================================================================
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getInitialState();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !parsed.stats) {
        return getInitialState();
      }
      return parsed;
    } catch (e) {
      return getInitialState();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function getInitialState() {
    return {
      version: 1,
      stats: {
        played: 0,
        wins: 0,
        streak: 0,
        maxStreak: 0,
        distribution: [0, 0, 0, 0, 0, 0],
        lastDate: null
      },
      puzzles: {}
    };
  }

  function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentField = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          currentField += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === "," && !inQuotes) {
        currentRow.push(currentField.trim());
        currentField = "";
      } else if ((c === "\n" || c === "\r") && !inQuotes) {
        if (c === "\r" && text[i + 1] === "\n") i++;
        currentRow.push(currentField.trim());
        if (currentRow.some((f) => f.length > 0)) rows.push(currentRow);
        currentRow = [];
        currentField = "";
      } else {
        currentField += c;
      }
    }
    if (currentField.length > 0 || currentRow.length > 0) {
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) rows.push(currentRow);
    }
    if (rows.length < 2) return [];

    const headers = rows[0].map((h) => h.toLowerCase());
    return rows.slice(1).map((row) => {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = row[idx] || "";
      });
      return obj;
    });
  }

  function getTodayString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // ==========================================================================
  // APPLICATION CLASS
  // ==========================================================================
  class WordGuessApp {
    constructor() {
      this.state = loadState();
      this.puzzles = [];
      this.currentPuzzle = null;
      this.todayString = getTodayString();
      this.activeInput = "";
      this.guesses = [];
      this.isComplete = false;
      this.toastTimeout = null;
      this.audio = new CurlingAudioEngine();

      this.cacheElements();
      this.setupHomeLink();
      this.initBoard();
      this.initKeyboard();
      this.attachEvents();
      this.initAmbientCurlingLayer();
      this.loadPuzzleData();
    }

    cacheElements() {
      this.views = {
        menu: document.getElementById("view-menu"),
        vault: document.getElementById("view-vault"),
        game: document.getElementById("view-game")
      };

      this.dom = {
        ambientLayer: document.getElementById("ambient-curling-layer"),

        // Menu Elements
        navDaily: document.getElementById("nav-daily"),
        navVault: document.getElementById("nav-vault"),
        navHome: document.getElementById("nav-home"),
        menuDailyStatus: document.getElementById("menu-daily-status"),
        menuVaultCount: document.getElementById("menu-vault-count"),
        btnMenuStats: document.getElementById("btn-menu-stats"),
        btnMenuRules: document.getElementById("btn-menu-rules"),

        // Vault Elements
        btnVaultBack: document.getElementById("btn-vault-back"),
        vaultList: document.getElementById("vault-list"),

        // Gameplay Elements
        gamePuzzleTitle: document.getElementById("game-puzzle-title"),
        gamePuzzleDate: document.getElementById("game-puzzle-date"),
        gameStatusPill: document.getElementById("game-status-pill"),
        btnGameBack: document.getElementById("btn-game-back"),
        btnGameRules: document.getElementById("btn-game-rules"),
        btnGameStats: document.getElementById("btn-game-stats"),
        board: document.getElementById("board"),
        keyboard: document.getElementById("keyboard"),

        // Modals & Feedback
        toast: document.getElementById("toast"),
        modalRules: document.getElementById("modal-rules"),
        modalStats: document.getElementById("modal-stats"),
        modalResult: document.getElementById("modal-result"),
        btnShare: document.getElementById("btn-share"),
        btnResultVault: document.getElementById("btn-result-vault"),

        // Results
        resultTitle: document.getElementById("result-title"),
        resultWord: document.getElementById("result-word"),
        resultDefinition: document.getElementById("result-definition"),
        resultSummary: document.getElementById("result-summary"),

        // Statistics Modal
        statPlayed: document.getElementById("stat-played"),
        statWinrate: document.getElementById("stat-winrate"),
        statStreak: document.getElementById("stat-streak"),
        statMaxstreak: document.getElementById("stat-maxstreak"),
        distributionChart: document.getElementById("distribution-chart")
      };
    }

    setupHomeLink() {
      if (this.dom.navHome) {
        this.dom.navHome.setAttribute("href", HOME_PAGE_URL);
      }
    }

    // ========================================================================
    // AMBIENT CURLING BACKGROUND (12 Icons + Maple Leaf across 3 Depth Levels)
    // ========================================================================
    initAmbientCurlingLayer() {
      if (!this.dom.ambientLayer) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const maxFloaters = 10;
      let activeFloaters = 0;

      const spawnFloater = () => {
        if (activeFloaters >= maxFloaters) return;

        const floater = document.createElement("div");
        floater.className = "ambient-floater";

        // Decide between 12 curling icons and Canadian maple leaf
        const isLeaf = Math.random() < 0.35;
        let svgMarkup = "";

        if (isLeaf) {
          const colors = ["#D71920", "#FF2B30", "#132B4A"];
          const leafColor = colors[Math.floor(Math.random() * colors.length)];
          svgMarkup = createMapleLeafSvg(leafColor);
        } else {
          const iconIdx = Math.floor(Math.random() * CURLING_ICONS.length);
          svgMarkup = CURLING_ICONS[iconIdx];
        }

        floater.innerHTML = svgMarkup;

        // Depth assignments
        const depths = ["depth-distant", "depth-middle", "depth-near"];
        const depthChoice = depths[Math.floor(Math.random() * depths.length)];
        floater.classList.add(depthChoice);

        let size = 32;
        let duration = 28;
        let opacity = 0.16;

        if (depthChoice === "depth-distant") {
          size = Math.floor(Math.random() * 12) + 24;
          duration = Math.floor(Math.random() * 10) + 32;
          opacity = 0.12;
        } else if (depthChoice === "depth-middle") {
          size = Math.floor(Math.random() * 16) + 36;
          duration = Math.floor(Math.random() * 8) + 24;
          opacity = 0.20;
        } else {
          size = Math.floor(Math.random() * 20) + 48;
          duration = Math.floor(Math.random() * 6) + 18;
          opacity = 0.28;
        }

        const startX = Math.random() * 92 + 4; // %
        const driftX = (Math.random() - 0.5) * 60; // px
        const rotationStart = (Math.random() - 0.5) * 40;
        const rotationEnd = rotationStart + (Math.random() - 0.5) * 90;

        floater.style.width = `${size}px`;
        floater.style.height = `${size}px`;
        floater.style.left = `${startX}%`;
        floater.style.bottom = "-80px";
        floater.style.opacity = `${opacity}`;

        this.dom.ambientLayer.appendChild(floater);
        activeFloaters++;

        // Smooth CSS Web Animations API
        const animation = floater.animate(
          [
            { transform: `translate(0, 0) rotate(${rotationStart}deg)`, opacity: 0 },
            { opacity: opacity, offset: 0.18 },
            { opacity: opacity, offset: 0.82 },
            { transform: `translate(${driftX}px, -115vh) rotate(${rotationEnd}deg)`, opacity: 0 }
          ],
          {
            duration: duration * 1000,
            easing: "linear"
          }
        );

        animation.onfinish = () => {
          floater.remove();
          activeFloaters--;
        };
      };

      // Seed initial floaters
      for (let i = 0; i < 4; i++) {
        setTimeout(spawnFloater, i * 1800);
      }
      setInterval(spawnFloater, 4200);
    }

    switchView(viewName) {
      this.audio.playButtonTap();
      Object.keys(this.views).forEach((key) => {
        if (key === viewName) {
          this.views[key].classList.remove("hidden");
        } else {
          this.views[key].classList.add("hidden");
        }
      });

      if (viewName === "menu") {
        this.updateMenuSummary();
      } else if (viewName === "vault") {
        this.renderVault();
      }
    }

    async loadPuzzleData() {
      try {
        const response = await fetch(CSV_FILE);
        if (!response.ok) throw new Error("CSV fetch failed");
        const text = await response.text();
        const parsed = parseCSV(text);

        const list = parsed
          .filter((p) => p.date && p.word && p.word.length === 5)
          .map((p) => ({
            date: p.date,
            word: p.word.toUpperCase().trim(),
            definition: p.definition ? p.definition.trim() : ""
          }));

        this.puzzles = list.length > 0 ? list : FALLBACK_PUZZLES;
      } catch (err) {
        this.puzzles = FALLBACK_PUZZLES;
      }

      this.puzzles.forEach((p) => VALID_WORDS.add(p.word));
      this.updateMenuSummary();
    }

    getDailyPuzzle() {
      const todayMatch = this.puzzles.find((p) => p.date === this.todayString);
      if (todayMatch) return todayMatch;

      const past = this.puzzles
        .filter((p) => p.date <= this.todayString)
        .sort((a, b) => b.date.localeCompare(a.date));

      if (past.length > 0) return past[0];
      return this.puzzles[0];
    }

    updateMenuSummary() {
      const daily = this.getDailyPuzzle();
      if (!daily) return;

      const record = this.state.puzzles[daily.date];
      if (record && record.completed) {
        this.dom.menuDailyStatus.textContent = record.won
          ? `Completed (${record.guesses.length}/6)`
          : "Completed (X/6)";
      } else if (record && record.guesses && record.guesses.length > 0) {
        this.dom.menuDailyStatus.textContent = `In Progress (${record.guesses.length}/6)`;
      } else {
        this.dom.menuDailyStatus.textContent = "Ready to throw";
      }

      const availableVaultPuzzles = this.puzzles.filter((p) => p.date !== daily.date);
      this.dom.menuVaultCount.textContent = `${availableVaultPuzzles.length} matches available`;
    }

    initBoard() {
      this.dom.board.innerHTML = "";
      for (let r = 0; r < 6; r++) {
        const row = document.createElement("div");
        row.className = "board-row";
        row.setAttribute("role", "row");
        for (let c = 0; c < 5; c++) {
          const tile = document.createElement("div");
          tile.className = "tile";
          tile.setAttribute("role", "gridcell");
          tile.setAttribute("aria-label", "Empty");
          row.appendChild(tile);
        }
        this.dom.board.appendChild(row);
      }
    }

    initKeyboard() {
      const layout = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"]
      ];

      this.dom.keyboard.innerHTML = "";
      layout.forEach((rowKeys) => {
        const rowEl = document.createElement("div");
        rowEl.className = "keyboard-row";
        rowKeys.forEach((key) => {
          const btn = document.createElement("button");
          btn.className = "key";
          btn.dataset.key = key;
          btn.setAttribute("type", "button");
          btn.textContent = key === "BACK" ? "⌫" : key;
          btn.setAttribute("aria-label", key === "BACK" ? "Backspace" : key);

          if (key === "ENTER" || key === "BACK") {
            btn.classList.add("key-wide");
          }

          btn.addEventListener("click", () => {
            this.audio.init();
            this.handleInput(key);
          });
          rowEl.appendChild(btn);
        });
        this.dom.keyboard.appendChild(rowEl);
      });
    }

    attachEvents() {
      // Audio engine unlocked on first page click
      window.addEventListener(
        "pointerdown",
        () => {
          this.audio.init();
        },
        { once: true }
      );

      // Hardware Keyboard Input
      window.addEventListener("keydown", (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const activeDialog = document.querySelector("dialog[open]");
        if (activeDialog) return;

        if (this.views.game.classList.contains("hidden")) return;
        this.audio.init();

        if (e.key === "Enter") {
          this.handleInput("ENTER");
        } else if (e.key === "Backspace") {
          this.handleInput("BACK");
        } else if (/^[a-zA-Z]$/.test(e.key)) {
          this.handleInput(e.key.toUpperCase());
        }
      });

      // Navigation: Menu -> Daily Puzzle
      this.dom.navDaily.addEventListener("click", () => {
        const daily = this.getDailyPuzzle();
        if (daily) this.startPuzzle(daily, true);
      });

      // Navigation: Menu -> Vault
      this.dom.navVault.addEventListener("click", () => {
        this.switchView("vault");
      });

      // Navigation: Vault Back -> Menu
      this.dom.btnVaultBack.addEventListener("click", () => {
        this.switchView("menu");
      });

      // Navigation: Game Back -> Menu
      this.dom.btnGameBack.addEventListener("click", () => {
        this.switchView("menu");
      });

      // Menu Rules & Stats
      this.dom.btnMenuRules.addEventListener("click", () => this.openDialog(this.dom.modalRules));
      this.dom.btnMenuStats.addEventListener("click", () => this.renderStatsModal());

      // In-Game Rules & Stats
      this.dom.btnGameRules.addEventListener("click", () => this.openDialog(this.dom.modalRules));
      this.dom.btnGameStats.addEventListener("click", () => this.renderStatsModal());

      // Result Modal Actions
      this.dom.btnShare.addEventListener("click", () => this.shareResult());
      this.dom.btnResultVault.addEventListener("click", () => {
        this.dom.modalResult.close();
        this.switchView("vault");
      });

      // Dialog Close Buttons
      document.querySelectorAll("[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.audio.playButtonTap();
          const target = document.getElementById(btn.dataset.close);
          if (target && typeof target.close === "function") {
            target.close();
          }
        });
      });
    }

    startPuzzle(puzzle, isDaily) {
      this.audio.playButtonTap();
      this.currentPuzzle = puzzle;
      this.activeInput = "";
      this.guesses = [];
      this.isComplete = false;

      const title = isDaily ? "DAILY PUZZLE" : `MATCH: ${puzzle.date}`;
      this.dom.gamePuzzleTitle.textContent = title;
      this.dom.gamePuzzleDate.textContent = isDaily ? `Today (${puzzle.date})` : puzzle.date;

      this.resetBoardAndKeyboard();

      const saved = this.state.puzzles[puzzle.date];
      if (saved && Array.isArray(saved.guesses)) {
        saved.guesses.forEach((guess) => {
          this.applyGuess(guess);
        });

        if (saved.completed) {
          this.isComplete = true;
          this.dom.gameStatusPill.textContent = saved.won ? "END WON" : "END FINISHED";
          this.dom.gameStatusPill.classList.remove("hidden");
        } else {
          this.dom.gameStatusPill.classList.add("hidden");
        }
      } else {
        this.dom.gameStatusPill.classList.add("hidden");
      }

      this.switchView("game");
    }

    resetBoardAndKeyboard() {
      const tiles = this.dom.board.querySelectorAll(".tile");
      tiles.forEach((tile) => {
        tile.textContent = "";
        tile.className = "tile";
        tile.removeAttribute("data-state");
        tile.setAttribute("aria-label", "Empty");
      });

      const keys = this.dom.keyboard.querySelectorAll(".key");
      keys.forEach((k) => {
        k.classList.remove("correct", "present", "absent");
      });
    }

    handleInput(key) {
      if (this.isComplete) return;

      if (key === "ENTER") {
        this.submitGuess();
      } else if (key === "BACK") {
        if (this.activeInput.length > 0) {
          this.audio.playKeyTap();
          this.activeInput = this.activeInput.slice(0, -1);
          this.renderActiveRow();
        }
      } else if (/^[A-Z]$/.test(key)) {
        if (this.activeInput.length < 5) {
          this.audio.playKeyTap();
          this.activeInput += key;
          this.renderActiveRow();
        }
      }
    }

    renderActiveRow() {
      const rowIndex = this.guesses.length;
      if (rowIndex >= 6) return;

      const row = this.dom.board.children[rowIndex];
      for (let c = 0; c < 5; c++) {
        const tile = row.children[c];
        const letter = this.activeInput[c] || "";
        tile.textContent = letter;
        tile.dataset.state = letter ? "active" : "";
        tile.setAttribute("aria-label", letter || "Empty");
      }
    }

    submitGuess() {
      if (this.activeInput.length !== 5) {
        this.audio.playError();
        this.showToast("Need 5 letters to throw");
        return;
      }

      const guess = this.activeInput.toUpperCase();
      if (!VALID_WORDS.has(guess)) {
        this.audio.playError();
        this.showToast("Not in official tournament lexicon");
        return;
      }

      this.applyGuess(guess);
      this.activeInput = "";

      const won = guess === this.currentPuzzle.word;
      const lost = !won && this.guesses.length >= 6;

      if (won || lost) {
        this.isComplete = true;
        this.dom.gameStatusPill.textContent = won ? "END WON" : "END FINISHED";
        this.dom.gameStatusPill.classList.remove("hidden");
        this.recordProgress(won);

        if (won) {
          this.audio.playSuccess();
        } else {
          this.audio.playError();
        }

        setTimeout(() => this.openResultModal(won), 500);
      } else {
        this.audio.playButtonTap();
        this.saveCurrentProgress(false, false);
      }
    }

    evaluateGuess(guess, target) {
      const evaluation = Array(5).fill("absent");
      const targetLetters = target.split("");
      const guessLetters = guess.split("");
      const targetFreq = {};

      for (const char of targetLetters) {
        targetFreq[char] = (targetFreq[char] || 0) + 1;
      }

      for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === targetLetters[i]) {
          evaluation[i] = "correct";
          targetFreq[guessLetters[i]]--;
        }
      }

      for (let i = 0; i < 5; i++) {
        if (evaluation[i] !== "correct" && targetFreq[guessLetters[i]] > 0) {
          evaluation[i] = "present";
          targetFreq[guessLetters[i]]--;
        }
      }

      return evaluation;
    }

    applyGuess(guess) {
      const rowIndex = this.guesses.length;
      if (rowIndex >= 6) return;

      const row = this.dom.board.children[rowIndex];
      const evaluation = this.evaluateGuess(guess, this.currentPuzzle.word);

      this.guesses.push(guess);

      for (let c = 0; c < 5; c++) {
        const tile = row.children[c];
        const status = evaluation[c];
        tile.textContent = guess[c];
        tile.className = `tile ${status}`;
        tile.removeAttribute("data-state");
        tile.setAttribute("aria-label", `${guess[c]}, ${status}`);

        const keyBtn = this.dom.keyboard.querySelector(`[data-key="${guess[c]}"]`);
        if (keyBtn) {
          const isCorrect = keyBtn.classList.contains("correct");
          const isPresent = keyBtn.classList.contains("present");

          if (status === "correct") {
            keyBtn.className = "key correct";
          } else if (status === "present" && !isCorrect) {
            keyBtn.className = "key present";
          } else if (status === "absent" && !isCorrect && !isPresent) {
            keyBtn.className = "key absent";
          }
        }
      }
    }

    saveCurrentProgress(completed, won) {
      this.state.puzzles[this.currentPuzzle.date] = {
        guesses: this.guesses,
        completed,
        won
      };
      saveState(this.state);
    }

    recordProgress(won) {
      this.saveCurrentProgress(true, won);

      const daily = this.getDailyPuzzle();
      const isDaily = daily && this.currentPuzzle.date === daily.date;

      if (isDaily) {
        const stats = this.state.stats;
        if (stats.lastDate !== daily.date) {
          stats.played++;
          stats.lastDate = daily.date;
          if (won) {
            stats.wins++;
            stats.streak++;
            if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
            const guessIdx = this.guesses.length - 1;
            if (guessIdx >= 0 && guessIdx < 6) {
              stats.distribution[guessIdx]++;
            }
          } else {
            stats.streak = 0;
          }
          saveState(this.state);
        }
      }
    }

    renderVault() {
      this.dom.vaultList.innerHTML = "";

      const daily = this.getDailyPuzzle();
      const archiveItems = this.puzzles
        .filter((p) => !daily || p.date !== daily.date)
        .sort((a, b) => b.date.localeCompare(a.date));

      if (archiveItems.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "vault-caption";
        emptyMsg.textContent = "No archived matches available.";
        this.dom.vaultList.appendChild(emptyMsg);
        return;
      }

      archiveItems.forEach((p) => {
        const card = document.createElement("div");
        card.className = "vault-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        const progress = this.state.puzzles[p.date];
        let badgeClass = "unplayed";
        let badgeText = "UNPLAYED";
        let statusText = "Tap to throw stone";

        if (progress && progress.completed) {
          if (progress.won) {
            badgeClass = "solved";
            badgeText = `${progress.guesses.length}/6`;
            statusText = "Completed";
          } else {
            badgeClass = "failed";
            badgeText = "FAILED";
            statusText = "Not solved";
          }
        } else if (progress && progress.guesses && progress.guesses.length > 0) {
          badgeClass = "unplayed";
          badgeText = `${progress.guesses.length}/6`;
          statusText = "End in progress";
        }

        card.innerHTML = `
          <div class="vault-info">
            <span class="vault-date">MATCH &bull; ${p.date}</span>
            <span class="vault-status-text">${statusText}</span>
          </div>
          <span class="vault-badge ${badgeClass}">${badgeText}</span>
        `;

        const triggerAction = () => this.startPuzzle(p, false);
        card.addEventListener("click", triggerAction);
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerAction();
          }
        });

        this.dom.vaultList.appendChild(card);
      });
    }

    renderStatsModal() {
      this.audio.playButtonTap();
      const stats = this.state.stats;
      this.dom.statPlayed.textContent = stats.played;
      this.dom.statWinrate.textContent = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) + "%" : "0%";
      this.dom.statStreak.textContent = stats.streak;
      this.dom.statMaxstreak.textContent = stats.maxStreak;

      this.dom.distributionChart.innerHTML = "";
      const maxCount = Math.max(...stats.distribution, 1);

      stats.distribution.forEach((count, i) => {
        const row = document.createElement("div");
        row.className = "dist-row";

        const label = document.createElement("span");
        label.textContent = i + 1;

        const wrapper = document.createElement("div");
        wrapper.className = "dist-bar-wrapper";

        const bar = document.createElement("div");
        bar.className = "dist-bar";
        bar.style.width = `${Math.max((count / maxCount) * 100, 10)}%`;
        bar.textContent = count;

        const currentSolvedIndex = this.guesses.length - 1;
        if (this.isComplete && this.state.puzzles[this.currentPuzzle.date]?.won && currentSolvedIndex === i) {
          bar.classList.add("highlight");
        }

        wrapper.appendChild(bar);
        row.appendChild(label);
        row.appendChild(wrapper);
        this.dom.distributionChart.appendChild(row);
      });

      this.openDialog(this.dom.modalStats);
    }

    openResultModal(won) {
      this.dom.resultTitle.textContent = won ? "SHOT MADE &bull; END WON" : "END CONCLUDED";
      this.dom.resultWord.textContent = this.currentPuzzle.word;
      this.dom.resultDefinition.textContent = this.currentPuzzle.definition || "";
      this.dom.resultSummary.textContent = won
        ? `Delivered stone to the house in ${this.guesses.length} of 6 attempts.`
        : "Stone delivered past the back line. Better luck next end.";

      this.openDialog(this.dom.modalResult);
    }

    shareResult() {
      this.audio.playButtonTap();
      const record = this.state.puzzles[this.currentPuzzle.date];
      const count = record && record.won ? this.guesses.length : "X";
      let text = `Word Guess Curling (${this.currentPuzzle.date}) ${count}/6\n\n`;

      this.guesses.forEach((guess) => {
        const evalResult = this.evaluateGuess(guess, this.currentPuzzle.word);
        evalResult.forEach((status) => {
          text += status === "correct" ? "🟩" : status === "present" ? "🟨" : "⬜";
        });
        text += "\n";
      });

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text.trim()).then(() => {
          this.showToast("Scoreboard copied to clipboard!");
        });
      } else {
        this.showToast("Clipboard not supported");
      }
    }

    showToast(message) {
      this.dom.toast.textContent = message;
      this.dom.toast.classList.remove("hidden");
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.dom.toast.classList.add("hidden");
      }, 2200);
    }

    openDialog(modal) {
      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new WordGuessApp();
  });
})();