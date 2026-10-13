# 1. PROJECT OVERVIEW & TECH STACK

## Framework & Runtime
- **Next.js 14.2.35** (App Router, React Server Components + Client Components)
- **React 18** / **React DOM 18**
- **Node.js** runtime (ES Modules, `"type": "module"` in package.json)

## Core Dependencies
| Package | Version | Purpose |
|---|---|---|
| `next` | 14.2.35 | Framework (App Router) |
| `react` / `react-dom` | ^18 | UI rendering |
| `tailwindcss` | ^3.4.1 | Utility-first CSS |
| `framer-motion` | ^13.2.0 | Page transitions, carousel animations, AnimatePresence |
| `mongodb` | ^7.6.0 | Database driver (MongoDB Atlas) |
| `@supabase/supabase-js` | ^2.115.0 | Image/video file storage (Supabase Storage) |
| `jsonwebtoken` | ^9.0.3 | JWT authentication (admin routes) |
| `bcryptjs` | ^3.0.3 | Password hashing (available, not actively used) |
| `styled-components` | ^6.5.3 | Listed but not used in any component |
| `autoprefixer` | ^10.5.5 | PostCSS plugin |
| `postcss` | ^8 | CSS processing |
| `typescript` | ^5 | Type definitions only (no TS files) |

## Dev Tooling
- ESLint 8 with `eslint-config-next`
- `@/` path alias configured via `next.config.mjs` webpack resolve
- PostCSS config: `postcss.config.cjs`

## Core Purpose
A dark, cinematic, editorial-style portfolio and AI tools SaaS storefront for "Musa" — an AI engineer and video editor from Pakistan. Serves as both a public portfolio and a CMS-driven admin panel for managing projects, videos, highlights, skills, bio, and contacts.

---

# 2. DESIGN SYSTEM & UI TOKENS

## Color Palette (Exact Hex Codes from `tailwind.config.js`)

### Surface System (Material Design 3 inspired)
| Token | Hex | Usage |
|---|---|---|
| `surface` | `#fafaf5` | Main surface |
| `surface-dim` | `#dadad5` | Dimmed surface |
| `surface-bright` | `#fafaf5` | Bright surface |
| `surface-container-lowest` | `#ffffff` | Cards, form backgrounds |
| `surface-container-low` | `#f4f4ef` | Hover states |
| `surface-container` | `#eeeee9` | Default container |
| `surface-container-high` | `#e8e8e3` | Borders, dividers |
| `surface-container-highest` | `#e3e3de` | Highest container |

### Primary System
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#000000` | Buttons, headings, text |
| `on-primary` | `#ffffff` | Text on primary backgrounds |
| `primary-container` | `#1c1b1b` | Featured card backgrounds (dark) |
| `on-primary-container` | `#858383` | Text on primary-container |
| `inverse-primary` | `#c8c6c5` | Inverted primary elements |
| `primary-fixed` | `#e5e2e1` | Fixed primary elements |
| `primary-fixed-dim` | `#c8c6c5` | Dimmed fixed primary |

### Secondary System
| Token | Hex | Usage |
|---|---|---|
| `secondary` | `#5e5e5e` | Labels, metadata, secondary text |
| `on-secondary` | `#ffffff` | Text on secondary backgrounds |
| `secondary-container` | `#e1dfdf` | Secondary container |
| `on-secondary-container` | `#626262` | Text on secondary container |

### Tertiary System
| Token | Hex | Usage |
|---|---|---|
| `tertiary` | `#000000` | Same as primary |
| `on-tertiary` | `#ffffff` | Same as on-primary |
| `tertiary-container` | `#1d1b1a` | Tertiary container |
| `on-tertiary-container` | `#868381` | Text on tertiary container |

### Error System
| Token | Hex | Usage |
|---|---|---|
| `error` | `#ba1a1a` | Error states, delete buttons |
| `on-error` | `#ffffff` | Text on error backgrounds |
| `error-container` | `#ffdad6` | Error container |
| `on-error-container` | `#93000a` | Text on error container |

### Inverse System
| Token | Hex | Usage |
|---|---|---|
| `inverse-surface` | `#2f312e` | Dark surface inversions |
| `inverse-on-surface` | `#f1f1ec` | Text on inverse surfaces |

