# React Interview Preparation — MERN Stack

Every answer below uses **real code from your portfolio project** as proof you understand it.

---

## 1. State vs Props

**Simple answer:**
Props are **read-only inputs** passed from parent to child. State is **mutable data** owned and managed by the component itself.

**Analogy:** Props are like function arguments — you receive them but don't change them. State is like a local variable — you create and update it.

**From your project:**

```jsx
// props — parent passes data DOWN, child cannot modify it
// app/page.jsx (Server Component)
<Hero heroStats={bio?.heroStats} />
<Skills skills={skills || portfolio.skills.categories} />
<Work projects={projects} videoArchiveLinks={bio?.videoArchiveLinks} />

// state — component owns and mutates it internally
// components/Work.jsx
const [activeTab, setActiveTab] = useState("ai-tools");

// components/VideoTab.jsx
const [videoData, setVideoData] = useState([]);
const [activeVideoIndex, setActiveVideoIndex] = useState(0);
const [selectedFilters, setSelectedFilters] = useState(["long"]);
```

**Key difference in one line:** Props come from outside, state lives inside.

---

## 2. When to Use State vs Context vs External State Manager

**Decision tree:**

| Scenario | Use | Why |
|---|---|---|
| Data used by 1 component only | **Local state** (`useState`) | No sharing needed |
| Data shared by parent + child | **Props** | Direct passing |
| Data shared by many distant components | **Context** (`createContext` + `useContext`) | Avoids prop drilling |
| Complex state with many updates / cross-app state | **External manager** (Redux, Zustand) | Predictable updates, DevTools |

**From your project — you chose local state everywhere, and here's why it's correct:**

```jsx
// VideoTab.jsx — state only needed inside this component
const [activeVideoIndex, setActiveVideoIndex] = useState(0);
const [selectedFilters, setSelectedFilters] = useState(["long"]);
const [activeCardId, setActiveCardId] = useState(null);

// Work.jsx — state only needed inside this component
const [activeTab, setActiveTab] = useState("ai-tools");

// Hero.jsx — typewriter state only needed here
const [currentPhrase, setCurrentPhrase] = useState(0);
const [displayed, setDisplayed] = useState("");
const [typing, setTyping] = useState(true);
```

**Why you don't need Context or Redux here:**
- No data is shared across 5+ unrelated components
- The admin panel and public site are separate flows
- `activeTab` in Work.jsx is only used inside Work.jsx and its children

**When you WOULD need Context:**
- If the theme (dark/light mode) needed to be accessed by every component
- If the JWT auth token needed to be shared across admin pages without prop drilling

**When you WOULD need Redux/Zustand:**
- If this were an e-commerce site with cart, user, products, orders all cross-referencing
- If you had complex undo/redo requirements

---

## 3. When to Split a Component into Subcomponents

**Rules of thumb:**
1. **The component does too many things** — if it fetches data AND renders a list AND handles form input, split it
2. **You're copy-pasting JSX** — if the same block appears twice, extract it
3. **The component file is over ~150 lines** — a sign it's doing too much
4. **A piece of UI is independently reusable** — like a button or card
5. **You need to isolate re-renders** — a child only re-renders when ITS props change

**From your project — the best example is VideoTab.jsx:**

```
VideoTab.jsx (402 lines) was ALREADY split into:
├── VideoCardLong.jsx  (153 lines) — reusable 16:9 video card
├── VideoCardShort.jsx (153 lines) — reusable 9:16 video card
```

**Why this split makes sense:**
- Both cards share the same logic (thumbnail URL extraction, play/pause state, YouTube embed)
- But they have different aspect ratios and layouts
- On the `/work/[category]` page, they're imported independently:

```jsx
// app/work/[category]/page.jsx
import VideoCardLong from "@/components/VideoCardLong";
import VideoCardShort from "@/components/VideoCardShort";

{longFiltered.map((video) => (
  <VideoCardLong video={video} />
))}

{shortFiltered.map((video) => (
  <VideoCardShort video={video} />
))}
```

