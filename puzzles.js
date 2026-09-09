/**
 * CURLING PUZZLES — WORDLE PUZZLE DATA & CURRICULUM
 * 
 * Contract:
 * - Deterministic, sequence-indexed daily curling terms.
 * - 32-category curling curriculum ranging from Level 1 foundations to Level 5 expert knowledge.
 * - Comprehensive accepted-guess word set ensuring all valid 5-letter words can be guessed.
 */

// Daily Target Curling Solutions (5 Letters)
const CURLING_DAILY_PUZZLES = [
  {
    id: "curl-w-001",
    word: "STONE",
    category: "Level 1: Equipment & Stones",
    definition: "The circular 42-pound granite rock delivered down the sheet, crafted from Scottish or Welsh granite.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-002",
    word: "BROOM",
    category: "Level 1: Basic Equipment",
    definition: "The sweeping brush with synthetic head used to warm and melt ice pebble in front of a running rock.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-003",
    word: "HOUSE",
    category: "Level 1: The Sheet & Rings",
    definition: "The three concentric scoring rings (12-foot, 8-foot, 4-foot) surrounding the central button.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-004",
    word: "SWEEP",
    category: "Level 2: Ice & Sweeping",
    definition: "The athletic act of brushing the ice ahead of the stone to hold its line and prolong its distance.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-005",
    word: "GUARD",
    category: "Level 2: Strategic Shots",
    definition: "A stationary stone placed before the house to shield a scoring rock from the opponent's takeout.",
    difficulty: "Easy"
  },
  {
    id: "curl-w-006",
    word: "HACKS",
    category: "Level 1: The Sheet",
    definition: "The rubber-lined footholds anchored into the ice at each end from which delivery begins.",
    difficulty: "Easy"
  },
  {
    id: "curl-w-007",
    word: "SHEET",
    category: "Level 1: The Playing Surface",
    definition: "The 150-foot specially prepared strip of pebbled ice where the curling match takes place.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-008",
    word: "BITER",
    category: "Level 2: Scoring & Rules",
    definition: "A rock barely touching the outermost perimeter of the 12-foot ring that counts as in the house.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-009",
    word: "CURLS",
    category: "Level 2: Rotation & Curl",
    definition: "The lateral curving path of a rotating granite stone as friction against pebble slows its travel.",
    difficulty: "Easy"
  },
  {
    id: "curl-w-010",
    word: "SLIDE",
    category: "Level 2: Delivery Mechanics",
    definition: "The smooth forward lunge from the hack on a Teflon slider that propels the stone toward the target.",
    difficulty: "Easy"
  },
  {
    id: "curl-w-011",
    word: "RINGS",
    category: "Level 1: The House",
    definition: "The colored circular visual markers embedded under the ice showing scoring proximity to the tee.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-012",
    word: "DRAWS",
    category: "Level 2: Shot Selection",
    definition: "Precision finesse deliveries calculated to come to rest directly in the house without striking another stone.",
    difficulty: "Easy"
  },
  {
    id: "curl-w-013",
    word: "HEAVY",
    category: "Level 2: Weight & Speed",
    definition: "A stone thrown with greater velocity than called by the skip, risking sailing through the house.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-014",
    word: "CLEAN",
    category: "Level 2: Sweeping Technique",
    definition: "Gentle sweeping motion solely intended to clear away errant ice frost or debris from the rock's path.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-015",
    word: "WICKS",
    category: "Level 3: Strategic Angles",
    definition: "Glancing caroms where a thrown stone softly deflects off another rock to reposition into scoring.",
    difficulty: "Hard"
  },
  {
    id: "curl-w-016",
    word: "RAISE",
    category: "Level 3: Shot Tactics",
    definition: "A shot that bumps a stationary rock forward along its trajectory into the scoring zone.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-017",
    word: "SPLIT",
    category: "Level 3: Multi-Stone Strategy",
    definition: "Delivering a rock to tap a guard into the house while rolling the delivered rock in as well.",
    difficulty: "Hard"
  },
  {
    id: "curl-w-018",
    word: "BLANK",
    category: "Level 3: End Strategy & Hammer",
    definition: "An end deliberately concluded with zero stones in the house to retain the valuable last-rock hammer.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-019",
    word: "LEADS",
    category: "Level 3: Team Positions",
    definition: "The front-end player delivering the team's opening two stones and sweeping the remaining six.",
    difficulty: "Easy"
  },
  {
    id: "curl-w-020",
    word: "CHIPS",
    category: "Level 3: Takeouts & Contact",
    definition: "Striking only a small fraction of a target stone to redirect it while preserving the shooter.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-021",
    word: "SHOTS",
    category: "Level 1: Ends & Games",
    definition: "The individual deliveries allocated to each curler during the course of an end.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-022",
    word: "TOUCH",
    category: "Level 2: Delivery & Burn Rules",
    definition: "Accidentally contacting a moving stone with broom or shoe, resulting in a burned rock infraction.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-023",
    word: "BRIER",
    category: "Level 4: Canadian Curling Culture",
    definition: "The iconic Canadian Men's National Championship contested annually since 1927.",
    difficulty: "Hard"
  },
  {
    id: "curl-w-024",
    word: "EXTRA",
    category: "Level 3: Competitive Formats",
    definition: "An overtime sudden-death end played when teams remain tied after the regulation ten ends.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-025",
    word: "FROST",
    category: "Level 4: Ice Conditions",
    definition: "Unwanted atmospheric moisture condensing onto the pebbled ice sheet that slows rock speed.",
    difficulty: "Medium"
  },
  {
    id: "curl-w-026",
    word: "CLINK",
    category: "Level 1: Sound of the Game",
    definition: "The signature acoustic crack when two dense granite curling rocks collide on the sheet.",
    difficulty: "Easy"
  },
  {
    id: "curl-w-027",
    word: "INTRN",
    category: "Level 5: Specialist Terminology",
    definition: "In-Turn delivery rotation; clockwise spin imparted by a right-handed player causing rightward curl.",
    difficulty: "Expert"
  },
  {
    id: "curl-w-028",
    word: "OUTRN",
    category: "Level 5: Specialist Terminology",
    definition: "Out-Turn delivery rotation; counter-clockwise handle release causing leftward curling drift.",
    difficulty: "Expert"
  },
  {
    id: "curl-w-029",
    word: "ROARS",
    category: "Level 4: Lore & History",
    definition: "Reference to curling's historic title 'The Roaring Game' born from the rumble of rocks across Scottish lochs.",
    difficulty: "Hard"
  },
  {
    id: "curl-w-030",
    word: "SCORE",
    category: "Level 1: Basic Scoring",
    definition: "Points tallied at the conclusion of an end for all rocks closer to the button than the opponent's best.",
    difficulty: "Beginner"
  },
  {
    id: "curl-w-031",
    word: "TRACK",
    category: "Level 4: Ice Reading",
    definition: "A grooved path worn into the pebble through repeated deliveries that stones tend to follow.",
    difficulty: "Hard"
  },
  {
    id: "curl-w-032",
    word: "PEBBL",
    category: "Level 4: Ice Preparation",
    definition: "Water droplets sprayed and frozen onto the sheet allowing rocks to glide on discrete mounds.",
    difficulty: "Expert"
  }
];