### Outline System
| Token | Hex | Usage |
|---|---|---|
| `outline` | `#747878` | Borders, dividers |
| `outline-variant` | `#c4c7c7` | Input borders, subtle dividers |

### Background
| Token | Hex | Usage |
|---|---|---|
| `background` | `#fafaf5` | Page background |
| `on-background` | `#1a1c19` | Text on background |
| `surface-variant` | `#e3e3de` | Surface variant |
| `surface-tint` | `#5f5e5e` | Tinted surface |

## Typography

### Font Families
| Name | CSS Value | Usage |
|---|---|---|
| `display` | `"Space Grotesk", sans-serif` | Headings, hero text, stat numbers, navigation brand |
| `body` | `"Inter", sans-serif` | Body copy, descriptions, paragraphs |

### Font Weights Loaded via Google Fonts
- **Inter**: 400 (regular), 500 (medium), 600 (semibold)
- **Space Grotesk**: 500 (medium), 600 (semibold), 700 (bold)

### Typography Scale (Exact Values)
| Token | Font Size | Line Height | Letter Spacing | Weight |
|---|---|---|---|---|
| `text-display-xl` | `112px` | `96px` | `-0.04em` | `700` |
| `text-display-xl-mobile` | `56px` | `52px` | `-0.03em` | `700` |
| `text-display-lg` | `72px` | `72px` | `-0.035em` | `600` |
| `text-display-lg-mobile` | `40px` | `44px` | `-0.025em` | `600` |
| `text-headline-lg` | `44px` | `48px` | `-0.02em` | `500` |
| `text-headline-lg-mobile` | `30px` | `34px` | `-0.02em` | `500` |
| `text-headline-sm` | `24px` | `28px` | `-0.015em` | `500` |
| `text-body-lg` | `18px` | `28px` | `-0.01em` | `400` |
| `text-body-md` | `15px` | `24px` | `0em` | `400` |
| `text-body-sm` | `13px` | `18px` | `0em` | `400` |
| `text-label-caps` | `11px` | `14px` | `0.14em` | `600` |
| `text-label-mono` | `12px` | `16px` | `0.04em` | `500` |

## Spacing Scale
| Token | Value |
|---|---|
| `2xs` | `2px` |
| `xs` | `4px` |
| `sm` | `8px` |
| `md` | `16px` |
| `lg` | `24px` |
| `xl` | `32px` |
| `2xl` | `48px` |
| `3xl` | `64px` |
| `4xl` | `96px` |
| `5xl` | `128px` |

## Border Radius
| Token | Value |
|---|---|
| `none` | `0px` |
| `sm` | `2px` |
| `DEFAULT` | `0px` |
| `lg` | `0px` |
| `xl` | `0px` |

## Strict UI Rules
- **Sharp corners everywhere**: Default border-radius is `0px`. All buttons, cards, inputs use `rounded-none` or `rounded-sm` (2px). The only exception is `rounded-lg` (8px) on app icons in Highlights and `rounded-xl` on web project cards.
- **No glassmorphism**: Zero `backdrop-filter`, zero transparency-based glass effects.
- **No generic gradients**: The only gradient is the animated radial-gradient in the Highlights section, controlled by dynamic color variables.
- **Heavy architectural shadows**: All cards use explicit `box-shadow` values, never Tailwind's `shadow-*` utilities.

## Custom CSS Values (from `globals.css`)

### Card Hover Effect
```css
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -6px rgba(0, 0, 0, 0.18), 0 12px 24px -4px rgba(0, 0, 0, 0.14) !important;
}
```

### Scroll Behavior
```css
html { scroll-behavior: smooth; }
html, body { overscroll-behavior: none; }
section[id] { scroll-margin-top: 64px; }
```

### Scrollbar
```css
::-webkit-scrollbar { display: none; }
```

### Body Defaults
```css
body {
  font-family: "Inter", sans-serif;
  background-color: #fafaf5;
  color: #1a1c19;
}
```

### Gradient Keyframes (Highlights)
```css
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  25%  { background-position: 100% 50%; }
  50%  { background-position: 100% 0%; }
  75%  { background-position: 0% 0%; }
  100% { background-position: 0% 50%; }
}
```

