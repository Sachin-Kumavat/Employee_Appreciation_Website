# Component Library

Complete component library for the Employee Recognition Portal.

## 🎨 UI Components

### Buttons

**Variants:**
- `primary` - Blue background, white text (main actions)
- `secondary` - Light gray background (secondary actions)
- `outline` - Blue border, transparent background
- `ghost` - No background, hover effect only
- `danger` - Red background for destructive actions

**Sizes:**
- `sm` - Small (compact)
- `md` - Medium (default)
- `lg` - Large (prominent CTAs)

**States:**
- Default
- Hover
- Active/Pressed
- Loading (with spinner)
- Disabled

### Input Fields

**Features:**
- Icon support (left-aligned)
- Error state with red border
- Focus state with blue ring
- Placeholder text
- Required field indicator

### Status Badges

**Types:**
- Draft (gray)
- Submitted (blue)
- Pending (yellow/orange)
- Approved (green)
- Rejected (red)

## 📊 Dashboard Components

### StatCard
- Icon with colored background
- Large number display
- Title/label
- Optional trend indicator (up/down arrow with percentage)
- Clickable variant for navigation
- Dark mode support

### MonthlyTrendChart
- Line chart with dual metrics
- Responsive container
- Tooltip on hover
- Legend
- Grid lines
- Month labels on X-axis

### LeaderboardWidget
- Ranked list with position badges
- Avatar images
- Recognition count
- Gold/Silver/Bronze styling for top 3
- Clickable rows

### RecentAchievements
- Compact card list
- Employee avatar
- Status badge
- Title and description (truncated)
- Date and metadata
- Click to view details

### QuickAppreciate
- Textarea input
- Emoji picker button
- Send button
- Success message toast
- Character limit indicator

### AppreciationFeedWidget
- Feed item preview
- Reaction counts
- Comment counts
- "View Full Feed" link

## 🏆 Achievement Components

### WorkflowProgress
- Step-by-step progress indicator
- 4 stages: Draft → Submitted → Under Review → Approved
- Active step highlighting
- Completed steps with checkmarks
- Rejection state handling
- Progress line between steps

### AchievementCard
- Title and description
- Employee info with avatar
- Department tag
- Date submitted
- Status badge
- Proof thumbnail
- Tags display
- Points value
- Action menu (3-dot)
- Click to expand

## 👔 Manager Components

### ReviewDrawer
- Slide-in from right
- Achievement details view
- Proof viewer (image or PDF icon)
- History timeline
- Rejection reason textarea
- Approve/Reject buttons
- Auto-publish toggle
- Close button

## 💬 Feed Components

### FeedItem
- Sender and receiver avatars
- Appreciation message
- Timestamp ("X hours ago")
- Three reaction buttons:
  - Like (👍)
  - Clap (👏)
  - Celebrate (⚡)
- Reaction counts
- Comment button with count
- Share button
- Bookmark button
- Compact variant for widgets
- Dark mode support

## 🏅 Badge Components

### BadgeUnlockModal
- Centered modal with overlay
- Confetti animation effect
- Large badge icon (animated bounce)
- Badge name and description
- Points required display
- Tier information
- Unlock date
- Celebration message
- Acknowledgment button
- Sparkle effects

### BadgeCard
- Icon display (emoji)
- Badge name
- Description
- Points required
- Unlock date (if unlocked)
- Locked state with grayscale filter and lock icon
- Hover effect with scale
- Gradient background for unlocked badges

## 📈 Chart Components

### Line Chart
- Multi-line support
- Smooth curves
- Data points with dots
- Gridlines
- Axis labels
- Legend
- Tooltip on hover
- Responsive width/height

### Bar Chart
- Vertical bars
- Rounded top corners
- Color customization
- Rotated labels for long text
- Tooltip
- Grid support

### Pie Chart
- Percentage labels
- Color segments
- Tooltip
- Legend
- Center alignment

## 🎛️ Layout Components

### Sidebar
- Fixed position on desktop
- Slide-in drawer on mobile
- Logo area
- Navigation menu items with icons
- Active state highlighting
- Collapsible on mobile
- Dark mode support
- Footer area

