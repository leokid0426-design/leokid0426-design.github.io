/*
  무한 크래프트 월드
  - GitHub Pages에서 그대로 실행 가능
  - 전 세계 First Discovery / 랭킹은 Supabase 연결 시 작동
*/

// 1) Supabase 연결을 원하면 아래 두 값을 입력하세요.
// 예: url: "https://xxxx.supabase.co", anonKey: "eyJ..."
const SUPABASE_CONFIG = {
  url: "",
  anonKey: ""
};

const STORAGE_KEY = "infinite-craft-world-v1";

const BASE_ELEMENTS = [
  { name: "물", emoji: "💧", rarity: 1 },
  { name: "불", emoji: "🔥", rarity: 1 },
  { name: "바람", emoji: "🌬️", rarity: 1 },
  { name: "흙", emoji: "🌍", rarity: 1 }
];

const RECIPES = [
  ["물", "불", "증기", "💨", 1],
  ["물", "흙", "진흙", "🟤", 1],
  ["물", "바람", "파도", "🌊", 1],
  ["불", "흙", "용암", "🌋", 2],
  ["불", "바람", "연기", "☁️", 1],
  ["흙", "바람", "먼지", "🌫️", 1],
  ["물", "물", "호수", "🏞️", 1],
  ["불", "불", "태양", "☀️", 2],
  ["바람", "바람", "태풍", "🌀", 2],
  ["흙", "흙", "산", "⛰️", 1],
  ["호수", "물", "바다", "🌊", 2],
  ["바다", "바람", "항해", "⛵", 2],
  ["바다", "불", "소금", "🧂", 2],
  ["바다", "흙", "섬", "🏝️", 2],
  ["섬", "바람", "야자수", "🌴", 2],
  ["섬", "태양", "휴양지", "🏖️", 3],
  ["진흙", "태양", "벽돌", "🧱", 2],
  ["벽돌", "벽돌", "집", "🏠", 2],
  ["집", "집", "마을", "🏘️", 3],
  ["마을", "집", "도시", "🏙️", 3],
  ["도시", "도시", "메가시티", "🌃", 4],
  ["메가시티", "태양", "네온도시", "🌆", 5],
  ["산", "물", "강", "🏞️", 2],
  ["강", "바다", "삼각주", "🗺️", 3],
  ["산", "바람", "눈", "❄️", 2],
  ["눈", "산", "스키장", "🎿", 3],
  ["눈", "불", "물", "💧", 1],
  ["용암", "물", "돌", "🪨", 2],
  ["돌", "불", "금속", "🔩", 2],
  ["금속", "불", "검", "⚔️", 3],
  ["검", "바람", "검기", "💫", 4],
  ["검", "불", "화염검", "🔥", 4],
  ["검", "물", "물의검", "🗡️", 4],
  ["검", "흙", "대지검", "🪨", 4],
  ["금속", "바람", "비행기", "✈️", 3],
  ["비행기", "바람", "제트기", "🛩️", 4],
  ["비행기", "도시", "공항", "🛫", 3],
  ["연기", "바람", "구름", "☁️", 2],
  ["구름", "물", "비", "🌧️", 2],
  ["비", "태양", "무지개", "🌈", 3],
  ["무지개", "도시", "축제", "🎉", 4],
  ["축제", "음악", "콘서트", "🎤", 4],
  ["비", "흙", "식물", "🌱", 2],
  ["식물", "태양", "꽃", "🌸", 2],
  ["꽃", "바람", "씨앗", "🌰", 2],
  ["씨앗", "흙", "나무", "🌳", 2],
  ["나무", "나무", "숲", "🌲", 3],
  ["숲", "불", "산불", "🔥", 3],
  ["숲", "물", "정글", "🌿", 3],
  ["정글", "동물", "원숭이", "🐒", 3],
  ["숲", "동물", "사슴", "🦌", 3],
  ["식물", "물", "조류", "🌿", 2],
  ["조류", "바다", "해초", "🌱", 3],
  ["흙", "식물", "농장", "🚜", 2],
  ["농장", "동물", "소", "🐄", 2],
  ["소", "불", "스테이크", "🥩", 3],
  ["농장", "물", "쌀", "🌾", 2],
  ["쌀", "불", "밥", "🍚", 2],
  ["밥", "소금", "주먹밥", "🍙", 3],
  ["식물", "불", "재", "🪵", 2],
  ["재", "물", "비누", "🧼", 3],
  ["재", "바람", "화산재", "🌋", 3],
  ["태양", "식물", "에너지", "⚡", 3],
  ["에너지", "금속", "전기", "🔌", 3],
  ["전기", "도시", "인터넷", "🌐", 4],
  ["인터넷", "사람", "채팅", "💬", 4],
  ["인터넷", "전기", "컴퓨터", "💻", 4],
  ["컴퓨터", "인터넷", "웹사이트", "🕸️", 4],
  ["웹사이트", "게임", "웹게임", "🎮", 4],
  ["컴퓨터", "게임", "게임개발", "🧑‍💻", 5],
  ["웹게임", "창의력", "무한크래프트", "♾️", 5],
  ["물", "에너지", "생명", "🧬", 4],
  ["생명", "흙", "동물", "🐾", 3],
  ["생명", "바람", "새", "🐦", 3],
  ["생명", "물", "물고기", "🐟", 3],
  ["물고기", "불", "구운생선", "🐟", 3],
  ["새", "불", "불사조", "🦅", 5],
  ["불사조", "검", "전설의검", "🗡️", 6],
  ["동물", "사람", "친구", "🧑‍🤝‍🧑", 3],
  ["생명", "진흙", "사람", "🧑", 4],
  ["사람", "사람", "가족", "👨‍👩‍👧", 3],
  ["사람", "불", "요리사", "🧑‍🍳", 3],
  ["사람", "흙", "농부", "🧑‍🌾", 3],
  ["사람", "바람", "탐험가", "🧭", 4],
  ["탐험가", "지도", "모험", "🗺️", 4],
  ["모험", "검", "용사", "🛡️", 4],
  ["용사", "불사조", "전설", "🏆", 6],
  ["전설", "인터넷", "밈", "😂", 5],
  ["밈", "불", "핫밈", "🔥", 5],
  ["태양", "바람", "빛", "💡", 3],
  ["빛", "전기", "전구", "💡", 3],
  ["빛", "어둠", "그림자", "🌑", 4],
  ["불", "빛", "레이저", "🔴", 4],
  ["레이저", "검", "광선검", "🗡️", 5],
  ["돌", "돌", "바위", "🪨", 2],
  ["바위", "산", "절벽", "🧗", 3],
  ["절벽", "바람", "낙하산", "🪂", 3],
  ["금속", "바퀴", "자동차", "🚗", 3],
  ["돌", "바람", "바퀴", "⚙️", 3],
  ["자동차", "전기", "전기차", "🚙", 4],
  ["자동차", "바람", "레이싱", "🏁", 4],
  ["레이싱", "게임", "레이싱게임", "🏎️", 5],
  ["태풍", "바다", "쓰나미", "🌊", 4],
  ["쓰나미", "도시", "재난", "🚨", 4],
  ["재난", "사람", "구조대", "🚑", 4],
  ["구조대", "전기", "로봇", "🤖", 5],
  ["로봇", "컴퓨터", "AI", "🧠", 6],
  ["AI", "무한크래프트", "무한AI", "♾️", 7],
  ["AI", "게임개발", "자동생성게임", "🎲", 7],
  ["증기", "금속", "엔진", "🚂", 3],
  ["엔진", "바퀴", "기차", "🚆", 3],
  ["기차", "도시", "지하철", "🚇", 3],
  ["엔진", "바다", "배", "🚢", 3],
  ["배", "바람", "해적선", "🏴‍☠️", 4],
  ["해적선", "검", "해적", "🏴‍☠️", 4],
  ["해적", "보물", "보물지도", "🗺️", 5],
  ["돌", "빛", "보석", "💎", 4],
  ["보석", "흙", "보물", "🪙", 4],
  ["보물", "용사", "퀘스트", "📜", 5],
  ["퀘스트", "게임", "RPG", "🧙", 5],
  ["RPG", "인터넷", "온라인게임", "🕹️", 5],
  ["온라인게임", "사람", "랭킹", "🏅", 5],
  ["랭킹", "전설", "챔피언", "👑", 6],
  ["챔피언", "무한AI", "세계최초", "🥇", 8],
  ["소금", "물", "바닷물", "🌊", 2],
  ["바닷물", "태양", "소금", "🧂", 2],
  ["구름", "전기", "번개", "⚡", 3],
  ["번개", "생명", "괴물", "👹", 5],
  ["괴물", "용사", "보스전", "🐉", 6],
  ["보스전", "전설의검", "클리어", "✅", 7],
  ["클리어", "웹게임", "엔딩", "🎬", 7],
  ["엔딩", "무한크래프트", "새로운시작", "🌅", 8],
  ["파도", "바람", "서핑", "🏄", 3],
  ["서핑", "태양", "여름", "🏖️", 3],
  ["여름", "얼음", "빙수", "🍧", 4],
  ["물", "눈", "얼음", "🧊", 2],
  ["얼음", "불", "물", "💧", 1],
  ["얼음", "바람", "눈보라", "🌨️", 4],
  ["눈보라", "산", "설산", "🏔️", 4],
  ["설산", "탐험가", "등반", "🧗", 5],
  ["등반", "전설", "정상", "🚩", 6],
  ["정상", "챔피언", "왕관", "👑", 7],
  ["왕관", "랭킹", "1등", "🥇", 7],
  ["먼지", "물", "진흙", "🟤", 1],
  ["먼지", "전기", "청소기", "🧹", 3],
  ["청소기", "로봇", "로봇청소기", "🤖", 5],
  ["음악", "전기", "스피커", "🔊", 3],
  ["바람", "소리", "음악", "🎵", 3],
  ["소리", "인터넷", "스트리밍", "📺", 4],
  ["스트리밍", "게임", "게임방송", "🎥", 5],
  ["게임방송", "밈", "유튜브", "▶️", 5],
  ["유튜브", "챔피언", "인기급상승", "📈", 6]
  ["사람", "컴퓨터", "게임", "🎮", 4],
  ["전기", "사람", "아이디어", "💡", 4],
  ["아이디어", "컴퓨터", "앱", "📱", 4],
  ["앱", "게임", "모바일게임", "📲", 5],
  ["파도", "바위", "소리", "🔊", 3],
  ["소리", "사람", "음악", "🎵", 3],
  ["보물지도", "탐험가", "모험", "🗺️", 4],
  ["모험", "인터넷", "커뮤니티", "👥", 5],
  ["커뮤니티", "랭킹", "대회", "🏟️", 5],
  ["대회", "챔피언", "트로피", "🏆", 6],
];

