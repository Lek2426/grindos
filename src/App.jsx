import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKINCARE = [
  {
    title: "🌅 Morning Routine",
    color: "#FF6B35",
    id: "morning",
    items: [
      "Wash face with gentle foaming / salicylic face wash",
      "Apply Niacinamide serum (wait 2 mins)",
      "Apply oil-free gel moisturizer",
      "Apply Derma Co SPF 50 sunscreen (2 finger lengths)",
      "Shower with antibacterial body wash",
      "Scrub underarms with loofah",
      "Dry body completely before dressing",
      "Apply antiperspirant to dry underarms",
      "Wear cotton / moisture-wicking clothes",
    ],
  },
  {
    title: "☀️ During The Day",
    color: "#F7C948",
    id: "day",
    items: [
      "Reapply sunscreen every 2–3 hrs if outdoors",
      "Pat (don't rub) sweat with clean cloth",
      "Drink at least 3–4 litres of water",
      "Avoid touching face with hands",
      "Change clothes if heavily sweated",
    ],
  },
  {
    title: "🌙 Night Routine",
    color: "#7C6FED",
    id: "night",
    items: [
      "Wash face with face wash",
      "Apply Niacinamide serum",
      "Apply moisturizer",
      "Apply antiperspirant before bed (works better at night)",
      "Shower if sweated heavily during day",
    ],
  },
  {
    title: "📅 Weekly (2–3×)",
    color: "#2ECC71",
    id: "weekly",
    items: [
      "Oil hair with coconut/argan oil (night before wash)",
      "Wash hair with sulfate-free shampoo",
      "Apply leave-in conditioner or curl cream after wash",
      "Exfoliate face with BHA/salicylic exfoliant (1–2×)",
      "Use clay mask for oil control (1×)",
    ],
  },
];

