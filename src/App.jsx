import { useState } from "react";

const TOTAL_WEEKS = 18;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_TYPES = ["Fat Burn", "Active Rest", "Calisthenics", "Fat Burn", "Calisthenics", "Fat Burn", "Rest"];

const getPhase = (week) => {
  if (week <= 6) return 1;
  if (week <= 12) return 2;
  return 3;
};

const PHASE_INFO = {
  1: { label: "Phase 1: Foundation", weeks: "Weeks 1–6", color: "#FF6B35", desc: "Build the habit, nail form, modified moves are encouraged" },
  2: { label: "Phase 2: Build", weeks: "Weeks 7–12", color: "#4ECDC4", desc: "Increase intensity, full versions of every move, reduce rest" },
  3: { label: "Phase 3: Perform", weeks: "Weeks 13–18", color: "#A8E063", desc: "Advanced calisthenics skills, max effort, athletic conditioning" },
};

const weeklySchedule = [
  { day: "Monday",    type: "Fat Burn",     color: "#FF6B35", emoji: "🔥", focus: { 1: "Full Body HIIT",       2: "HIIT Intervals",        3: "Max Effort HIIT" } },
  { day: "Tuesday",   type: "Active Rest",  color: "#4ECDC4", emoji: "🧘", focus: { 1: "Walk + Stretch",        2: "Walk + Mobility",       3: "Active Recovery" } },
  { day: "Wednesday", type: "Calisthenics", color: "#A8E063", emoji: "💪", focus: { 1: "Upper Body Push",       2: "Push + Pull Combos",    3: "Upper Body Skills" } },
  { day: "Thursday",  type: "Fat Burn",     color: "#FF6B35", emoji: "🔥", focus: { 1: "Cardio Circuits",       2: "Cardio + Strength",     3: "Conditioning Circuits" } },
  { day: "Friday",    type: "Calisthenics", color: "#A8E063", emoji: "💪", focus: { 1: "Lower Body + Core",     2: "Lower Body Power",      3: "Core Skills + Legs" } },
  { day: "Saturday",  type: "Fat Burn",     color: "#FF6B35", emoji: "🔥", focus: { 1: "Full Body Burnout",     2: "Full Body Power",       3: "Peak Performance" } },
  { day: "Sunday",    type: "Rest",         color: "#B0BEC5", emoji: "😴", focus: { 1: "Full Recovery",         2: "Full Recovery",         3: "Full Recovery" } },
];