## Shadow Values Used Across Components

| Component | Shadow Value |
|---|---|
| Card hover (CSS) | `0 24px 48px -6px rgba(0,0,0,0.18), 0 12px 24px -4px rgba(0,0,0,0.14)` |
| Featured project card | `0 16px 30px -4px rgba(0,0,0,0.22), 0 6px 12px -2px rgba(0,0,0,0.15)` |
| Secondary project card | `0 16px 30px -4px rgba(0,0,0,0.12), 0 6px 12px -2px rgba(0,0,0,0.08)` |
| Video detail panel | `0 16px 30px -4px rgba(0,0,0,0.12), 0 6px 12px -2px rgba(0,0,0,0.08)` |
| Active carousel card | `0 25px 50px -12px rgba(0,0,0,0.35)` |
| Stat blocks | `0 8px 16px -2px rgba(0,0,0,0.08), 0 16px 32px -4px rgba(0,0,0,0.12)` |
| Contact email block | `0 12px 24px -4px rgba(0,0,0,0.12)` |
| Contact form | `0 16px 30px -4px rgba(0,0,0,0.14), 0 6px 12px -2px rgba(0,0,0,0.08)` |
| Mkodes block | `0 16px 30px -4px rgba(0,0,0,0.14), 0 6px 12px -2px rgba(0,0,0,0.08)` |
| Highlight video | `0 16px 40px -8px rgba(0,0,0,0.25), 0 8px 16px -4px rgba(0,0,0,0.15)` |

## Drop Shadows
```css
.drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]  /* App icons, channel logos */
.drop-shadow-lg                                /* Play button icons */
```

---

# 3. DATABASE SCHEMA & DATA MODELS

**Database**: MongoDB Atlas, database name: `portfolio`

All collections use MongoDB's native `_id` (ObjectId) field.

## Collection: `projects`

```json
{
  "_id": "ObjectId",
  "section": "ai-tools" | "web" | "video",
  "title": "string",
  "label": "string",                    // e.g. "FLAGSHIP RELEASE · 2025"
  "id": "string",                       // e.g. "AUDIO_TRANSCRIBE_ENGINE"
  "description": "string",
  "status": "string",                   // "Production Active" | "Production" | "Coming Soon" | "none"
  "featured": "boolean",                // Only ONE featured per section (enforced by API)
  "techStack": ["string"],
  "links": [
    { "text": "string", "url": "string" }
  ],
  "imageUrl": "string",                 // Supabase storage URL (web projects only)
  "imageAlt": "string"                  // Alt text for image
}
```

**Featured Logic** (from `app/api/projects/[id]/route.js:15-19`): When a project is set as `featured: true`, the API first unsets `featured` on ALL other projects in the same section before updating.

## Collection: `videos`

```json
{
  "_id": "ObjectId",
  "title": "string",
  "formType": "long" | "short",
  "views": "string",                    // Pre-formatted: "3.2M", "33.9K"
  "likes": "string",                    // Pre-formatted
  "comments": "string",                 // Pre-formatted
  "category": "string",                 // e.g. "Documentary", "Islamic / Documentary"
  "software": "string",                 // e.g. "Premiere Pro", "DaVinci Resolve Studio"
  "year": "string",                     // e.g. "2024"
  "channelName": "string",              // YouTube channel name
  "date": "string",                     // ISO date string or display date
  "ytUrl": "string",                    // YouTube URL
  "uploadedUrl": "string",              // Supabase storage URL for uploaded video
  "thumbnail": "string",                // Custom thumbnail URL
  "link": {
    "text": "string",                   // e.g. "Watch on YouTube"
    "url": "string"                     // Link destination
  },
  "active": "boolean",                  // Default: true
  "createdAt": "Date"                   // Auto-set on creation
}
```

## Collection: `highlights`