**Interview answer:** "I split when a component exceeds ~150 lines, when I'm duplicating JSX, or when a piece of UI is reusable in multiple places. For example, I split my video cards into `VideoCardLong` and `VideoCardShort` because they share play/pause logic but have different layouts, and both are used on the homepage and the work category page."

---

## 4. API Handling — Upfront vs On-Action

### Upfront Fetching (Server-Side)

**Technique:** Fetch data during server rendering, before the page loads. The user sees content immediately.

**From your project:**

```jsx
// app/page.jsx — Server Component, fetches ALL data at once
async function getProjects() {
  const res = await fetch(`${BASE_URL}/api/projects`, { cache: "no-store" });
  const data = await res.json();
  return data?.length ? data : null;
}

// Parallel fetching — all 4 API calls happen simultaneously
const [projects, skills, bio, highlights] = await Promise.all([
  getProjects(),
  getSkills(),
  getBio(),
  getHighlights(),
]);
```

**Key techniques:**
- `cache: "no-store"` — always fresh data, no stale cache
- `Promise.all` — parallel fetching, not sequential (faster)
- Fallback to static data (`portfolio.skills.categories`) if API fails
- Server Component — no JavaScript sent to client for fetching

### On-Action Fetching (Client-Side)

**Technique:** Fetch when user triggers an action (click, scroll, type).

**From your project:**

```jsx
// components/VideoTab.jsx — fetches on mount (client-side)
useEffect(() => {
  fetch("/api/videos")
    .then((r) => r.json())
    .then((data) => {
      setVideoData(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

// components/Contact.jsx — fetches bio on mount for social links
useEffect(() => {
  fetch("/api/bio")
    .then((r) => r.json())
    .then((data) => {
      if (data.socialLinks && data.socialLinks.length > 0) {
        setSocialLinks(data.socialLinks);
      }
    })
    .catch(() => {});
}, []);

// app/admin/projects/ProjectForm.jsx — fetches on EDIT action
useEffect(() => {
  if (isEdit) {
    fetch("/api/projects", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((projects) => {
        const p = projects.find((proj) => proj._id === projectId);
        if (p) setForm({ ... });
      });
  }
}, [projectId, isEdit]);
```

### Summary Table

| Technique | When | Your Project Example |
|---|---|---|
| Server-side fetch (Promise.all) | Data needed immediately on page load | `page.jsx` homepage |
| Client-side fetch on mount | Data not critical for first paint | `VideoTab.jsx`, `Contact.jsx` |
| Client-side fetch on action | User-triggered (edit, submit) | `ProjectForm.jsx` (edit mode) |
| Fallback data | API might fail, need graceful degradation | `skills \|\| portfolio.skills.categories` |
| `cache: "no-store"` | Data must always be fresh | All server-side fetches |

---

## 5. What Goes in Custom Hooks

**This is an open-ended question — the interviewer wants to see your judgment.**

**Answer:** Custom hooks extract **reusable stateful logic** — things that involve state, effects, or side effects but NOT JSX rendering.

**Good candidates for custom hooks:**
- Data fetching + loading/error states
- Authentication checks
- Form validation logic
- Window resize / scroll listeners
- LocalStorage read/write
- Debouncing / throttling

**From your project — what you COULD extract into custom hooks:**

```jsx
// Currently repeated in VideoTab.jsx, VideoCardLong.jsx, VideoCardShort.jsx
const extractYouTubeId = (ytUrl) => {
  if (!ytUrl) return null;
  const match = ytUrl.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

const getThumbnailUrl = (video) => {
  if (video?.thumbnail && video.thumbnail.length > 0) return video.thumbnail;
  if (video?.ytUrl) {
    const videoId = extractYouTubeId(video.ytUrl);
    if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return "/placeholder-video.png";
};

// Could be extracted into: hooks/useYouTube.js
export function useYouTube() {
  const extractYouTubeId = (ytUrl) => { ... };
  const getThumbnailUrl = (video) => { ... };
  return { extractYouTubeId, getThumbnailUrl };
}
```