const EMOJIS = ["✨","🌟","🧪","🪄","🛰️","🧿","🧩","🎲","🎮","🛸","🔮","💎","🌈","⚡","🌀","🌊","🔥","🌱","🤖","👾","🏰","🦄","🐉","🍀","📡","🚀","🌌","🧠","🎭","🗿"];
const PREFIXES = ["초월", "미니", "메가", "하이퍼", "네온", "고대", "신비한", "로봇", "우주", "전설의", "무한", "황금", "그림자", "빛나는"];
const SUFFIXES = ["폭풍", "왕국", "엔진", "코어", "탑", "행성", "드래곤", "정원", "도시", "상자", "포털", "연구소", "탐험", "비밀", "마법", "시뮬레이터"];

const RECIPE_MAP = new Map();
for (const [a, b, result, emoji, rarity] of RECIPES) {
  RECIPE_MAP.set(recipeKey(a, b), { name: result, emoji, rarity });
}

const ACHIEVEMENTS = [
  { id: "first-craft", icon: "🧪", title: "첫 합성", desc: "처음으로 요소를 합성하기", check: s => s.stats.crafts >= 1 },
  { id: "ten-crafts", icon: "🔟", title: "연금술 초보", desc: "10번 합성하기", check: s => s.stats.crafts >= 10 },
  { id: "hundred-crafts", icon: "💯", title: "합성 장인", desc: "100번 합성하기", check: s => s.stats.crafts >= 100 },
  { id: "ten-elements", icon: "📘", title: "도감 시작", desc: "요소 10개 발견", check: s => Object.keys(s.elements).length >= 10 },
  { id: "twenty-five-elements", icon: "📚", title: "수집가", desc: "요소 25개 발견", check: s => Object.keys(s.elements).length >= 25 },
  { id: "fifty-elements", icon: "🏛️", title: "도감 마스터", desc: "요소 50개 발견", check: s => Object.keys(s.elements).length >= 50 },
  { id: "local-first", icon: "🥇", title: "First Discovery!", desc: "새로운 First Discovery 획득", check: s => s.stats.firsts >= 1 },
  { id: "five-firsts", icon: "👑", title: "개척자", desc: "First Discovery 5개 획득", check: s => s.stats.firsts >= 5 },
  { id: "rare-five", icon: "💎", title: "희귀한 발견", desc: "희귀도 5 이상 요소 발견", check: s => Object.values(s.elements).some(e => e.rarity >= 5) },
  { id: "water-line", icon: "🌊", title: "물의 길", desc: "바다 발견", check: s => Boolean(s.elements[makeId("바다")]) },
  { id: "life-line", icon: "🧬", title: "생명의 시작", desc: "생명 발견", check: s => Boolean(s.elements[makeId("생명")]) },
  { id: "internet-line", icon: "🌐", title: "온라인 시대", desc: "인터넷 발견", check: s => Boolean(s.elements[makeId("인터넷")]) }
];

