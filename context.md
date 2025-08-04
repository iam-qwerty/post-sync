# App Blueprint: Social Media Scheduling SaaS

## 1. Project Breakdown

**App Name:** CrossPost  
**Platform:** Web Application (Progressive Web App capable)  

**Summary:**  
CrossPost is a social media management platform that enables users to schedule, automate, and publish content across multiple social networks from a single dashboard. The app solves the pain point of managing disparate social media accounts by providing unified scheduling, analytics, and cross-platform posting capabilities.

**Primary Use Case:**  
Social media managers and content creators need to maintain consistent posting schedules across multiple platforms (Twitter/X, Facebook, Instagram, LinkedIn). CrossPost allows them to compose once and publish everywhere with optimal timing, while providing performance analytics.

**Authentication Requirements:**  
- Email/password auth with Supabase  
- OAuth integration for social platform connections (handled via Supabase Auth)  
- Role-based access (Admin, Team Member, Viewer)  
- JWT token management for API requests  

## 2. Tech Stack Overview

**Frontend:**  
- React 18 with Next.js 14 (App Router)  
- TypeScript for type safety  
- Server Components for SEO-optimized pages  
- Client Components for interactive features  

**UI/Design System:**  
- Tailwind CSS v3.3 for utility-first styling  
- ShadCN UI for accessible, customizable components  
- Radix Primitives for headless UI foundations  
- Framer Motion for animations  

**Backend Services:**  
- Supabase PostgreSQL database  
- Supabase Auth for authentication  
- Supabase Storage for media assets  
- Supabase Realtime for live updates  

**Deployment & Infrastructure:**  
- Vercel for frontend hosting  
- Supabase for backend services  
- Vercel Edge Functions for middleware  

## 3. Core Features

**1. Unified Content Composer**  
- WYSIWYG editor with media upload  
- Platform-specific formatting previews  
- Hashtag suggestions and emoji picker  

**2. Cross-Platform Scheduling**  
- Calendar view for post planning  
- Timezone-aware scheduling  
- Platform-specific optimal timing suggestions  

**3. Social Account Management**  
- OAuth connection to supported platforms  
- Profile grouping and organization  
- Team collaboration features  

**4. Analytics Dashboard**  
- Engagement metrics across platforms  
- Performance comparison tools  
- Exportable reports  

**5. Automation Features**  
- Content recycling for evergreen posts  
- AI-assisted post suggestions  
- RSS feed auto-posting  

## 4. User Flow

**New User Onboarding:**  
1. Sign up via email or social OAuth  
2. Connect first social media account (guided flow)  
3. Quick tour of dashboard  
4. Create first scheduled post  

**Regular User Flow:**  
1. Login (JWT auth)  
2. View dashboard with scheduled posts calendar  
3. Create new post or edit draft  
4. Select target platforms and scheduling options  
5. Preview post per platform requirements  
6. Confirm schedule or publish immediately  
7. Monitor performance via analytics  

**Team Collaboration Flow:**  
1. Admin invites team members  
2. Members receive email invitation  
3. Role-based access to features  
4. Approval workflow for scheduled posts  
5. Shared content library access  

## 5. Design & UI/UX Guidelines

**Design Principles:**  
- Clean, distraction-free interface focused on content creation  
- Platform-specific color coding for easy identification  
- Mobile-responsive layout with desktop-optimized workflows  

**Key UI Components (using ShadCN):**  
- Custom Card components for post previews  
- Calendar component with drag-and-drop scheduling  
- Unified button styles with platform color variants  
- Progress indicators for bulk operations  

**Accessibility Standards:**  
- WCAG 2.1 AA compliance  
- Keyboard navigable interface  
- Reduced motion options  
- High contrast mode  

**Performance Targets:**  
- <100ms interaction response times  
- <2s page loads (measured via Vercel Analytics)  
- Optimistic UI updates for scheduling actions  

## 6. Technical Implementation

**Frontend Architecture:**  
- Next.js App Router with route groups  
- React Server Components for static pages  
- Client Components for interactive elements  
- Custom hooks for Supabase data fetching  

**Supabase Integration:**  
```typescript
// Example post creation function
const createScheduledPost = async (postData) => {
  const { data, error } = await supabase
    .from('scheduled_posts')
    .insert([{
      content: postData.content,
      scheduled_time: postData.time,
      platforms: postData.platforms,
      user_id: user.id
    }])
    .select();
  
  if (error) throw new Error(error.message);
  return data;
};
```

**Real-time Updates:**  
```typescript
// Subscribe to post updates
const channel = supabase
  .channel('posts_updates')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'scheduled_posts' },
    (payload) => updatePostsList(payload.new)
  )
  .subscribe();
```

**Authentication Flow:**  
```typescript
// Protected route wrapper
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  return <>{user ? children : null}</>;
}
```

## 7. Development Setup

**Requirements:**  
- Node.js 18+  
- PNPM (recommended)  
- Supabase account  
- Social platform developer accounts (for API access)  

**Setup Instructions:**  
1. Clone repository  
2. Install dependencies: `pnpm install`  
3. Create `.env.local` with:  
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
4. Run development server: `pnpm dev`  

**Vercel Deployment:**  
1. Connect Git repository  
2. Add environment variables  
3. Enable Automatic Static Optimization  
4. Configure preview deployments  

**Supabase Setup:**  
1. Create new project  
2. Set up tables:  
   - `users` (extends auth.users)  
   - `scheduled_posts`  
   - `social_accounts`  
   - `teams`  
3. Enable Row Level Security  
4. Configure storage buckets for media  

**Testing Tools:**  
- Jest + React Testing Library  
- Playwright for E2E tests  
- Supabase Local Dev for offline testing