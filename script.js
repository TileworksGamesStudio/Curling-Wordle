(function () {
  'use strict';

  const CURLING_PUZZLE_QUEUE = [
    {
      id: "curling-puz-001",
      word: "STONE",
      clue: "The 44-pound running granite rock.",
      trivia: "Crafted exclusively from rare water-impermeable granite quarried on the Scottish island of Ailsa Craig."
    },
    {
      id: "curling-puz-002",
      word: "BROOM",
      clue: "The brush used to sweep pebble and control curl.",
      trivia: "Sweeping slightly warms and melts the pebble atop the ice sheet, reducing friction and straightening the run."
    },
    {
      id: "curling-puz-003",
      word: "SHEET",
      clue: "The 150-foot lane of regulation leveled ice.",
      trivia: "Curling ice is sprayed with water droplets that freeze into tiny raised beads called pebble."
    },
    {
      id: "curling-puz-004",
      word: "HOUSE",
      clue: "The concentric 12-foot target rings.",
      trivia: "Only stones inside or touching the outer 12-foot ring of the house can count toward points."
    },
    {
      id: "curling-puz-005",
      word: "GUARD",
      clue: "A stone placed short to protect scoring rocks.",
      trivia: "The Free Guard Zone rule protects early lead stones placed between the hog line and house from being removed."
    },
    {
      id: "curling-puz-006",
      word: "SWEEP",
      clue: "Vigorous brushwork to carry stones further.",
      trivia: "Front-end sweepers burn hundreds of calories per match by applying heavy downward body pressure on brush heads."
    },
    {
      id: "curling-puz-007",
      word: "SLIDE",
      clue: "Delivery stance pushing out from the hack.",
      trivia: "Curlers wear a Teflon or stainless-steel slider shoe on one foot and a high-traction gripper on the other."
    },
    {
      id: "curling-puz-008",
      word: "DRAWS",
      clue: "Finesse deliveries stopping inside the house.",
      trivia: "A precision draw shot requires exact weight, relying on the skip's broom placement to judge ice speed."
    },
    {
      id: "curling-puz-009",
      word: "HEAVY",
      clue: "A delivery thrown with excessive velocity.",
      trivia: "When a thrower delivers heavy weight, sweepers will back off immediately to allow natural friction to brake the rock."
    },
    {
      id: "curling-puz-010",
      word: "BITER",
      clue: "A stone barely touching the outer 12-foot ring.",
      trivia: "A stone is declared a biter if an overhead laser or plumb gauge verifies that any millimeter overhangs the house ring."
    },
    {
      id: "curling-puz-011",
      word: "BLANK",
      clue: "A round concluded with zero points scored.",
      trivia: "Skips intentionally blank an end in order to retain the coveted last-rock hammer advantage for the next round."
    },
    {
      id: "curling-puz-012",
      word: "STEAL",
      clue: "Scoring points without holding the last rock.",
      trivia: "Stealing an end swings tactical momentum, forcing the trailing team to take riskier shots around guards."
    },
    {
      id: "curling-puz-013",
      word: "HACKS",
      clue: "Rubber-lined foothold brackets for delivery.",
      trivia: "The hack provides the solid anchor from which curlers push forward in a balanced lunge down the sheet."
    },
    {
      id: "curling-puz-014",
      word: "CLEAN",
      clue: "Gently brushing loose frost without heating ice.",
      trivia: "Cleaning keeps the running path free from stray debris or lint that could cause a stone to pick and deviate."
    },
    {
      id: "curling-puz-015",
      word: "SPLIT",
      clue: "A shot striking a rock to leave both in scoring play.",
      trivia: "A well-executed split shot scores multiple points by spreading rocks across opposite wings of the rings."
    },
    {
      id: "curling-puz-016",
      word: "PEELS",
      clue: "Hard shots removing guards while rolling out.",
      trivia: "Peeling opens up the center lane, clearing opponents' defensive stones to expose the house."
    },
    {
      id: "curling-puz-017",
      word: "SKIPS",
      clue: "Team captains directing strategy and calling line.",
      trivia: "The skip stands in the house holding the broom target, reading the curl and calling sweeping commands."
    },
    {
      id: "curling-puz-018",
      word: "LEADS",
      clue: "Players throwing the opening two rocks of each end.",
      trivia: "Leads must excel at placing accurate corner guards and sweep for all three subsequent teammates."
    },
    {
      id: "curling-puz-019",
      word: "LINES",
      clue: "The trajectory path of the moving stone.",
      trivia: "Reading ice lines requires predicting how many inches or feet the stone will bend across differing pebble conditions."
    },
    {
      id: "curling-puz-020",
      word: "FORCE",
      clue: "Making the team with hammer take only one single point.",
      trivia: "A defensive success for the team without hammer is forcing their opponent to score just one point."
    }
  ];

  const EPOCH_ANCHOR = new Date("2025-01-01T00:00:00Z");

  const RAW_DICTIONARY = [
    "STONE", "BROOM", "SHEET", "HOUSE", "GUARD", "SWEEP", "SLIDE", "DRAWS", 
    "HEAVY", "BITER", "BLANK", "STEAL", "HACKS", "CLEAN", "SPLIT", "PEELS", 
    "SKIPS", "LEADS", "LINES", "SHOTS", "FORCE", "SCORE", "RINGS", "POINT", 
    "BONES", "FROST", "CHILL", "STICK", "RAISE", "TIMER", "CHUCK", "CLOCK", 
    "COUNT", "FRONT", "INNER", "LASER", "MATCH", "ORDER", "PIVOT", "POLAR", 
    "POWER", "ROBOT", "ROCKS", "SCALE", "SHAKE", "SHARE", "SPEED", "START", 
    "STRIP", "TABLE", "TAILS", "TEAMS", "TOUCH", "TRACK", "VALVE", "WATER", 
    "WEIGHT", "WINCH", "WRIST", "ABOUT", "ABOVE", "ACTOR", "ACUTE", "ADAPT", 
    "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN", "AGENT", "AGILE", "AGREE", 
    "AHEAD", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG", 
    "ALTER", "AMONG", "ANGEL", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", 
    "APPLY", "ARENA", "ARGUE", "ARISE", "ARMED", "ARMOR", "ARROW", "ASIDE", 
    "ASSET", "AUDIO", "AUDIT", "AVOID", "AWAIT", "AWAKE", "AWARD", "AWARE", 
    "BADGE", "BAKER", "BASIC", "BASIS", "BEACH", "BEGAN", "BEGIN", "BEING", 
    "BELOW", "BENCH", "BIRTH", "BLACK", "BLADE", "BLAME", "BLAND", "BLAST", 
    "BLEED", "BLEND", "BLESS", "BLIND", "BLOCK", "BLOOD", "BLOOM", "BOARD", 
    "BOAST", "BOOST", "BOUND", "BRAIN", "BRAKE", "BRAND", "BRASS", "BRAVE", 
    "BREAD", "BREAK", "BREED", "BRIEF", "BRIGHT", "BRING", "BRISK", "BROAD", 
    "BROKE", "BROWN", "BRUSH", "BUILD", "BUILT", "BUNCH", "BURST", "CABIN", 
    "CABLE", "CANDY", "CANOE", "CARVE", "CATCH", "CAUSE", "CHAIN", "CHAIR", 
    "CHAMP", "CHART", "CHASE", "CHEAP", "CHECK", "CHEST", "CHIEF", "CHILD", 
    "CHINA", "CHOSE", "CIVIL", "CLAIM", "CLASH", "CLASS", "CLEAR", "CLERK", 
    "CLICK", "CLIFF", "CLIMB", "CLOAK", "CLONE", "CLOSE", "CLOTH", "CLOUD", 
    "COACH", "COAST", "COLOR", "COULD", "COURT", "COVER", "CRACK", "CRAFT", 
    "CRANE", "CRASH", "CRAWL", "CRAZY", "CREAM", "CREEK", "CRIME", "CRISP", 
    "CROSS", "CROWD", "CROWN", "CRUSH", "CURVE", "CYCLE", "DAILY", "DANCE", 
    "DEALT", "DEATH", "DEBUG", "DELAY", "DELTA", "DENSE", "DEPTH", "DEVIL", 
    "DIRT", "DISCO", "DOUBT", "DRAFT", "DRAIN", "DRAMA", "DRANK", "DREAM", 
    "DRESS", "DRIFT", "DRILL", "DRINK", "DRIVE", "DROVE", "DYING", "EAGER", 
    "EARLY", "EARTH", "EIGHT", "ELITE", "EMPTY", "ENEMY", "ENJOY", "ENTER", 
    "ENTRY", "EQUAL", "EQUIP", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", 
    "EXTRA", "FAITH", "FALSE", "FAULT", "FIBER", "FIELD", "FIFTH", "FIFTY", 
    "FIGHT", "FINAL", "FIRST", "FIXED", "FLAME", "FLASH", "FLEET", "FLESH", 
    "FLOAT", "FLOOD", "FLOOR", "FLOUR", "FLOWN", "FLUID", "FOCUS", "FORTH", 
    "FORTY", "FOUND", "FRAME", "FRAUD", "FRESH", "FRUIT", "GIANT", "GIVEN", 
    "GLASS", "GLOBE", "GLORY", "GRACE", "GRADE", "GRAIN", "GRAND", "GRANT", 
    "GRAPE", "GRASP", "GRASS", "GRAVE", "GREAT", "GREEN", "GREET", "GRIEF", 
    "GRILL", "GROSS", "GROUP", "GROVE", "GROWN", "GUIDE", "HABIT", "HAPPY", 
    "HARSH", "HEART", "HONEY", "HORSE", "HOTEL", "HUMAN", "IDEAL", "IMAGE", 
    "INDEX", "INPUT", "ISSUE", "JEWEL", "JOINT", "JUDGE", "JUICE", "KNIFE", 
    "KNOCK", "KNOWN", "LABEL", "LABOR", "LARGE", "LATER", "LAUGH", "LAYER", 
    "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL", "LEVEL", "LIGHT", "LIMIT", 
    "LINKS", "LIVER", "LOCAL", "LODGE", "LOGIC", "LUCKY", "LUNCH", "MAGIC", 
    "MAJOR", "MAKER", "MARCH", "MAYBE", "MAYOR", "MEDAL", "MEDIA", "METAL", 
    "METER", "MIDST", "MIGHT", "MINOR", "MIXED", "MODEL", "MODEM", "MONEY", 
    "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVIE", "MUSIC", 
    "NAKED", "NERVE", "NEVER", "NIGHT", "NOBLE", "NOISE", "NORTH", "NOTED", 
    "NOVEL", "NURSE", "OCEAN", "OFFER", "OFTEN", "ONCE", "ONSET", "OPERA", 
    "ORBIT", "ORGAN", "OTHER", "OUGHT", "OUTER", "OWNED", "OWNER", "OXIDE", 
    "PACKS", "PAINT", "PANEL", "PANIC", "PAPER", "PARTY", "PASTA", "PATCH", 
    "PAUSE", "PEACE", "PHASE", "PHONE", "PHOTO", "PIANO", "PIECE", "PILOT", 
    "PITCH", "PIZZA", "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "PLAZA", 
    "POUND", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIZE", "PROOF", 
    "PROUD", "PROVE", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RANGE", 
    "RAPID", "RATIO", "REACH", "REACT", "READY", "REALM", "REBEL", "REFER", 
    "RELAX", "REPLY", "RESET", "RIDER", "RIDGE", "RIGHT", "RIVER", "ROAST", 
    "ROUGH", "ROUND", "ROUTE", "ROYAL", "RULER", "RURAL", "SCENE", "SCOPE", 
    "SCOUT", "SEDAN", "SERVE", "SHADE", "SHADOW", "SHAFT", "SHAME", "SHAPE", 
    "SHARP", "SHEEP", "SHEER", "SHELF", "SHELL", "SHIFT", "SHINE", "SHIRT", 
    "SHOCK", "SHOOT", "SHORE", "SHORT", "SHOUT", "SIGHT", "SINCE", "SKILL", 
    "SLATE", "SLEEP", "SMART", "SMILE", "SMOKE", "SOLAR", "SOLID", "SOLVE", 
    "SOUND", "SOUTH", "SPACE", "SPARE", "SPARK", "SPEAK", "SPELL", "SPEND", 
    "SPENT", "SPICE", "SPIKE", "SPINE", "SPOKE", "SPORT", "STAFF", "STAGE", 
    "STAKE", "STAND", "STARE", "STATE", "STEAM", "STEEL", "STEEP", "STEER", 
    "STILL", "STOCK", "STORM", "STORY", "STUDY", "STYLE", "SUGAR", "SUITE", 
    "SUPER", "SWEET", "SWIFT", "SWING", "TASTE", "TEACH", "THANK", "THEFT", 
    "THEIR", "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD", 
    "TIGHT", "TITLE", "TODAY", "TOKEN", "TOTAL", "TOUGH", "TOWER", "TRADE", 
    "TRAIN", "TREAT", "TREND", "TRIAL", "TRIBE", "TRICK", "TRUCK", "TRULY", 
    "TRUTH", "TWICE", "UNDER", "UNION", "UNITY", "UNTIL", "UPPER", "UPSET", 
    "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VAPOR", "VAULT", "VENUE", 
    "VIDEO", "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WHEEL", 
    "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WOMAN", "WORLD", 
    "WORRY", "WORSE", "WORTH", "WOULD", "WOUND", "WRITE", "WRONG", "YOUTH", 
    "ZEBRA"
  ];

  const VALID_GUESS_SET = new Set(RAW_DICTIONARY);
  CURLING_PUZZLE_QUEUE.forEach(p => VALID_GUESS_SET.add(p.word));

  function formatDateISO(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getTodayString() {
    return formatDateISO(new Date());
  }

  function getAllComputedPuzzles() {
    return CURLING_PUZZLE_QUEUE.map((item, index) => {
      const assigned = new Date(EPOCH_ANCHOR);
      assigned.setDate(assigned.getDate() + index);
      const dateStr = item.date || formatDateISO(assigned);

      return {
        ...item,
        assignedDate: dateStr,
        orderIndex: index + 1
      };
    });
  }

  class WebAudioSynth {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playKeyClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(170, now + 0.032);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    }

    playDelete() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.045);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.048);
    }

    playInvalidBuzzer() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(120, now);
      osc2.frequency.setValueAtTime(128, now);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.2);
      osc2.stop(now + 0.2);
    }

    playTileTone(status, colIndex) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      let freq = 260;

      if (status === 'correct') {
        freq = 440 * Math.pow(1.15, colIndex + 1);
      } else if (status === 'present') {
        freq = 320 * Math.pow(1.08, colIndex);
      }

      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }

    playVictoryFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.ctx.currentTime;

      notes.forEach((pitch, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch, now + i * 0.11);

        gain.gain.setValueAtTime(0.2, now + i * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.11);
        osc.stop(now + i * 0.11 + 0.42);
      });
    }

    playDefeatChord() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [392.00, 349.23, 311.13, 261.63];
      const now = this.ctx.currentTime;

      notes.forEach((pitch, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitch, now + i * 0.13);

        gain.gain.setValueAtTime(0.13, now + i * 0.13);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.13 + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.13);
        osc.stop(now + i * 0.13 + 0.32);
      });
    }
  }

  const soundEngine = new WebAudioSynth();

  const STORAGE_KEY_PREFIX = "hack_sheet_release_";

  function readStorage(key, fallback) {
    try {
      const val = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return val ? JSON.parse(val) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      return;
    }
  }

  let statsState = readStorage('stats', {
    played: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    recordedPuzzles: [],
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  });

  let preferences = readStorage('prefs', {
    sound: true,
    highContrast: false
  });

  soundEngine.enabled = preferences.sound;
  if (preferences.highContrast) {
    document.body.classList.add('high-contrast');
  }

  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
  ];

  let currentPuzzle = null;
  let isDailyMode = true;
  let navigationOrigin = 'menu';
  let playerGuesses = [];
  let bufferInput = "";
  let isMatchCompleted = false;
  let isRowTransitioning = false;

  const screenElements = {
    menu: document.getElementById('screen-menu'),
    game: document.getElementById('screen-game'),
    vault: document.getElementById('screen-vault')
  };

  const boardGrid = document.getElementById('game-board');
  const keyboardNav = document.getElementById('keyboard');
  const toastContainer = document.getElementById('toast-container');
  const bannerInspect = document.getElementById('banner-finished-inspect');
  const fxCanvas = document.getElementById('fx-canvas');

  function isAnyModalOpen() {
    return document.querySelector('.modal-backdrop:not([hidden])') !== null;
  }

  function navigateToScreen(targetName) {
    Object.keys(screenElements).forEach(name => {
      screenElements[name].classList.toggle('active', name === targetName);
    });
  }

  function initializeBoardUI() {
    boardGrid.innerHTML = "";
    for (let r = 0; r < 6; r++) {
      const row = document.createElement('div');
      row.className = "grid-row";
      row.dataset.row = r;
      row.setAttribute('role', 'row');

      for (let c = 0; c < 5; c++) {
        const cell = document.createElement('div');
        cell.className = "cell";
        cell.dataset.col = c;
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('aria-label', `Row ${r + 1} Letter ${c + 1} Empty`);
        row.appendChild(cell);
      }
      boardGrid.appendChild(row);
    }
  }

  function initializeKeyboardUI() {
    keyboardNav.innerHTML = "";
    KEYBOARD_ROWS.forEach(rowKeys => {
      const row = document.createElement('div');
      row.className = "kb-row";

      rowKeys.forEach(k => {
        const btn = document.createElement('button');
        btn.className = "kb-key";
        btn.dataset.key = k;
        btn.setAttribute('type', 'button');

        if (k === 'ENTER') {
          btn.classList.add('action-key');
          btn.textContent = "ENTER";
          btn.setAttribute('aria-label', 'Submit guess');
        } else if (k === '⌫') {
          btn.classList.add('action-key');
          btn.setAttribute('aria-label', 'Backspace');
          btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>`;
        } else {
          btn.textContent = k;
          btn.setAttribute('aria-label', `Letter ${k}`);
        }

        btn.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          onKeyAction(k);
        });

        row.appendChild(btn);
      });
      keyboardNav.appendChild(row);
    });
  }

  function updateActiveTypingRow(rowIndex, typedString) {
    const row = boardGrid.children[rowIndex];
    if (!row) return;

    for (let c = 0; c < 5; c++) {
      const cell = row.children[c];
      const char = typedString[c] || "";
      const previousChar = cell.textContent;

      cell.textContent = char;
      cell.setAttribute('aria-label', char ? `Row ${rowIndex + 1} Letter ${c + 1} ${char}` : `Row ${rowIndex + 1} Letter ${c + 1} Empty`);

      if (char && char !== previousChar) {
        cell.classList.remove('pop');
        void cell.offsetWidth;
        cell.classList.add('pop');
      } else if (!char) {
        cell.classList.remove('pop');
      }
    }
  }

  function refreshKeyboardColorMap() {
    const keyStatuses = {};

    playerGuesses.forEach(guess => {
      const evaluation = evaluateGuessLetters(guess, currentPuzzle.word);
      evaluation.forEach(({ letter, status }) => {
        const prev = keyStatuses[letter];
        if (status === 'correct') {
          keyStatuses[letter] = 'correct';
        } else if (status === 'present' && prev !== 'correct') {
          keyStatuses[letter] = 'present';
        } else if (status === 'absent' && !prev) {
          keyStatuses[letter] = 'absent';
        }
      });
    });

    keyboardNav.querySelectorAll('.kb-key').forEach(btn => {
      const key = btn.dataset.key;
      const status = keyStatuses[key];
      btn.classList.remove('correct', 'present', 'absent');
      if (status) btn.classList.add(status);
    });
  }

  function evaluateGuessLetters(guess, solution) {
    const result = Array(5).fill(null);
    const solLetters = solution.split('');
    const guessLetters = guess.split('');

    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === solLetters[i]) {
        result[i] = { letter: guessLetters[i], status: 'correct' };
        solLetters[i] = null;
        guessLetters[i] = null;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] !== null) {
        const char = guessLetters[i];
        const matchIdx = solLetters.indexOf(char);
        if (matchIdx !== -1) {
          result[i] = { letter: char, status: 'present' };
          solLetters[matchIdx] = null;
        } else {
          result[i] = { letter: char, status: 'absent' };
        }
      }
    }

    return result;
  }

  function onKeyAction(key) {
    if (isMatchCompleted || isRowTransitioning) return;
    if (isAnyModalOpen()) return;

    if (key === 'ENTER') {
      executeGuessSubmission();
    } else if (key === '⌫' || key === 'BACKSPACE') {
      if (bufferInput.length > 0) {
        bufferInput = bufferInput.slice(0, -1);
        soundEngine.playDelete();
        updateActiveTypingRow(playerGuesses.length, bufferInput);
      }
    } else if (/^[A-Z]$/.test(key)) {
      if (bufferInput.length < 5) {
        bufferInput += key;
        soundEngine.playKeyClick();
        updateActiveTypingRow(playerGuesses.length, bufferInput);
      }
    }
  }

  function shakeActiveRow() {
    const row = boardGrid.children[playerGuesses.length];
    if (row) {
      soundEngine.playInvalidBuzzer();
      row.classList.remove('shake');
      void row.offsetWidth;
      row.classList.add('shake');
    }
  }

  function displayToast(msg, duration = 1900) {
    const toast = document.createElement('div');
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-6px)";
      toast.style.transition = "all 0.2s ease";
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  function executeGuessSubmission() {
    if (bufferInput.length !== 5) {
      shakeActiveRow();
      displayToast("NOT ENOUGH LETTERS");
      return;
    }

    if (!VALID_GUESS_SET.has(bufferInput)) {
      shakeActiveRow();
      displayToast("NOT IN WORD LIST");
      return;
    }

    const rowIdx = playerGuesses.length;
    const submittedGuess = bufferInput;
    const evaluation = evaluateGuessLetters(submittedGuess, currentPuzzle.word);

    isRowTransitioning = true;
    bufferInput = "";

    const row = boardGrid.children[rowIdx];

    evaluation.forEach((item, colIdx) => {
      setTimeout(() => {
        const cell = row.children[colIdx];
        cell.classList.add('flip');

        setTimeout(() => {
          cell.classList.add(item.status);
          cell.setAttribute('aria-label', `Row ${rowIdx + 1} Letter ${colIdx + 1} ${item.letter} (${item.status})`);
          soundEngine.playTileTone(item.status, colIdx);
        }, 220);

        if (colIdx === 4) {
          setTimeout(() => {
            playerGuesses.push(submittedGuess);
            persistCurrentSession();
            refreshKeyboardColorMap();
            isRowTransitioning = false;
            evaluateGameConclusion(submittedGuess);
          }, 460);
        }
      }, colIdx * 200);
    });
  }

  function evaluateGameConclusion(lastGuess) {
    const isWon = (lastGuess === currentPuzzle.word);
    const isLost = (!isWon && playerGuesses.length >= 6);

    if (isWon) {
      isMatchCompleted = true;
      const row = boardGrid.children[playerGuesses.length - 1];
      row.classList.add('bounce');
      soundEngine.playVictoryFanfare();
      launchConfettiStream();
      recordStatsResolution(true, playerGuesses.length);
      bannerInspect.removeAttribute('hidden');
      setTimeout(() => openEndgameModal(true), 1200);
    } else if (isLost) {
      isMatchCompleted = true;
      soundEngine.playDefeatChord();
      recordStatsResolution(false, playerGuesses.length);
      bannerInspect.removeAttribute('hidden');
      setTimeout(() => openEndgameModal(false), 800);
    }
  }

  function getPuzzleSessionKey(puzzle) {
    return `session_${puzzle.id}_${puzzle.assignedDate}`;
  }

  function persistCurrentSession() {
    if (!currentPuzzle) return;
    const key = getPuzzleSessionKey(currentPuzzle);
    const isSolved = playerGuesses.includes(currentPuzzle.word);
    const sessionData = {
      guesses: playerGuesses,
      solved: isSolved,
      completed: isSolved || playerGuesses.length >= 6
    };
    writeStorage(key, sessionData);
  }

  function launchPuzzleSession(puzzle, isDaily = true, origin = 'menu') {
    currentPuzzle = puzzle;
    isDailyMode = isDaily;
    navigationOrigin = origin;
    playerGuesses = [];
    bufferInput = "";
    isMatchCompleted = false;
    isRowTransitioning = false;

    document.getElementById('btn-back-text').textContent = (navigationOrigin === 'vault') ? "ARCHIVE" : "MENU";
    document.getElementById('game-badge').textContent = isDailyMode ? "DAILY PUZZLE" : `ARCHIVE #${puzzle.orderIndex}`;
    document.getElementById('game-date-display').textContent = puzzle.assignedDate;
    bannerInspect.setAttribute('hidden', '');

    initializeBoardUI();
    initializeKeyboardUI();

    const saved = readStorage(getPuzzleSessionKey(puzzle), null);
    if (saved && Array.isArray(saved.guesses)) {
      playerGuesses = saved.guesses;

      playerGuesses.forEach((guess, rIdx) => {
        const row = boardGrid.children[rIdx];
        const evaluation = evaluateGuessLetters(guess, currentPuzzle.word);
        evaluation.forEach((item, cIdx) => {
          const cell = row.children[cIdx];
          cell.textContent = item.letter;
          cell.classList.add(item.status);
          cell.setAttribute('aria-label', `Row ${rIdx + 1} Letter ${cIdx + 1} ${item.letter} (${item.status})`);
        });
      });

      refreshKeyboardColorMap();

      if (saved.completed) {
        isMatchCompleted = true;
        bannerInspect.removeAttribute('hidden');
        setTimeout(() => {
          openEndgameModal(saved.solved);
        }, 300);
      }
    }

    navigateToScreen('game');
  }

  function synchronizeDailyAndVaultState() {
    const todayStr = getTodayString();
    const computedList = getAllComputedPuzzles();

    let todayPuzzle = computedList.find(p => p.assignedDate === todayStr);
    
    if (!todayPuzzle && computedList.length > 0) {
      const todayDate = new Date();
      const diffDays = Math.floor((todayDate - EPOCH_ANCHOR) / (1000 * 60 * 60 * 24));
      const fallbackIdx = ((diffDays % computedList.length) + computedList.length) % computedList.length;
      todayPuzzle = {
        ...computedList[fallbackIdx],
        assignedDate: todayStr
      };
    }

    const dailySubtitleEl = document.getElementById('daily-puzzle-subtitle');
    const dailyStatusBadge = document.getElementById('daily-status-badge');

    if (todayPuzzle) {
      const saved = readStorage(getPuzzleSessionKey(todayPuzzle), null);
      if (saved && saved.completed) {
        if (saved.solved) {
          dailyStatusBadge.textContent = "SOLVED";
          dailyStatusBadge.className = "status-pill won";
          dailySubtitleEl.textContent = `Completed in ${saved.guesses.length}/6 guesses`;
        } else {
          dailyStatusBadge.textContent = "COMPLETED";
          dailyStatusBadge.className = "status-pill lost";
          dailySubtitleEl.textContent = "Out of guesses for today";
        }
      } else {
        dailyStatusBadge.textContent = "PLAY";
        dailyStatusBadge.className = "status-pill open";
        dailySubtitleEl.textContent = `Today's Puzzle • ${todayPuzzle.assignedDate}`;
      }
    }

    const vaultPuzzles = computedList.filter(p => p.assignedDate < todayStr);
    document.getElementById('vault-count-badge').textContent = `${vaultPuzzles.length} AVAILABLE`;

    renderVaultGrid(vaultPuzzles);
  }

  function renderVaultGrid(puzzles) {
    const vaultListEl = document.getElementById('vault-list');
    vaultListEl.innerHTML = "";

    if (puzzles.length === 0) {
      vaultListEl.innerHTML = `
        <div class="vault-empty-box">
          <h3>ARCHIVE IS EMPTY</h3>
          <p>Past daily puzzles will be archived here as days conclude.</p>
        </div>
      `;
      return;
    }

    [...puzzles].reverse().forEach(puzzle => {
      const card = document.createElement('div');
      card.className = "vault-card";

      const saved = readStorage(getPuzzleSessionKey(puzzle), null);
      let statusText = "UNPLAYED";
      let statusClass = "open";

      if (saved && saved.completed) {
        if (saved.solved) {
          statusText = `SOLVED (${saved.guesses.length}/6)`;
          statusClass = "won";
        } else {
          statusText = "MISSED (X/6)";
          statusClass = "lost";
        }
      }

      card.innerHTML = `
        <div class="vault-info">
          <div class="vault-meta">
            <span class="mini-tag">${puzzle.assignedDate}</span>
            <span class="status-indicator ${statusClass}">&bull; ${statusText}</span>
          </div>
          <span class="vault-title">#${puzzle.orderIndex}: ${puzzle.clue}</span>
        </div>
        <button class="neo-btn sm" type="button">PLAY</button>
      `;

      card.addEventListener('click', () => {
        launchPuzzleSession(puzzle, false, 'vault');
      });

      vaultListEl.appendChild(card);
    });
  }

  function recordStatsResolution(won, attemptsCount) {
    if (!currentPuzzle) return;
    
    const puzzleKey = `${currentPuzzle.id}_${currentPuzzle.assignedDate}`;
    if (!statsState.recordedPuzzles) statsState.recordedPuzzles = [];

    if (statsState.recordedPuzzles.includes(puzzleKey)) {
      return;
    }

    statsState.played += 1;
    statsState.recordedPuzzles.push(puzzleKey);

    if (won) {
      statsState.wins += 1;
      statsState.currentStreak += 1;
      if (statsState.currentStreak > statsState.maxStreak) {
        statsState.maxStreak = statsState.currentStreak;
      }
      statsState.distribution[attemptsCount] = (statsState.distribution[attemptsCount] || 0) + 1;
    } else {
      statsState.currentStreak = 0;
    }

    writeStorage('stats', statsState);
  }

  function openStatsModal() {
    document.getElementById('stat-played').textContent = statsState.played;
    const winRate = statsState.played > 0 ? Math.round((statsState.wins / statsState.played) * 100) : 0;
    document.getElementById('stat-win-pct').textContent = `${winRate}%`;
    document.getElementById('stat-streak').textContent = statsState.currentStreak;
    document.getElementById('stat-max-streak').textContent = statsState.maxStreak;

    const chartContainer = document.getElementById('guess-distribution');
    chartContainer.innerHTML = "";
    const maxVal = Math.max(1, ...Object.values(statsState.distribution));

    for (let i = 1; i <= 6; i++) {
      const count = statsState.distribution[i] || 0;
      const pct = Math.max(8, Math.round((count / maxVal) * 100));
      const isCurrentAttempt = (isMatchCompleted && playerGuesses.length === i && playerGuesses.includes(currentPuzzle?.word));

      const row = document.createElement('div');
      row.className = "chart-row";
      row.innerHTML = `
        <span>${i}</span>
        <div class="bar-track">
          <div class="bar-fill ${isCurrentAttempt ? 'current' : ''}" style="width: ${pct}%">
            ${count}
          </div>
        </div>
      `;
      chartContainer.appendChild(row);
    }

    showModal('modal-stats');
  }

  function openEndgameModal(won) {
    const badge = document.getElementById('endgame-badge');
    const title = document.getElementById('endgame-title');
    const solution = document.getElementById('endgame-solution');
    const clue = document.getElementById('endgame-clue');
    const trivia = document.getElementById('endgame-trivia');

    if (won) {
      badge.textContent = "VICTORY";
      badge.className = "brand-badge accent-badge";
      title.textContent = "PUZZLE SOLVED!";
    } else {
      badge.textContent = "GAME OVER";
      badge.className = "brand-badge";
      title.textContent = "OUT OF GUESSES";
    }

    solution.textContent = currentPuzzle.word;
    clue.textContent = currentPuzzle.clue;
    trivia.textContent = currentPuzzle.trivia;

    showModal('modal-endgame');
  }

  function showModal(id) {
    const el = document.getElementById(id);
    if (el) el.removeAttribute('hidden');
  }

  function hideModal(id) {
    const el = document.getElementById(id);
    if (el) el.setAttribute('hidden', '');
  }

  function generateShareEmojiPayload() {
    const dateStr = currentPuzzle.assignedDate;
    const isWon = playerGuesses.includes(currentPuzzle.word);
    const scoreStr = isWon ? `${playerGuesses.length}/6` : 'X/6';
    let output = `HACK & SHEET: ${dateStr} [${scoreStr}]\n\n`;

    playerGuesses.forEach(guess => {
      const evaluation = evaluateGuessLetters(guess, currentPuzzle.word);
      evaluation.forEach(item => {
        if (item.status === 'correct') {
          output += preferences.highContrast ? '🟧' : '🟩';
        } else if (item.status === 'present') {
          output += preferences.highContrast ? '🟦' : '🟨';
        } else {
          output += '⬛';
        }
      });
      output += '\n';
    });

    output += `\nHack & Sheet Word Puzzle`;
    return output;
  }

  let confettiParticles = [];
  let confettiAnimHandle = null;

  function launchConfettiStream() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = fxCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    confettiParticles = [];
    const colors = ['#38bdf8', '#e11d48', '#10b981', '#f59e0b', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      confettiParticles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.72) * 17,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 8,
        alpha: 1
      });
    }

    if (confettiAnimHandle) cancelAnimationFrame(confettiAnimHandle);

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38;
        p.rotation += p.rSpeed;
        p.alpha -= 0.013;

        if (p.alpha > 0) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        confettiAnimHandle = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    frame();
  }

  function setupEventHandlers() {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal-backdrop:not([hidden])');
        openModals.forEach(m => m.setAttribute('hidden', ''));
        return;
      }

      if (isAnyModalOpen()) return;

      if (screenElements.game.classList.contains('active')) {
        const key = e.key.toUpperCase();
        if (key === 'ENTER') {
          onKeyAction('ENTER');
        } else if (key === 'BACKSPACE') {
          onKeyAction('BACKSPACE');
        } else if (/^[A-Z]$/.test(key)) {
          onKeyAction(key);
        }
      }
    });

    document.getElementById('btn-play-daily').addEventListener('click', () => {
      const todayStr = getTodayString();
      const computed = getAllComputedPuzzles();
      let todayPuz = computed.find(p => p.assignedDate === todayStr);

      if (!todayPuz && computed.length > 0) {
        todayPuz = { ...computed[0], assignedDate: todayStr };
      }

      if (todayPuz) {
        launchPuzzleSession(todayPuz, true, 'menu');
      } else {
        displayToast("PUZZLE UNAVAILABLE");
      }
    });

    document.getElementById('btn-open-vault').addEventListener('click', () => {
      synchronizeDailyAndVaultState();
      navigateToScreen('vault');
    });

    document.getElementById('btn-game-back').addEventListener('click', () => {
      synchronizeDailyAndVaultState();
      navigateToScreen(navigationOrigin === 'vault' ? 'vault' : 'menu');
    });

    document.getElementById('btn-vault-back').addEventListener('click', () => {
      synchronizeDailyAndVaultState();
      navigateToScreen('menu');
    });

    document.getElementById('btn-open-stats').addEventListener('click', openStatsModal);
    document.getElementById('btn-open-help').addEventListener('click', () => showModal('modal-help'));
    document.getElementById('btn-game-info').addEventListener('click', () => showModal('modal-help'));
    document.getElementById('btn-open-settings').addEventListener('click', () => showModal('modal-settings'));

    document.getElementById('btn-reopen-endgame').addEventListener('click', () => {
      if (currentPuzzle) {
        const isWon = playerGuesses.includes(currentPuzzle.word);
        openEndgameModal(isWon);
      }
    });

    document.getElementById('btn-inspect-sheet').addEventListener('click', () => {
      hideModal('modal-endgame');
      bannerInspect.removeAttribute('hidden');
    });

    document.getElementById('btn-endgame-to-menu').addEventListener('click', () => {
      hideModal('modal-endgame');
      synchronizeDailyAndVaultState();
      navigateToScreen(navigationOrigin === 'vault' ? 'vault' : 'menu');
    });

    document.querySelectorAll('.btn-close-modal, .close-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        if (targetId) hideModal(targetId);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.setAttribute('hidden', '');
        }
      });
    });

    const soundToggleBtn = document.getElementById('btn-toggle-sound');
    const soundIcon = document.getElementById('sound-icon');

    function syncSoundUI() {
      soundIcon.textContent = preferences.sound ? "🔊" : "🔇";
      document.getElementById('setting-sound').checked = preferences.sound;
    }

    soundToggleBtn.addEventListener('click', () => {
      preferences.sound = !preferences.sound;
      soundEngine.enabled = preferences.sound;
      writeStorage('prefs', preferences);
      syncSoundUI();
      displayToast(preferences.sound ? "SOUND ON" : "MUTED");
    });

    const prefSoundInput = document.getElementById('setting-sound');
    prefSoundInput.checked = preferences.sound;
    prefSoundInput.addEventListener('change', (e) => {
      preferences.sound = e.target.checked;
      soundEngine.enabled = preferences.sound;
      writeStorage('prefs', preferences);
      syncSoundUI();
    });

    const prefContrastInput = document.getElementById('setting-contrast');
    prefContrastInput.checked = preferences.highContrast;
    prefContrastInput.addEventListener('change', (e) => {
      preferences.highContrast = e.target.checked;
      document.body.classList.toggle('high-contrast', preferences.highContrast);
      writeStorage('prefs', preferences);
      displayToast(preferences.highContrast ? "HIGH CONTRAST ON" : "STANDARD CONTRAST");
    });

    document.getElementById('btn-share-result').addEventListener('click', () => {
      const sharePayload = generateShareEmojiPayload();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(sharePayload)
          .then(() => displayToast("COPIED TO CLIPBOARD"))
          .catch(() => promptFallbackShare(sharePayload));
      } else {
        promptFallbackShare(sharePayload);
      }
    });

    function promptFallbackShare(text) {
      window.prompt("Copy your result:", text);
    }

    window.addEventListener('resize', () => {
      fxCanvas.width = window.innerWidth;
      fxCanvas.height = window.innerHeight;
    });

    syncSoundUI();
  }

  function bootstrap() {
    setupEventHandlers();
    synchronizeDailyAndVaultState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();