const workouts = {
  Monday: {
    warmup: [
      { name: "Jumping Jacks", sets: "2", reps: "30 sec", tip: "Keep a steady rhythm" },
      { name: "Arm Circles", sets: "2", reps: "15 each dir", tip: "Big circles, loosen shoulders" },
      { name: "Hip Circles", sets: "2", reps: "10 each dir", tip: "Hands on hips, full rotation" },
    ],
    main: {
      1: [
        { name: "Bodyweight Squats", sets: "3", reps: "15", tip: "Knees track over toes, sit back" },
        { name: "Push-Ups (knee OK)", sets: "3", reps: "10", tip: "Knees down is perfectly fine for now" },
        { name: "Mountain Climbers", sets: "3", reps: "20 sec", tip: "Keep hips level, drive knees in" },
        { name: "Glute Bridges", sets: "3", reps: "15", tip: "Squeeze glutes at the top, hold 1 sec" },
        { name: "High Knees", sets: "3", reps: "30 sec", tip: "Pump arms, land softly" },
      ],
      2: [
        { name: "Jump Squats", sets: "4", reps: "12", tip: "Land soft with bent knees — explode up!" },
        { name: "Full Push-Ups", sets: "4", reps: "12", tip: "No knee support now — full plank throughout" },
        { name: "Mountain Climbers", sets: "4", reps: "30 sec", tip: "Faster pace, keep hips down" },
        { name: "Single-Leg Glute Bridge", sets: "3", reps: "12 each", tip: "Other leg extended — much harder!" },
        { name: "High Knees Sprint", sets: "4", reps: "40 sec", tip: "Max speed — pump those arms" },
        { name: "Plank to Downdog", sets: "3", reps: "10", tip: "Flow between positions, controlled breathing" },
      ],
      3: [
        { name: "Squat Jumps 180°", sets: "4", reps: "10", tip: "Jump and rotate — land facing opposite direction" },
        { name: "Explosive Push-Ups", sets: "4", reps: "10", tip: "Push hard enough to lift hands off floor" },
        { name: "Mountain Climbers", sets: "4", reps: "45 sec", tip: "Sprint pace — this is cardio now" },
        { name: "Nordic Hamstring Curl", sets: "3", reps: "8", tip: "Kneel, anchor feet under couch, lower slowly" },
        { name: "Tabata High Knees", sets: "8", reps: "20 sec on / 10 off", tip: "Full 4-minute Tabata — push every round" },
        { name: "Burpee to Tuck Jump", sets: "3", reps: "10", tip: "At the top of your burpee, add a tuck jump" },
      ],
    },
    cooldown: [
      { name: "Standing Quad Stretch", sets: "1", reps: "30 sec each", tip: "Use wall for balance" },
      { name: "Child's Pose", sets: "1", reps: "45 sec", tip: "Breathe deeply, melt into the floor" },
      { name: "Cat-Cow Stretch", sets: "1", reps: "8 reps", tip: "Slow and controlled breathing" },
    ],
  },

  Tuesday: {
    warmup: [],
    main: {
      1: [
        { name: "20-30 min Brisk Walk", sets: "1", reps: "20-30 min", tip: "Pace where you can talk but feel slightly breathless" },
        { name: "Standing Forward Fold", sets: "2", reps: "45 sec", tip: "Bend knees slightly if needed" },
        { name: "Seated Spinal Twist", sets: "2", reps: "30 sec each", tip: "Sit tall, twist from the waist" },
        { name: "Pigeon Pose (modified)", sets: "2", reps: "45 sec each", tip: "Great for hip flexibility" },
        { name: "Diaphragmatic Breathing", sets: "1", reps: "5 min", tip: "Inhale 4 counts, hold 4, exhale 6" },
      ],
      2: [
        { name: "30-40 min Brisk Walk/Jog", sets: "1", reps: "30-40 min", tip: "Mix walking and jogging intervals if ready" },
        { name: "World's Greatest Stretch", sets: "2", reps: "5 each side", tip: "Lunge + rotation — opens everything" },
        { name: "Pigeon Pose", sets: "2", reps: "60 sec each", tip: "Sink deeper than before" },
        { name: "Thoracic Rotations", sets: "2", reps: "10 each side", tip: "Opens upper back stiffness from push work" },
        { name: "Box Breathing", sets: "1", reps: "5 min", tip: "4 in, 4 hold, 4 out, 4 hold" },
      ],
      3: [
        { name: "30 min Easy Jog", sets: "1", reps: "30 min", tip: "Conversational pace — true active recovery" },
        { name: "Hip 90/90 Stretch", sets: "2", reps: "90 sec each side", tip: "Sit in 90/90, lean over front shin" },
        { name: "Loaded Beast to Downdog", sets: "2", reps: "10", tip: "Ground-based mobility flow — great for wrists" },
        { name: "Shoulder CARs", sets: "2", reps: "5 each side", tip: "Controlled Articular Rotations — full shoulder circles" },
        { name: "Meditation / Breathing", sets: "1", reps: "10 min", tip: "Nervous system reset — you need this in Phase 3" },
      ],
    },
    cooldown: [],
  },

  Wednesday: {
    warmup: [
      { name: "Shoulder Rolls", sets: "2", reps: "10 each dir", tip: "Slow and deliberate" },
      { name: "Wrist Circles", sets: "2", reps: "10 each dir", tip: "Important before push work" },
      { name: "Arm Swings", sets: "2", reps: "15", tip: "Cross-body and overhead" },
    ],
    main: {
      1: [
        { name: "Push-Ups (knee OK)", sets: "3", reps: "8-12", tip: "This is your calisthenics foundation!" },
        { name: "Pike Push-Ups", sets: "3", reps: "8", tip: "Hips high, lower head toward floor — shoulders!" },
        { name: "Tricep Dips (chair)", sets: "3", reps: "10", tip: "Elbows pointing back, not outward" },
        { name: "Plank Hold", sets: "3", reps: "20-30 sec", tip: "Straight line head to heels — core tight!" },
        { name: "Diamond Push-Ups", sets: "2", reps: "6-8", tip: "Hands close together — intense tricep burn" },
      ],
      2: [
        { name: "Full Push-Ups", sets: "4", reps: "15", tip: "No pause at top — keep tension throughout" },
        { name: "Wide Push-Ups", sets: "3", reps: "12", tip: "Hands wider than shoulders — chest focus" },
        { name: "Pike Push-Ups", sets: "4", reps: "10", tip: "Working toward handstand push-ups!" },
        { name: "Tricep Dips", sets: "4", reps: "15", tip: "Go lower for bigger range of motion" },
        { name: "Plank Hold", sets: "3", reps: "45 sec", tip: "Squeeze glutes too — full body tension" },
        { name: "Archer Push-Up", sets: "3", reps: "6 each side", tip: "Shift weight to one arm — proto one-arm push-up!" },
      ],
      3: [
        { name: "Pseudo Planche Push-Ups", sets: "4", reps: "10", tip: "Lean forward over hands — insane shoulder activation" },
        { name: "Decline Push-Ups (feet elevated)", sets: "4", reps: "12", tip: "Feet on chair — upper chest and shoulders" },
        { name: "Handstand Wall Hold", sets: "3", reps: "20-30 sec", tip: "Kick up to wall, arms locked, push through shoulders" },
        { name: "Diamond Push-Ups", sets: "4", reps: "12", tip: "Close grip — tricep strength for future dips" },
        { name: "Planche Lean", sets: "3", reps: "20 sec", tip: "Lean forward in push-up position — straight arm strength" },
        { name: "L-Sit Hold (floor)", sets: "3", reps: "10-15 sec", tip: "Hands on floor, compress core, lift hips" },
      ],
    },
    cooldown: [
      { name: "Doorway Chest Stretch", sets: "1", reps: "30 sec", tip: "Arms at 90°, lean forward gently" },
      { name: "Tricep Overhead Stretch", sets: "1", reps: "30 sec each", tip: "Pull elbow behind head" },
      { name: "Thread the Needle", sets: "1", reps: "30 sec each side", tip: "Opens chest and upper back" },
    ],
  },

  Thursday: {
    warmup: [
      { name: "March in Place", sets: "2", reps: "1 min", tip: "High knees, swing arms" },
      { name: "Leg Swings", sets: "2", reps: "10 each leg", tip: "Hold wall for balance, front to back" },
    ],
    main: {
      1: [
        { name: "Modified Burpees", sets: "3", reps: "8", tip: "Step back instead of jumping — still effective!" },
        { name: "Lateral Shuffles", sets: "3", reps: "30 sec", tip: "Low squat position, stay light on feet" },
        { name: "Jump Rope (or imaginary)", sets: "3", reps: "45 sec", tip: "Even without rope, the movement burns!" },
        { name: "Squat Jumps", sets: "3", reps: "10", tip: "Land softly with bent knees" },
        { name: "Skaters", sets: "3", reps: "20 sec", tip: "Side-to-side leap — great for inner thighs" },
      ],
      2: [
        { name: "Full Burpees", sets: "4", reps: "10", tip: "Jump back AND jump up — full power version" },
        { name: "Lateral Shuffles", sets: "4", reps: "40 sec", tip: "Stay low throughout — burn that fat!" },
        { name: "Jump Rope", sets: "4", reps: "60 sec", tip: "Try double-unders if you can" },
        { name: "Broad Jump + Walk Back", sets: "3", reps: "8", tip: "Explode forward, walk back to reset" },
        { name: "Skaters", sets: "4", reps: "30 sec", tip: "Pause and balance on each leg" },
        { name: "Squat to Overhead Reach", sets: "3", reps: "15", tip: "Squat down, explode up and reach arms overhead" },
      ],
      3: [
        { name: "Burpee to Broad Jump", sets: "4", reps: "8", tip: "After standing, immediately broad jump forward" },
        { name: "Lateral Bound", sets: "4", reps: "40 sec", tip: "Single-leg landing — absorb impact with bent knee" },
        { name: "Double-Under Jump Rope", sets: "4", reps: "60 sec", tip: "Or 3x single-unders if still working on doubles" },
        { name: "Box Jump (couch/step)", sets: "4", reps: "10", tip: "Land quietly — step down, never jump down" },
        { name: "Sprint Intervals", sets: "6", reps: "20 sec on / 10 off", tip: "All-out effort — Tabata sprints" },
      ],
    },
    cooldown: [
      { name: "Standing Hamstring Stretch", sets: "1", reps: "30 sec each", tip: "Hinge at hips, flat back" },
      { name: "Low Lunge Hip Flexor", sets: "1", reps: "45 sec each side", tip: "Sink hips toward floor" },
    ],
  },

  Friday: {
    warmup: [
      { name: "Hip Openers", sets: "2", reps: "10 each side", tip: "Draw big circles with your knee" },
      { name: "Ankle Rolls", sets: "2", reps: "10 each dir", tip: "Full range of motion" },
      { name: "Good Mornings", sets: "2", reps: "10", tip: "Hands behind head, hip hinge" },
    ],
    main: {
      1: [
        { name: "Reverse Lunges", sets: "3", reps: "10 each leg", tip: "Step back — easier on knees than forward" },
        { name: "Sumo Squats", sets: "3", reps: "15", tip: "Wide stance, toes out — inner thigh focus" },
        { name: "Donkey Kicks", sets: "3", reps: "15 each", tip: "Keep back flat, kick heel to ceiling" },
        { name: "Dead Bug", sets: "3", reps: "10 each side", tip: "Lower back pressed to floor — key core move!" },
        { name: "Side Plank", sets: "3", reps: "20 sec each", tip: "Stack or stagger feet for balance" },
        { name: "Hollow Body Hold", sets: "2", reps: "15 sec", tip: "Arms overhead, lower back flat — calisthenics staple!" },
      ],
      2: [
        { name: "Bulgarian Split Squat", sets: "4", reps: "10 each leg", tip: "Rear foot on chair — deep lunge position" },
        { name: "Sumo Squat Pulse", sets: "3", reps: "20", tip: "Stay at bottom, pulse — feel the burn" },
        { name: "Single-Leg Hip Thrust", sets: "3", reps: "12 each", tip: "Back on couch, one leg extended — powerful glute!" },
        { name: "Dead Bug", sets: "4", reps: "12 each side", tip: "Slow and controlled — no back arching" },
        { name: "Side Plank with Hip Dip", sets: "3", reps: "12 each", tip: "Dip hips down and raise — oblique killer" },
        { name: "Hollow Body Rock", sets: "3", reps: "20 sec", tip: "Rock forward and back — maintain hollow position" },
      ],
      3: [
        { name: "Pistol Squat (assisted)", sets: "4", reps: "6 each leg", tip: "Hold door frame for balance — single-leg squat!" },
        { name: "Nordic Hamstring Curl", sets: "3", reps: "8", tip: "Anchor feet, fall forward slowly — eccentric strength" },
        { name: "Shrimp Squat", sets: "3", reps: "6 each leg", tip: "Rear foot in hand, squat on one leg — advanced!" },
        { name: "L-Sit Hold", sets: "4", reps: "15-20 sec", tip: "Compress core hard, legs parallel to floor" },
        { name: "Dragon Flag (tucked)", sets: "3", reps: "8", tip: "Lie on back, grip couch edge, raise legs" },
        { name: "V-Up", sets: "3", reps: "15", tip: "Arms and legs meet at the top — full core contraction" },
      ],
    },
    cooldown: [
      { name: "Figure-4 Glute Stretch", sets: "1", reps: "45 sec each", tip: "Lie on back, ankle on opposite knee" },
      { name: "Supine Spinal Twist", sets: "1", reps: "30 sec each side", tip: "Let gravity do the work" },
    ],
  },

  Saturday: {
    warmup: [
      { name: "Full Body Shake-Out", sets: "1", reps: "1 min", tip: "Literally shake everything — release tension!" },
      { name: "World's Greatest Stretch", sets: "2", reps: "5 each side", tip: "Lunge + rotation — preps everything" },
    ],
    main: {
      1: [
        { name: "AMRAP 10 min", sets: "1", reps: "As many rounds as possible", tip: "10 squats → 8 push-ups → 6 burpees → 20 sec rest. Track your rounds!" },
        { name: "Tabata: Squat + Push-Up", sets: "4", reps: "20 sec on / 10 sec off", tip: "Alternate between the two movements" },
        { name: "Bear Crawl", sets: "3", reps: "30 sec", tip: "Knees 1 inch off floor — unreal core challenge!" },
        { name: "Reverse Crunch", sets: "3", reps: "15", tip: "Curl hips off floor, lower slowly" },
      ],
      2: [
        { name: "AMRAP 15 min", sets: "1", reps: "As many rounds as possible", tip: "12 squats → 10 push-ups → 8 burpees → 5 jump lunges → 15 sec rest" },
        { name: "Tabata: Burpee + Mountain Climber", sets: "4", reps: "20 sec on / 10 sec off", tip: "Alternate — 4 full minutes of intensity" },
        { name: "Bear Crawl", sets: "4", reps: "45 sec", tip: "Forward and backward — full body coordination" },
        { name: "Reverse Crunch to Leg Raise", sets: "4", reps: "12", tip: "Reverse crunch, then lower legs straight — combo!" },
        { name: "Superman Hold", sets: "3", reps: "30 sec", tip: "Lie face down, raise arms and legs — back strength" },
      ],
      3: [
        { name: "AMRAP 20 min", sets: "1", reps: "As many rounds as possible", tip: "10 burpees → 10 explosive push-ups → 10 jump squats → 10 V-ups → 30 sec rest" },
        { name: "Tabata: Burpee + L-Sit", sets: "4", reps: "20 sec on / 10 sec off", tip: "Hardest combo yet — dig deep!" },
        { name: "Handstand Wall Walk", sets: "3", reps: "3 walks", tip: "Start in push-up, walk hands to wall, walk feet up" },
        { name: "Dragon Flag (tucked)", sets: "3", reps: "10", tip: "Core of iron — control the descent!" },
        { name: "Skin the Cat (low bar)", sets: "3", reps: "5", tip: "Use a low bar or rings — shoulder mobility + strength" },
      ],
    },
    cooldown: [
      { name: "Full Body Roll-Down", sets: "1", reps: "5 slow reps", tip: "Roll down vertebra by vertebra" },
      { name: "Happy Baby Pose", sets: "1", reps: "1 min", tip: "You earned it! Rock gently side to side" },
      { name: "Savasana", sets: "1", reps: "3 min", tip: "Just breathe. You did it." },
    ],
  },

  Sunday: {
    warmup: [],
    main: {
      1: [
        { name: "Rest & Hydrate", sets: "—", reps: "All day", tip: "Aim for 8 glasses of water" },
        { name: "Light Stretching (optional)", sets: "1", reps: "10-15 min", tip: "Only if you feel like it — no pressure" },
        { name: "Meal Prep", sets: "—", reps: "As needed", tip: "Prep veggies and protein for the week" },
        { name: "Sleep 7-9 hours", sets: "—", reps: "Tonight", tip: "Recovery happens during sleep!" },
      ],
      2: [
        { name: "Rest & Hydrate", sets: "—", reps: "All day", tip: "Your muscles are rebuilding — let them!" },
        { name: "Foam Roll (or tennis ball)", sets: "1", reps: "15 min", tip: "Roll quads, calves, lats — feel the knots release" },
        { name: "Meal Prep", sets: "—", reps: "As needed", tip: "High protein prep is key in Phase 2" },
        { name: "Sleep 7-9 hours", sets: "—", reps: "Tonight", tip: "Growth hormone peaks during deep sleep" },
      ],
      3: [
        { name: "Rest & Hydrate", sets: "—", reps: "All day", tip: "Elite athletes treat recovery like training" },
        { name: "Mobility Flow", sets: "1", reps: "15-20 min", tip: "Hip 90/90, shoulder CARs, spinal waves" },
        { name: "Contrast Shower (optional)", sets: "1", reps: "5 min", tip: "30 sec cold, 60 sec warm — reduces soreness" },
        { name: "Sleep 8-9 hours", sets: "—", reps: "Tonight", tip: "Non-negotiable in Phase 3 — protect your performance" },
      ],
    },
    cooldown: [],
  },
};