```jsx
// Currently in AdminLayout.jsx — auth check
const token = localStorage.getItem("token");
if (!token) {
  router.push("/admin/login");
  return;
}

// Could be extracted into: hooks/useAdminAuth.js
export function useAdminAuth() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  return authorized;
}
```

**What does NOT go in a hook:**
- JSX / UI rendering (that's the component's job)
- One-off logic used only in one place (just keep it in the component)
- Static configuration

**Interview answer:** "I extract logic into custom hooks when the same stateful pattern repeats across components — like data fetching with loading/error states, or auth checks. I keep rendering in the component and logic in the hook. For example, I have a YouTube thumbnail extraction function repeated in three video components that should be a single `useYouTube` hook."

---

## 6. Why Props Must Be Immutable

**The rule:** Never modify props inside a child component.

**Why:**
1. **React relies on reference equality** to decide when to re-render. If you mutate a prop, React won't detect the change and won't re-render.
2. **It breaks the data flow** — if a child modifies props, the parent doesn't know, and other children reading the same prop get corrupted data.
3. **It makes debugging impossible** — you can't trace where data changed if children are modifying their inputs.

**From your project:**

```jsx
// components/Skills.jsx — props are READ, never modified
export default function Skills({ skills }) {
  const categories = skills || portfolio.skills.categories;  // fallback, not mutation
  return categories.map((category) => (
    category.items.map((skill) => <span>{skill}</span>)  // reading, not writing
  ));
}

// components/Highlights.jsx — props are READ, never modified
export default function Highlights({ highlights }) {
  const highlight = highlights[0];  // reading, not modifying
  if (highlight.template === "ai-tool") return <AiToolTemplate data={highlight} />;
  return null;
}

// WRONG — what you should NEVER do:
function BadComponent({ items }) {
  items.push("new item");       // MUTATING prop — breaks React
  items[0].name = "changed";   // MUTATING nested prop — breaks React
}
```

**Interview answer:** "Props are immutable because React uses shallow comparison to decide when to re-render. If a child mutates a prop, the parent won't know the data changed, and React won't trigger a re-render. It also breaks unidirectional data flow — data should only flow down from parent, and events should only flow up via callbacks."

---

## 7. Controlled vs Uncontrolled Components

**Uncontrolled:** The DOM holds the form state. You read it with refs when you need it.
**Controlled:** React state holds the form state. The input always reflects React state.

**From your project — you use BOTH:**

### Controlled (Admin Forms)

```jsx
// app/admin/projects/ProjectForm.jsx — FULLY CONTROLLED
const [form, setForm] = useState({
  section: "ai-tools",
  title: "",
  description: "",
  status: "",
  featured: false,
  techStack: [],
  links: [],
  imageUrl: "",
  imageAlt: "",
});

// Every keystroke updates React state
<input
  type="text"
  value={form.title}
  onChange={(e) => handleChange("title", e.target.value)}
/>

// Checkbox also controlled
<input
  type="checkbox"
  checked={form.featured === true}
  onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
/>
```

### Uncontrolled (Contact Form)

```jsx
// components/Contact.jsx — UNCONTROLLED (uses HTML form reset)
const handleSubmit = (e) => {
  e.preventDefault();
  setFormSubmitted(true);
  e.target.reset();  // resets the form DOM directly — uncontrolled pattern
};
```

### Comparison

| Aspect | Controlled | Uncontrolled |
|---|---|---|
| State lives in | React `useState` | DOM element |
| Value access | `form.title` | `ref.current.value` |
| Instant validation | Yes — on every keystroke | No — only on submit |
| Dynamic behavior | Easy (disable submit if empty) | Harder |
| Your project example | `ProjectForm.jsx`, `VideoForm.jsx`, `BioPage.jsx` | `Contact.jsx` form |