const WORKOUT_DAYS = {
  Monday: {
    label: "💪 Push — Chest · Shoulders · Triceps",
    color: "#FF6B35",
    gym: [
      { exercise: "Barbell Bench Press", sets: "4", reps: "6–8", rest: "2–3 min", note: "Go heavy" },
      { exercise: "Overhead Press (BB/DB)", sets: "4", reps: "8", rest: "2 min", note: "Strict form" },
      { exercise: "Incline DB Press", sets: "3", reps: "10", rest: "90 sec", note: "Upper chest focus" },
      { exercise: "Cable Lateral Raises", sets: "3", reps: "15", rest: "60 sec", note: "Slow eccentric" },
      { exercise: "Tricep Rope Pushdown", sets: "3", reps: "12", rest: "60 sec", note: "Squeeze at bottom" },
      { exercise: "Overhead Tricep Extension", sets: "2", reps: "15", rest: "60 sec", note: "Superset above" },
    ],
    bodyweight: [
      { exercise: "Wide Push-ups", sets: "4", reps: "15–20", rest: "60 sec", note: "Chest squeeze" },
      { exercise: "Pike Push-ups", sets: "4", reps: "12", rest: "90 sec", note: "Shoulder focus" },
      { exercise: "Decline Push-ups", sets: "3", reps: "12", rest: "60 sec", note: "Upper chest" },
      { exercise: "Diamond Push-ups", sets: "3", reps: "12", rest: "60 sec", note: "Tricep focus" },
      { exercise: "Wall Handstand Hold", sets: "3", reps: "20s", rest: "60 sec", note: "Shoulder stability" },
      { exercise: "Tricep Bench Dips", sets: "2", reps: "15", rest: "60 sec", note: "Optional: add backpack" },
    ],
  },
  Tuesday: {
    label: "🔙 Pull — Back · Biceps",
    color: "#2E86C1",
    gym: [
      { exercise: "Deadlift", sets: "4", reps: "5", rest: "3 min", note: "Hinge, not squat" },
      { exercise: "Weighted Pull-ups / Lat PD", sets: "4", reps: "6–8", rest: "2 min", note: "Full ROM" },
      { exercise: "Barbell Bent-Over Row", sets: "3", reps: "8", rest: "2 min", note: "45° torso" },
      { exercise: "Seated Cable Row", sets: "3", reps: "12", rest: "90 sec", note: "Elbows tight" },
      { exercise: "Face Pulls", sets: "3", reps: "15", rest: "60 sec", note: "Rear delt + rotator cuff" },
      { exercise: "Barbell Curl", sets: "3", reps: "10", rest: "60 sec", note: "No swinging" },
      { exercise: "Hammer Curl", sets: "2", reps: "12", rest: "60 sec", note: "Brachialis" },
    ],
    bodyweight: [
      { exercise: "Pull-ups (pronated)", sets: "4", reps: "max", rest: "2 min", note: "Add weight if >12" },
      { exercise: "Australian Rows", sets: "4", reps: "12", rest: "90 sec", note: "Under a table" },
      { exercise: "Chin-ups (supinated)", sets: "3", reps: "8", rest: "2 min", note: "Bicep emphasis" },
      { exercise: "Doorframe Rows", sets: "3", reps: "15", rest: "60 sec", note: "Control descent" },
      { exercise: "Reverse Snow Angels", sets: "3", reps: "15", rest: "60 sec", note: "Rear delts" },
      { exercise: "Negative Pull-ups", sets: "2", reps: "6", rest: "2 min", note: "5s down" },
    ],
  },
  Wednesday: {
    label: "🦵 Legs + Core",
    color: "#8E44AD",
    gym: [
      { exercise: "Back Squat", sets: "4", reps: "6–8", rest: "3 min", note: "Below parallel" },
      { exercise: "Romanian Deadlift", sets: "3", reps: "10", rest: "2 min", note: "Feel the stretch" },
      { exercise: "Leg Press", sets: "3", reps: "12", rest: "90 sec", note: "Feet shoulder width" },
      { exercise: "Leg Curl", sets: "3", reps: "12", rest: "90 sec", note: "Hamstring peak" },
      { exercise: "Calf Raises", sets: "3", reps: "20", rest: "60 sec", note: "Pause at top" },
      { exercise: "Ab Wheel Rollout", sets: "3", reps: "10", rest: "60 sec", note: "Core braced" },
      { exercise: "Hanging Leg Raise", sets: "3", reps: "12", rest: "60 sec", note: "Tuck or straight" },
    ],
    bodyweight: [
      { exercise: "Jump Squats", sets: "4", reps: "12", rest: "90 sec", note: "Explosive" },
      { exercise: "Bulgarian Split Squats", sets: "4", reps: "10ea", rest: "2 min", note: "Rear foot elevated" },
      { exercise: "Single-Leg RDL", sets: "3", reps: "10ea", rest: "90 sec", note: "Balance + hamstring" },
      { exercise: "Glute Bridges", sets: "3", reps: "20", rest: "60 sec", note: "Pause at top" },
      { exercise: "Pistol Squat Progressions", sets: "3", reps: "5ea", rest: "90 sec", note: "Use support if needed" },
      { exercise: "Plank", sets: "3", reps: "45s", rest: "45 sec", note: "Posterior pelvic tilt" },
      { exercise: "Hollow Body Hold", sets: "3", reps: "30s", rest: "45 sec", note: "Lower back on floor" },
    ],
  },
  Thursday: {
    label: "💥 Upper Strength",
    color: "#E67E22",
    gym: [
      { exercise: "Weighted Pull-ups", sets: "4", reps: "5", rest: "3 min", note: "Heaviest of week" },
      { exercise: "DB Shoulder Press", sets: "4", reps: "8", rest: "2 min", note: "Neutral or pronated" },
      { exercise: "Cable Chest Fly", sets: "3", reps: "12", rest: "90 sec", note: "Constant tension" },
      { exercise: "Seated Row (V-bar)", sets: "3", reps: "10", rest: "90 sec", note: "Elbows to ribs" },
      { exercise: "EZ-Bar Curl", sets: "3", reps: "10", rest: "60 sec", note: "Easier on wrists" },
      { exercise: "Skull Crushers", sets: "3", reps: "12", rest: "60 sec", note: "Lower to forehead" },
      { exercise: "Lateral Raise Drop Set", sets: "2", reps: "15+15", rest: "45 sec", note: "Immediate drop" },
    ],
    bodyweight: [
      { exercise: "Archer Push-ups", sets: "4", reps: "8ea", rest: "2 min", note: "Unilateral press" },
      { exercise: "Pull-ups (close grip)", sets: "4", reps: "max", rest: "2 min", note: "Bicep emphasis" },
      { exercise: "Pike Push-ups (elevated)", sets: "3", reps: "10", rest: "90 sec", note: "Feet on chair" },
      { exercise: "Pseudo Planche Push-ups", sets: "3", reps: "8", rest: "90 sec", note: "Lean forward" },
      { exercise: "Commando Pull-ups", sets: "3", reps: "8", rest: "90 sec", note: "Rotate grip each rep" },
      { exercise: "Dips", sets: "3", reps: "12", rest: "90 sec", note: "Tricep + lower chest" },
    ],
  },
  Friday: {
    label: "⚡ Full Body Circuit",
    color: "#E74C3C",
    gym: [
      { exercise: "Deadlift", sets: "3", reps: "5", rest: "2 min", note: "Heavy, crisp" },
      { exercise: "DB Thrusters", sets: "3", reps: "12", rest: "60 sec", note: "Squat + press" },
      { exercise: "KB Swings", sets: "3", reps: "15", rest: "45 sec", note: "Hip hinge power" },
      { exercise: "Barbell Complex", sets: "3", reps: "6ea", rest: "90 sec", note: "RDL→Row→Clean→Squat→Press" },
      { exercise: "Battle Ropes / Row Erg", sets: "3", reps: "30s", rest: "45 sec", note: "Max effort" },
      { exercise: "Farmer Carry", sets: "3", reps: "25m", rest: "60 sec", note: "Heavy DBs" },
    ],
    bodyweight: [
      { exercise: "Burpees", sets: "3", reps: "10", rest: "60 sec", note: "Full extension at top" },
      { exercise: "Jump Squats", sets: "3", reps: "15", rest: "45 sec", note: "Arms overhead" },
      { exercise: "Mountain Climbers", sets: "3", reps: "20ea", rest: "45 sec", note: "Fast pace" },
      { exercise: "Plyometric Push-ups", sets: "3", reps: "10", rest: "60 sec", note: "Explosive" },
      { exercise: "Sprint in Place", sets: "3", reps: "30s", rest: "30 sec", note: "Max effort" },
      { exercise: "Bear Crawl", sets: "3", reps: "15m", rest: "45 sec", note: "Hips level" },
    ],
  },
  Saturday: {
    label: "🚶 Active Recovery",
    color: "#2ECC71",
    gym: [],
    bodyweight: [],
    rest: true,
    restItems: [
      "20–30 min brisk walk or light cycling",
      "Light stretching or yoga",
      "Foam roll sore muscles",
      "Meal prep for the week",
      "Review next week's workout plan",
    ],
  },
  Sunday: {
    label: "😴 Full Rest",
    color: "#7C6FED",
    gym: [],
    bodyweight: [],
    rest: true,
    restItems: [
      "Sleep 7–9 hours",
      "Hydrate well (3–4L water)",
      "Light walk if feeling restless",
      "Plan your week ahead",
      "Review progress photos / measurements",
    ],
  },
};