const calorieInfo = {
  tips: [
    { icon: "🥗", title: "Calorie Deficit", body: "Aim for ~300-400 kcal deficit/day. At 67kg/160cm, your maintenance is ~1,700-1,850 kcal. Target ~1,400-1,500 kcal." },
    { icon: "💧", title: "Hydration", body: "Drink 2-2.5L water daily. Often hunger is thirst in disguise. Have a glass before every meal." },
    { icon: "🍗", title: "Protein First", body: "Aim for 90-100g protein/day (eggs, chicken, legumes, Greek yogurt). Keeps you full and preserves muscle." },
    { icon: "📉", title: "Expected Timeline", body: "At ~0.5kg/week loss, you'll reach 58kg in approximately 16-18 weeks — safe and sustainable!" },
  ],
};

export default function FitnessApp() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [completed, setCompleted] = useState({});
  const [activeTab, setActiveTab] = useState("schedule");
  const [weekDone, setWeekDone] = useState({});
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weightLog, setWeightLog] = useState({ 1: "67" });
  const [editingWeight, setEditingWeight] = useState(null);

  const schedulePhase = getPhase(currentWeek);
  const phaseInfo = PHASE_INFO[schedulePhase];
  const dayInfo = weeklySchedule.find(d => d.day === selectedDay);
  const workout = workouts[selectedDay];
  const mainExercises = Array.isArray(workout.main) ? workout.main : workout.main[schedulePhase];

  const isCompleted = (section, index) => !!completed[`${selectedDay}-${currentWeek}-${section}-${index}`];
  const toggleExercise = (section, index) => {
    const key = `${selectedDay}-${currentWeek}-${section}-${index}`;
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);

    // Auto-mark this week+day as done in weekDone when all exercises are checked off
    const dayIdx = weeklySchedule.findIndex(d => d.day === selectedDay);
    const allKeys = [
      ...workout.warmup.map((_, i) => `${selectedDay}-${currentWeek}-warmup-${i}`),
      ...mainExercises.map((_, i) => `${selectedDay}-${currentWeek}-main-${i}`),
      ...workout.cooldown.map((_, i) => `${selectedDay}-${currentWeek}-cooldown-${i}`),
    ];
    const allDone = allKeys.length > 0 && allKeys.every(k => !!next[k]);
    setWeekDone(prev => ({ ...prev, [`w${currentWeek}-d${dayIdx}`]: allDone }));
  };

  const todayTotal = workout.warmup.length + mainExercises.length + workout.cooldown.length;
  const todayDone = [
    ...workout.warmup.map((_, i) => isCompleted("warmup", i)),
    ...mainExercises.map((_, i) => isCompleted("main", i)),
    ...workout.cooldown.map((_, i) => isCompleted("cooldown", i)),
  ].filter(Boolean).length;
  const progressPct = todayTotal === 0 ? 0 : Math.round((todayDone / todayTotal) * 100);
  const totalExercises = Object.values(completed).filter(Boolean).length;

  const toggleWeekDay = (week, dayIdx) => {
    const key = `w${week}-d${dayIdx}`;
    setWeekDone(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const isWeekDayDone = (week, dayIdx) => !!weekDone[`w${week}-d${dayIdx}`];
  const weekCompletionCount = (week) => DAYS.filter((_, i) => isWeekDayDone(week, i)).length;
  const totalWorkoutsLogged = Object.values(weekDone).filter(Boolean).length;
  const weeksStarted = new Set(Object.keys(weekDone).filter(k => weekDone[k]).map(k => k.match(/w(\d+)/)[1])).size;

  const ExerciseRow = ({ exercise, section, index }) => {
    const done = isCompleted(section, index);
    return (
      <div onClick={() => toggleExercise(section, index)} style={{
        display: "flex", alignItems: "flex-start", gap: "12px",
        padding: "14px 16px", marginBottom: "8px",
        background: done ? "rgba(168,224,99,0.12)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${done ? "#A8E063" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px", cursor: "pointer", transition: "all 0.2s",
      }}>
        <div style={{
          width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0, marginTop: "2px",
          border: `2px solid ${done ? "#A8E063" : "rgba(255,255,255,0.25)"}`,
          background: done ? "#A8E063" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", color: "#1a1a2e",
        }}>
          {done && "✓"}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
            <span style={{
              fontWeight: 600, color: done ? "#A8E063" : "#fff", fontSize: "15px",
              textDecoration: done ? "line-through" : "none", opacity: done ? 0.7 : 1,
            }}>{exercise.name}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ background: "rgba(255,107,53,0.18)", color: "#FF6B35", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>{exercise.sets} sets</span>
              <span style={{ background: "rgba(78,205,196,0.18)", color: "#4ECDC4", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>{exercise.reps}</span>
            </div>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>💡 {exercise.tip}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)", fontFamily: "'Barlow', sans-serif", color: "#fff" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* Fixed Header */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "linear-gradient(135deg, rgba(15,15,26,0.97) 0%, rgba(26,26,46,0.97) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "20px 24px 16px",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
            <div>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#FF6B35", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>Your 18-Week Program</div>
              <h1 style={{ margin: 0, fontSize: "32px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, lineHeight: 1 }}>BURN & BUILD</h1>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>67kg → 58kg · Beginner Calisthenics · Home</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: "4px" }}>TOTAL DONE</div>
              <div style={{ fontSize: "36px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, color: "#A8E063", lineHeight: 1 }}>{totalExercises}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>exercises ✓</div>
            </div>
          </div>
          <div style={{ marginTop: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
              <span>{selectedDay}'s Session</span>
              <span>{todayDone}/{todayTotal} exercises · {progressPct}%</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #FF6B35, #A8E063)", height: "100%", borderRadius: "4px", transition: "width 0.5s ease" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "160px" }} />

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px 40px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "4px", marginBottom: "24px" }}>
          {["schedule", "tracker", "nutrition"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: "10px", border: "none", borderRadius: "9px", cursor: "pointer",
              fontSize: "12px", fontWeight: 700, fontFamily: "'Barlow', sans-serif",
              letterSpacing: "0.5px", textTransform: "uppercase", transition: "all 0.2s",
              background: activeTab === tab ? "#FF6B35" : "transparent",
              color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
            }}>
              {tab === "schedule" ? "🗓 Plan" : tab === "tracker" ? "📅 Weeks" : "🥗 Nutrition"}
            </button>
          ))}
        </div>

        {/* ── SCHEDULE ── */}
        {activeTab === "schedule" && (
          <>
            {/* Phase banner */}
            <div style={{ marginBottom: "16px", padding: "12px 16px", background: `${phaseInfo.color}18`, border: `1px solid ${phaseInfo.color}44`, borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "10px", color: phaseInfo.color, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>{phaseInfo.weeks}</div>
                <div style={{ fontSize: "15px", fontWeight: 700 }}>{phaseInfo.label}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>{phaseInfo.desc}</div>
              </div>
              <div style={{ fontSize: "30px" }}>{schedulePhase === 1 ? "🌱" : schedulePhase === 2 ? "🔧" : "🚀"}</div>
            </div>

            {/* Week selector */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>Viewing Week {currentWeek} workouts</div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map(w => {
                  const p = getPhase(w);
                  const pColor = PHASE_INFO[p].color;
                  const isCurrent = w === currentWeek;
                  return (
                    <button key={w} onClick={() => setCurrentWeek(w)} style={{
                      width: "32px", height: "28px", borderRadius: "6px", cursor: "pointer",
                      border: isCurrent ? `2px solid ${pColor}` : `1px solid ${pColor}33`,
                      background: isCurrent ? `${pColor}33` : "rgba(255,255,255,0.03)",
                      color: isCurrent ? pColor : `${pColor}88`,
                      fontSize: "11px", fontWeight: 700,
                    }}>{w}</button>
                  );
                })}
              </div>
            </div>

            {/* Day selector */}
            <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "8px", marginBottom: "24px", scrollbarWidth: "none" }}>
              {weeklySchedule.map(({ day, emoji, color }) => {
                const isActive = selectedDay === day;
                return (
                  <button key={day} onClick={() => setSelectedDay(day)} style={{
                    flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                    padding: "10px 14px", border: `1px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "12px", background: isActive ? `${color}22` : "rgba(255,255,255,0.03)",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                    <span style={{ fontSize: "18px" }}>{emoji}</span>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: isActive ? color : "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>
                      {day.slice(0, 3).toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Day header */}
            <div style={{ marginBottom: "20px", padding: "16px 20px", background: `linear-gradient(135deg, ${dayInfo.color}22, ${dayInfo.color}08)`, border: `1px solid ${dayInfo.color}44`, borderRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "28px" }}>{dayInfo.emoji}</span>
                <div>
                  <div style={{ fontSize: "11px", color: dayInfo.color, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>{dayInfo.type}</div>
                  <div style={{ fontSize: "20px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}>{selectedDay}: {dayInfo.focus[schedulePhase]}</div>
                </div>
              </div>
            </div>

            {workout.warmup.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#4ECDC4", fontWeight: 700, marginBottom: "10px", textTransform: "uppercase" }}>🌡 Warm-Up</div>
                {workout.warmup.map((ex, i) => <ExerciseRow key={i} exercise={ex} section="warmup" index={i} />)}
              </div>
            )}
            {mainExercises.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#FF6B35", fontWeight: 700, marginBottom: "10px", textTransform: "uppercase" }}>⚡ Main Workout</div>
                {mainExercises.map((ex, i) => <ExerciseRow key={i} exercise={ex} section="main" index={i} />)}
              </div>
            )}
            {workout.cooldown.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#A8E063", fontWeight: 700, marginBottom: "10px", textTransform: "uppercase" }}>🌿 Cool-Down</div>
                {workout.cooldown.map((ex, i) => <ExerciseRow key={i} exercise={ex} section="cooldown" index={i} />)}
              </div>
            )}

            <div style={{ marginTop: "24px", padding: "16px 20px", background: "rgba(168,224,99,0.08)", border: "1px solid rgba(168,224,99,0.2)", borderRadius: "14px" }}>
              <div style={{ fontSize: "12px", color: "#A8E063", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>🏋 YOUR CALISTHENICS PATH</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
                <span style={{ color: schedulePhase === 1 ? "#FF6B35" : "rgba(255,255,255,0.35)" }}>🌱 <strong style={{ color: schedulePhase === 1 ? "#fff" : "inherit" }}>Wks 1–6:</strong> Form, modified moves, build the habit</span><br />
                <span style={{ color: schedulePhase === 2 ? "#4ECDC4" : "rgba(255,255,255,0.35)" }}>🔧 <strong style={{ color: schedulePhase === 2 ? "#fff" : "inherit" }}>Wks 7–12:</strong> Full moves, harder variations, reduce rest</span><br />
                <span style={{ color: schedulePhase === 3 ? "#A8E063" : "rgba(255,255,255,0.35)" }}>🚀 <strong style={{ color: schedulePhase === 3 ? "#fff" : "inherit" }}>Wks 13–18:</strong> Skills — L-sit, handstand, pistol squat</span>
              </div>
            </div>
          </>
        )}

        {/* ── TRACKER ── */}
        {activeTab === "tracker" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "Workouts Done", value: totalWorkoutsLogged, color: "#A8E063" },
                { label: "Weeks Active", value: weeksStarted, color: "#4ECDC4" },
                { label: "Weeks Left", value: Math.max(0, TOTAL_WEEKS - weeksStarted), color: "#FF6B35" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ padding: "14px", background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33`, borderRadius: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, color }}>{value}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                <span>Overall Program Progress</span>
                <span>{Math.round((weeksStarted / TOTAL_WEEKS) * 100)}% complete</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
                <div style={{ width: `${(weeksStarted / TOTAL_WEEKS) * 100}%`, background: "linear-gradient(90deg, #FF6B35, #4ECDC4, #A8E063)", height: "100%", borderRadius: "4px", transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "4px" }}>
                <span>🌱 W1</span><span>W6</span><span>🔧 W7</span><span>W12</span><span>🚀 W13</span><span>W18</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {[1, 2, 3].map(p => (
                <div key={p} style={{ flex: 1, padding: "10px", background: `${PHASE_INFO[p].color}18`, border: `1px solid ${PHASE_INFO[p].color}44`, borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "18px" }}>{p === 1 ? "🌱" : p === 2 ? "🔧" : "🚀"}</div>
                  <div style={{ fontSize: "10px", color: PHASE_INFO[p].color, fontWeight: 700, marginTop: "4px" }}>Phase {p}</div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)" }}>{PHASE_INFO[p].weeks}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <button onClick={() => setCurrentWeek(w => Math.max(1, w - 1))} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", fontSize: "16px" }}>‹</button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "22px" }}>WEEK {currentWeek}</div>
                <div style={{ fontSize: "11px", color: PHASE_INFO[getPhase(currentWeek)].color }}>{PHASE_INFO[getPhase(currentWeek)].label}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{weekCompletionCount(currentWeek)}/7 days logged</div>
              </div>
              <button onClick={() => setCurrentWeek(w => Math.min(TOTAL_WEEKS, w + 1))} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", fontSize: "16px" }}>›</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", marginBottom: "24px" }}>
              {DAYS.map((day, i) => {
                const done = isWeekDayDone(currentWeek, i);
                const isRest = DAY_TYPES[i] === "Rest";
                const color = DAY_TYPES[i] === "Fat Burn" ? "#FF6B35" : DAY_TYPES[i] === "Calisthenics" ? "#A8E063" : DAY_TYPES[i] === "Active Rest" ? "#4ECDC4" : "#555";
                return (
                  <div key={day} onClick={() => !isRest && toggleWeekDay(currentWeek, i)} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                    padding: "10px 4px", borderRadius: "12px", cursor: isRest ? "default" : "pointer",
                    background: done ? `${color}22` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${done ? color : "rgba(255,255,255,0.08)"}`,
                    transition: "all 0.2s",
                  }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>{day}</span>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: done ? color : isRest ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)",
                      border: `2px solid ${done ? color : "rgba(255,255,255,0.15)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px",
                    }}>
                      {isRest ? "😴" : done ? "✓" : ""}
                    </div>
                    <span style={{ fontSize: "9px", color: done ? color : "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.2 }}>
                      {DAY_TYPES[i] === "Active Rest" ? "Rest+" : DAY_TYPES[i].split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: "18px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "#4ECDC4", fontWeight: 700, letterSpacing: "2px", marginBottom: "14px" }}>⚖️ WEIGHT LOG (KG)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map(w => {
                  const hasWeight = weightLog[w];
                  const isEditing = editingWeight === w;
                  const pColor = PHASE_INFO[getPhase(w)].color;
                  return (
                    <div key={w} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontSize: "9px", color: pColor + "88" }}>W{w}</span>
                      {isEditing ? (
                        <input autoFocus defaultValue={weightLog[w] || ""}
                          onBlur={e => { setWeightLog(prev => ({ ...prev, [w]: e.target.value })); setEditingWeight(null); }}
                          onKeyDown={e => { if (e.key === "Enter") { setWeightLog(prev => ({ ...prev, [w]: e.target.value })); setEditingWeight(null); } }}
                          style={{ width: "38px", textAlign: "center", background: "#1a1a2e", border: `1px solid ${pColor}`, borderRadius: "6px", color: "#fff", fontSize: "12px", padding: "4px", fontFamily: "'Barlow', sans-serif" }}
                        />
                      ) : (
                        <div onClick={() => setEditingWeight(w)} style={{
                          width: "38px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
                          background: hasWeight ? `${pColor}22` : "rgba(255,255,255,0.05)",
                          border: `1px solid ${hasWeight ? pColor : "rgba(255,255,255,0.1)"}`,
                          borderRadius: "6px", fontSize: "11px", fontWeight: 700,
                          color: hasWeight ? pColor : "rgba(255,255,255,0.2)", cursor: "pointer",
                        }}>
                          {hasWeight ? weightLog[w] : "+"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "12px" }}>Tap any week to log your weight. Goal: 58kg 🎯</div>
            </div>

            <div style={{ padding: "18px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
              <div style={{ fontSize: "11px", color: "#FF6B35", fontWeight: 700, letterSpacing: "2px", marginBottom: "14px" }}>📊 ALL 18 WEEKS OVERVIEW</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map(w => {
                  const count = weekCompletionCount(w);
                  const pct = count / 7;
                  const isCurrent = w === currentWeek;
                  const pColor = PHASE_INFO[getPhase(w)].color;
                  return (
                    <div key={w} onClick={() => setCurrentWeek(w)} style={{
                      width: "36px", height: "36px", borderRadius: "8px", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: 700,
                      background: pct === 0 ? "rgba(255,255,255,0.05)" : pct === 1 ? `${pColor}33` : `${pColor}18`,
                      border: isCurrent ? `2px solid ${pColor}` : `1px solid ${pct > 0 ? pColor + "44" : "rgba(255,255,255,0.08)"}`,
                      color: pct > 0 ? pColor : "rgba(255,255,255,0.3)",
                      transition: "all 0.2s",
                    }}>{w}</div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "12px", fontSize: "10px", flexWrap: "wrap" }}>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>⬜ Not started</span>
                <span style={{ color: "#FF6B35" }}>🟧 In progress</span>
                <span style={{ color: "#A8E063" }}>🟩 Complete</span>
              </div>
            </div>
          </>
        )}

        {/* ── NUTRITION ── */}
        {activeTab === "nutrition" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "Current", value: "67kg", sub: "160cm · BMI 26.2" },
                { label: "Target", value: "58kg", sub: "BMI 22.7 ✓" },
                { label: "Timeline", value: "~18wk", sub: "0.5kg/week" },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ padding: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
                  <div style={{ fontSize: "22px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, color: "#FF6B35" }}>{value}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>{sub}</div>
                </div>
              ))}
            </div>
            {calorieInfo.tips.map(({ icon, title, body }) => (
              <div key={title} style={{ display: "flex", gap: "14px", padding: "16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", marginBottom: "10px" }}>
                <span style={{ fontSize: "24px", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{body}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "20px", padding: "20px", background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: "16px" }}>
              <div style={{ fontSize: "11px", color: "#FF6B35", fontWeight: 700, letterSpacing: "2px", marginBottom: "14px" }}>SAMPLE 1,400 KCAL DAY</div>
              {[
                { meal: "Breakfast", food: "2 eggs + 2 toast + black coffee", kcal: "~320 kcal" },
                { meal: "Snack", food: "Greek yogurt + handful of berries", kcal: "~150 kcal" },
                { meal: "Lunch", food: "Grilled chicken + rice + veggies", kcal: "~480 kcal" },
                { meal: "Snack", food: "Apple + 10 almonds", kcal: "~150 kcal" },
                { meal: "Dinner", food: "Fish or tofu + large salad + olive oil", kcal: "~350 kcal" },
              ].map(({ meal, food, kcal }) => (
                <div key={meal} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#FF6B35", fontWeight: 700, textTransform: "uppercase" }}>{meal}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{food}</div>
                  </div>
                  <span style={{ fontSize: "12px", color: "#4ECDC4", fontWeight: 700, flexShrink: 0, marginLeft: "12px" }}>{kcal}</span>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
