# Project Specification: FinderDev

| Document Details | |
| :--- | :--- |
| **Project Name** | FinderDev |
| **Version** | 1.0.0 (MVP) |
| **Status** | Planning / Pre-Alpha |
| **Tech Stack** | Next.js 15, Supabase, Tailwind CSS |

---

## 1. Project Summary
FinderDev is a collaborative social platform designed to bridge the gap between software developers, designers, and project managers. It functions as a talent marketplace and project incubator where users can showcase portfolios, form cross-functional teams, and manage the lifecycle of software projects from idea to MVP.

## 2. Target Audience
* **Software Developers:** Looking for side projects to upskill, open-source contributions, or partners for hackathons.
* **UI/UX Designers:** Need real-world applications to build a portfolio beyond concept art.
* **Product/Project Managers:** Have the vision/specs but need the technical talent to execute.
* **Students/Bootcamp Grads:** Seeking collaborative experience to simulate a real work environment.

## 3. Core Features (MVP Scope)

### A. User Ecosystem
* **Rich Profiles:** Dynamic portfolio generation based on GitHub activity and manual entry.
* **Skill Tagging:** Standardized technology tags for better discoverability.
* **Social Proof:** Links to live deployments, GitHub repos, and LinkedIn.

### B. Project Hub
* **Project Cards:** Quick-view summary cards with "Tech Stack" badges and "Roles Needed" indicators.
* **Role-Based Application:** Users apply for specific open slots (e.g., "Apply as Backend Dev" vs "Apply as Designer").
* **Team Management:** Project owners can view applicants, check their compatibility, and approve/reject.

### C. Discovery Engine
* **Smart Filtering:** Filter by Tech Stack (e.g., "React" + "Supabase"), Role Availability, and Project Status.
* **Search:** Keyword search across project titles and descriptions.

### D. Communication
* **Contextual Chat:** Real-time messaging tied to specific project applications or general networking.
* **Notifications:** Real-time alerts for application status changes and new messages.

## 4. Technical Architecture

### Frontend (The "T3" Influence)
* **Framework:** **Next.js 15 (App Router)**
    * *Rationale:* Leverages React Server Components (RSC) to reduce client bundle size. Essential for SEO on public project pages.
* **Styling:** **Tailwind CSS** + **shadcn/ui**
    * *Rationale:* Rapid UI development with accessible, pre-built components that we own and can customize.
* **State Management:** **Zustand** (for complex client state like chat) + **React Query / SWR** (for data fetching if not using Server Actions exclusively).
* **Form Management:** **React Hook Form** + **Zod**
    * *Rationale:* Type-safe form validation to ensure data integrity before it hits the DB.
* **Content Management:** **JSON-based Data Layer**
    * *Rationale:* All text content, labels, and messages are stored in `src/data/` directory as JSON files. Each page has its own dedicated JSON file for maintainability and easy localization in the future.

### Project Structure (Inspired by masterfabric-website)
```
finder-dev/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── README.md
├── public/                  # Static assets (favicon, images, robots.txt, etc.)
│
└── src/
    ├── app/                 # Next.js App Router (routing, layouts, pages)
    │   ├── layout.tsx
    │   ├── page.tsx          # Home page
    │   ├── globals.css
    │   ├── projects/        # Projects listing and detail pages
    │   │   ├── page.tsx
    │   │   └── [id]/
    │   │       └── page.tsx
    │   ├── profile/          # User profile pages
    │   │   ├── page.tsx
    │   │   └── [username]/
    │   │       └── page.tsx
    │   ├── messages/        # Messaging interface
    │   │   └── page.tsx
    │   ├── auth/            # Authentication pages
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── register/
    │   │       └── page.tsx
    │   └── settings/        # User settings
    │       └── page.tsx
    │
    ├── assets/              # Images, SVGs, and other media
    │
    ├── components/          # Reusable UI and feature components
    │   ├── layout/         # Layout components (Header, Footer, Container)
    │   ├── navbar/         # Navigation components
    │   ├── projects/       # Project-related components
    │   ├── profile/        # Profile-related components
    │   ├── messages/       # Messaging components
    │   ├── forms/          # Form components
    │   └── ui/             # shadcn/ui components
    │
    ├── data/                # JSON data files for content management
    │   ├── navigation.json  # Navigation menu structure
    │   ├── home.json        # Home page content
    │   ├── projects.json    # Projects page content
    │   ├── profile.json     # Profile page content
    │   ├── messages.json    # Messages page content
    │   ├── auth.json        # Authentication pages content
    │   ├── settings.json    # Settings page content
    │   └── common.json      # Common labels, buttons, messages
    │
    ├── config/              # Configuration files
    │   └── site-data.json   # Site-wide configuration (site name, meta, etc.)
    │
    ├── styles/              # Global and modular CSS files
    │
    └── utils/               # Utility functions (cookies, performance, etc.)
```