```json
{
  "_id": "ObjectId",
  "template": "ai-tool",                // Only template currently
  "title": "string",
  "description": "string",
  "latestApp": {
    "iconUrl": "string",                // Supabase storage URL
    "version": "string",                // e.g. "v2.0"
    "downloadUrl": "string"             // External download link
  },
  "legacyApps": [
    {
      "iconUrl": "string",
      "version": "string",              // e.g. "v1.2"
      "url": "string"                   // Download URL
    }
  ],
  "legacyAllUrl": "string",             // URL to view all legacy versions
  "video": {
    "type": "youtube" | "upload",
    "youtubeUrl": "string",
    "uploadedUrl": "string",            // Supabase storage URL
    "title": "string",
    "channel": "string",
    "channelLogoUrl": "string",         // Supabase storage URL
    "views": "string",
    "timeAgo": "string"                 // e.g. "2 days ago"
  },
  "active": "boolean",                  // Default: true
  "animationEnabled": "boolean",        // Default: true
  "gradientColors": ["string", "string"], // Two hex colors, default: ["#6B3FA0", "#D4A574"]
  "createdAt": "Date"                   // Auto-set on creation
}
```

## Collection: `skills`

```json
{
  "_id": "ObjectId",
  "title": "string",                    // e.g. "AI & Software"
  "subtitle": "string",                 // e.g. "MODELS, RUNTIMES, ARCHITECTURES"
  "items": ["string"]                   // Array of skill names
}
```

## Collection: `bio`

Single-document collection (upserted, never multiple).

```json
{
  "_id": "ObjectId",
  "bio": "string",                      // Long-form bio text
  "socialLinks": [
    { "platform": "string", "url": "string" }
  ],
  "stats": [
    { "id": "string", "value": "string", "label": "string" }
  ],
  "heroStats": [
    { "label": "string" }               // e.g. "3+ AI Tools Built"
  ],
  "videoArchiveLinks": [
    { "text": "string", "url": "string" }
  ]
}
```

## Collection: `contacts`

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "message": "string",
  "createdAt": "Date"                   // Auto-set on creation
}
```

---

# 4. API ARCHITECTURE & AUTHENTICATION

## API Routes

| Route | Methods | Auth Required | Purpose |
|---|---|---|---|
| `/api/admin/login` | POST | No | Authenticate admin, returns JWT |
| `/api/projects` | GET, POST | GET: No, POST: Yes | List all / Create project |
| `/api/projects/[id]` | PUT, DELETE | Yes | Update / Delete project |
| `/api/videos` | GET, POST | GET: Conditional, POST: Yes | List videos / Create video |
| `/api/videos/[id]` | PUT, DELETE | Yes | Update / Delete video |
| `/api/highlights` | GET, POST | GET: Conditional, POST: Yes | List highlights / Create highlight |
| `/api/highlights/[id]` | PUT, DELETE | Yes | Update / Delete highlight |
| `/api/skills` | GET, POST | GET: No, POST: Yes | List all / Create skill category |
| `/api/skills/[id]` | PUT, DELETE | Yes | Update / Delete skill category |
| `/api/bio` | GET, PUT | GET: No, PUT: Yes | Get bio / Update bio (upsert) |
| `/api/contact` | GET, POST | GET: Yes, POST: No | List contacts / Submit contact form |

### Conditional Auth on GET
- **Videos**: Public GET returns only `active: true`. Admin GET (with `?admin=true`) returns all videos.
- **Highlights**: Same pattern — public GET filters `active: true`, admin GET returns all.

### All Routes
- Use `export const dynamic = 'force-dynamic'` to disable static caching.
- Database: `client.db('portfolio')` — hardcoded database name.

## JWT Authentication Flow

### Login Flow
1. Admin navigates to `/admin/login`
2. Submits username/password to `POST /api/admin/login`
3. Server compares against `process.env.ADMIN_USERNAME` and `process.env.ADMIN_PASSWORD`
4. On success: `signToken({ username })` creates JWT with `expiresIn: '7d'`
5. Token stored in `localStorage.setItem("token", data.token)`
6. Client redirects to `/admin/dashboard`

### Token Verification (Admin Layout)
```
app/admin/layout.jsx (Client Component)
├── Reads pathname from usePathname()
├── If pathname === "/admin/login" → skip auth check
├── Else: reads localStorage.getItem("token")
│   ├── No token → redirect to /admin/login
│   └── Token exists → setAuthorized(true)
└── Renders sidebar nav with logout button
```

### API Authorization
```
lib/auth.js
├── signToken(payload) → jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
├── verifyToken(token) → jwt.verify(token, JWT_SECRET) or null on error
└── getTokenFromRequest(request) → parses "Bearer <token>" from Authorization header
```

All protected API routes follow this pattern:
```javascript
const token = getTokenFromRequest(request)
if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
```

### Admin Sidebar Navigation
```
Dashboard     → /admin/dashboard
Projects      → /admin/projects
Highlights    → /admin/highlights
Videos        → /admin/videos
Skills        → /admin/skills
Site Config   → /admin/bio
Contacts      → /admin/contacts
[Logout]      → clears localStorage, redirects to /admin/login
```

## Supabase File Storage

```javascript
// lib/supabase.js
Bucket: 'portfolio-media'
uploadImage(file) → sanitize filename → supabase.storage.from('portfolio-media').upload(filename, file)
                                       → getPublicUrl(filename) → returns public URL
