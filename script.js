/**
 * CURLING PUZZLES — WORDLE ENGINE & PLATFORM SHELL
 * 
 * Features:
 * - Deterministic Calendar Release Engine: 8 September 2026 = Day 0
 * - Authentic Curling Stone Granite Rendering & Fixed-Timestep Collision Physics
 * - Stochastic High-Velocity "Takeout Delivery" Ambient Ambiance
 * - Gameplay View Quietness Isolation for Uncluttered Focus
 * - Web Audio API Synthesizer with Resonant Granite Clack Acoustics
 * - Versioned LocalStorage with Streak Continuity & Strict Future Content Secrecy
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. CONSTANTS & PRODUCT CONFIGURATION
     ========================================================================== */
  const STORAGE_KEY = "curling_puzzles_wordle_v1";
  const PLATFORM_HOME_URL = "https://tileworksgamesstudio.github.io/Curling-Menu/";
  // Epoch Baseline: 8 September 2026 = Day 0
  const BASELINE_EPOCH_MS = Date.UTC(2026, 8, 8, 0, 0, 0); // Month is 0-indexed: 8 = September
  const MS_IN_DAY = 86400000;
  const MAX_GUESSES = 6;
  const WORD_LENGTH = 5;

  /* ==========================================================================
     2. DETERMINISTIC DAILY SCHEDULER & FUTURE CONTENT PROTECTION
     ========================================================================== */
  function getProductCurrentDate() {
    // Optional QA verification parameter: e.g. ?date=2026-09-08
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");
    if (dateParam) {
      const parsed = new Date(dateParam + "T00:00:00Z");
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  }

  function calculateDailyIndex(targetDate) {
    const targetUTC = Date.UTC(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );
    const diffDays = Math.floor((targetUTC - BASELINE_EPOCH_MS) / MS_IN_DAY);
    return diffDays < 0 ? 0 : diffDays;
  }

  function getDailyPuzzle(dayNumber) {
    const puzzles = CURLING_DAILY_PUZZLES;
    const index = dayNumber % puzzles.length;
    return {
      puzzle: puzzles[index],
      dayNumber: dayNumber
    };
  }

  /* ==========================================================================
     3. PERSISTENT STORAGE MANAGER
     ========================================================================== */
  const StorageManager = {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefault();
        const data = JSON.parse(raw);
        if (data.version !== 1) return this.getDefault();
        return data;
      } catch (e) {
        return this.getDefault();
      }
    },

    save(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        // Storage limit or incognito mode restriction handled gracefully
      }
    },

    getDefault() {
      return {
        version: 1,
        soundEnabled: true,
        stats: {
          played: 0,
          won: 0,
          currentStreak: 0,
          maxStreak: 0,
          lastPlayedDay: null,
          guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
        },
        games: {} // Keyed by dayNumber: { guesses: [], completed: bool, won: bool, timestamp: number }
      };
    }
  };

  /* ==========================================================================
     4. TACTILE WEB AUDIO API SYNTHESIZER
     ========================================================================== */
  const AudioManager = {
    ctx: null,
    enabled: true,

    init(enabled) {
      this.enabled = enabled;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    },

    resume() {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    },

    playKeyTap() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(360, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    },

    playGraniteCollision(impactForce) {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      const force = Math.min(Math.max(impactForce || 0.5, 0.2), 1.0);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      // Authentic dense acoustic granite collision "clack"
      osc.type = "triangle";
      osc.frequency.setValueAtTime(620, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.18 * force, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    },

    playTileReveal(evalState) {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      let freq = 261.63; // C4
      if (evalState === "correct") freq = 523.25; // C5 (pure ice chime)
      else if (evalState === "present") freq = 392.00; // G4 (amber bell)
      else freq = 196.00; // G3 (neutral slate resonance)

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.11, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    },

    playWinCelebration() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      const notes = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.13, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.22);
      });
    },

    playShakeReject() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.11);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.11);
    }
  };

  /* ==========================================================================
     5. PREMIUM CURLING STONE RENDERING & FIXED-TIMESTEP PHYSICS ENGINE
     ========================================================================== */
  const BackgroundPhysics = {
    canvas: null,
    ctx: null,
    rocks: [],
    animId: null,
    active: true,
    isGameplayMode: false,
    lastTime: 0,
    accumulator: 0,
    FIXED_STEP: 1 / 60,
    aggressiveTimer: 0,

    init() {
      this.canvas = document.getElementById("bg-canvas");
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext("2d");
      this.resize();
      window.addEventListener("resize", () => this.resize(), { passive: true });

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.active = !mediaQuery.matches;
      mediaQuery.addEventListener("change", (e) => {
        this.active = !e.matches;
        if (this.active) {
          this.lastTime = performance.now();
          this.loop(this.lastTime);
        } else {
          this.renderStatic();
        }
      });

      this.spawnRocks();
      if (this.active) {
        this.lastTime = performance.now();
        this.loop(this.lastTime);
      } else {
        this.renderStatic();
      }
    },

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    setGameplayMode(quiet) {
      this.isGameplayMode = quiet;
      // Adjust velocities smoothly so gameplay view remains calm
      const targetSpeed = quiet ? 0.35 : 1.0;
      this.rocks.forEach(r => {
        r.vx *= targetSpeed;
        r.vy *= targetSpeed;
      });
    },

    spawnRocks() {
      this.rocks = [];
      const isMobile = window.innerWidth < 640;
      const count = isMobile ? 6 : 9;

      for (let i = 0; i < count; i++) {
        const radius = isMobile ? 22 + Math.random() * 6 : 28 + Math.random() * 8;
        const team = i % 2 === 0 ? "red" : "yellow";
        
        // Procedural speckles for granite mineral grain
        const speckles = [];
        const speckleCount = Math.floor(radius * 1.5);
        for (let s = 0; s < speckleCount; s++) {
          const dist = Math.random() * (radius * 0.75);
          const angle = Math.random() * Math.PI * 2;
          speckles.push({
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            r: 0.6 + Math.random() * 1.2,
            alpha: 0.15 + Math.random() * 0.35,
            isLight: Math.random() > 0.5
          });
        }

        this.rocks.push({
          x: Math.random() * (window.innerWidth - radius * 2) + radius,
          y: Math.random() * (window.innerHeight - radius * 2) + radius,
          vx: (Math.random() - 0.5) * 0.48,
          vy: (Math.random() - 0.5) * 0.48,
          radius: radius,
          mass: radius * radius,
          team: team,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.006,
          speckles: speckles,
          isAggressive: false
        });
      }
    },

    triggerAggressiveEntry() {
      if (this.isGameplayMode || this.rocks.length === 0) return;
      // Pick one stone near any edge to deliver with high momentum
      const rock = this.rocks[Math.floor(Math.random() * this.rocks.length)];
      rock.isAggressive = true;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.4 + Math.random() * 1.2;
      rock.vx = Math.cos(angle) * speed;
      rock.vy = Math.sin(angle) * speed;
      rock.vRot = (Math.random() - 0.5) * 0.04;
      setTimeout(() => { rock.isAggressive = false; }, 4000);
    },

    fixedUpdate() {
      const w = this.canvas.width;
      const h = this.canvas.height;
      const restitution = 0.72; // Realistic heavy granite collision bounce
      const damping = 0.9984; // Smooth ice glide friction

      // Update positions and boundary reflection
      for (let i = 0; i < this.rocks.length; i++) {
        const r = this.rocks[i];
        r.x += r.vx;
        r.y += r.vy;
        r.rotation += r.vRot;

        r.vx *= damping;
        r.vy *= damping;

        // Keep minimum realistic ice drift alive
        const speed = Math.hypot(r.vx, r.vy);
        const minSpeed = this.isGameplayMode ? 0.06 : 0.12;
        if (speed < minSpeed) {
          const boostAngle = Math.random() * Math.PI * 2;
          r.vx += Math.cos(boostAngle) * 0.04;
          r.vy += Math.sin(boostAngle) * 0.04;
        }

        // Sheet boundary reflections
        if (r.x - r.radius < 0) {
          r.x = r.radius;
          r.vx = -r.vx * restitution;
        } else if (r.x + r.radius > w) {
          r.x = w - r.radius;
          r.vx = -r.vx * restitution;
        }

        if (r.y - r.radius < 0) {
          r.y = r.radius;
          r.vy = -r.vy * restitution;
        } else if (r.y + r.radius > h) {
          r.y = h - r.radius;
          r.vy = -r.vy * restitution;
        }
      }

      // Pairwise Rock-to-Rock Collision Physics
      for (let i = 0; i < this.rocks.length; i++) {
        for (let j = i + 1; j < this.rocks.length; j++) {
          const r1 = this.rocks[i];
          const r2 = this.rocks[j];

          const dx = r2.x - r1.x;
          const dy = r2.y - r1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = r1.radius + r2.radius;

          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;

            // Anti-jitter positional separation
            const overlap = (minDist - dist) * 0.505;
            r1.x -= nx * overlap;
            r1.y -= ny * overlap;
            r2.x += nx * overlap;
            r2.y += ny * overlap;

            // Normal impulse momentum transfer
            const kx = r1.vx - r2.vx;
            const ky = r1.vy - r2.vy;
            const velAlongNormal = kx * nx + ky * ny;

            if (velAlongNormal > 0) {
              const impulse = (2 * velAlongNormal) / (r1.mass + r2.mass);
              r1.vx -= impulse * r2.mass * nx * restitution;
              r1.vy -= impulse * r2.mass * ny * restitution;
              r2.vx += impulse * r1.mass * nx * restitution;
              r2.vy += impulse * r1.mass * ny * restitution;

              // Tangential rotational deflection
              r1.vRot = (Math.random() - 0.5) * 0.012;
              r2.vRot = (Math.random() - 0.5) * 0.012;

              // Acoustic granite clack if significant velocity
              if (velAlongNormal > 0.45 && !this.isGameplayMode) {
                AudioManager.playGraniteCollision(velAlongNormal);
              }
            }
          }
        }
      }
    },

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 1. Draw subtle curling sheet house rings watermark
      this.drawCurlingHouseWatermark();

      // 2. Draw each physical curling stone
      for (let i = 0; i < this.rocks.length; i++) {
        const r = this.rocks[i];
        this.drawCurlingStone(r);
      }
    },

    drawCurlingHouseWatermark() {
      const cx = this.canvas.width * 0.5;
      const cy = this.canvas.height * 0.38;
      const baseR = Math.min(this.canvas.width, this.canvas.height) * 0.38;

      this.ctx.save();
      // Sheet Centerline
      this.ctx.beginPath();
      this.ctx.moveTo(cx, 0);
      this.ctx.lineTo(cx, this.canvas.height);
      this.ctx.strokeStyle = "rgba(21, 59, 93, 0.05)";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // 12-Foot Ring (House Blue)
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
      this.ctx.strokeStyle = "rgba(30, 117, 184, 0.07)";
      this.ctx.lineWidth = 14;
      this.ctx.stroke();

      // 8-Foot Ring (White)
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, baseR * 0.66, 0, Math.PI * 2);
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.lineWidth = 12;
      this.ctx.stroke();

      // 4-Foot Ring (Curling Red)
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, baseR * 0.33, 0, Math.PI * 2);
      this.ctx.strokeStyle = "rgba(214, 59, 59, 0.07)";
      this.ctx.lineWidth = 10;
      this.ctx.stroke();

      // The Button (Center)
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, baseR * 0.09, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(30, 117, 184, 0.12)";
      this.ctx.fill();

      this.ctx.restore();
    },

    drawCurlingStone(r) {
      const opacity = this.isGameplayMode ? 0.45 : 0.88;
      this.ctx.save();
      this.ctx.globalAlpha = opacity;
      this.ctx.translate(r.x, r.y);

      // Layer 1: Contact Shadow on Pebbled Ice
      this.ctx.beginPath();
      this.ctx.ellipse(2, r.radius * 0.22, r.radius * 0.96, r.radius * 0.72, 0, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(16, 47, 74, 0.16)";
      this.ctx.fill();

      this.ctx.rotate(r.rotation);

      // Layer 2: Granite Outer Body (Trefor / Ailsa Craig Grey Slate)
      const graniteGrad = this.ctx.createRadialGradient(
        -r.radius * 0.2, -r.radius * 0.25, r.radius * 0.1,
        0, 0, r.radius
      );
      graniteGrad.addColorStop(0, "#c4d2df");
      graniteGrad.addColorStop(0.55, "#8da1b4");
      graniteGrad.addColorStop(0.88, "#5f768b");
      graniteGrad.addColorStop(1, "#364c60");

      this.ctx.beginPath();
      this.ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = graniteGrad;
      this.ctx.fill();
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeStyle = "rgba(16, 47, 74, 0.35)";
      this.ctx.stroke();

      // Layer 3: Polished Striking Band & Upper Chamfer Bevel
      this.ctx.beginPath();
      this.ctx.arc(0, 0, r.radius * 0.84, 0, Math.PI * 2);
      this.ctx.lineWidth = 1.2;
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      this.ctx.stroke();

      // Layer 4: Microtexture (Quartz / Mica Granite Speckling)
      for (let s = 0; s < r.speckles.length; s++) {
        const sp = r.speckles[s];
        this.ctx.beginPath();
        this.ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        this.ctx.fillStyle = sp.isLight
          ? `rgba(255, 255, 255, ${sp.alpha})`
          : `rgba(21, 59, 93, ${sp.alpha})`;
        this.ctx.fill();
      }

      // Layer 5: Inner Stone Dish / Recessed Core
      this.ctx.beginPath();
      this.ctx.arc(0, 0, r.radius * 0.58, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(21, 59, 93, 0.08)";
      this.ctx.fill();
      this.ctx.strokeStyle = "rgba(16, 47, 74, 0.25)";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Layer 6: Authentic Curling Handle (Team Red or Team Yellow)
      const isRed = r.team === "red";
      const handleBase = isRed ? "#d63b3b" : "#f0c647";
      const handleHighlight = isRed ? "#ee6865" : "#ffe698";
      const handleShadow = isRed ? "#8f1d22" : "#a87f16";

      // Handle Mounting Pedestals (Chrome Mounts)
      this.ctx.fillStyle = "#a1b4c4";
      this.ctx.beginPath();
      this.ctx.arc(-r.radius * 0.32, 0, r.radius * 0.1, 0, Math.PI * 2);
      this.ctx.arc(r.radius * 0.32, 0, r.radius * 0.1, 0, Math.PI * 2);
      this.ctx.fill();

      // Handle Drop Shadow onto Stone Body
      this.ctx.beginPath();
      this.ctx.roundRect
        ? this.ctx.roundRect(-r.radius * 0.35, -r.radius * 0.12, r.radius * 0.7, r.radius * 0.24, 3)
        : this.ctx.rect(-r.radius * 0.35, -r.radius * 0.12, r.radius * 0.7, r.radius * 0.24);
      this.ctx.fillStyle = "rgba(16, 47, 74, 0.25)";
      this.ctx.fill();

      // Curved Gooseneck Grip Body
      const handleGrad = this.ctx.createLinearGradient(0, -r.radius * 0.15, 0, r.radius * 0.15);
      handleGrad.addColorStop(0, handleHighlight);
      handleGrad.addColorStop(0.4, handleBase);
      handleGrad.addColorStop(1, handleShadow);

      this.ctx.beginPath();
      this.ctx.roundRect
        ? this.ctx.roundRect(-r.radius * 0.34, -r.radius * 0.14, r.radius * 0.68, r.radius * 0.22, 4)
        : this.ctx.rect(-r.radius * 0.34, -r.radius * 0.14, r.radius * 0.68, r.radius * 0.22);
      this.ctx.fillStyle = handleGrad;
      this.ctx.fill();
      this.ctx.lineWidth = 1.2;
      this.ctx.strokeStyle = handleShadow;
      this.ctx.stroke();

      // Center Fastening Bolt
      this.ctx.beginPath();
      this.ctx.arc(0, -r.radius * 0.03, r.radius * 0.06, 0, Math.PI * 2);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fill();

      this.ctx.restore();
    },

    loop(timestamp) {
      if (!this.active) return;
      const elapsed = (timestamp - this.lastTime) / 1000;
      this.lastTime = timestamp;

      // Fixed timestep accumulator for consistent physics across 60Hz/120Hz/144Hz
      this.accumulator += Math.min(elapsed, 0.1);
      while (this.accumulator >= this.FIXED_STEP) {
        this.fixedUpdate();
        this.accumulator -= this.FIXED_STEP;
      }

      // Occasional aggressive takeout shot ambient trigger (~every 32 seconds)
      this.aggressiveTimer += elapsed;
      if (this.aggressiveTimer > 32) {
        this.aggressiveTimer = 0;
        this.triggerAggressiveEntry();
      }

      this.draw();
      this.animId = requestAnimationFrame((t) => this.loop(t));
    },

    renderStatic() {
      this.draw();
    }
  };

  /* ==========================================================================
     6. GAME CONTROLLER & USER INTERFACE
     ========================================================================== */
  const App = {
    state: null,
    currentDayNumber: 0,
    activePuzzleDay: 0,
    currentPuzzle: null,
    currentGuess: "",
    isGameOver: false,

    // DOM Elements
    boardEl: document.getElementById("board"),
    keyboardEl: document.getElementById("keyboard"),
    toastContainer: document.getElementById("toast-container"),

    // Modals
    menuModal: document.getElementById("menu-view"),
    vaultModal: document.getElementById("vault-view"),
    statsModal: document.getElementById("stats-view"),
    helpModal: document.getElementById("help-view"),

    init() {
      this.state = StorageManager.load();
      AudioManager.init(this.state.soundEnabled);
      BackgroundPhysics.init();

      // Calculate calendar schedule: 8 September 2026 = Day 0
      const currentDate = getProductCurrentDate();
      this.currentDayNumber = calculateDailyIndex(currentDate);
      this.activePuzzleDay = this.currentDayNumber;

      this.loadPuzzleForDay(this.activePuzzleDay);
      this.setupDOM();
      this.setupKeyboard();
      this.bindEvents();
      this.updateAudioVisualState();
      this.startMidnightCheck();
    },

    loadPuzzleForDay(dayNumber) {
      // Future-Protection Clamping: Never allow loading future unreleased days
      const safeDay = Math.min(dayNumber, this.currentDayNumber);
      const dailyObj = getDailyPuzzle(safeDay);
      this.currentPuzzle = dailyObj.puzzle;
      this.activePuzzleDay = safeDay;
      this.currentGuess = "";
      this.isGameOver = false;

      // Update Header & Category Labels
      const badgeEl = document.getElementById("puzzle-badge");
      const catEl = document.getElementById("puzzle-category");
      const dayEl = document.getElementById("puzzle-day-indicator");

      if (badgeEl) badgeEl.textContent = safeDay === this.currentDayNumber ? "Today" : "Vault";
      if (catEl) catEl.textContent = this.currentPuzzle.category;
      if (dayEl) dayEl.textContent = `Day ${safeDay}`;

      // Reset Board Grid and Restore Saved Progress
      this.buildBoard();
      this.restoreGameProgress();
    },

    setupDOM() {
      const menuDay = document.getElementById("menu-today-number");
      if (menuDay) menuDay.textContent = `Day ${this.currentDayNumber}`;
    },

    buildBoard() {
      this.boardEl.innerHTML = "";
      for (let r = 0; r < MAX_GUESSES; r++) {
        const row = document.createElement("div");
        row.className = "grid-row";
        row.setAttribute("role", "row");
        row.dataset.row = r;

        for (let c = 0; c < WORD_LENGTH; c++) {
          const tile = document.createElement("div");
          tile.className = "tile";
          tile.setAttribute("role", "gridcell");
          tile.dataset.row = r;
          tile.dataset.col = c;
          tile.setAttribute("aria-label", `Row ${r + 1}, Letter ${c + 1}: empty`);
          row.appendChild(tile);
        }
        this.boardEl.appendChild(row);
      }
    },

    setupKeyboard() {
      const layout = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
      ];

      this.keyboardEl.innerHTML = "";
      layout.forEach((rowKeys) => {
        const row = document.createElement("div");
        row.className = "keyboard-row";
        rowKeys.forEach((key) => {
          const btn = document.createElement("button");
          btn.className = "key";
          btn.dataset.key = key;
          btn.setAttribute("type", "button");

          if (key === "ENTER") {
            btn.classList.add("key-wide");
            btn.textContent = "ENTER";
            btn.setAttribute("aria-label", "Submit Word");
          } else if (key === "BACKSPACE") {
            btn.classList.add("key-wide");
            btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM18 9l-6 6m0-6l6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>`;
            btn.setAttribute("aria-label", "Delete Letter");
          } else {
            btn.textContent = key;
          }

          btn.addEventListener("click", () => this.handleKeyInput(key));
          row.appendChild(btn);
        });
        this.keyboardEl.appendChild(row);
      });
    },

    bindEvents() {
      // Physical Keyboard Binding
      window.addEventListener("keydown", (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (this.isModalOpen()) return;

        const key = e.key.toUpperCase();
        if (key === "ENTER") {
          e.preventDefault();
          this.handleKeyInput("ENTER");
        } else if (key === "BACKSPACE") {
          e.preventDefault();
          this.handleKeyInput("BACKSPACE");
        } else if (/^[A-Z]$/.test(key)) {
          this.handleKeyInput(key);
        }
      });

      // Header Button Listeners
      document.getElementById("btn-menu").addEventListener("click", () => {
        BackgroundPhysics.setGameplayMode(false);
        this.openModal(this.menuModal);
      });
      document.getElementById("btn-help").addEventListener("click", () => this.openModal(this.helpModal));
      document.getElementById("btn-stats").addEventListener("click", () => {
        this.renderStatsModal();
        this.openModal(this.statsModal);
      });
      document.getElementById("btn-sound").addEventListener("click", () => this.toggleSound());

      // Modal Close Handlers
      document.getElementById("btn-close-menu").addEventListener("click", () => {
        this.closeModal(this.menuModal);
        BackgroundPhysics.setGameplayMode(true);
      });
      document.getElementById("btn-close-vault").addEventListener("click", () => {
        this.closeModal(this.vaultModal);
        BackgroundPhysics.setGameplayMode(true);
      });
      document.getElementById("btn-close-stats").addEventListener("click", () => this.closeModal(this.statsModal));
      document.getElementById("btn-close-help").addEventListener("click", () => this.closeModal(this.helpModal));

      // Menu Actions
      document.getElementById("btn-play-today").addEventListener("click", () => {
        this.closeModal(this.menuModal);
        BackgroundPhysics.setGameplayMode(true);
        if (this.activePuzzleDay !== this.currentDayNumber) {
          this.loadPuzzleForDay(this.currentDayNumber);
        }
      });

      document.getElementById("btn-open-vault").addEventListener("click", () => {
        this.closeModal(this.menuModal);
        this.renderVaultModal();
        this.openModal(this.vaultModal);
      });

      document.getElementById("btn-menu-sound-toggle").addEventListener("click", () => this.toggleSound());
      document.getElementById("btn-share-result").addEventListener("click", () => this.shareResult());
    },

    handleKeyInput(key) {
      if (this.isGameOver) return;

      if (key === "BACKSPACE") {
        if (this.currentGuess.length > 0) {
          this.currentGuess = this.currentGuess.slice(0, -1);
          AudioManager.playKeyTap();
          this.updateActiveRow();
        }
      } else if (key === "ENTER") {
        this.submitGuess();
      } else if (/^[A-Z]$/.test(key)) {
        if (this.currentGuess.length < WORD_LENGTH) {
          this.currentGuess += key;
          AudioManager.playKeyTap();
          this.updateActiveRow();
        }
      }
    },

    updateActiveRow() {
      const savedData = this.getGameProgress(this.activePuzzleDay);
      const currentRow = savedData.guesses.length;
      if (currentRow >= MAX_GUESSES) return;

      const rowEl = this.boardEl.querySelector(`.grid-row[data-row="${currentRow}"]`);
      if (!rowEl) return;

      const tiles = rowEl.querySelectorAll(".tile");
      for (let i = 0; i < WORD_LENGTH; i++) {
        const char = this.currentGuess[i] || "";
        tiles[i].textContent = char;
        tiles[i].dataset.state = char ? "tbd" : "empty";
        tiles[i].setAttribute("aria-label", char ? `Row ${currentRow + 1}, Letter ${i + 1}: ${char}` : "empty");
      }
    },

    submitGuess() {
      const savedData = this.getGameProgress(this.activePuzzleDay);
      const currentRow = savedData.guesses.length;

      if (this.currentGuess.length < WORD_LENGTH) {
        this.shakeRow(currentRow);
        this.showToast("Not enough letters");
        AudioManager.playShakeReject();
        return;
      }

      const guess = this.currentGuess.toUpperCase();
      if (!ACCEPTED_DICTIONARY.has(guess)) {
        this.shakeRow(currentRow);
        this.showToast("Not in curling vocabulary");
        AudioManager.playShakeReject();
        return;
      }

      // Valid Guess: Dual-pass accurate evaluation
      const evaluation = this.evaluateGuess(guess, this.currentPuzzle.word);
      savedData.guesses.push({ guess: guess, evaluation: evaluation });

      const isWin = guess === this.currentPuzzle.word;
      const isLoss = !isWin && savedData.guesses.length >= MAX_GUESSES;

      if (isWin) {
        savedData.completed = true;
        savedData.won = true;
        this.isGameOver = true;
      } else if (isLoss) {
        savedData.completed = true;
        savedData.won = false;
        this.isGameOver = true;
      }

      this.state.games[this.activePuzzleDay] = savedData;
      if (savedData.completed) {
        this.updateStatsOnCompletion(savedData.won, savedData.guesses.length);
      }
      StorageManager.save(this.state);

      // Sequentially animate row reveal
      this.animateRowReveal(currentRow, evaluation, () => {
        this.updateKeyboardColors();
        this.currentGuess = "";

        if (isWin) {
          this.bounceRow(currentRow);
          AudioManager.playWinCelebration();
          this.showToast("Shot of the End! Winner!");
          setTimeout(() => {
            this.renderStatsModal();
            this.openModal(this.statsModal);
          }, 1400);
        } else if (isLoss) {
          AudioManager.playShakeReject();
          this.showToast(`Out of rocks! ${this.currentPuzzle.word}`);
          setTimeout(() => {
            this.renderStatsModal();
            this.openModal(this.statsModal);
          }, 1400);
        }
      });
    },

    evaluateGuess(guess, target) {
      const result = new Array(WORD_LENGTH).fill("absent");
      const targetLetters = target.split("");
      const guessLetters = guess.split("");

      // Pass 1: Match correct letters
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guessLetters[i] === targetLetters[i]) {
          result[i] = "correct";
          targetLetters[i] = null;
          guessLetters[i] = null;
        }
      }

      // Pass 2: Match present letters in other slots
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guessLetters[i] !== null) {
          const indexInTarget = targetLetters.indexOf(guessLetters[i]);
          if (indexInTarget !== -1) {
            result[i] = "present";
            targetLetters[indexInTarget] = null;
          }
        }
      }

      return result;
    },

    animateRowReveal(rowIdx, evaluation, onComplete) {
      const rowEl = this.boardEl.querySelector(`.grid-row[data-row="${rowIdx}"]`);
      if (!rowEl) return;
      const tiles = rowEl.querySelectorAll(".tile");

      tiles.forEach((tile, i) => {
        setTimeout(() => {
          tile.classList.add("flip");
          tile.dataset.eval = evaluation[i];
          AudioManager.playTileReveal(evaluation[i]);

          if (i === WORD_LENGTH - 1 && onComplete) {
            setTimeout(onComplete, 300);
          }
        }, i * 220);
      });
    },

    shakeRow(rowIdx) {
      const rowEl = this.boardEl.querySelector(`.grid-row[data-row="${rowIdx}"]`);
      if (!rowEl) return;
      rowEl.classList.remove("shake");
      void rowEl.offsetWidth; // Trigger reflow
      rowEl.classList.add("shake");
    },

    bounceRow(rowIdx) {
      const rowEl = this.boardEl.querySelector(`.grid-row[data-row="${rowIdx}"]`);
      if (!rowEl) return;
      const tiles = rowEl.querySelectorAll(".tile");
      tiles.forEach((tile, i) => {
        setTimeout(() => tile.classList.add("bounce"), i * 90);
      });
    },

    restoreGameProgress() {
      const progress = this.getGameProgress(this.activePuzzleDay);
      progress.guesses.forEach((entry, r) => {
        const rowEl = this.boardEl.querySelector(`.grid-row[data-row="${r}"]`);
        if (!rowEl) return;
        const tiles = rowEl.querySelectorAll(".tile");
        for (let c = 0; c < WORD_LENGTH; c++) {
          tiles[c].textContent = entry.guess[c];
          tiles[c].dataset.eval = entry.evaluation[c];
        }
      });

      this.isGameOver = progress.completed;
      this.updateKeyboardColors();

      const completionCard = document.getElementById("stats-completion-info");
      if (progress.completed) {
        completionCard.classList.remove("hidden");
      } else {
        completionCard.classList.add("hidden");
      }
    },

    updateKeyboardColors() {
      const progress = this.getGameProgress(this.activePuzzleDay);
      const letterStatus = {};

      progress.guesses.forEach((entry) => {
        for (let i = 0; i < WORD_LENGTH; i++) {
          const char = entry.guess[i];
          const status = entry.evaluation[i];

          if (status === "correct") {
            letterStatus[char] = "correct";
          } else if (status === "present" && letterStatus[char] !== "correct") {
            letterStatus[char] = "present";
          } else if (status === "absent" && !letterStatus[char]) {
            letterStatus[char] = "absent";
          }
        }
      });

      const keys = this.keyboardEl.querySelectorAll(".key");
      keys.forEach((keyEl) => {
        const char = keyEl.dataset.key;
        if (letterStatus[char]) {
          keyEl.dataset.eval = letterStatus[char];
        } else {
          delete keyEl.dataset.eval;
        }
      });
    },

    getGameProgress(dayNumber) {
      if (!this.state.games[dayNumber]) {
        this.state.games[dayNumber] = {
          guesses: [],
          completed: false,
          won: false,
          timestamp: Date.now()
        };
      }
      return this.state.games[dayNumber];
    },

    updateStatsOnCompletion(won, guessCount) {
      const stats = this.state.stats;
      stats.played += 1;

      if (won) {
        stats.won += 1;
        if (stats.lastPlayedDay === null || this.activePuzzleDay === stats.lastPlayedDay + 1) {
          stats.currentStreak += 1;
        } else if (this.activePuzzleDay !== stats.lastPlayedDay) {
          stats.currentStreak = 1;
        }
        if (stats.currentStreak > stats.maxStreak) {
          stats.maxStreak = stats.currentStreak;
        }
        stats.guessDistribution[guessCount] = (stats.guessDistribution[guessCount] || 0) + 1;
      } else {
        stats.currentStreak = 0;
      }

      stats.lastPlayedDay = this.activePuzzleDay;
    },

    /* ==========================================================================
       7. VAULT RENDERING (Released Past Puzzles Only)
       ========================================================================== */
    renderVaultModal() {
      const vaultList = document.getElementById("vault-list");
      vaultList.innerHTML = "";

      // Day 0: Vault is clean and empty
      if (this.currentDayNumber === 0) {
        vaultList.innerHTML = `
          <div class="vault-empty-state">
            <p><strong>The Vault is currently empty.</strong></p>
            <p>Yesterday's daily challenges will unlock here starting tomorrow.</p>
          </div>
        `;
        return;
      }

      // Populate only previously released days in reverse order
      for (let day = this.currentDayNumber - 1; day >= 0; day--) {
        const dailyData = getDailyPuzzle(day);
        const progress = this.state.games[day];
        const isCompleted = progress && progress.completed;

        const item = document.createElement("div");
        item.className = "vault-item";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.innerHTML = `
          <div class="vault-info">
            <div class="vault-info-title">Day ${day} • Daily Challenge</div>
            <div class="vault-info-meta">${dailyData.puzzle.category} (${dailyData.puzzle.difficulty})</div>
          </div>
          <span class="vault-status-tag ${isCompleted ? 'completed' : 'unplayed'}">
            ${isCompleted ? (progress.won ? 'Won' : 'Played') : 'Play'}
          </span>
        `;

        const openDay = () => {
          this.closeModal(this.vaultModal);
          BackgroundPhysics.setGameplayMode(true);
          this.loadPuzzleForDay(day);
        };

        item.addEventListener("click", openDay);
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openDay();
          }
        });

        vaultList.appendChild(item);
      }
    },

    /* ==========================================================================
       8. STATS MODAL RENDERING
       ========================================================================== */
    renderStatsModal() {
      const stats = this.state.stats;
      document.getElementById("stat-played").textContent = stats.played;
      const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
      document.getElementById("stat-win-pct").textContent = `${winRate}%`;
      document.getElementById("stat-current-streak").textContent = stats.currentStreak;
      document.getElementById("stat-max-streak").textContent = stats.maxStreak;

      // Delivery Distribution Bars
      const barsContainer = document.getElementById("guess-bars");
      barsContainer.innerHTML = "";
      const maxFreq = Math.max(...Object.values(stats.guessDistribution), 1);

      for (let i = 1; i <= MAX_GUESSES; i++) {
        const count = stats.guessDistribution[i] || 0;
        const pct = Math.max(7, Math.round((count / maxFreq) * 100));

        const row = document.createElement("div");
        row.className = "dist-row";
        row.innerHTML = `
          <span>${i}</span>
          <div class="dist-bar-track">
            <div class="dist-bar-fill" style="width: ${pct}%">${count}</div>
          </div>
        `;
        barsContainer.appendChild(row);
      }

      // Solution and Curriculum info ONLY IF game completed
      const progress = this.getGameProgress(this.activePuzzleDay);
      const completionCard = document.getElementById("stats-completion-info");
      if (progress.completed) {
        completionCard.classList.remove("hidden");
        document.getElementById("completed-word-reveal").textContent = this.currentPuzzle.word;
        document.getElementById("completed-word-definition").textContent = this.currentPuzzle.definition;
        document.getElementById("completed-curriculum").textContent = `Curriculum: ${this.currentPuzzle.category}`;
      } else {
        completionCard.classList.add("hidden");
      }

      this.updateCountdownClock();
    },

    updateCountdownClock() {
      const clockEl = document.getElementById("time-to-next");
      if (!clockEl) return;

      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diffMs = tomorrow - now;

      const h = String(Math.floor(diffMs / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diffMs % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diffMs % 60000) / 1000)).padStart(2, "0");

      clockEl.textContent = `${h}:${m}:${s}`;
    },

    shareResult() {
      const progress = this.getGameProgress(this.activePuzzleDay);
      if (!progress.completed) return;

      const dayLabel = `Day ${this.activePuzzleDay}`;
      const attempts = progress.won ? progress.guesses.length : "X";
      let text = `Curling Wordle ${dayLabel} ${attempts}/${MAX_GUESSES}\n\n`;

      progress.guesses.forEach((entry) => {
        entry.evaluation.forEach((ev) => {
          if (ev === "correct") text += "🟦"; // Button Blue
          else if (ev === "present") text += "🟨"; // Ring Amber
          else text += "⬜"; // Ice Frosted Slate
        });
        text += "\n";
      });

      text += "\nPlay: " + PLATFORM_HOME_URL;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast("Score copied to clipboard!");
        });
      } else {
        this.showToast("Result ready to share!");
      }
    },

    /* ==========================================================================
       9. MODAL & UTILITY HELPERS
       ========================================================================== */
    openModal(modal) {
      if (!modal) return;
      modal.classList.remove("hidden");
      const focusTarget = modal.querySelector("button, a, [tabindex='0']");
      if (focusTarget) focusTarget.focus();
    },

    closeModal(modal) {
      if (!modal) return;
      modal.classList.add("hidden");
    },

    isModalOpen() {
      return (
        !this.menuModal.classList.contains("hidden") ||
        !this.vaultModal.classList.contains("hidden") ||
        !this.statsModal.classList.contains("hidden") ||
        !this.helpModal.classList.contains("hidden")
      );
    },

    showToast(message) {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = message;
      this.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 250);
      }, 1800);
    },

    toggleSound() {
      this.state.soundEnabled = !this.state.soundEnabled;
      AudioManager.enabled = this.state.soundEnabled;
      StorageManager.save(this.state);
      this.updateAudioVisualState();
      AudioManager.playKeyTap();
    },

    updateAudioVisualState() {
      const onIcon = document.getElementById("sound-icon-on");
      const offIcon = document.getElementById("sound-icon-off");
      const menuSoundBtn = document.getElementById("btn-menu-sound-toggle");
      const menuSoundText = document.getElementById("menu-sound-text");

      if (this.state.soundEnabled) {
        if (onIcon) onIcon.classList.remove("hidden");
        if (offIcon) offIcon.classList.add("hidden");
        if (menuSoundBtn) menuSoundBtn.setAttribute("aria-checked", "true");
        if (menuSoundText) menuSoundText.textContent = "ON";
      } else {
        if (onIcon) onIcon.classList.add("hidden");
        if (offIcon) offIcon.classList.remove("hidden");
        if (menuSoundBtn) menuSoundBtn.setAttribute("aria-checked", "false");
        if (menuSoundText) menuSoundText.textContent = "OFF";
      }
    },

    startMidnightCheck() {
      setInterval(() => {
        const checkDay = calculateDailyIndex(getProductCurrentDate());
        if (checkDay !== this.currentDayNumber) {
          this.currentDayNumber = checkDay;
          const menuDay = document.getElementById("menu-today-number");
          if (menuDay) menuDay.textContent = `Day ${this.currentDayNumber}`;
        }
        if (!this.statsModal.classList.contains("hidden")) {
          this.updateCountdownClock();
        }
      }, 30000);
    }
  };

  // Launch on DOM Ready
  document.addEventListener("DOMContentLoaded", () => App.init());
})();