### Content Management System (Data Layer)
All text content, labels, buttons, messages, and page-specific content will be managed through JSON files in the `src/data/` directory. This approach provides:

* **Centralized Content Management:** All text content in one place
* **Easy Updates:** Non-developers can update content without touching code
* **Future Localization:** Easy to add i18n support by adding language-specific JSON files
* **Type Safety:** TypeScript interfaces for each JSON file ensure content structure consistency
* **Page-Specific Content:** Each page has its own JSON file for better organization

#### Data File Structure Examples:

**`src/data/navigation.json`**
```json
{
  "menu": [
    { "label": "Home", "href": "/" },
    { "label": "Projects", "href": "/projects" },
    { "label": "Messages", "href": "/messages" }
  ],
  "auth": {
    "login": "Login",
    "register": "Sign Up",
    "logout": "Logout"
  }
}
```

**`src/data/home.json`**
```json
{
  "hero": {
    "title": "Connect with Developers",
    "subtitle": "Find your next project or team member",
    "cta": "Get Started"
  },
  "features": {
    "title": "Why FinderDev?",
    "items": [...]
  }
}
```

**`src/data/projects.json`**
```json
{
  "page": {
    "title": "Discover Projects",
    "description": "Browse available projects and find your next opportunity"
  },
  "filters": {
    "title": "Filter Projects",
    "techStack": "Tech Stack",
    "status": "Status",
    "roles": "Open Roles"
  },
  "empty": {
    "title": "No projects found",
    "message": "Try broadening your filters or create a new project"
  }
}
```

**`src/config/site-data.json`**
```json
{
  "siteName": "FinderDev",
  "siteDescription": "A collaborative platform for developers, designers, and project managers",
  "defaultTheme": "light",
  "meta": {
    "ogTitle": "FinderDev - Connect with Developers",
    "ogDescription": "...",
    "twitterCard": "summary_large_image"
  }
}
```

### Backend & Infrastructure
* **BaaS:** **Supabase**
* **Database:** PostgreSQL
* **Auth:** Supabase Auth (GitHub OAuth + Email/Password + Google Authentication)
* **Realtime:** Supabase Realtime (for Chat and Notifications)
* **Storage:** Supabase Storage (for Profile Avatars and Project Thumbnail images)

## 5. Database Schema (Normalized)

> **Note:** All tables automatically include `created_at` and `updated_at` timestamps.

### `profiles`
*Extends Supabase `auth.users` via triggers.*
* `id` (UUID, PK, FK -> auth.users.id)
* `username` (text, unique, indexed)
* `full_name` (text)
* `avatar_url` (text)
* `bio` (text)
* `website_url` (text)
* `github_url` (text)

### `technologies` (Lookup Table)
*Standardizes skills to prevent "React" vs "react.js" duplicates.*
* `id` (BigInt, PK)
* `name` (text, unique, e.g., "Python", "Figma")
* `category` (enum: "Frontend", "Backend", "Design", "Tool")