const STUDY_WEEKS = [
  {
    week: 1,
    theme: "Build the Foundation",
    color: "#2ECC71",
    tasks: [
      { category: "💻 Coding", task: "Install Python, VS Code, Git — set up environment" },
      { category: "💻 Coding", task: "Complete GitHub intro exercise (github.com/skills)" },
      { category: "💻 Coding", task: "Push first project (Calculator) to GitHub ✅" },
      { category: "🎓 Course", task: "Start CS50P Week 1 — Variables & Functions" },
      { category: "🌍 Language", task: "Download Duolingo — complete Day 1" },
      { category: "📖 Finance", task: "Start The Psychology of Money — 10 pages/day" },
      { category: "📝 Poetry", task: "Read 1 poem today (try Rumi or Robert Frost)" },
      { category: "💼 Career", task: "Create LinkedIn profile with photo and bio" },
      { category: "💼 Career", task: "Create Internshala profile" },
    ],
  },
  {
    week: 2,
    theme: "Get Into Rhythm",
    color: "#3498DB",
    tasks: [
      { category: "💻 Coding", task: "Build Number Guessing Game — push to GitHub" },
      { category: "💻 Coding", task: "Build To-Do List app — push to GitHub" },
      { category: "🎓 Course", task: "CS50P Week 2 — Loops & Conditionals" },
      { category: "🌍 Language", task: "Maintain Duolingo streak — 15 mins/day" },
      { category: "📖 Finance", task: "Finish The Psychology of Money" },
      { category: "📝 Poetry", task: "Write your first 4-line poem (anything!)" },
      { category: "💼 Career", task: "Apply to 2–3 internships daily on Internshala" },
      { category: "🏥 Health", task: "Start tracking protein intake (target 100–120g/day)" },
    ],
  },
  {
    week: 3,
    theme: "Level Up",
    color: "#9B59B6",
    tasks: [
      { category: "💻 Coding", task: "Build Quiz Game — push to GitHub" },
      { category: "💻 Coding", task: "Learn DSA basics — arrays & strings" },
      { category: "🎓 Course", task: "CS50P Week 3 — Functions & Libraries" },
      { category: "💻 Coding", task: "Solve 1 LeetCode Easy problem per day" },
      { category: "🌍 Language", task: "Watch 1 YouTube video in target language" },
      { category: "📝 Poetry", task: "Write a poem combining finance + life themes" },
      { category: "💼 Career", task: "Follow up on internship applications" },
      { category: "💼 Career", task: "Ask college seniors about internship referrals" },
    ],
  },
  {
    week: 4,
    theme: "Momentum",
    color: "#E67E22",
    tasks: [
      { category: "💻 Coding", task: "Build Password Generator — push to GitHub" },
      { category: "💻 Coding", task: "Start HTML + CSS basics" },
      { category: "🎓 Course", task: "CS50P Week 4 — Exceptions & File I/O" },
      { category: "💼 Career", task: "Build portfolio page with HTML/CSS" },
      { category: "💼 Career", task: "Host portfolio on GitHub Pages (free!)" },
      { category: "🌍 Language", task: "Hit 30-day language streak on Duolingo" },
      { category: "📖 Finance", task: "Start a finance journal — track daily spending" },
      { category: "💼 Career", task: "Revamp Internshala profile — add GitHub link" },
    ],
  },
  {
    week: 5,
    theme: "Go Deeper",
    color: "#E74C3C",
    tasks: [
      { category: "💻 Coding", task: "Build Weather App using an API — push to GitHub" },
      { category: "💻 Coding", task: "Learn JavaScript basics (variables, functions, DOM)" },
      { category: "🎓 Course", task: "CS50P Week 5 — Unit Tests" },
      { category: "💻 Coding", task: "Add 3rd project to GitHub with full README" },
      { category: "🌍 Language", task: "Watch a show/video in target language" },
      { category: "📝 Poetry", task: "Write a longer poem (8–12 lines)" },
      { category: "💼 Career", task: "Apply on Wellfound (AngelList) for startup internships" },
      { category: "💼 Career", task: "Apply for GitHub Student Developer Pack" },
    ],
  },
  {
    week: 6,
    theme: "Polish & Reflect",
    color: "#FF6B35",
    tasks: [
      { category: "💻 Coding", task: "Clean up all GitHub repos — add proper READMEs" },
      { category: "💻 Coding", task: "Build one more project of your choice" },
      { category: "🎓 Course", task: "Complete CS50P final project — submit for certificate" },
      { category: "🏥 Health", task: "Take progress photos — compare to Week 1" },
      { category: "🌍 Language", task: "Take a Duolingo proficiency test" },
      { category: "📝 Poetry", task: "Share a poem with someone you trust" },
      { category: "💼 Career", task: "Update LinkedIn with all new projects + certs" },
      { category: "🔮 Reflect", task: "Plan what to continue after holidays — make a schedule" },
    ],
  },
];