```

Filename format: `{Date.now()}-{sanitizedName}` (whitespace replaced with `-`).

Used for: project thumbnails, highlight app icons, channel logos, highlight videos.

## YouTube API Integration

In `VideoForm.jsx`, on blur of the YouTube URL field:
```
GET https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id={videoId}&key={NEXT_PUBLIC_YOUTUBE_API_KEY}
```
Auto-fills: title, views (formatted), likes, comments, channelName, publishDate.

---

# 5. COMPLEX UI MECHANICS

## The Video Carousel (`VideoTab.jsx`)

### 3D Stacking Logic

The carousel uses a **perspective-based 3D card stack** with Framer Motion's `motion.div`. The container has `perspective: "1200px"`.

**`getCardStyle(index)` function** computes per-card transforms based on `offset = index - activeVideoIndex`:

| Offset | `x` | `y` | `scale` | `rotateY` | `zIndex` | `opacity` | `boxShadow` |
|---|---|---|---|---|---|---|---|
| 0 (active) | `0` | `0` | `1` | `0` | `10` | `1` | `0 25px 50px -12px rgba(0,0,0,0.35)` |
| ±1 | `±140px` | `15` | `0.82` | `±8°` | `8` | `0.85` | `0 15px 30px -8px rgba(0,0,0,0.25)` |
| ±2 | `±240px` | `30` | `0.68` | `±12°` | `6` | `0.6` | `0 10px 20px -6px rgba(0,0,0,0.2)` |
| ±3+ | `±300px` | `45` | `0.55` | `±15°` | `4` | `0.3` | `0 5px 10px -4px rgba(0,0,0,0.15)` |

**Direction**: `offset > 0 ? 1 : offset < 0 ? -1 : 0` — cards to the right rotate +Y, cards to the left rotate -Y.

**Card width** differs by video type:
- Long form: `width: "68%"`, `marginLeft: "-34%"`
- Short form: `width: "280px"`, `marginLeft: "-140px"`, height fixed at `450px`

Cards beyond offset > 3 are not rendered (`if (absOffset > 3) return null`).

**Animation**: Framer Motion `animate` prop with `transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }`.

### Filtering Logic
- Default filter: `["long"]` (starts on Long Form)
- Filter toggle sets `selectedFilters` to single-item array `[formType]`
- `filteredVideos = videoData.filter(v => selectedFilters.includes(v.formType))`
- `activeVideoIndex` resets to `0` on filter change

### Wheel Scroll
- `onWheel` handler on the carousel container
- Throttled: `wheelThrottleRef.current` prevents re-triggering within 600ms
- `deltaY > 0` → next, `deltaY < 0` → previous
- Wraps around: at end → index 0, at start → last index

### YouTube Thumbnail Fallback
```javascript
getThumbnailUrl(video) {
  if (video?.thumbnail && video.thumbnail.length > 0) return video.thumbnail;  // Custom thumbnail
  if (video?.ytUrl) {
    const videoId = extractYouTubeId(video.ytUrl);
    if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;  // YT auto
  }
  return "/placeholder-video.png";  // Fallback
}
```

### Card Click → Inline Player
- Clicking a thumbnail sets `activeCardId = video._id`
- Card expands to show either `<video>` (uploaded) or `<iframe>` (YouTube embed)
- Clicking again or wheel scroll clears `activeCardId`

## The Highlights Radial Gradient

### CSS Animation
```css
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  25%  { background-position: 100% 50%; }
  50%  { background-position: 100% 0%; }
  75%  { background-position: 0% 0%; }
  100% { background-position: 0% 50%; }
}
```

### Dynamic Color Injection
```javascript
const colors = (data.gradientColors && data.gradientColors.length >= 2)
  ? data.gradientColors
  : ["#f98888", "#e6e6e6"];  // DEFAULT_COLORS

