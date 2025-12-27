# Ignisplay - System Architecture Documentation

**Version:** 1.0  
**Date:** December 27, 2025  
**Project:** Ignisplay Mobile Application

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Architecture Diagram](#system-architecture-diagram)
3. [Layer Descriptions](#layer-descriptions)
4. [Component Architecture](#component-architecture)
5. [Navigation Structure](#navigation-structure)
6. [Data Flow](#data-flow)
7. [State Management](#state-management)
8. [Technology Stack Details](#technology-stack-details)
9. [Design Patterns](#design-patterns)
10. [Security Architecture](#security-architecture)

---

## 1. Architecture Overview

Ignisplay follows a **layered architecture** pattern optimized for React Native/Expo applications. The architecture is designed to be:

- **Modular**: Clear separation of concerns
- **Scalable**: Easy to add new features
- **Maintainable**: Clean code organization
- **Testable**: Isolated business logic
- **Cross-platform**: Single codebase for iOS and Android

### Architecture Principles

1. **Separation of Concerns**: Each layer has distinct responsibilities
2. **Unidirectional Data Flow**: Predictable state changes
3. **Component Reusability**: DRY (Don't Repeat Yourself)
4. **Type Safety**: TypeScript for reduced runtime errors
5. **Performance First**: Optimized rendering and animations

---

## 2. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         IGNISPLAY MOBILE APP                         │
└─────────────────────────────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    PRESENTATION LAYER (UI)                         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                    ┃
┃  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           ┃
┃  │  HomeScreen  │  │ DetailScreen │  │VideoPlayer   │           ┃
┃  │              │  │              │  │Screen        │           ┃
┃  └──────────────┘  └──────────────┘  └──────────────┘           ┃
┃                                                                    ┃
┃  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           ┃
┃  │SearchScreen  │  │ MyListScreen │  │ProfileScreen │           ┃
┃  │              │  │              │  │              │           ┃
┃  └──────────────┘  └──────────────┘  └──────────────┘           ┃
┃                                                                    ┃
┃  ┌─────────────────────────────────────────────────────────────┐ ┃
┃  │            Reusable Components                               │ ┃
┃  │  • HeaderTitle  • ThemedText  • ThemedView                  │ ┃
┃  │  • ErrorBoundary  • ErrorFallback                           │ ┃
┃  └─────────────────────────────────────────────────────────────┘ ┃
┃                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                              ↕ (Props & Events)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    BUSINESS LOGIC LAYER                            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                    ┃
┃  ┌─────────────────────────────────────────────────────────────┐ ┃
┃  │               Navigation (React Navigation 7)                │ ┃
┃  │  • BottomTabNavigator  • NativeStackNavigator               │ ┃
┃  │  • Deep Linking  • Screen Transitions                       │ ┃
┃  └─────────────────────────────────────────────────────────────┘ ┃
┃                                                                    ┃
┃  ┌─────────────────────────────────────────────────────────────┐ ┃
┃  │            State Management (React Hooks)                    │ ┃
┃  │  • useState  • useEffect  • useContext                      │ ┃
┃  │  • useReducer  • useMemo  • useCallback                     │ ┃
┃  └─────────────────────────────────────────────────────────────┘ ┃
┃                                                                    ┃
┃  ┌─────────────────────────────────────────────────────────────┐ ┃
┃  │                  Custom Hooks                                │ ┃
┃  │  • useColorScheme  • useThemeColor                          │ ┃
┃  │  • useSafeAreaInsets  • Custom business logic hooks         │ ┃
┃  └─────────────────────────────────────────────────────────────┘ ┃
┃                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                              ↕ (Data & Actions)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                        SERVICES LAYER                              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                    ┃
┃  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           ┃
┃  │Media Services│  │  UI Services │  │Storage Srvcs │           ┃
┃  │              │  │              │  │              │           ┃
┃  │• Expo Video  │  │• Reanimated  │  │• AsyncStorage│           ┃
┃  │• Expo AV     │  │• Gestures    │  │• Cache Mgmt  │           ┃
┃  │• Expo Image  │  │• Haptics     │  │• Preferences │           ┃
┃  │              │  │• Blur Effects│  │              │           ┃
┃  └──────────────┘  └──────────────┘  └──────────────┘           ┃
┃                                                                    ┃
┃  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           ┃
┃  │Network Srvcs │  │Platform APIs │  │Utility Srvcs │           ┃
┃  │              │  │              │  │              │           ┃
┃  │• HTTP Client │  │• Permissions │  │• Date/Time   │           ┃
┃  │• API Wrapper │  │• Orientation │  │• Validation  │           ┃
┃  │• Error Handle│  │• StatusBar   │  │• Formatting  │           ┃
┃  └──────────────┘  └──────────────┘  └──────────────┘           ┃
┃                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                              ↕ (Data Retrieval)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                          DATA LAYER                                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                    ┃
┃  ┌─────────────────────────────────────────────────────────────┐ ┃
┃  │                    Mock Data Store                           │ ┃
┃  │  • Content catalog (movies, shows)                          │ ┃
┃  │  • User data (profiles, preferences)                        │ ┃
┃  │  • Playback data (watch history, progress)                  │ ┃
┃  └─────────────────────────────────────────────────────────────┘ ┃
┃                                                                    ┃
┃  ┌─────────────────────────────────────────────────────────────┐ ┃
┃  │                   Local Storage                              │ ┃
┃  │  • AsyncStorage (key-value pairs)                           │ ┃
┃  │  • Image cache                                              │ ┃
┃  │  • Video position tracking                                  │ ┃
┃  └─────────────────────────────────────────────────────────────┘ ┃
┃                                                                    ┃
┃  ┌─────────────────────────────────────────────────────────────┐ ┃
┃  │            Future: Backend Integration                       │ ┃
┃  │  • REST API / GraphQL                                       │ ┃
┃  │  • Real-time updates                                        │ ┃
┃  │  • Cloud storage                                            │ ┃
┃  └─────────────────────────────────────────────────────────────┘ ┃
┃                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌───────────────────────────────────────────────────────────────────┐
│                  CROSS-CUTTING CONCERNS                            │
├───────────────────────────────────────────────────────────────────┤
│  • Error Handling & Logging                                        │
│  • Performance Monitoring                                          │
│  • Security (Data encryption, Secure storage)                      │
│  • Accessibility (Screen readers, Font scaling)                    │
│  • Analytics & Tracking (Future)                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 3. Layer Descriptions

### 3.1 Presentation Layer (UI)

**Responsibility**: Display data and handle user interactions

**Components**:
- **Screens**: Full-page views (Home, Detail, Player, Search, MyList, Profile)
- **Reusable Components**: Shared UI elements (ThemedText, HeaderTitle, etc.)
- **Error Boundaries**: Catch and handle component errors gracefully

**Technology**:
- React Native components
- TypeScript for type safety
- Custom styling with StyleSheet

**Best Practices**:
- Keep components pure and focused
- Use TypeScript interfaces for props
- Implement error boundaries for stability
- Optimize re-renders with React.memo

### 3.2 Business Logic Layer

**Responsibility**: Manage application state, routing, and business rules

**Components**:

#### Navigation
- **BottomTabNavigator**: Primary navigation (Home, Search, Downloads, MyList, Profile)
- **NativeStackNavigator**: Screen transitions and detail views
- **Deep Linking**: URL scheme handling for external navigation

#### State Management
- **React Hooks**: Local component state
- **Context API**: Shared state across components (theme, user preferences)
- **Custom Hooks**: Reusable stateful logic

**Key Patterns**:
- Unidirectional data flow
- Immutable state updates
- Side effect management with useEffect
- Memoization for performance

### 3.3 Services Layer

**Responsibility**: Provide services and utilities for the app

**Service Categories**:

#### Media Services
- **Expo Video**: Video playback functionality
- **Expo AV**: Audio/Video capabilities
- **Expo Image**: Optimized image loading and caching

#### UI Services
- **React Native Reanimated**: High-performance animations
- **React Native Gesture Handler**: Touch and gesture recognition
- **Expo Haptics**: Tactile feedback
- **Expo Blur**: Glassmorphism effects

#### Storage Services
- **AsyncStorage**: Persistent key-value storage
- **Cache Management**: Image and data caching
- **User Preferences**: Settings and configuration

#### Platform APIs
- **Screen Orientation**: Landscape/portrait handling
- **Status Bar**: Status bar styling
- **Permissions**: Future camera/storage permissions

### 3.4 Data Layer

**Responsibility**: Manage and persist data

**Current Implementation (MVP)**:
- **Mock Data**: Static content catalog
- **Local Storage**: User preferences, watch history
- **Cache**: Optimized content delivery

**Future Implementation**:
- **REST API**: Backend content management
- **GraphQL**: Efficient data fetching
- **Real-time Sync**: Cross-device synchronization
- **CDN Integration**: Content delivery network

---

## 4. Component Architecture

### Component Hierarchy

```
App (Root)
│
├── ErrorBoundary (Global)
│   │
│   └── NavigationContainer
│       │
│       └── BottomTabNavigator
│           │
│           ├── HomeTab (Stack Navigator)
│           │   ├── HomeScreen
│           │   ├── DetailScreen
│           │   └── VideoPlayerScreen
│           │
│           ├── SearchTab (Stack Navigator)
│           │   ├── SearchScreen
│           │   └── DetailScreen
│           │
│           ├── DownloadsTab
│           │   └── DownloadsScreen (Future)
│           │
│           ├── MyListTab (Stack Navigator)
│           │   ├── MyListScreen
│           │   └── DetailScreen
│           │
│           └── ProfileTab (Stack Navigator)
│               ├── ProfileScreen
│               └── Profile Settings Screens
│
└── Shared Components
    ├── ThemedText
    ├── ThemedView
    ├── HeaderTitle
    └── ErrorFallback
```

### Component Communication Patterns

```
┌─────────────────────────────────────────────────────────┐
│               Component Communication                    │
└─────────────────────────────────────────────────────────┘

Parent Component
      │
      ├─→ Props (Data Down)
      │                ↓
      │         Child Component
      │                │
      ←── Callbacks (Events Up)
      

Global State (Context)
      ↕
  All Components
      ↕
Consumers subscribe to changes
```

---

## 5. Navigation Structure

### Navigation Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                      NAVIGATION FLOW                            │
└────────────────────────────────────────────────────────────────┘

                    App Entry Point
                          │
                    Splash Screen
                          │
                    ┌─────┴─────┐
              Check First Launch
                          │
                ┌─────────┴─────────┐
                │                   │
              First              Returning
              Launch               User
                │                   │
              Onboard           Load Prefs
                │                   │
                └─────────┬─────────┘
                          │
              ┌───────────┴───────────┐
              │   Bottom Tab Navigator │
              └───────────┬───────────┘
                          │
          ┌───────┬───────┼───────┬───────┐
          │       │       │       │       │
        Home    Search  Download MyList Profile
          │       │       │       │       │
          │       │       │       │       │
          ↓       ↓       ↓       ↓       ↓
       [Stack] [Stack] [Screen] [Stack] [Stack]
          │       │               │       │
          │       │               │       │
        Detail  Detail          Detail  Settings
          │       │               │       │
          │       │               │       │
        Player  Player          Player  SubScreens
```

### Screen Transitions

| From Screen | To Screen | Transition | Gesture |
|------------|-----------|------------|---------|
| Home | Detail | Push (Slide) | Tap Card |
| Detail | Player | Modal (Slide Up) | Tap Play |
| Player | Detail | Dismiss | Swipe Down / Back |
| Search | Detail | Push | Tap Result |
| MyList | Detail | Push | Tap Item |
| Any | Profile | Tab Switch | Tap Tab |

---

## 6. Data Flow

### Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW PATTERN                         │
└─────────────────────────────────────────────────────────────┘

User Action (UI Event)
         │
         ↓
Event Handler (Component)
         │
         ↓
State Update (useState/Context)
         │
         ↓
Re-render (React)
         │
         ↓
UI Update (Visual Feedback)
         │
         ↓
Side Effects (useEffect)
         │
         ↓
Service Calls (if needed)
         │
         ↓
Storage/Cache Update
```

### Example: Playing a Video

```
1. User taps "Play" button on DetailScreen
         │
         ↓
2. onPress handler triggered
         │
         ↓
3. Navigate to VideoPlayerScreen with content data
         │
         ↓
4. VideoPlayerScreen renders with data
         │
         ↓
5. useEffect loads video from URL/source
         │
         ↓
6. Expo Video API initializes playback
         │
         ↓
7. Video player controls rendered
         │
         ↓
8. User interactions update player state
         │
         ↓
9. useEffect saves playback position periodically
         │
         ↓
10. On exit, final position saved to AsyncStorage
```

---

## 7. State Management

### State Categories

#### 1. Local Component State (useState)
```typescript
// Example: Video player controls visibility
const [controlsVisible, setControlsVisible] = useState(true);
const [isPlaying, setIsPlaying] = useState(false);
```

**Use for**:
- UI-specific state (modal open/closed, input values)
- Temporary state (loading indicators)
- Component-scoped data

#### 2. Global State (Context)
```typescript
// Example: Theme context
const ThemeContext = createContext<ThemeContextType>();

// Provider at app root
<ThemeContext.Provider value={themeValue}>
  <App />
</ThemeContext.Provider>

// Consumer in components
const theme = useContext(ThemeContext);
```

**Use for**:
- User preferences (theme, language)
- Authentication state
- Shared configuration

#### 3. Server State (Future)
```typescript
// Future: React Query or similar
const { data, isLoading } = useQuery('content', fetchContent);
```

**Use for**:
- API data caching
- Background synchronization
- Optimistic updates

### State Management Patterns

```
┌────────────────────────────────────────────────────────────┐
│              STATE MANAGEMENT STRATEGY                      │
└────────────────────────────────────────────────────────────┘

Component State
      │
      │  When state needs to be shared
      ├─→ Lift state up to nearest common parent
      │
      │  When state is deeply nested or widely used
      ├─→ Use Context API
      │
      │  When state is complex with multiple actions
      ├─→ Use useReducer
      │
      │  When state comes from server
      └─→ Future: Use React Query or similar
```

---

## 8. Technology Stack Details

### Core Dependencies

```typescript
{
  "dependencies": {
    // Framework
    "expo": "^54.0.23",
    "react": "19.1.0",
    "react-native": "0.81.5",
    
    // Navigation
    "@react-navigation/native": "^7.1.8",
    "@react-navigation/bottom-tabs": "^7.4.0",
    "@react-navigation/native-stack": "^7.3.16",
    
    // Media
    "expo-video": "~3.0.14",
    "expo-av": "~16.0.7",
    "expo-image": "~3.0.10",
    
    // UI/Animations
    "react-native-reanimated": "~4.1.1",
    "react-native-gesture-handler": "~2.28.0",
    "expo-linear-gradient": "^15.0.7",
    "expo-blur": "^15.0.7",
    "expo-haptics": "~15.0.7",
    
    // Utilities
    "@expo/vector-icons": "^15.0.2",
    "expo-status-bar": "~3.0.8",
    "expo-screen-orientation": "~9.0.7"
  }
}
```

### Technology Justification

| Technology | Purpose | Why Chosen |
|-----------|---------|------------|
| **Expo** | Development platform | Faster development, managed workflow, easy updates |
| **React Native** | Mobile framework | Cross-platform, large ecosystem, performance |
| **TypeScript** | Type system | Type safety, better IDE support, fewer bugs |
| **React Navigation** | Routing | Best-in-class navigation, customizable, performant |
| **Reanimated** | Animations | Runs on UI thread, smooth 60fps animations |
| **Expo Video** | Video playback | Native performance, feature-rich, well-maintained |

---

## 9. Design Patterns

### Patterns Used in Ignisplay

#### 1. **Container/Presenter Pattern**
```typescript
// Container (Business Logic)
export default function HomeScreen() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadContent();
  }, []);
  
  return <HomeView content={content} loading={loading} />;
}

// Presenter (Pure UI)
function HomeView({ content, loading }) {
  return (
    <View>
      {loading ? <Loader /> : <ContentList items={content} />}
    </View>
  );
}
```

#### 2. **Compound Component Pattern**
```typescript
// Flexible composition
<VideoPlayer>
  <VideoPlayer.Video source={source} />
  <VideoPlayer.Controls>
    <VideoPlayer.PlayButton />
    <VideoPlayer.Timeline />
    <VideoPlayer.VolumeControl />
  </VideoPlayer.Controls>
</VideoPlayer>
```

#### 3. **Custom Hooks Pattern**
```typescript
// Reusable stateful logic
function useVideo(source) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  
  return { isPlaying, progress, play, pause };
}
```

#### 4. **Error Boundary Pattern**
```typescript
// Graceful error handling
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## 10. Security Architecture

### Security Measures

#### 1. **Data Encryption**
```
┌─────────────────────────────────────┐
│       Data Security Layers          │
├─────────────────────────────────────┤
│ 1. HTTPS for all network requests   │
│ 2. Encrypted AsyncStorage (future)  │
│ 3. Secure credential storage         │
│ 4. No sensitive data in logs        │
└─────────────────────────────────────┘
```

#### 2. **Input Validation**
- Sanitize all user inputs
- Validate data types
- Prevent injection attacks

#### 3. **Secure Storage**
```typescript
// Future: Using Expo SecureStore
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('userToken', token);
const token = await SecureStore.getItemAsync('userToken');
```

#### 4. **Permission Management**
- Request permissions only when needed
- Explain why permissions are required
- Handle permission denials gracefully

### Privacy Considerations

1. **Data Collection**: Minimize data collection
2. **User Consent**: Explicit consent for tracking
3. **Data Retention**: Clear retention policies
4. **GDPR Compliance**: Right to erasure, data portability

---

## Appendices

### A. File Structure

```
ignisplay/
├── app/                      # Expo Router (if used)
├── assets/                   # Images, fonts, videos
├── components/               # Reusable components
│   ├── ThemedText.tsx
│   ├── ThemedView.tsx
│   ├── HeaderTitle.tsx
│   ├── ErrorBoundary.tsx
│   └── ErrorFallback.tsx
├── constants/                # App constants
│   └── Colors.ts
├── hooks/                    # Custom hooks
│   ├── useColorScheme.ts
│   ├── useThemeColor.ts
│   └── useSafeAreaInsets.ts
├── navigation/               # Navigation setup
│   ├── BottomTabNavigator.tsx
│   ├── types.ts
│   └── index.tsx
├── screens/                  # Screen components
│   ├── HomeScreen.tsx
│   ├── DetailScreen.tsx
│   ├── VideoPlayerScreen.tsx
│   ├── SearchScreen.tsx
│   ├── MyListScreen.tsx
│   └── ProfileScreen.tsx
├── services/                 # Service layer (future)
│   ├── api/
│   ├── storage/
│   └── media/
├── types/                    # TypeScript types
│   └── index.ts
├── utils/                    # Utility functions
├── App.tsx                   # App entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

### B. Performance Optimization Strategies

1. **Image Optimization**
   - Use Expo Image with caching
   - Lazy load off-screen images
   - Appropriate image sizes

2. **List Performance**
   - FlatList with virtualization
   - Proper key extraction
   - Memoized list items

3. **Animation Performance**
   - Use Reanimated for UI thread animations
   - Avoid animating layout properties
   - Use native driver when possible

4. **Bundle Size Optimization**
   - Tree shaking
   - Code splitting (future)
   - Remove unused dependencies

### C. Scalability Considerations

#### Current Architecture Scalability

✅ **Easy to Scale**:
- Adding new screens
- Adding new components
- Adding new features

⚠️ **Requires Planning**:
- Backend integration
- Complex state management
- Real-time features

🔄 **Future Refactoring Needed**:
- State management (consider Redux/Zustand)
- API layer abstraction
- Caching strategies

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 27, 2025 | Ph4nt0mByte | Initial architecture documentation |

---

**Document Status:** ✅ Approved for Submission  
**Submission Date:** December 27, 2025  
**Submission Method:** Email

---

*This document is confidential and proprietary to the Ignisplay project.*