### TopNav
- Sticky header
- Menu toggle (mobile)
- Search bar (desktop)
- Dark mode toggle
- Notifications dropdown with badge
- Profile dropdown
- Responsive layout

### DashboardLayout
- Sidebar + main content area
- Mobile overlay for sidebar
- Responsive padding
- Dark mode wrapper

## 🔔 Notification Components

### NotificationItem
- Icon based on type
- Title and message
- Timestamp
- Read/unread indicator (blue dot)
- Click to navigate
- Hover effect

### NotificationDropdown
- Bell icon with count badge
- Dropdown panel
- Scrollable list (max 5 items)
- "View All" link
- Auto-close on outside click

## 📋 Table Components

### DataTable
- Checkbox column for selection
- Sortable headers
- Hover row highlighting
- Pagination (future)
- Bulk actions toolbar
- Responsive scroll
- Export button

## 🎭 Animation Classes

### Transitions
- `duration-200` - Quick transitions
- `duration-300` - Standard transitions
- `duration-500` - Slow/emphasis

### Effects
- `hover:shadow-lg` - Card elevation
- `hover:scale-105` - Slight grow
- `active:scale-95` - Press feedback
- `animate-in` - Fade/slide in
- `animate-bounce` - Bounce effect
- `animate-ping` - Pulse effect
- `animate-spin` - Loading spinner

## 🌈 Color System

### Functional Colors
- **Blue** (`blue-600`): Primary actions, links, active states
- **Green** (`green-600`): Success, approved, positive trends
- **Yellow** (`yellow-500`): Warnings, pending, badges
- **Red** (`red-600`): Errors, rejected, destructive actions
- **Purple** (`purple-600`): Special features, premium
- **Pink** (`pink-600`): Appreciation, social features

### Neutral Palette
- `neutral-50`: Background
- `neutral-100`: Card hover, secondary backgrounds
- `neutral-200`: Borders, dividers
- `neutral-300`: Input borders
- `neutral-400`: Placeholder text
- `neutral-500`: Secondary text
- `neutral-600`: Body text
- `neutral-700`: Emphasized text
- `neutral-800`: Dark mode backgrounds
- `neutral-900`: Headings, primary text

### Dark Mode Variants
- Background: `neutral-900`, `neutral-800`
- Cards: `neutral-800`
- Borders: `neutral-700`
- Text: `white`, `neutral-300`, `neutral-400`

## 📐 Spacing Scale

- `p-2` / `m-2`: 8px (tight spacing)
- `p-4` / `m-4`: 16px (standard spacing)
- `p-6` / `m-6`: 24px (card padding)
- `p-8` / `m-8`: 32px (section padding)
- `gap-2`: 8px (tight gaps)
- `gap-4`: 16px (standard gaps)
- `gap-6`: 24px (loose gaps)

## 🔤 Typography Scale

Using default Tailwind typography (defined in globals.css):
- `h1`: Large headings (2.25rem/36px)
- `h2`: Section headings (1.875rem/30px)
- `h3`: Subsection headings (1.5rem/24px)
- `h4`: Small headings (1.25rem/20px)
- Body: 1rem/16px
- Small: 0.875rem/14px
- Tiny: 0.75rem/12px

## 🎯 Interactive States

### Focus
- Blue ring (`focus:ring-2 focus:ring-blue-500`)
- Ring offset for contrast
- Visible for keyboard navigation

### Hover
- Background lightening/darkening
- Shadow elevation
- Color shift
- Scale transform

### Active/Pressed
- Slight scale down
- Darker background
- Instant feedback

### Disabled
- 50% opacity
- Cursor not-allowed
- No pointer events

## 📱 Responsive Breakpoints

- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)

### Common Patterns
- Mobile first: Base styles for mobile
- `sm:` - Tablet adjustments
- `lg:` - Desktop layout
- Grid: 1 col → 2 cols → 3-4 cols

---

All components follow consistent patterns for accessibility, responsiveness, and theming.