const gradientStyle = animationEnabled
  ? {
      background: `radial-gradient(ellipse at center, ${colors[0]}, ${colors[1]})`,
      backgroundSize: "400% 400%",
      animation: "gradientShift 9s ease infinite",
    }
  : { background: "#e3e3de" };  // Static fallback
```

### Hover Pause/Resume
```javascript
const [isHovered, setIsHovered] = useState(false);

// Overlay that fades in on hover
<div
  className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-out"
  style={{
    background: "#e3e3de",
    opacity: isHovered && animationEnabled ? 1 : 0,
  }}
/>
// onMouseEnter → setIsHovered(true), onMouseLeave → setIsHovered(false)
```

**Effect**: On hover, a solid `#e3e3de` overlay fades in over 1200ms, masking the animated gradient. The animation continues in the background but is visually hidden. On mouse leave, the overlay fades out, revealing the gradient again.

## The Typewriter Effect (`Hero.jsx`)

### Phrases
```javascript
const phrases = ["AI Engineer.", "Video Editor.", "Builder."]
```

### State Machine
```javascript
const [currentPhrase, setCurrentPhrase] = useState(0);  // Index into phrases
const [displayed, setDisplayed] = useState("");           // Currently visible text
const [typing, setTyping] = useState(true);               // true = typing, false = deleting
```

### Timing Logic
```
Typing phase:
  - Each character added after 60ms delay
  - When full phrase displayed → pause 1800ms → switch to deleting

Deleting phase:
  - Each character removed after 30ms delay
  - When empty → advance to next phrase (modulo) → switch to typing

Rendering:
  {displayed}<span className="animate-pulse">|</span>  // Blinking cursor
```

### Complete Cycle Duration
- "AI Engineer." = 12 chars × 60ms = 720ms typing + 1800ms pause + 12 chars × 30ms = 360ms deleting = **2880ms**
- "Video Editor." = 13 chars × 60ms = 780ms + 1800ms + 13 × 30ms = 390ms = **2970ms**
- "Builder." = 8 chars × 60ms = 480ms + 1800ms + 8 × 30ms = 240ms = **2520ms**
- Full loop: ~8370ms

---

# 6. FILE STRUCTURE TREE

