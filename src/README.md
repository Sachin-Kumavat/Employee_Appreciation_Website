# Employee Achievements and Peer Appreciation Portal

A modern, comprehensive web dashboard for managing employee achievements, peer recognition, and gamification. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Functionality

1. **Login & Authentication**
   - Secure email/password login
   - Password visibility toggle
   - Responsive design

2. **Main Dashboard**
   - Quick stats cards (Total Recognitions, Pending Approvals, Points, Team Size)
   - Monthly trend visualization with line charts
   - Points leaderboard
   - Recent achievements feed
   - Quick appreciation widget
   - Appreciation feed preview

3. **Achievements Management**
   - List view with filtering (All, Mine, Pending, Approved, By Department)
   - Achievement cards with status badges
   - Proof attachment (images/PDFs)
   - Tag system
   - Action menu for each achievement

4. **Add/Edit Achievement Flow**
   - Rich form with title, description, date picker
   - Tag management
   - File upload with preview
   - Save as Draft or Submit for Review
   - Visual workflow progress indicator
   - Auto-publish rules tooltip

5. **Manager Review Queue**
   - Pending approvals table
   - Bulk actions (approve/reject multiple)
   - Detailed review drawer
   - Proof viewing
   - Rejection reason field
   - Approve & Publish toggle
   - Review history tracking

6. **Peer Appreciation Feed**
   - Social-style feed items
   - Multiple reaction types (Like, Clap, Celebrate)
   - Comment counts and inline commenting
   - Share to team functionality
   - Bookmark feature
   - Filter by department, trending, following

7. **Profile & Recognition History**
   - Employee profile with avatar and stats
   - Points, badges, and recognition counts
   - Timeline view of achievements and appreciations
   - Download recognition summary (PDF)
   - Progress bars for giving/receiving recognitions

8. **Badges & Gamification**
   - Badge gallery (unlocked and locked)
   - Progress tracking to next badge
   - Points rules explanation
   - Global leaderboard
   - Badge unlock celebration modal with confetti effect
   - 7 badge tiers: Starter, Active, Achiever, Performer, Champion, Leader, Legend

9. **Admin Dashboard**
   - Comprehensive analytics with E-Charts
   - Monthly recognition trends (line chart)
   - Department distribution (bar chart)
   - Points distribution (pie chart)
   - Department performance metrics
   - Exportable data tables (CSV)
   - Date range and department filters

10. **Notifications Center**
    - Bell icon with unread count
    - Notification types: approvals, appreciations, badges, comments, reviews
    - Mark all as read
    - Filter by read/unread
    - Click to navigate to relevant page

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3b82f6` (blue-600)
- **White/Light**: `#ffffff`, `#f9fafb` (neutral-50)
- **Accent Colors**:
  - Green: `#10b981` (success states)
  - Yellow: `#f59e0b` (warnings, badges)
  - Red: `#ef4444` (errors, rejections)
  - Purple: `#8b5cf6` (special highlights)

### Typography
- System uses default Tailwind typography
- Clear hierarchy with h1, h2, h3 tags
- Neutral color palette for text (900/700/600/500/400)

### Components
- **Buttons**: 5 variants (primary, secondary, outline, ghost, danger)
- **Cards**: Soft shadows, rounded corners, hover effects
- **Badges**: Color-coded status indicators
- **Forms**: Consistent input styling with focus states
- **Modals**: Overlay with smooth animations

### Responsive Behavior
- **Mobile**: Collapsible sidebar, single-column layout, floating action button
- **Tablet**: 2-column grids
- **Desktop**: Full sidebar, multi-column grids

## 🔄 Interactive Flows

### 1. Submit Achievement (Draft → Approved)
1. User creates achievement
2. Saves as draft or submits for review
3. Manager receives notification
4. Manager reviews in detail drawer
5. Approves with optional auto-publish
6. Employee receives approval notification
7. Badge may unlock with celebration

### 2. Post Appreciation → Reactions
1. User sends quick appreciation
2. Post appears in feed
3. Colleagues react (like/clap/celebrate)
4. Comments are added
5. Post can be bookmarked
6. Sender receives notification of engagement

### 3. Badge Unlock Flow
1. User earns points through activities
2. Reaches badge threshold
3. Celebration modal appears with confetti
4. Badge added to profile
5. Notification sent
6. Visible in badge gallery

## 🌙 Dark Mode

Toggle available in top navigation. Affects:
- Dashboard background
- Card backgrounds and borders
- Text colors
- Chart colors
- Feed items
- All interactive elements

## 📊 Points System

- **Approved Achievement**: +10 points
- **Received Appreciation**: +3 points
- **Post Reaction**: +2 points

## 🔐 Auto-Publish Rules

Achievements auto-publish if:
1. Type is "Training Completed" AND no proof required, OR
2. Employee level is Junior AND manager auto-approval enabled

All other achievements require manual manager review.

## 🚀 State Management

- React useState for local state
- localStorage for favorites and preferences
- Mock data in `/data/mockData.ts`
- Type definitions in `/types/index.ts`

## 📱 Mobile Features

- Collapsible sidebar with overlay
- Responsive grids (1-4 columns)
- Touch-friendly buttons and cards
- Floating action button for quick actions
- Optimized charts for small screens

## 🎭 Animations

- Smooth transitions (200-300ms)
- Hover and active states
- Modal slide-in/fade-in effects
- Badge unlock celebration
- Loading states
- Success message toasts

## 🏗️ Project Structure

```
/
├── components/
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Sidebar, TopNav)
│   ├── dashboard/        # Dashboard-specific widgets
│   ├── feed/            # Feed item components
│   ├── achievements/    # Achievement components
│   ├── manager/         # Manager review components
│   └── badges/          # Badge components
├── pages/               # Page components
├── data/                # Mock data
├── types/               # TypeScript definitions
└── App.tsx             # Main app router

```

## 🎯 Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus states on all interactive components
- High contrast mode compatible
- Screen reader friendly

## 📦 Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4.0** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Dicebear** - Avatar generation

## 🎨 Design Principles

1. **Professional & Warm** - Corporate blue palette with friendly interactions
2. **Low Clutter** - Spacious layouts with clear hierarchy
3. **Community-Focused** - Social features and peer recognition
4. **Clear Typography** - Readable text with proper contrast
5. **Soft Shadows** - Subtle depth without overwhelming
6. **Responsive First** - Mobile-friendly from the start

## 🔮 Future Enhancements

- Real-time notifications with WebSocket
- Advanced filtering and search
- Custom badge creation
- Team challenges
- Analytics export automation
- Email digest notifications
- Mobile app version
- Integration with HR systems

---

Built with ❤️ using modern web technologies