const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const today = new Date();
  const dayName = DAYS_OF_WEEK[today.getDay() === 0 ? 6 : today.getDay() - 1];
  const dateStr = today.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const [tab, setTab] = useState("today");
  const [workoutDay, setWorkoutDay] = useState(dayName);
  const [gymMode, setGymMode] = useState(true);
  const [studyWeek, setStudyWeek] = useState(1);
  const [checked, setChecked] = useState({});
  const [completedSets, setCompletedSets] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);

  const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }));
  const toggleSet = (key) => setCompletedSets(p => ({ ...p, [key]: !p[key] }));

  // Total progress for today
  const skinTotal = SKINCARE.reduce((a, s) => a + s.items.length, 0);
  const skinDone = SKINCARE.reduce((a, s) => a + s.items.filter(i => checked[`skin_${i}`]).length, 0);
  const studyTotal = STUDY_WEEKS[0].tasks.length;
  const studyDone = STUDY_WEEKS[0].tasks.filter((t, i) => checked[`study_1_${i}`]).length;
  const totalToday = skinTotal + studyTotal;
  const doneToday = skinDone + studyDone;
  const pct = Math.round((doneToday / totalToday) * 100);

  const tabs = [
    { id: "today", label: "Today", icon: "🏠" },
    { id: "skincare", label: "Shell", icon: "🛡️" },
    { id: "workout", label: "Train", icon: "💪" },
    { id: "study", label: "Study", icon: "📚" },
  ];

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#080B10",
      minHeight: "100vh",
      color: "#E8E0D0",
      maxWidth: 430,
      margin: "0 auto",
      paddingBottom: 80,
    }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0D1117 0%, #161B22 100%)",
        padding: "24px 20px 16px",
        borderBottom: "1px solid #21262D",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, color: "#7C8491", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
              {dateStr.split(",")[0].toUpperCase()}
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: "2px 0 0", letterSpacing: -0.5, color: "#FF6B35", fontFamily: "'Georgia', serif" }}>
              GrindOS
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: pct === 100 ? "#2ECC71" : "#FF6B35", fontFamily: "monospace" }}>
              {pct}%
            </div>
            <div style={{ fontSize: 10, color: "#7C8491" }}>today</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 12, background: "#21262D", borderRadius: 99, height: 4 }}>
          <div style={{
            width: `${pct}%`, height: 4, borderRadius: 99,
            background: "linear-gradient(90deg, #FF6B35, #F7C948)",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 0 20px" }}>

        {/* TODAY TAB */}
        {tab === "today" && (
          <div style={{ padding: "20px 16px 0" }}>
            <div style={{
              background: "#0D1117",
              border: "1px solid #21262D",
              borderRadius: 16,
              padding: "16px",
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: "#7C8491", marginBottom: 4 }}>
                {dateStr}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#E8E0D0" }}>
                Today is <span style={{ color: WORKOUT_DAYS[dayName]?.color }}>{dayName}</span>
              </div>
              <div style={{ fontSize: 13, color: "#7C8491", marginTop: 4 }}>
                {WORKOUT_DAYS[dayName]?.label}
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Skincare", done: skinDone, total: skinTotal, color: "#FF6B35", icon: "✨" },
                { label: "Study", done: studyDone, total: studyTotal, color: "#7C6FED", icon: "📚" },
                { label: "Workout", done: 0, total: (gymMode ? WORKOUT_DAYS[workoutDay]?.gym : WORKOUT_DAYS[workoutDay]?.bodyweight)?.length || 0, color: "#2ECC71", icon: "💪" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "#0D1117", border: "1px solid #21262D",
                  borderRadius: 12, padding: "12px 10px", textAlign: "center"
                }}>
                  <div style={{ fontSize: 18 }}>{s.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: s.color, fontFamily: "monospace", marginTop: 4 }}>
                    {s.done}/{s.total}
                  </div>
                  <div style={{ fontSize: 10, color: "#7C8491", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Cutting rules reminder */}
            <div style={{
              background: "#0D1117", border: "1px solid #21262D",
              borderRadius: 14, padding: 16, marginBottom: 16
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#F7C948", marginBottom: 10 }}>
                ⚡ Cutting Rules — Daily Reminders
              </div>
              {[
                { icon: "🥩", text: "Hit protein: 0.8–1g per lb bodyweight" },
                { icon: "💧", text: "Drink 3–4L water today" },
                { icon: "😴", text: "Sleep 7–9 hours tonight" },
                { icon: "⚖️", text: "Weigh in tomorrow morning (after bathroom, before eating)" },
                { icon: "📉", text: "Stay in 300–500 kcal deficit" },
              ].map((r, i) => (
                <div key={i} onClick={() => toggle(`rule_${i}`)} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", cursor: "pointer",
                  borderBottom: i < 4 ? "1px solid #161B22" : "none",
                  opacity: checked[`rule_${i}`] ? 0.4 : 1,
                }}>
                  <span style={{ fontSize: 16 }}>{r.icon}</span>
                  <span style={{
                    fontSize: 13, color: checked[`rule_${i}`] ? "#555" : "#E8E0D0",
                    textDecoration: checked[`rule_${i}`] ? "line-through" : "none",
                  }}>{r.text}</span>
                </div>
              ))}
            </div>

            {/* Motivational */}
            <div style={{
              background: "linear-gradient(135deg, #1a0a00, #0a0a1a)",
              border: "1px solid #FF6B3530",
              borderRadius: 14, padding: "14px 16px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: 12, color: "#FF6B35", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
                Day {Math.ceil((today - new Date("2026-06-06")) / 86400000) + 1} of 42
              </div>
              <div style={{ fontSize: 14, color: "#E8E0D0", marginTop: 6, fontStyle: "italic" }}>
                "Until you're dead, all failure is psychological."
              </div>
            </div>
          </div>
        )}

        {/* SKINCARE TAB */}
        {tab === "skincare" && (
          <div style={{ padding: "20px 16px 0" }}>
            <div style={{ fontSize: 13, color: "#7C8491", marginBottom: 16, fontFamily: "monospace" }}>
              {skinDone}/{skinTotal} COMPLETED TODAY
            </div>
            {SKINCARE.map((section) => {
              const done = section.items.filter(i => checked[`skin_${i}`]).length;
              const isOpen = expandedSection === section.id;
              return (
                <div key={section.id} style={{
                  background: "#0D1117",
                  border: `1px solid ${isOpen ? section.color + "60" : "#21262D"}`,
                  borderRadius: 14, marginBottom: 12, overflow: "hidden",
                }}>
                  <div
                    onClick={() => setExpandedSection(isOpen ? null : section.id)}
                    style={{
                      padding: "14px 16px",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: section.color }}>{section.title}</div>
                      <div style={{ fontSize: 11, color: "#7C8491", marginTop: 2 }}>{done}/{section.items.length} done</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ background: "#161B22", borderRadius: 99, height: 6, width: 60 }}>
                        <div style={{
                          width: `${(done / section.items.length) * 100}%`, height: 6,
                          background: section.color, borderRadius: 99, transition: "width 0.3s"
                        }} />
                      </div>
                      <span style={{ color: "#7C8491", fontSize: 12 }}>{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: "1px solid #21262D" }}>
                      {section.items.map((item, i) => (
                        <div
                          key={item}
                          onClick={() => toggle(`skin_${item}`)}
                          style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "11px 16px", cursor: "pointer",
                            background: checked[`skin_${item}`] ? "#0a1a0a" : "transparent",
                            borderBottom: i < section.items.length - 1 ? "1px solid #161B22" : "none",
                          }}
                        >
                          <div style={{
                            width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                            border: `2px solid ${checked[`skin_${item}`] ? section.color : "#333"}`,
                            background: checked[`skin_${item}`] ? section.color : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                          }}>
                            {checked[`skin_${item}`] && (
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span style={{
                            fontSize: 13, lineHeight: 1.4,
                            color: checked[`skin_${item}`] ? "#444" : "#C8C0B0",
                            textDecoration: checked[`skin_${item}`] ? "line-through" : "none",
                            transition: "all 0.2s",
                          }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* WORKOUT TAB */}
        {tab === "workout" && (
          <div style={{ padding: "20px 16px 0" }}>
            {/* Day selector */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
              {DAYS_OF_WEEK.map(d => (
                <button key={d} onClick={() => setWorkoutDay(d)} style={{
                  padding: "6px 12px", borderRadius: 99, border: "none", cursor: "pointer",
                  background: workoutDay === d ? WORKOUT_DAYS[d].color : "#161B22",
                  color: workoutDay === d ? "#fff" : "#7C8491",
                  fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
                  fontFamily: "monospace", letterSpacing: 0.5,
                  transition: "all 0.2s",
                }}>
                  {d.slice(0, 3).toUpperCase()}
                </button>
              ))}
            </div>

            {/* Day header */}
            <div style={{
              background: "#0D1117",
              border: `1px solid ${WORKOUT_DAYS[workoutDay].color}40`,
              borderRadius: 14, padding: "14px 16px", marginBottom: 16,
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: WORKOUT_DAYS[workoutDay].color }}>
                {WORKOUT_DAYS[workoutDay].label}
              </div>
              {!WORKOUT_DAYS[workoutDay].rest && (
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => setGymMode(true)} style={{
                    padding: "6px 14px", borderRadius: 99, border: "none", cursor: "pointer",
                    background: gymMode ? WORKOUT_DAYS[workoutDay].color : "#161B22",
                    color: gymMode ? "#fff" : "#7C8491", fontSize: 12, fontWeight: 600,
                  }}>🏋️ Gym</button>
                  <button onClick={() => setGymMode(false)} style={{
                    padding: "6px 14px", borderRadius: 99, border: "none", cursor: "pointer",
                    background: !gymMode ? WORKOUT_DAYS[workoutDay].color : "#161B22",
                    color: !gymMode ? "#fff" : "#7C8491", fontSize: 12, fontWeight: 600,
                  }}>🏠 Bodyweight</button>
                </div>
              )}
            </div>

            {/* Rest day */}
            {WORKOUT_DAYS[workoutDay].rest ? (
              <div>
                {WORKOUT_DAYS[workoutDay].restItems.map((item, i) => (
                  <div key={i} onClick={() => toggle(`rest_${workoutDay}_${i}`)} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: "#0D1117", border: "1px solid #21262D",
                    borderRadius: 12, padding: "13px 16px", marginBottom: 8,
                    cursor: "pointer",
                    opacity: checked[`rest_${workoutDay}_${i}`] ? 0.4 : 1,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      border: `2px solid ${checked[`rest_${workoutDay}_${i}`] ? WORKOUT_DAYS[workoutDay].color : "#333"}`,
                      background: checked[`rest_${workoutDay}_${i}`] ? WORKOUT_DAYS[workoutDay].color : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {checked[`rest_${workoutDay}_${i}`] && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{
                      fontSize: 13, color: checked[`rest_${workoutDay}_${i}`] ? "#444" : "#C8C0B0",
                      textDecoration: checked[`rest_${workoutDay}_${i}`] ? "line-through" : "none",
                    }}>{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              /* Exercise table */
              <div>
                {(gymMode ? WORKOUT_DAYS[workoutDay].gym : WORKOUT_DAYS[workoutDay].bodyweight).map((ex, i) => {
                  const key = `ex_${workoutDay}_${gymMode}_${i}`;
                  const done = checked[key];
                  return (
                    <div key={i} onClick={() => toggle(key)} style={{
                      background: done ? "#0a1a0a" : "#0D1117",
                      border: `1px solid ${done ? WORKOUT_DAYS[workoutDay].color + "60" : "#21262D"}`,
                      borderRadius: 12, padding: "13px 16px", marginBottom: 8,
                      cursor: "pointer", transition: "all 0.2s",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                          border: `2px solid ${done ? WORKOUT_DAYS[workoutDay].color : "#333"}`,
                          background: done ? WORKOUT_DAYS[workoutDay].color : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>
                          {done && (
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 14, fontWeight: 600,
                            color: done ? "#444" : "#E8E0D0",
                            textDecoration: done ? "line-through" : "none",
                          }}>{ex.exercise}</div>
                          <div style={{ display: "flex", gap: 12, marginTop: 5, flexWrap: "wrap" }}>
                            {[
                              { label: "Sets", val: ex.sets },
                              { label: "Reps", val: ex.reps },
                              { label: "Rest", val: ex.rest },
                            ].map(d => (
                              <div key={d.label} style={{
                                background: "#161B22", borderRadius: 6,
                                padding: "3px 8px", display: "flex", gap: 4, alignItems: "center",
                              }}>
                                <span style={{ fontSize: 10, color: "#7C8491" }}>{d.label}</span>
                                <span style={{ fontSize: 11, color: WORKOUT_DAYS[workoutDay].color, fontWeight: 700, fontFamily: "monospace" }}>
                                  {d.val}
                                </span>
                              </div>
                            ))}
                          </div>
                          {ex.note && (
                            <div style={{ fontSize: 11, color: "#7C8491", marginTop: 5, fontStyle: "italic" }}>
                              💡 {ex.note}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* STUDY TAB */}
        {tab === "study" && (
          <div style={{ padding: "20px 16px 0" }}>
            {/* Week selector */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {STUDY_WEEKS.map(w => (
                <button key={w.week} onClick={() => setStudyWeek(w.week)} style={{
                  padding: "6px 14px", borderRadius: 99, border: "none", cursor: "pointer",
                  background: studyWeek === w.week ? w.color : "#161B22",
                  color: studyWeek === w.week ? "#fff" : "#7C8491",
                  fontSize: 12, fontWeight: 600, fontFamily: "monospace",
                  transition: "all 0.2s",
                }}>
                  W{w.week}
                </button>
              ))}
            </div>

            {STUDY_WEEKS.filter(w => w.week === studyWeek).map(week => {
              const done = week.tasks.filter((_, i) => checked[`study_${week.week}_${i}`]).length;
              return (
                <div key={week.week}>
                  <div style={{
                    background: "#0D1117",
                    border: `1px solid ${week.color}40`,
                    borderRadius: 14, padding: "14px 16px", marginBottom: 16,
                  }}>
                    <div style={{ fontSize: 11, color: "#7C8491", fontFamily: "monospace", letterSpacing: 1 }}>
                      WEEK {week.week} OF 6
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: week.color, marginTop: 2 }}>
                      {week.theme}
                    </div>
                    <div style={{ fontSize: 12, color: "#7C8491", marginTop: 4 }}>
                      {done}/{week.tasks.length} tasks completed
                    </div>
                    <div style={{ background: "#21262D", borderRadius: 99, height: 4, marginTop: 8 }}>
                      <div style={{
                        width: `${(done / week.tasks.length) * 100}%`, height: 4,
                        background: week.color, borderRadius: 99, transition: "width 0.3s",
                      }} />
                    </div>
                  </div>

                  {/* Group by category */}
                  {["💻 Coding", "🎓 Course", "💼 Career", "🌍 Language", "📖 Finance", "📝 Poetry", "🏥 Health", "🔮 Reflect"].map(cat => {
                    const catTasks = week.tasks.map((t, i) => ({ ...t, idx: i })).filter(t => t.category === cat);
                    if (catTasks.length === 0) return null;
                    return (
                      <div key={cat} style={{ marginBottom: 16 }}>
                        <div style={{
                          fontSize: 11, color: "#7C8491", fontFamily: "monospace",
                          letterSpacing: 1.5, marginBottom: 8, paddingLeft: 4,
                        }}>
                          {cat.toUpperCase()}
                        </div>
                        {catTasks.map(task => {
                          const key = `study_${week.week}_${task.idx}`;
                          return (
                            <div key={task.idx} onClick={() => toggle(key)} style={{
                              display: "flex", alignItems: "flex-start", gap: 12,
                              background: checked[key] ? "#0a1a0a" : "#0D1117",
                              border: `1px solid ${checked[key] ? week.color + "50" : "#21262D"}`,
                              borderRadius: 12, padding: "12px 14px", marginBottom: 6,
                              cursor: "pointer", transition: "all 0.2s",
                            }}>
                              <div style={{
                                width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                                border: `2px solid ${checked[key] ? week.color : "#333"}`,
                                background: checked[key] ? week.color : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.2s",
                              }}>
                                {checked[key] && (
                                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span style={{
                                fontSize: 13, lineHeight: 1.5,
                                color: checked[key] ? "#444" : "#C8C0B0",
                                textDecoration: checked[key] ? "line-through" : "none",
                                transition: "all 0.2s",
                              }}>
                                {task.task}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "#0D1117",
        borderTop: "1px solid #21262D",
        display: "flex", justifyContent: "space-around",
        padding: "10px 0 14px",
        zIndex: 100,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            padding: "4px 10px",
          }}>
            <span style={{ fontSize: 20, filter: tab === t.id ? "none" : "grayscale(1) opacity(0.4)" }}>
              {t.icon}
            </span>
            <span style={{
              fontSize: 10, fontFamily: "monospace", letterSpacing: 0.5,
              color: tab === t.id ? "#FF6B35" : "#7C8491",
              fontWeight: tab === t.id ? 700 : 400,
            }}>
              {t.label.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