**Interview answer:** "Controlled components keep form state in React state, giving you full control over validation, formatting, and conditional behavior. Uncontrolled components let the DOM handle state and you read values on demand. I use controlled forms in the admin panel where I need validation and dynamic fields, but an uncontrolled pattern for the contact form where I just need a simple submit and reset."

---

## 8. Error Boundaries in Function Components

**The problem:** React error boundaries must be **class components** — there is no `useErrorBoundary` hook in React.

**But you can wrap them around function components.**

**How it works:**
1. A class component with `componentDidCatch` and `static getDerivedStateFromError` catches errors in its children
2. It renders a fallback UI instead of crashing the whole app
3. Your function components don't need to change at all

### Implementation

```jsx
// components/ErrorBoundary.jsx
"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full px-5 md:px-12 py-16 bg-background">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-display font-semibold text-[24px] text-primary">
              Something went wrong
            </h2>
            <p className="font-body text-[15px] text-secondary mt-2">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-6 h-12 px-8 bg-primary text-on-primary font-label-caps text-[11px]
                         font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary
                         border border-primary transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Usage in layout.jsx

```jsx
// app/layout.jsx
import ErrorBoundary from "../components/ErrorBoundary";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

### Usage around specific components

```jsx
// app/page.jsx
<ErrorBoundary>
  <Highlights highlights={highlights} />
</ErrorBoundary>
```

**Interview answer:** "Error boundaries must be class components because React doesn't have a function component equivalent yet. You create a class with `componentDidCatch` and `getDerivedStateFromError`, then wrap your function components inside it. The boundary catches rendering errors in children and shows a fallback UI instead of crashing the entire page. You can place them at the layout level for app-wide protection or around specific sections to isolate failures."

---

## Quick Reference: Key React Concepts

### Hooks Rules
1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call hooks from React functions (components or custom hooks)

### useEffect Dependency Array
```jsx
// Empty array = runs once on mount
useEffect(() => { fetchData(); }, []);

// With dependencies = runs when dependencies change
useEffect(() => { fetchData(id); }, [id]);

// No array = runs after EVERY render (usually a bug)
useEffect(() => { fetchData(); });
```

### useCallback vs useMemo
```jsx
// useCallback — memoizes a FUNCTION (prevents re-creation)
const handleArrowClick = useCallback((direction) => {
  setActiveVideoIndex(prev => direction === "next" ? prev + 1 : prev - 1);
}, [filteredVideos.length]);

// useMemo — memoizes a VALUE (prevents re-computation)
const filteredVideos = useMemo(() => {
  return videoData.filter(v => selectedFilters.includes(v.formType));
}, [selectedFilters, videoData]);
```

### Key Props for Animation
```jsx
// Framer Motion — AnimatePresence for enter/exit animations
<AnimatePresence mode="wait">
  {activeTab === "ai-tools" && (
    <motion.div
      key="ai-tools"                              // unique key for exit animation
      initial={{ opacity: 0, x: 20 }}             // start state
      animate={{ opacity: 1, x: 0 }}              // end state
      exit={{ opacity: 0, x: -20 }}               // exit state
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      ...
    </motion.div>
  )}
</AnimatePresence>
```

---

## Interview Day Tips

1. **Use your project as proof** — don't just explain theory, say "In my portfolio project, I did X because Y"
2. **Admit what you'd improve** — saying "I'd extract this into a custom hook" shows self-awareness
3. **Explain trade-offs** — "I used local state because... but if the app grew, I'd move to Context because..."
4. **Draw the data flow** — "Parent passes props down, child calls callback up"
5. **Connect to the full stack** — mention how the Next.js Server Components fetch from your Express/MongoDB API

## After React: Node/Express Prep Topics

These are likely next session topics:
- Express middleware (auth, CORS, error handling)
- MongoDB CRUD operations and aggregation
- JWT authentication flow (you already have this in `lib/auth.js`)
- REST API design (your `/api` routes are a good example)
- Environment variables and security