### `projects`
* `id` (UUID, PK)
* `owner_id` (UUID, FK -> profiles.id)
* `title` (text)
* `description` (text, supports Markdown)
* `status` (enum: "idea", "in_progress", "completed")
* `repo_url` (text, nullable)
* `demo_url` (text, nullable)

### `project_technologies` (Many-to-Many)
*Allows efficient filtering of projects by stack.*
* `project_id` (UUID, FK -> projects.id)
* `technology_id` (BigInt, FK -> technologies.id)
* *Composite PK: (project_id, technology_id)*

### `project_members`
* `id` (UUID, PK)
* `project_id` (UUID, FK -> projects.id)
* `user_id` (UUID, FK -> profiles.id)
* `role_title` (text, e.g., "Lead Designer")
* `status` (enum: "pending", "accepted", "rejected")

### `conversations` (Scalable Chat)
* `id` (UUID, PK)
* `is_group` (boolean, default: false)
* `project_id` (UUID, FK -> projects.id, nullable)
    * *Note: If `project_id` is null, it acts as a Direct Message (DM).*

### `conversation_participants`
* `conversation_id` (UUID, FK -> conversations.id)
* `user_id` (UUID, FK -> profiles.id)

### `messages`
* `id` (UUID, PK)
* `conversation_id` (UUID, FK -> conversations.id)
* `sender_id` (UUID, FK -> profiles.id)
* `content` (text)
* `is_read` (boolean, default: false)

## 6. Security Policies (RLS)
* **Public Read:** Anyone can view Projects and Profiles.
* **Authenticated Write:** Only logged-in users can create projects.
* **Project Ownership:** Only `owner_id` can edit project details or accept/reject members.
* **Private Chat:** Only `conversation_participants` can view/send messages in a specific thread.

## 7. UX & UI Strategy

### Critical User Flows
1.  **The "Hiring" Flow:**
    * Project Owner creates project -> Defines "Open Roles" -> User sees "Apply" button -> Owner gets Notification -> Owner Accepts -> User added to `project_members`.
2.  **The "Empty State" Strategy:**
    * If a user has no projects: Display a "Create your first project" CTA with a friendly illustration.
    * If a search yields no results: Display "No projects found. Try broadening your filters."

### Design System
* **Theme:** Light mode default, toggleable to dark.
* **Feedback:** Toast notifications (via `sonner` or `use-toast`) for every CRUD action (e.g., "Project updated successfully").
* **Loading:** Skeleton loaders (`shadcn/skeleton`) matching the shape of cards while data fetches.

## 8. Development Roadmap

### Phase 1: Foundation (Sprint 1-2)
* [ ] Initialize Next.js repo with ESLint + Prettier.
* [ ] Set up project structure following masterfabric-website pattern.
* [ ] Create `src/data/` directory structure with JSON files for all pages.
* [ ] Create `src/config/site-data.json` with site configuration.
* [ ] Implement content loading utilities (TypeScript interfaces for JSON files).
* [ ] Supabase Setup & Database Migration (SQL).
* [ ] Authentication (GitHub Provider).
* [ ] Profile Management (View/Edit).

### Phase 2: Core Logic (Sprint 3-4)
* [ ] Project CRUD (Create, Read, Update, Delete).
* [ ] **The Filter Engine:** Implementation of the search bar and technology filtering logic.
* [ ] Project Detail Pages (Dynamic Routing `projects/[id]`).

### Phase 3: Interaction (Sprint 5-6)
* [ ] Application Logic (The `project_members` table interactions).
* [ ] Notifications System.
* [ ] Real-time Messaging (Implementing the `conversations` schema).

### Phase 4: Polish & Deploy
* [ ] Vercel Deployment.
* [ ] Open Graph Images (Social sharing previews).
* [ ] Error Boundary implementation (404 / 500 pages).