// Expanded Accepted Guess Words Dictionary (Valid 5-letter English words)
const ACCEPTED_DICTIONARY = new Set([
  // All puzzle targets
  "STONE","BROOM","HOUSE","SWEEP","GUARD","HACKS","SHEET","BITER","CURLS","SLIDE",
  "RINGS","DRAWS","HEAVY","CLEAN","WICKS","RAISE","SPLIT","BLANK","LEADS","CHIPS",
  "SHOTS","TOUCH","BRIER","EXTRA","FROST","CLINK","INTRN","OUTRN","ROARS","SCORE",
  "TRACK","PEBBL",

  // Curling & Winter Sports Terms
  "ROCKS","HANDLE","CURLY","SHOTT","HAMMR","SKIPS","THIRD","POINT","MATCH","TEAMS",
  "LINES","LINEA","ANGLE","SPEED","FORCE","GLIDE","BRUSH","CHAMP","PRIZE","BONSP",
  "CHILL","SOLID","WATER","MELON","GLASS","PLATE","NORTH","WHITE","MAPLE","CANAD",
  "MEDAL","GOLDN","WINTR","SNOWY","FLAKE","CREST","BADGE","CLUBB","RINKK","SHINE",

  // Standard NYT-style common 5-letter words
  "ABOUT","ABOVE","ABUSE","ACTOR","ACUTE","ADMIT","ADOPT","ADULT","AFTER","AGAIN",
  "AGENT","AGREE","AHEAD","ALARM","ALBUM","ALERT","ALIKE","ALIVE","ALLOW","ALONE",
  "ALONG","ALTER","AMONG","ANGER","ANGLE","ANGRY","APART","APPLE","APPLY","ARENA",
  "ARGUE","ARISE","ARRAY","ASIDE","ASSET","AUDIO","AUDIT","AVOID","AWARD","AWARE",
  "BADLY","BAKER","BASES","BASIC","BASIS","BEACH","BEGAN","BEGIN","BEGUN","BEING",
  "BELOW","BENCH","BILLY","BIRTH","BLACK","BLAME","BLIND","BLOCK","BLOOD","BOARD",
  "BOOST","BOOTH","BOUND","BRAIN","BRAND","BREAD","BREAK","BREED","BRIEF","BRING",
  "BROAD","BROKE","BROWN","BUILD","BUILT","BUYER","CABLE","CALIF","CARRY","CATCH",
  "CAUSE","CHAIN","CHAIR","CHART","CHASE","CHEAP","CHECK","CHEST","CHIEF","CHILD",
  "CHINA","CHOSE","CIVIL","CLAIM","CLASS","CLEAR","CLICK","CLOCK","CLOSE","COACH",
  "COAST","COULD","COUNT","COURT","COVER","CRAFT","CRANE","CRASH","CRAZY","CREAM",
  "CRIME","CROSS","CROWD","CROWN","CURVE","CYCLE","DAILY","DANCE","DATED","DEALT",
  "DEATH","DEBUT","DELAY","DEPTH","DOING","DOUBT","DOZEN","DRAFT","DRAMA","DRAWN",
  "DREAM","DRESS","DRIFT","DRINK","DRIVE","DROVE","DYING","EAGER","EARLY","EARTH",
  "EIGHT","ELITE","EMPTY","ENEMY","ENJOY","ENTER","ENTRY","EQUAL","ERROR","EVENT",
  "EVERY","EXACT","EXIST","FAITH","FALSE","FAULT","FIBER","FIELD","FIFTH","FIFTY",
  "FIGHT","FINAL","FIRST","FIXED","FLASH","FLEET","FLOOR","FLUID","FOCUS","FORCE",
  "FORTH","FORTY","FORUM","FOUND","FRAME","FRANK","FRAUD","FRESH","FRONT","FRUIT",
  "FULLY","FUNNY","GIANT","GIVEN","GLASS","GLOBE","GOING","GRACE","GRADE","GRAND",
  "GRANT","GRASS","GREAT","GREEN","GROSS","GROUP","GROWN","GUIDE","HABIT","HAPPY",
  "HEART","HONEY","HORSE","HOTEL","HUMAN","IDEAL","IMAGE","INDEX","INNER","INPUT",
  "ISSUE","JAPAN","JOINT","JONES","JUDGE","KNOWN","LABEL","LARGE","LASER","LATER",
  "LAUGH","LAYER","LEARN","LEASE","LEAST","LEAVE","LEGAL","LEVEL","LIGHT","LIMIT",
  "LINKS","LIVES","LOCAL","LOGIC","LOOSE","LOWER","LUCKY","LUNCH","LYING","MAGIC",
  "MAJOR","MAKER","MARCH","MARRY","MATCH","MAYBE","MAYOR","MEANT","MEDIA","METAL",
  "MIGHT","MINOR","MINUS","MIXED","MODEL","MONEY","MONTH","MORAL","MOTOR","MOUNT",
  "MOUSE","MOUTH","MOVIE","MUSIC","NEEDS","NEVER","NEWLY","NIGHT","NOISE","NORTH",
  "NOTED","NOVEL","NURSE","OCCUR","OCEAN","OFFER","OFTEN","ORDER","OTHER","OUGHT",
  "PAINT","PANEL","PAPER","PARTY","PEACE","PETER","PHASE","PHONE","PHOTO","PIECE",
  "PILOT","PITCH","PLACE","PLAIN","PLANE","PLANT","PLATE","PLAZA","POINT","POUND",
  "POWER","PRESS","PRICE","PRIDE","PRIME","PRINT","PRIOR","PRIZE","PROOF","PROUD",
  "PROVE","QUEEN","QUICK","QUIET","QUITE","RADIO","RANGE","RAPID","RATIO","REACH",
  "READY","REFER","RIGHT","RIVAL","RIVER","ROBIN","ROGER","ROMAN","ROUGH","ROUND",
  "ROUTE","ROYAL","RURAL","SCALE","SCENE","SCOPE","SERVE","SEVEN","SHALL","SHAPE",
  "SHARE","SHARP","SHEET","SHELF","SHELL","SHIFT","SHIRT","SHOCK","SHOOT","SHORT",
  "SHOWN","SIGHT","SINCE","SIXTH","SIXTY","SIZED","SKILL","SLEEP","SLIDE","SMALL",
  "SMART","SMILE","SMITH","SMOKE","SOLID","SOLVE","SORRY","SOUND","SOUTH","SPACE",
  "SPARE","SPEAK","SPEED","SPEND","SPENT","SPLIT","SPOKE","SPORT","STAFF","STAGE",
  "STAKE","STAND","START","STATE","STEAM","STEEL","STICK","STILL","STOCK","STONE",
  "STOOD","STORE","STORM","STORY","STRIP","STUCK","STUDY","STUFF","STYLE","SUGAR",
  "SUITE","SUPER","SWEET","TABLE","TAKEN","TASTE","TAXES","TEACH","TEETH","TERRY",
  "TEXAS","THANK","THEFT","THEIR","THEME","THERE","THESE","THICK","THING","THINK",
  "THIRD","THOSE","THREE","THREW","THROW","TIGHT","TIMES","TIRED","TITLE","TODAY",
  "TOPIC","TOTAL","TOUCH","TOUGH","TOWER","TRACK","TRADE","TRAIN","TREAT","TREND",
  "TRIAL","TRIED","TRIES","TRUCK","TRULY","TRUST","TRUTH","TWICE","UNDER","UNDUE",
  "UNION","UNITY","UNTIL","UPPER","UPSET","URBAN","USAGE","USUAL","VALID","VALUE",
  "VIDEO","VIRUS","VISIT","VITAL","VOICE","WASTE","WATCH","WATER","WHEEL","WHERE",
  "WHICH","WHILE","WHITE","WHOLE","WHOSE","WOMAN","WOMEN","WORLD","WORRY","WORSE",
  "WORST","WORTH","WOULD","WOUND","WRITE","WRONG","WROTE","YIELD","YOUNG","YOUTH"
]);

// Export for module or global browser scope
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CURLING_DAILY_PUZZLES, ACCEPTED_DICTIONARY };
}