const QUESTS = [
  { title: "증기 만들기", hint: "물 + 불", target: "증기" },
  { title: "생명 만들기", hint: "물 + 에너지", target: "생명" },
  { title: "도시 만들기", hint: "집 + 집 → 마을, 마을 + 집", target: "도시" },
  { title: "AI 만들기", hint: "로봇 + 컴퓨터", target: "AI" },
  { title: "세계최초 만들기", hint: "챔피언 + 무한AI", target: "세계최초" }
];

let supabaseClient = null;
let currentSort = "time";
let selected = { a: null, b: null };

const state = loadState();

const els = {
  inventory: document.getElementById("inventory"),
  searchInput: document.getElementById("searchInput"),
  clearSearch: document.getElementById("clearSearch"),
  slotA: document.getElementById("slotA"),
  slotB: document.getElementById("slotB"),
  craftBtn: document.getElementById("craftBtn"),
  randomBtn: document.getElementById("randomBtn"),
  resetSlotsBtn: document.getElementById("resetSlotsBtn"),
  resultArea: document.getElementById("resultArea"),
  resultBadge: document.getElementById("resultBadge"),
  resultIcon: document.getElementById("resultIcon"),
  resultName: document.getElementById("resultName"),
  resultRecipe: document.getElementById("resultRecipe"),
  statElements: document.getElementById("statElements"),
  statCrafts: document.getElementById("statCrafts"),
  statFirsts: document.getElementById("statFirsts"),
  codexGrid: document.getElementById("codexGrid"),
  codexCount: document.getElementById("codexCount"),
  achievementGrid: document.getElementById("achievementGrid"),
  achievementCount: document.getElementById("achievementCount"),
  rankingList: document.getElementById("rankingList"),
  rankingNote: document.getElementById("rankingNote"),
  refreshRankBtn: document.getElementById("refreshRankBtn"),
  historyList: document.getElementById("historyList"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  questList: document.getElementById("questList"),
  playerNameLabel: document.getElementById("playerNameLabel"),
  syncStatus: document.getElementById("syncStatus"),
  openNameModal: document.getElementById("openNameModal"),
  nameModal: document.getElementById("nameModal"),
  playerNameInput: document.getElementById("playerNameInput"),
  saveNameBtn: document.getElementById("saveNameBtn"),
  closeNameModal: document.getElementById("closeNameModal"),
  copySetupBtn: document.getElementById("copySetupBtn"),
  hardResetBtn: document.getElementById("hardResetBtn"),
  toastHost: document.getElementById("toastHost")
};

init();

function init() {
  initSupabase();
  bindEvents();
  renderAll();
  updateRanking();
  if (!state.playerName || state.playerName === "탐험가") {
    setTimeout(() => openNameModal(), 400);
  }
}

function initSupabase() {
  const configured = SUPABASE_CONFIG.url.startsWith("https://") && SUPABASE_CONFIG.anonKey.length > 20;
  if (configured && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    els.syncStatus.textContent = "전 세계 모드";
    els.rankingNote.textContent = "Supabase 연결 완료: 전 세계 First Discovery와 랭킹이 작동합니다.";
  } else {
    els.syncStatus.textContent = "로컬 모드";
    els.rankingNote.textContent = "Supabase를 연결하면 전 세계 랭킹이 켜집니다. 연결 전에는 내 기기 랭킹만 표시됩니다.";
  }
}

function bindEvents() {
  els.searchInput.addEventListener("input", renderInventory);
  els.clearSearch.addEventListener("click", () => { els.searchInput.value = ""; renderInventory(); });

  document.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentSort = btn.dataset.sort;
      renderInventory();
    });
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
    });
  });

  [els.slotA, els.slotB].forEach(slot => {
    slot.addEventListener("dragover", e => { e.preventDefault(); slot.classList.add("drag-over"); });
    slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
    slot.addEventListener("drop", e => {
      e.preventDefault();
      slot.classList.remove("drag-over");
      const id = e.dataTransfer.getData("text/plain");
      if (state.elements[id]) setSlot(slot.dataset.slot, state.elements[id]);
    });
    slot.addEventListener("click", () => {
      if (selected[slot.dataset.slot]) {
        selected[slot.dataset.slot] = null;
        renderSlots();
      }
    });
  });

  els.craftBtn.addEventListener("click", craftSelected);
  els.randomBtn.addEventListener("click", randomCraft);
  els.resetSlotsBtn.addEventListener("click", resetSlots);
  els.refreshRankBtn.addEventListener("click", updateRanking);
  els.clearHistoryBtn.addEventListener("click", () => {
    state.history = [];
    saveState();
    renderHistory();
    toast("기록 삭제", "합성 기록을 비웠습니다.");
  });
  els.openNameModal.addEventListener("click", openNameModal);
  els.closeNameModal.addEventListener("click", closeNameModal);
  els.saveNameBtn.addEventListener("click", saveName);
  els.playerNameInput.addEventListener("keydown", e => { if (e.key === "Enter") saveName(); });
  els.copySetupBtn.addEventListener("click", copySetupGuide);
  els.hardResetBtn.addEventListener("click", hardReset);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const saved = JSON.parse(raw);
      saved.elements ||= {};
      saved.history ||= [];
      saved.stats ||= { crafts: 0, firsts: 0 };
      saved.stats.crafts ||= 0;
      saved.stats.firsts ||= 0;
      saved.unlockedAchievements ||= {};
      saved.localDiscoveries ||= {};
      saved.playerId ||= (crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}-${Math.random().toString(16).slice(2)}`);
      saved.playerName ||= "탐험가";
      for (const base of BASE_ELEMENTS) {
        const id = makeId(base.name);
        if (!saved.elements[id]) saved.elements[id] = createElement(base.name, base.emoji, base.rarity, null, false, true);
      }
      return saved;
    } catch (e) {
      console.warn("저장 데이터 복구 실패", e);
    }
  }
  const elements = {};
  for (const base of BASE_ELEMENTS) {
    const element = createElement(base.name, base.emoji, base.rarity, null, false, true);
    elements[element.id] = element;
  }
  return {
    playerId: crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    playerName: "탐험가",
    elements,
    history: [],
    stats: { crafts: 0, firsts: 0 },
    unlockedAchievements: {},
    localDiscoveries: {}
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createElement(name, emoji, rarity = 1, recipe = null, first = false, base = false) {
  return {
    id: makeId(name),
    name,
    emoji,
    rarity,
    recipe,
    first,
    base,
    createdAt: Date.now()
  };
}

function normalize(str) {
  return String(str).trim().toLowerCase().replace(/\s+/g, "");
}

function makeId(name) {
  return normalize(name).replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g, "") || hashCode(name).toString(36);
}

function recipeKey(a, b) {
  return [normalize(a), normalize(b)].sort().join("+");
}

function setSlot(which, element) {
  selected[which] = element;
  renderSlots();
}

function renderSlots() {
  renderSlot(els.slotA, selected.a);
  renderSlot(els.slotB, selected.b);
  els.craftBtn.disabled = !(selected.a && selected.b);
}

function renderSlot(slot, element) {
  slot.classList.toggle("filled", Boolean(element));
  if (!element) {
    slot.innerHTML = `<span class="slot-placeholder">${slot.dataset.slot === "a" ? "첫 번째 요소" : "두 번째 요소"}</span>`;
    return;
  }
  slot.innerHTML = `<div><span class="big-emoji">${element.emoji}</span><span class="big-name">${escapeHtml(element.name)}</span></div>`;
}

function renderAll() {
  els.playerNameLabel.textContent = state.playerName || "탐험가";
  renderInventory();
  renderSlots();
  renderStats();
  renderCodex();
  renderAchievements();
  renderHistory();
  renderQuests();
}

function renderInventory() {
  const q = normalize(els.searchInput.value);
  let list = Object.values(state.elements);
  if (q) list = list.filter(e => normalize(e.name).includes(q));
  list.sort((a, b) => {
    if (currentSort === "name") return a.name.localeCompare(b.name, "ko");
    if (currentSort === "rare") return b.rarity - a.rarity || b.createdAt - a.createdAt;
    return b.createdAt - a.createdAt;
  });
  els.inventory.innerHTML = "";
  for (const element of list) {
    const btn = document.createElement("button");
    btn.className = "element-card";
    btn.draggable = true;
    btn.innerHTML = `
      <span class="emoji">${element.emoji}</span>
      <span class="name">${escapeHtml(element.name)}</span>
      <small class="meta">희귀도 ${element.rarity}${element.first ? " · First" : ""}</small>
    `;
    btn.addEventListener("click", () => {
      if (!selected.a) setSlot("a", element);
      else if (!selected.b) setSlot("b", element);
      else setSlot("a", element);
    });
    btn.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", element.id);
    });
    els.inventory.appendChild(btn);
  }
}

function renderStats() {
  els.statElements.textContent = Object.keys(state.elements).length;
  els.statCrafts.textContent = state.stats.crafts;
  els.statFirsts.textContent = state.stats.firsts;
}

function renderCodex() {
  const list = Object.values(state.elements).sort((a, b) => b.createdAt - a.createdAt);
  els.codexCount.textContent = `${list.length}개 발견`;
  els.codexGrid.innerHTML = list.map(e => `
    <div class="codex-item">
      <span class="emoji">${e.emoji}</span>
      <div>
        <b>${escapeHtml(e.name)}</b>
        <small>${e.base ? "기본 요소" : escapeHtml(e.recipe || "알 수 없음")}</small>
        ${e.first ? `<span class="first-mark">🥇 First Discovery</span>` : ""}
      </div>
    </div>
  `).join("");
}

function renderAchievements() {
  let changed = false;
  for (const ach of ACHIEVEMENTS) {
    if (!state.unlockedAchievements[ach.id] && ach.check(state)) {
      state.unlockedAchievements[ach.id] = Date.now();
      changed = true;
      toast("업적 달성!", `${ach.icon} ${ach.title}`, "first");
      burstParticles(["🏆", "✨", "⭐"], window.innerWidth / 2, window.innerHeight / 2);
    }
  }
  if (changed) saveState();
  const unlocked = Object.keys(state.unlockedAchievements).length;
  els.achievementCount.textContent = `${unlocked} / ${ACHIEVEMENTS.length}`;
  els.achievementGrid.innerHTML = ACHIEVEMENTS.map(ach => {
    const isUnlocked = Boolean(state.unlockedAchievements[ach.id]);
    return `
      <div class="achievement-item ${isUnlocked ? "" : "locked"}">
        <span class="ach-icon">${ach.icon}</span>
        <b>${escapeHtml(ach.title)}</b>
        <small>${escapeHtml(ach.desc)}</small>
      </div>
    `;
  }).join("");
}

function renderHistory() {
  if (!state.history.length) {
    els.historyList.innerHTML = `<div class="history-item"><small>아직 합성 기록이 없습니다.</small></div>`;
    return;
  }
  els.historyList.innerHTML = state.history.slice(0, 60).map(h => `
    <div class="history-item">
      <b>${h.first ? "🥇 " : ""}${h.resultEmoji} ${escapeHtml(h.result)}</b>
      <small>${escapeHtml(h.a)} + ${escapeHtml(h.b)} · ${new Date(h.time).toLocaleString("ko-KR")}</small>
    </div>
  `).join("");
}

function renderQuests() {
  els.questList.innerHTML = QUESTS.map(q => {
    const done = Boolean(state.elements[makeId(q.target)]);
    return `
      <div class="quest-item ${done ? "done" : ""}">
        <b>${done ? "✅" : "⬜"} ${escapeHtml(q.title)}</b>
        <small>${escapeHtml(q.hint)}</small>
      </div>
    `;
  }).join("");
}

async function craftSelected() {
  if (!selected.a || !selected.b) return;
  await craft(selected.a, selected.b);
}

async function randomCraft() {
  const list = Object.values(state.elements);
  if (list.length < 2) return;
  const a = list[Math.floor(Math.random() * list.length)];
  const b = list[Math.floor(Math.random() * list.length)];
  setSlot("a", a);
  setSlot("b", b);
  await craft(a, b);
}

async function craft(a, b) {
  els.craftBtn.disabled = true;
  burstParticles([a.emoji, b.emoji, "✨"], window.innerWidth / 2, window.innerHeight / 2);
  await delay(250);

  const resultData = getCraftResult(a, b);
  const id = makeId(resultData.name);
  const existed = Boolean(state.elements[id]);
  let isFirst = false;

  if (!existed) {
    if (supabaseClient) {
      isFirst = await claimRemoteFirstDiscovery(resultData, a, b);
    } else {
      isFirst = !state.localDiscoveries[id];
      state.localDiscoveries[id] = true;
    }
    const element = createElement(resultData.name, resultData.emoji, resultData.rarity, `${a.emoji} ${a.name} + ${b.emoji} ${b.name}`, isFirst, false);
    state.elements[element.id] = element;
    if (isFirst) state.stats.firsts += 1;
  }

  state.stats.crafts += 1;
  state.history.unshift({
    a: a.name,
    b: b.name,
    result: resultData.name,
    resultEmoji: resultData.emoji,
    first: isFirst,
    time: Date.now()
  });
  state.history = state.history.slice(0, 120);
  saveState();

  showResult(resultData, a, b, existed, isFirst);
  renderAll();
  await updateRanking(true);
}

function showResult(resultData, a, b, existed, isFirst) {
  els.resultArea.classList.remove("hidden", "first");
  if (isFirst) els.resultArea.classList.add("first");
  els.resultBadge.textContent = isFirst ? "First Discovery" : existed ? "Already Found" : "New";
  els.resultIcon.textContent = resultData.emoji;
  els.resultName.textContent = resultData.name;
  els.resultRecipe.textContent = `${a.emoji} ${a.name} + ${b.emoji} ${b.name}`;

  if (isFirst) {
    toast("🥇 First Discovery!", `${resultData.emoji} ${resultData.name}을(를) 처음 발견했습니다!`, "first");
    burstParticles(["🥇", "✨", "🏆", resultData.emoji], window.innerWidth / 2, window.innerHeight / 2);
  } else if (!existed) {
    toast("새 요소 발견", `${resultData.emoji} ${resultData.name}`);
  } else {
    toast("이미 발견한 요소", `${resultData.emoji} ${resultData.name}`);
  }
}

function getCraftResult(a, b) {
  const direct = RECIPE_MAP.get(recipeKey(a.name, b.name));
  if (direct) return direct;
  return generateElement(a, b);
}

function generateElement(a, b) {
  const seed = hashCode(`${normalize(a.name)}|${normalize(b.name)}`);
  const emoji = EMOJIS[Math.abs(seed) % EMOJIS.length];
  const prefix = PREFIXES[Math.abs(seed >> 2) % PREFIXES.length];
  const suffix = SUFFIXES[Math.abs(seed >> 5) % SUFFIXES.length];
  const mode = Math.abs(seed) % 7;
  let name;

  if (mode === 0) name = `${prefix}${a.name}`;
  else if (mode === 1) name = `${b.name}${suffix}`;
  else if (mode === 2) name = `${a.name}${b.name}`;
  else if (mode === 3) name = `${prefix}${suffix}`;
  else if (mode === 4) name = `${a.name}의${suffix}`;
  else if (mode === 5) name = `${b.name} ${prefix}`.replace(/\s+/g, "");
  else name = `${prefix}${a.name}${suffix}`;

  name = name.replace(/[🔥💧🌬️🌍]/g, "").slice(0, 20);
  if (!name || name === a.name || name === b.name) name = `${prefix}${suffix}`;
  const rarity = Math.min(9, Math.max(2, Math.floor((Math.abs(seed) % 100) / 17) + Math.max(a.rarity, b.rarity)));
  return { name, emoji, rarity };
}

async function claimRemoteFirstDiscovery(resultData, a, b) {
  const payload = {
    element_id: makeId(resultData.name),
    element_name: resultData.name,
    emoji: resultData.emoji,
    recipe_a: a.name,
    recipe_b: b.name,
    recipe_key: recipeKey(a.name, b.name),
    player_id: state.playerId,
    player_name: state.playerName || "탐험가"
  };
  try {
    const { error } = await supabaseClient.from("discoveries").insert(payload);
    if (!error) return true;
    if (error.code === "23505") return false;
    console.warn("Supabase discovery error", error);
    return false;
  } catch (e) {
    console.warn("Supabase discovery failed", e);
    return false;
  }
}

async function updateRanking(silent = false) {
  const item = {
    player_id: state.playerId,
    player_name: state.playerName || "탐험가",
    element_count: Object.keys(state.elements).length,
    craft_count: state.stats.crafts,
    first_count: state.stats.firsts,
    updated_at: new Date().toISOString()
  };

  if (!supabaseClient) {
    renderRanking([item], false);
    return;
  }

  try {
    await supabaseClient.from("rankings").upsert(item, { onConflict: "player_id" });
    const { data, error } = await supabaseClient
      .from("rankings")
      .select("player_name, element_count, craft_count, first_count, updated_at")
      .order("first_count", { ascending: false })
      .order("element_count", { ascending: false })
      .order("craft_count", { ascending: false })
      .limit(20);
    if (error) throw error;
    renderRanking(data || [], true);
  } catch (e) {
    console.warn(e);
    renderRanking([item], false);
    if (!silent) toast("랭킹 연결 실패", "Supabase 설정 또는 RLS 정책을 확인하세요.");
  }
}

function renderRanking(rows, remote) {
  els.rankingNote.textContent = remote
    ? "전 세계 랭킹입니다. First Discovery가 많을수록 위에 표시됩니다."
    : "로컬 모드입니다. Supabase를 연결하면 전 세계 랭킹이 표시됩니다.";
  els.rankingList.innerHTML = rows.map((r, i) => `
    <div class="rank-item">
      <span class="rank-no">${i + 1}</span>
      <div>
        <div class="rank-name">${escapeHtml(r.player_name || "탐험가")}</div>
        <small>${Number(r.element_count || 0)}요소 · ${Number(r.craft_count || 0)}합성</small>
      </div>
      <div class="rank-score">🥇 ${Number(r.first_count || 0)}<br>First</div>
    </div>
  `).join("");
}

function resetSlots() {
  selected = { a: null, b: null };
  renderSlots();
}

function openNameModal() {
  els.playerNameInput.value = state.playerName || "";
  els.nameModal.classList.remove("hidden");
  setTimeout(() => els.playerNameInput.focus(), 50);
}
function closeNameModal() { els.nameModal.classList.add("hidden"); }
function saveName() {
  const clean = els.playerNameInput.value.trim().replace(/[<>]/g, "").slice(0, 18) || "탐험가";
  state.playerName = clean;
  saveState();
  closeNameModal();
  renderAll();
  updateRanking(true);
  toast("닉네임 저장", `${clean}(으)로 표시됩니다.`);
}

function copySetupGuide() {
  const text = `1. Supabase에서 새 프로젝트 만들기\n2. SQL Editor에 supabase.sql 내용 실행\n3. Project Settings → API에서 Project URL과 anon public key 복사\n4. app.js 상단 SUPABASE_CONFIG에 붙여넣기\n5. GitHub Pages에 index.html, styles.css, app.js 업로드`;
  navigator.clipboard?.writeText(text);
  toast("설정 방법 복사", "Supabase 연결 방법을 클립보드에 복사했습니다.");
}

function hardReset() {
  const ok = confirm("내 요소, 업적, 기록을 모두 삭제할까요? Supabase 서버 데이터는 삭제되지 않습니다.");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function burstParticles(symbols, x, y) {
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.textContent = symbols[i % symbols.length];
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 110;
    p.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    p.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 950);
  }
}

function toast(title, message, type = "") {
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.innerHTML = `<b>${escapeHtml(title)}</b><p>${escapeHtml(message)}</p>`;
  els.toastHost.appendChild(node);
  setTimeout(() => {
    node.style.opacity = "0";
    node.style.transform = "translateY(12px)";
    setTimeout(() => node.remove(), 250);
  }, 2800);
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function hashCode(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h | 0;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
}