```
portfolio/
├── app/
│   ├── globals.css
│   ├── layout.jsx                    # Root layout (Google Fonts: Inter + Space Grotesk)
│   ├── page.jsx                      # Main portfolio page (Server Component, fetches all data)
│   ├── favicon.ico
│   ├── admin/
│   │   ├── layout.jsx                # Admin sidebar + auth guard (Client Component)
│   │   ├── page.jsx                  # Redirects to /admin/login
│   │   ├── login/
│   │   │   ├── layout.jsx            # Passthrough layout
│   │   │   └── page.jsx              # Login form (Client Component)
│   │   ├── dashboard/
│   │   │   └── page.jsx              # Stats cards (Client Component)
│   │   ├── projects/
│   │   │   ├── page.jsx              # Projects list table
│   │   │   ├── ProjectForm.jsx       # Create/Edit form component
│   │   │   ├── new/
│   │   │   │   └── page.jsx
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── highlights/
│   │   │   ├── page.jsx
│   │   │   ├── HighlightForm.jsx     # Create/Edit form component
│   │   │   ├── new/
│   │   │   │   └── page.jsx
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── videos/
│   │   │   ├── page.jsx
│   │   │   ├── VideoForm.jsx         # Create/Edit form with YouTube API fetch
│   │   │   ├── new/
│   │   │   │   └── page.jsx
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── skills/
│   │   │   └── page.jsx              # Inline edit skill categories
│   │   ├── bio/
│   │   │   └── page.jsx              # Social links, hero stats, archive links editor
│   │   └── contacts/
│   │       └── page.jsx              # Contact submissions viewer
│   ├── api/
│   │   ├── admin/
│   │   │   └── login/
│   │   │       └── route.js          # POST: validate credentials, return JWT
│   │   ├── projects/
│   │   │   ├── route.js              # GET (public) / POST (auth)
│   │   │   └── [id]/
│   │   │       └── route.js          # PUT (auth) / DELETE (auth)
│   │   ├── videos/
│   │   │   ├── route.js              # GET (public/admin) / POST (auth)
│   │   │   └── [id]/
│   │   │       └── route.js          # PUT (auth) / DELETE (auth)
│   │   ├── highlights/
│   │   │   ├── route.js              # GET (public/admin) / POST (auth)
│   │   │   └── [id]/
│   │   │       └── route.js          # PUT (auth) / DELETE (auth)
│   │   ├── skills/
│   │   │   ├── route.js              # GET (public) / POST (auth)
│   │   │   └── [id]/
│   │   │       └── route.js          # PUT (auth) / DELETE (auth)
│   │   ├── bio/
│   │   │   └── route.js              # GET (public) / PUT (auth, upsert)
│   │   └── contact/
│   │       └── route.js              # GET (auth) / POST (public)
│   └── work/
│       └── [category]/
│           └── page.jsx              # Dynamic route: /work/ai-tools, /work/video, /work/web
├── components/
│   ├── About.jsx                     # Bio section with social links + stat blocks
│   ├── Contact.jsx                   # Email copy, social links, contact form
│   ├── Footer.jsx                    # Copyright, location, stack credit
│   ├── Hero.jsx                      # Typewriter effect, name, CTAs, hero stats
│   ├── Highlights.jsx                # Radial gradient section with video + app downloads
│   ├── MkodesBlock.jsx               # Studio CTA block
│   ├── Navbar.jsx                    # Fixed top nav with anchor links
│   ├── Skills.jsx                    # Skill categories with hover-lift tags
│   ├── VideoCardLong.jsx             # Long-form video card (16:9 aspect)
│   ├── VideoCardShort.jsx            # Short-form video card (9:16 aspect, 280px wide)
│   ├── VideoTab.jsx                  # 3D carousel with left panel details
│   ├── ViewAllButton.jsx             # "View All →" link button
│   └── Work.jsx                      # Tabbed section (AI Tools / Video / Web)
├── data/
│   └── portfolio.js                  # Static fallback data for all sections
├── lib/
│   ├── auth.js                       # JWT sign/verify/extract
│   ├── mongodb.js                    # MongoClient singleton (global cached)
│   └── supabase.js                   # Supabase client + uploadImage helper
├── scripts/
│   └── seed.js                       # Database seeder (populates from portfolio.js)
├── tailwind.config.js
├── postcss.config.cjs
├── next.config.mjs                   # @/ alias config
├── package.json
└── .env.local                        # MONGODB_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD,
                                      # NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_SUPABASE_URL,
                                      # NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_YOUTUBE_API_KEY
```

---

# 7. ENVIRONMENT VARIABLES

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for JWT signing/verification |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API fetches (default: `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | YouTube Data API v3 key |

---

# 8. KEY BEHAVIORAL NOTES

- **Static Data Fallback**: `data/portfolio.js` serves as the hardcoded fallback. When the database returns `null`, components fall back to the static `portfolio` object.
- **Server-Side Data Fetching**: The main page (`app/page.jsx`) is a Server Component that fetches all data via `Promise.all` with `cache: "no-store"` (always fresh).
- **Featured Uniqueness**: Only one project per section (`ai-tools`, `web`) can be featured. The PUT endpoint enforces this by unsetting others.
- **Contact Form**: The contact form POSTs to `/api/contact` without authentication (public). No email sending — just stores in MongoDB.
- **No Email Sending**: Contact form submissions are stored in the database only. No SMTP integration.
- **Scroll-to-Section**: Navigation uses anchor links (`#selected-work`, `#capabilities`, etc.) with `scroll-margin-top: 64px` for offset.
- **Video Tab**: Starts with `"long"` filter selected. Long-form videos use 16:9 aspect ratio. Short-form videos use 9:16 aspect ratio with fixed 280px width.
- **Admin Layout Skip**: The admin layout wraps all `/admin/*` routes EXCEPT `/admin/login`, which renders without the sidebar.
