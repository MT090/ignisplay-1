# Ignisplay - UI Mockups & Design Specifications

**Version:** 1.0  
**Date:** December 27, 2025  
**Project:** Ignisplay Mobile Application

---

## Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Screen Mockups](#screen-mockups)
3. [Component Library](#component-library)
4. [Design Specifications](#design-specifications)
5. [Interaction Patterns](#interaction-patterns)
6. [Animation Guidelines](#animation-guidelines)
7. [Responsive Design](#responsive-design)

---

## 1. Design System Overview

### 1.1 Design Philosophy

Ignisplay follows a **premium, modern, dark-first design approach** that emphasizes:

- **Visual Excellence**: Stunning first impressions with vibrant gradients and glassmorphism
- **Smooth Interactions**: Fluid animations and micro-interactions
- **User-Centric**: Intuitive navigation and clear information hierarchy
- **Premium Feel**: High-end aesthetics that rival major streaming platforms

### 1.2 Color Palette

#### Primary Colors

```css
/* Deep Purple Background */
--bg-primary: #1c1022
--bg-secondary: #2d1b3d
--bg-tertiary: #3d2850

/* Purple Gradients */
--gradient-primary: linear-gradient(135deg, #a855f7 0%, #ec4899 100%)
--gradient-secondary: linear-gradient(135deg, #7c3aed 0%, #db2777 100%)
--gradient-accent: linear-gradient(135deg, #8b5cf6 0%, #f472b6 100%)

/* Background Gradients */
--bg-gradient-main: linear-gradient(180deg, #1c1022 0%, #2d1b3d 100%)
--bg-gradient-card: linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.1) 100%)
```

#### Text Colors

```css
--text-primary: #ffffff      /* Main headings */
--text-secondary: #e5e5e5    /* Body text */
--text-tertiary: #a3a3a3     /* Metadata, labels */
--text-disabled: #6b6b6b     /* Disabled states */
```

#### Functional Colors

```css
/* Success */
--success: #10b981
--success-bg: rgba(16,185,129,0.1)

/* Warning */
--warning: #f59e0b
--warning-bg: rgba(245,158,11,0.1)

/* Error */
--error: #ef4444
--error-bg: rgba(239,68,68,0.1)

/* Info */
--info: #3b82f6
--info-bg: rgba(59,130,246,0.1)
```

### 1.3 Typography

#### Font Families

```css
/* Primary Font (Headings & Body) */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

/* Alternative (Future use) */
--font-secondary: 'Outfit', sans-serif
```

#### Font Scales

```css
/* Headings */
--text-4xl: 36px / 40px (font-size / line-height)
--text-3xl: 30px / 36px
--text-2xl: 24px / 32px
--text-xl: 20px / 28px
--text-lg: 18px / 28px

/* Body */
--text-base: 16px / 24px
--text-sm: 14px / 20px
--text-xs: 12px / 16px

/* Font Weights */
--font-bold: 700
--font-semibold: 600
--font-medium: 500
--font-regular: 400
--font-light: 300
```

### 1.4 Spacing Scale

```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

### 1.5 Border Radius

```css
--radius-sm: 8px      /* Small elements */
--radius-md: 12px     /* Cards, buttons */
--radius-lg: 16px     /* Large cards */
--radius-xl: 24px     /* Modals, sheets */
--radius-full: 9999px /* Circles, pills */
```

### 1.6 Shadows & Glows

```css
/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6)

/* Glow Effects */
--glow-purple: 0 0 20px rgba(168,85,247,0.5)
--glow-pink: 0 0 20px rgba(236,72,153,0.5)
--glow-gradient: 0 0 30px rgba(168,85,247,0.3), 0 0 60px rgba(236,72,153,0.2)
```

### 1.7 Glassmorphism

```css
/* Glass Effect Properties */
--glass-bg: rgba(255, 255, 255, 0.05)
--glass-border: rgba(255, 255, 255, 0.1)
--glass-blur: 20px

/* Usage Example */
.glassmorphic-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
}
```

---

## 2. Screen Mockups

### 2.1 Home Screen

**Purpose**: Primary content discovery interface  
**Priority**: Critical

#### Visual Mockup
*See generated image: `home_screen_mockup.png`*

#### Layout Specifications

```
┌─────────────────────────────────────┐
│  [Logo: Ignisplay]        [Avatar]  │ ← Header (60px)
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  │   Featured Content Carousel   │ │ ← Featured (280px)
│  │   (Auto-scrolling)            │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│  ○ ○ ● ○ ○  (Indicators)         │
│                                     │
├─────────────────────────────────────┤
│  Continue Watching                  │ ← Section Header (40px)
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐   │ ← Horizontal Scroll
│  │   │ │   │ │   │ │   │ │   │ → │   (180px height)
│  └───┘ └───┘ └───┘ └───┘ └───┘   │
│                                     │
├─────────────────────────────────────┤
│  Trending Now                       │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │   │ │   │ │   │ │   │ │   │ → │
│  └───┘ └───┘ └───┘ └───┘ └───┘   │
│                                     │
├─────────────────────────────────────┤
│  Popular                            │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │   │ │   │ │   │ │   │ │   │ → │
│  └───┘ └───┘ └───┘ └───┘ └───┘   │
│                                     │
└─────────────────────────────────────┘
│ ⌂  🔍  ↓  ♥  👤 │ ← Bottom Tabs (70px)
└─────────────────────────────────────┘
```

#### Key Elements

1. **Header**
   - Logo: Purple gradient "Ignisplay" text (24px bold)
   - User Avatar: Circular (36px) with purple border
   - Background: Transparent with gradient overlay

2. **Featured Carousel**
   - Dimensions: Full width × 280px height
   - Border: 2px purple gradient glow
   - Corner Radius: 16px
   - Auto-scroll: 5 seconds per slide
   - Indicators: Dots below (active: purple, inactive: gray 30% opacity)

3. **Content Rows**
   - Section Header: 20px bold, white, 16px bottom margin
   - Card Dimensions: 140px × 200px (portrait aspect ratio)
   - Card Spacing: 12px horizontal gap
   - Card Style: Rounded 12px, shadow-md, subtle hover scale

4. **Content Card**
   ```
   ┌──────────────┐
   │              │ ← Poster Image
   │              │   (140×210px)
   │              │
   │              │
   └──────────────┘
      Title Text     ← 14px, white, truncated
      Metadata       ← 12px, gray, year/duration
   ```

5. **Bottom Navigation**
   - Height: 70px
   - Background: Glassmorphic (blur 20px, opacity 5%)
   - Icons: 24px, active = purple gradient, inactive = gray
   - Labels: 12px, below icons

#### Interactions

- **Tap Featured Carousel**: Navigate to detail screen
- **Swipe Carousel**: Manual slide navigation
- **Tap Content Card**: Navigate to detail screen
- **Horizontal Scroll**: Swipe to see more content
- **Pull to Refresh**: Reload content (haptic feedback)

---

### 2.2 Detail Screen

**Purpose**: Display comprehensive content information  
**Priority**: Critical

#### Visual Mockup
*See generated image: `detail_screen_mockup.png`*

#### Layout Specifications

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│      Large Backdrop Image           │ ← Hero Section
│      (Gradient overlay)             │   (400px)
│                                     │
│  [← Back]                           │
└─────────────────────────────────────┘
│                                     │
│  Movie/Show Title                   │ ← Title (30px bold)
│  ⭐ 4.8  2024 • 2h 15m • HD        │ ← Metadata (14px)
│                                     │
│  ┌─────────────────────────────┐   │
│  │   ▶ Play                    │   │ ← Primary CTA
│  └─────────────────────────────┘   │   (56px height)
│                                     │
│  ┌─────────────────────────────┐   │
│  │   + My List                 │   │ ← Secondary CTA
│  └─────────────────────────────┘   │   (48px height)
│                                     │
│  Description lorem ipsum dolor...   │ ← Description (16px)
│  sit amet consectetur adipiscing    │   (gray, 1.5 line-height)
│  elit sed do eiusmod tempor.        │
│                                     │
├─────────────────────────────────────┤
│  Cast & Crew                        │ ← Section (18px bold)
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐         │
│  │●│ │●│ │●│ │●│ │●│ →         │ ← Horizontal Scroll
│  └──┘ └──┘ └──┘ └──┘ └──┘         │   (Actor avatars 60px)
│  Name Name Name Name Name           │
│                                     │
├─────────────────────────────────────┤
│  More Like This                     │
│  ┌────┐ ┌────┐ ┌────┐             │
│  │    │ │    │ │    │             │ ← Grid (2×3)
│  └────┘ └────┘ └────┘             │   (Cards 110×165px)
│  ┌────┐ ┌────┐ ┌────┐             │
│  │    │ │    │ │    │             │
│  └────┘ └────┘ └────┘             │
└─────────────────────────────────────┘
```

#### Key Elements

1. **Hero Section**
   - Backdrop Image: Full width × 400px
   - Gradient Overlay: linear-gradient(to bottom, transparent 0%, #1c1022 90%)
   - Back Button: Top-left (40px circle, glassmorphic)

2. **Content Info**
   - Title: 30px bold, white, 1.2 line-height
   - Rating: Golden star icon + 4.8 (16px semibold)
   - Metadata: "2024 • 2h 15m • HD" (14px, gray, bullets separated)

3. **Action Buttons**
   
   **Play Button** (Primary)
   ```css
   background: linear-gradient(135deg, #a855f7, #ec4899);
   height: 56px;
   border-radius: 28px;
   color: white;
   font-size: 18px;
   font-weight: 600;
   shadow: 0 4px 12px rgba(168,85,247,0.4);
   ```
   
   **My List Button** (Secondary)
   ```css
   background: rgba(255,255,255,0.05);
   backdrop-filter: blur(20px);
   height: 48px;
   border-radius: 24px;
   border: 1px solid rgba(255,255,255,0.1);
   color: white;
   font-size: 16px;
   font-weight: 500;
   ```

4. **Description**
   - Font: 16px regular
   - Color: #a3a3a3
   - Line Height: 1.5
   - Max Lines: 4 (expandable with "Read More")

5. **Cast Section**
   - Avatar: 60px circle, purple gradient border (2px)
   - Name: 12px, white, centered below avatar
   - Horizontal scroll with 12px gaps

6. **More Like This Grid**
   - Layout: 2 columns × 3 rows
   - Card Size: 110px × 165px
   - Gap: 12px
   - Border Radius: 8px

#### Interactions

- **Tap Back Button**: Navigate back (slide out transition)
- **Tap Play Button**: Navigate to video player (modal slide up)
- **Tap My List**: Add/remove from list (button state change, haptic)
- **Tap Cast Member**: Navigate to cast detail (future)
- **Tap Similar Content**: Navigate to that content's detail
- **Scroll**: Parallax effect on backdrop (subtle zoom)

---

### 2.3 Video Player Screen

**Purpose**: Full-featured video playback  
**Priority**: Critical

#### Visual Mockup
*See generated image: `video_player_mockup.png`*

#### Layout Specifications (Landscape)

```
┌────────────────────────────────────────────────────┐
│  [←] Movie Title                          [⚙]     │ ← Top Controls
│                                                    │   (Overlay)
│                                                    │
│                                                    │
│              Video Content Area                    │ ← Video (Full)
│                                                    │
│                                                    │
│                                                    │
│  [🔊]  ◀◀   ▶   ▶▶            [⛶]              │ ← Bottom Controls
│  ├──────────●────────────────────┤  12:05/26:40  │   (Overlay)
└────────────────────────────────────────────────────┘
```

#### Key Elements

1. **Video Container**
   - Aspect Ratio: 16:9
   - Orientation: Landscape (forced)
   - Background: Black
   - Fit: Aspect fill (cover)

2. **Top Overlay**
   ```
   Background: linear-gradient(to bottom, 
               rgba(0,0,0,0.7) 0%, 
               transparent 100%);
   Height: 80px;
   ```
   
   Elements:
   - Back Arrow: Left (40px, white)
   - Title: Center (18px, white, semibold)
   - Settings: Right (40px, white)

3. **Bottom Overlay**
   ```
   Background: linear-gradient(to top, 
               rgba(0,0,0,0.7) 0%, 
               transparent 100%);
   Height: 120px;
   ```

4. **Control Elements**

   **Play/Pause Button** (Center)
   ```css
   width: 64px;
   height: 64px;
   background: linear-gradient(135deg, #a855f7, #ec4899);
   border-radius: 50%;
   box-shadow: 0 0 30px rgba(168,85,247,0.6);
   ```

   **Skip Buttons** (Left/Right of Play)
   - Icon: ◀◀ (10s back), ▶▶ (10s forward)
   - Size: 40px
   - Color: White
   - Spacing: 24px from play button

   **Progress Bar**
   ```
   ├──────────●────────────────────┤
   └─ Played ─┴─ Buffered ─┴─ Total ┘
   
   Height: 4px
   Background: rgba(255,255,255,0.3)
   Progress: linear-gradient(135deg, #a855f7, #ec4899)
   Thumb: 16px circle, white, shadow
   ```

   **Time Display**
   - Format: "12:05 / 26:40"
   - Font: 14px, white, monospace
   - Position: Right of progress bar

   **Volume Control**
   - Icon: 🔊 (24px)
   - Slider: Appears on tap (vertical)

   **Fullscreen Toggle**
   - Icon: ⛶ (24px)
   - Position: Far right

5. **Control States**

   **Controls Visible** (Default on interaction)
   - Opacity: 1
   - Transition: fade in 200ms
   - Auto-hide: After 3 seconds of inactivity

   **Controls Hidden** (During playback)
   - Opacity: 0
   - Transition: fade out 300ms
   - Show on: Screen tap, gesture, pause

#### Interactions

- **Tap Screen**: Toggle controls visibility
- **Tap Play/Pause**: Toggle playback (haptic feedback)
- **Tap Skip Buttons**: Jump ±10 seconds
- **Drag Progress Bar**: Seek to position (scrubbing)
- **Tap Volume**: Show volume slider
- **Pinch Gesture**: Zoom (optional)
- **Double Tap Left/Right**: Skip ±10 seconds
- **Swipe Down**: Dismiss player (return to detail)

---

### 2.4 Search Screen

**Purpose**: Content discovery through search  
**Priority**: Medium

#### Visual Mockup
*See generated image: `search_screen_mockup.png`*

#### Layout Specifications

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │ 🔍  Search movies & shows  ✕│   │ ← Search Bar (56px)
│  └─────────────────────────────┘   │
│                                     │
│  Recent Searches                    │ ← Section (18px)
│  ┌──────────────┐ ┌──────────────┐ │
│  │ Inception  ✕│ │ Stranger... ✕│ │ ← Pills (36px)
│  └──────────────┘ └──────────────┘ │
│                                     │
│  Popular Searches                   │
│  ┌──────────┐ ┌──────────┐        │
│  │   🎬     │ │   🎬     │        │ ← Grid Cards
│  │ Action   │ │ Comedy   │        │   (2 columns)
│  └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐        │
│  │   🎬     │ │   🎬     │        │
│  │ Drama    │ │ Thriller │        │
│  └──────────┘ └──────────┘        │
│                                     │
│  --- OR WHEN SEARCHING ---         │
│                                     │
│  Results (42)                       │
│  ┌────┐ ┌────┐                    │
│  │    │ │    │                    │ ← Grid (2 columns)
│  └────┘ └────┘                    │   Search results
│  ┌────┐ ┌────┐                    │
│  │    │ │    │                    │
│  └────┘ └────┘                    │
└─────────────────────────────────────┘
```

#### Key Elements

1. **Search Bar**
   ```css
   height: 56px;
   background: rgba(255,255,255,0.05);
   backdrop-filter: blur(20px);
   border: 2px solid rgba(168,85,247,0.3);
   border-radius: 28px;
   padding: 0 20px;
   
   /* Active State */
   border-color: rgba(168,85,247,0.8);
   box-shadow: 0 0 20px rgba(168,85,247,0.3);
   ```
   
   - Icon: 🔍 (20px, purple gradient)
   - Placeholder: "Search movies & shows" (16px, gray)
   - Clear Button: ✕ (appears when typing, 20px)

2. **Recent Searches Pills**
   ```css
   background: linear-gradient(135deg, 
               rgba(168,85,247,0.2), 
               rgba(236,72,153,0.2));
   border: 1px solid rgba(168,85,247,0.3);
   border-radius: 18px;
   padding: 8px 16px;
   font-size: 14px;
   ```
   
   - Text: White, 14px medium
   - Remove Icon: ✕ (16px, right side)
   - Max Display: 5 recent searches

3. **Popular Search Cards**
   ```
   ┌──────────┐
   │    🎬    │ ← Icon (32px)
   │          │
   │  Genre   │ ← Label (16px bold)
   └──────────┘
   
   - Dimensions: 160px × 120px
   - Background: Glassmorphic
   - Border: 1px solid rgba(255,255,255,0.1)
   - Border Radius: 12px
   - Layout: 2 columns, 12px gap
   ```

4. **Search Results**
   - Layout: 2 column grid
   - Card Size: 165px × 245px
   - Content: Poster + Title + Year
   - Border Radius: 12px
   - Gap: 12px

5. **Empty State** (No Results)
   ```
   ┌──────────────────┐
   │                  │
   │       🔍        │ ← Large icon (64px, gray)
   │                  │
   │  No results      │ ← Headline (20px)
   │  found           │
   │                  │
   │  Try different   │ ← Subtext (14px, gray)
   │  keywords        │
   └──────────────────┘
   ```

#### Interactions

- **Focus Search Bar**: Keyboard appears, border highlight
- **Type in Search**: Real-time results (debounced 300ms)
- **Tap Recent Search**: Populate search bar, trigger search
- **Tap Recent ✕**: Remove from history
- **Tap Popular Genre**: Navigate to category view
- **Tap Result Card**: Navigate to detail screen
- **Clear Search**: Return to default state (recent/popular)

---

### 2.5 My List Screen

**Purpose**: Manage saved content  
**Priority**: Medium

#### Visual Mockup
*See generated image: `mylist_screen_mockup.png`*

#### Layout Specifications

```
┌─────────────────────────────────────┐
│  My List                    ⊞  ☰   │ ← Header + View Toggle
│  12 titles                          │   (Subtitle)
│                                     │
│  ┌──────────┐ ┌──────────┐        │
│  │          │ │          │        │
│  │    ✓    │ │    ✓    │        │ ← Grid View (2 cols)
│  │          │ │          │        │   Cards: 165×245px
│  └──────────┘ └──────────┘        │
│   Title        Title               │
│   2024, 2h     2024, 1h 45m        │
│                                     │
│  ┌──────────┐ ┌──────────┐        │
│  │          │ │          │        │
│  │    ✓    │ │    ✓    │        │
│  │          │ │          │        │
│  └──────────┘ └──────────┘        │
│                                     │
│  --- OR EMPTY STATE ---            │
│                                     │
│       ┌─────┐                      │
│       │     │                      │ ← Empty icon (80px)
│       │  📂  │                      │
│       └─ ────┘                      │
│                                     │
│   Your list is empty                │ ← Headline (24px)
│                                     │
│   Browse content and add            │ ← Subtext (16px, gray)
│   your favorites to this list       │
│                                     │
│  ┌─────────────────────────────┐   │
│  │     Browse Now              │   │ ← CTA Button
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

#### Key Elements

1. **Header**
   - Title: "My List" (28px bold, white)
   - Count: "12 titles" (14px, gray)
   - View Toggle: Grid ⊞ / List ☰ (24px icons)

2. **Grid View Cards**
   ```
   ┌──────────┐
   │    ✓    │ ← Checkmark badge
   │          │   (Top-right, 24px)
   │          │   Purple gradient circle
   │  Poster  │
   │          │
   │          │
   └──────────┘
     Title        ← 14px white, truncate
     Metadata     ← 12px gray
   ```

3. **List View** (Alternative)
   ```
   ┌────┐  Title                    ✕
   │    │  2024 • 2h 15m • HD
   │Img │  Brief description...
   └────┘  ⭐ 4.8
   ──────────────────────────────────
   ```

4. **Empty State**
   ```
   Icon: 📂 (80px, purple gradient)
   Headline: "Your list is empty" (24px bold)
   Subtext: "Browse content..." (16px, gray)
   
   Browse Button:
   - Height: 52px
   - Width: 240px
   - Background: Purple gradient
   - Border Radius: 26px
   - Shadow: Glow effect
   ```

5. **Item Actions**
   - Long Press: Show remove option
   - Swipe Left: Quick remove (iOS style)
   - Tap Checkmark: Remove confirmation

#### Interactions

- **Tap Card**: Navigate to detail screen
- **Tap View Toggle**: Switch between grid/list
- **Long Press Card**: Show remove menu
- **Swipe Left on Card**: Reveal delete action
- **Tap Browse Now**: Navigate to Home tab
- **Pull to Refresh**: Sync list (if backend integrated)

---

### 2.6 Profile Screen

**Purpose**: User settings and account management  
**Priority**: Medium

#### Visual Mockup
*See generated image: `profile_screen_mockup.png`*

#### Layout Specifications

```
┌─────────────────────────────────────┐
│                                     │
│           ┌─────┐                   │
│           │     │                   │ ← Avatar (100px)
│           │  👤  │                   │   Purple gradient ring
│           └─────┘                   │
│                                     │
│         User Name                   │ ← Name (24px bold)
│      user@email.com                 │ ← Email (14px gray)
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 👤  Account Settings      › │   │ ← Settings Card
│  │     Manage your account     │   │   (Glassmorphic)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🔒  Privacy & Security    › │   │
│  │     Control your privacy    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🔔  Notifications         › │   │
│  │     Manage notifications    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ⚙️  App Preferences       › │   │
│  │     Customize your app      │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ❓  Help & Support        › │   │
│  │     Get help and support    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ℹ️  About                 › │   │
│  │     App info and version    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      Sign Out               │   │ ← Sign Out Button
│  └─────────────────────────────┘   │   (Red gradient)
│                                     │
└─────────────────────────────────────┘
```

#### Key Elements

1. **Profile Header**
   ```
   Avatar Circle:
   - Size: 100px diameter
   - Border: 3px purple gradient
   - Shadow: 0 4px 12px rgba(168,85,247,0.4)
   - Image or placeholder icon
   
   Name: 24px bold, white
   Email: 14px regular, gray
   Spacing: 12px between elements
   ```

2. **Settings Cards**
   ```css
   background: rgba(255,255,255,0.05);
   backdrop-filter: blur(20px);
   border: 1px solid rgba(255,255,255,0.1);
   border-radius: 16px;
   padding: 20px;
   margin-bottom: 12px;
   
   /* Hover/Press State */
   background: rgba(168,85,247,0.1);
   border-color: rgba(168,85,247,0.3);
   ```
   
   Card Content:
   - Icon: 24px, left side
   - Title: 16px semibold, white
   - Subtitle: 14px regular, gray
   - Chevron: › (20px, gray, right side)

3. **Sign Out Button**
   ```css
   background: linear-gradient(135deg, #ef4444, #dc2626);
   height: 52px;
   border-radius: 26px;
   color: white;
   font-size: 16px;
   font-weight: 600;
   margin-top: 24px;
   shadow: 0 4px 12px rgba(239,68,68,0.4);
   ```

#### Interactions

- **Tap Avatar**: Open avatar selection (future)
- **Tap Settings Card**: Navigate to specific settings screen
- **Tap Sign Out**: Show confirmation dialog
- **Long Press**: No special action

---

## 3. Component Library

### 3.1 Buttons

#### Primary Button
```typescript
// Used for main actions (Play, Browse Now)
<Button
  variant="primary"
  size="large"
  icon="play"
  onPress={handlePlay}
>
  Play
</Button>
```

**Styles:**
```css
background: linear-gradient(135deg, #a855f7, #ec4899);
height: 56px;
border-radius: 28px;
color: white;
font-size: 18px;
font-weight: 600;
shadow: 0 0 20px rgba(168,85,247,0.4);

/* Pressed State */
transform: scale(0.98);
shadow: 0 0 15px rgba(168,85,247,0.3);
```

#### Secondary Button (Glassmorphic)
```typescript
// Used for secondary actions (My List, Download)
<Button
  variant="secondary"
  size="medium"
  icon="plus"
  onPress={handleAddToList}
>
  My List
</Button>
```

**Styles:**
```css
background: rgba(255,255,255,0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.1);
height: 48px;
border-radius: 24px;
color: white;
font-size: 16px;
font-weight: 500;

/* Pressed State */
background: rgba(255,255,255,0.1);
border-color: rgba(168,85,247,0.3);
```

#### Text Button
```typescript
// Used for less prominent actions
<Button
  variant="text"
  onPress={handleCancel}
>
  Cancel
</Button>
```

### 3.2 Cards

#### Content Card
```typescript
<ContentCard
  image={posterUrl}
  title="Movie Title"
  year={2024}
  duration="2h 15m"
  onPress={navigateToDetail}
/>
```

**Dimensions:** 140px × 210px  
**Border Radius:** 12px  
**Shadow:** 0 4px 8px rgba(0,0,0,0.3)

#### Glassmorphic Card
```typescript
<GlassCard blur={20} opacity={0.05}>
  {children}
</GlassCard>
```

### 3.3 Input Fields

#### Search Input
```typescript
<SearchInput
  placeholder="Search movies & shows"
  onChangeText={handleSearch}
  onClear={handleClear}
/>
```

**Styles:**
```css
height: 56px;
background: rgba(255,255,255,0.05);
backdrop-filter: blur(20px);
border: 2px solid rgba(168,85,247,0.3);
border-radius: 28px;
padding: 0 20px;
font-size: 16px;
color: white;

/* Focused State */
border-color: rgba(168,85,247,0.8);
box-shadow: 0 0 20px rgba(168,85,247,0.3);
```

### 3.4 Progress Indicators

#### Loading Spinner
```typescript
<Spinner
  size="large"
  color="gradient" // Purple-pink gradient
/>
```

#### Progress Bar
```typescript
<ProgressBar
  progress={0.45}
  showTime={true}
  currentTime="12:05"
  totalTime="26:40"
/>
```

---

## 4. Design Specifications

### 4.1 Iconography

**Icon Set:** @expo/vector-icons (Ionicons, MaterialCommunityIcons)

**Standard Sizes:**
- Small: 16px (inline, badges)
- Medium: 24px (navigation, buttons)
- Large: 32px (featured icons)
- Extra Large: 48px+ (empty states)

**Icon Colors:**
```css
--icon-primary: linear-gradient(135deg, #a855f7, #ec4899)
--icon-secondary: #ffffff
--icon-tertiary: #a3a3a3
--icon-disabled: #6b6b6b
```

### 4.2 Imagery

**Aspect Ratios:**
- Poster: 2:3 (vertical)
- Backdrop: 16:9 (horizontal)
- Avatar: 1:1 (square/circle)

**Image Optimization:**
- Format: WebP preferred, fallback to JPG
- Quality: 80-85%
- Loading: Progressive/blur-up
- Caching: Aggressive (7 days)

**Placeholder Strategy:**
```
┌──────────┐
│          │
│  ⟳       │ ← Loading state (gradient shimmer)
│          │
└──────────┘

┌──────────┐
│    🎬    │ ← Error state (icon + retry)
│  Retry   │
└──────────┘
```

### 4.3 Spacing System

**Vertical Rhythm:**
```
Screen Padding: 16px (sides)
Section Spacing: 24px
Card Spacing: 12px
Element Spacing: 8px
```

**Horizontal Spacing:**
```
Card Gap: 12px
Button Padding: 20px (horizontal)
Input Padding: 16px
```

---

## 5. Interaction Patterns

### 5.1 Touch Targets

**Minimum Size:** 44×44px  
**Recommended:** 48×48px  
**Spacing:** 8px minimum between targets

### 5.2 Feedback Patterns

#### Visual Feedback
- **Tap:** Scale down to 0.98, opacity to 0.8
- **Long Press:** Scale to 1.02, slight elevation
- **Drag:** Follow finger, shadow increases
- **Loading:** Spinner or skeleton screen

#### Haptic Feedback
```typescript
// Light haptic for selection
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Medium haptic for actions
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Heavy haptic for errors
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

// Success haptic
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
```

### 5.3 Gestures

| Gesture | Action | Screen |
|---------|--------|--------|
| Tap | Select/Activate | All |
| Double Tap | Quick action (like/unlike) | Content cards |
| Long Press | Context menu | Content cards |
| Swipe Left/Right | Navigate carousel | Home, Detail |
| Swipe Down | Dismiss modal | Player, Modals |
| Pinch | Zoom (future) | Player |
| Pull Down | Refresh | Home, MyList |

---

## 6. Animation Guidelines

### 6.1 Animation Principles

1. **Purposeful**: Every animation should have a reason
2. **Fast**: Keep animations snappy (200-300ms)
3. **Natural**: Use easing curves that feel organic
4. **Consistent**: Same actions = same animations

### 6.2 Standard Animations

#### Screen Transitions
```typescript
// Push (Forward navigation)
{
  animation: 'slide_from_right',
  duration: 300,
  easing: Easing.out(Easing.cubic)
}

// Pop (Back navigation)
{
  animation: 'slide_to_right',
  duration: 250,
  easing: Easing.in(Easing.cubic)
}

// Modal Present
{
  animation: 'slide_from_bottom',
  duration: 350,
  easing: Easing.out(Easing.back(1.2))
}
```

#### Element Animations

**Fade In**
```typescript
Animated.timing(opacity, {
  toValue: 1,
  duration: 200,
  easing: Easing.ease,
  useNativeDriver: true
});
```

**Scale Bounce**
```typescript
Animated.spring(scale, {
  toValue: 1,
  friction: 3,
  tension: 40,
  useNativeDriver: true
});
```

**Slide In**
```typescript
Animated.timing(translateY, {
  toValue: 0,
  duration: 300,
  easing: Easing.out(Easing.cubic),
  useNativeDriver: true
});
```

### 6.3 Micro-Interactions

```typescript
// Button Press
{
  scale: 0.98,
  opacity: 0.8,
  duration: 100
}

// Card Hover (on press)
{
  scale: 1.05,
  elevation: 8,
  duration: 150
}

// Success Checkmark
{
  scale: [0, 1.2, 1],
  opacity: [0, 1, 1],
  rotate: ['0deg', '360deg'],
  duration: 400
}
```

---

## 7. Responsive Design

### 7.1 Breakpoints

```typescript
const breakpoints = {
  small: 375,   // Small phones
  medium: 414,  // Standard phones
  large: 768,   // Tablets (portrait)
  xlarge: 1024  // Tablets (landscape)
};
```

### 7.2 Adaptive Layouts

#### Content Cards

| Device Size | Columns | Card Width |
|------------|---------|------------|
| Small (<375) | 2 | 140px |
| Medium (375-414) | 2.5 | 140px |
| Large (415-768) | 3 | 160px |
| XLarge (>768) | 4+ | 180px |

#### Typography Scaling

```typescript
const fontSize = {
  small: {
    h1: 24,
    h2: 20,
    body: 14
  },
  large: {
    h1: 32,
    h2: 24,
    body: 16
  }
};
```

### 7.3 Orientation Handling

**Portrait (Default)**
- Bottom tab navigation
- Vertical scrolling
- Stacked layouts

**Landscape**
- Video player (full screen)
- Hidden navigation
- Horizontal optimization

---

## Appendices

### A. Design Tools & Resources

**Design Software:**
- Figma (for mockups and prototypes)
- Adobe Illustrator (for icons)
- Photoshop (for image editing)

**Color Tools:**
- Coolors.co (palette generation)
- Contrast Checker (accessibility)

**Icon Resources:**
- @expo/vector-icons
- Custom SVG icons

### B. Accessibility Checklist

- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Touch targets ≥ 44×44px
- [ ] Screen reader labels for all interactive elements
- [ ] Alternative text for images
- [ ] Keyboard navigation support (future)
- [ ] Support for system font scaling
- [ ] High contrast mode compatibility
- [ ] Reduce motion setting respected

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 27, 2025 | Ph4nt0mByte | Initial UI mockups and design specs |

---

**Document Status:** ✅ Approved for Submission  
**Submission Date:** December 27, 2025  
**Submission Method:** Email  
**Mockup Images:** 6 generated screens (Home, Detail, Player, Search, MyList, Profile)

---

*This document is confidential and proprietary to the Ignisplay project.*
