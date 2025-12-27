# Ignisplay 🎬

> A modern, premium mobile streaming application built with React Native & Expo

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

**Ignisplay** is a cross-platform mobile streaming application that delivers a Netflix-like experience with stunning design aesthetics, smooth animations, and robust functionality.

---

## ✨ Features

- 🏠 **Beautiful Home Screen** - Featured content carousel with categorized browsing
- 🎬 **Full-Featured Video Player** - Professional playback controls in landscape mode
- 🔍 **Smart Search** - Real-time content discovery with filters
- ❤️ **My List** - Personal content collection management
- 👤 **User Profiles** - Account settings and preferences
- 🎨 **Premium Design** - Glassmorphism, vibrant gradients, smooth animations
- 📱 **Cross-Platform** - Works on iOS and Android
- ⚡ **High Performance** - 60fps animations with React Native Reanimated

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI (installed automatically)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ph4nt0mByte/ignisplay.git
   cd ignisplay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

---

## 📚 Documentation

**Comprehensive project documentation is available in the [`docs/`](./docs/) folder:**

| Document | Description | Status |
|----------|-------------|--------|
| [📋 Requirements Specification](./docs/REQUIREMENTS_SPECIFICATION.md) | Complete functional/non-functional requirements, user stories, tech stack | ✅ Complete |
| [🎨 UI Mockups & Design System](./docs/UI_MOCKUPS.md) | Design system, 6 screen mockups, component library, animations | ✅ Complete |
| [🏗️ System Architecture](./docs/SYSTEM_ARCHITECTURE.md) | Architecture diagrams, data flow, navigation, patterns | ✅ Complete |
| [📖 Documentation Hub](./docs/README.md) | Overview and navigation for all documentation | ✅ Complete |

**→ Start with the [Documentation Hub](./docs/README.md) for a complete overview.**

---

## 🎯 Project Structure

```
ignisplay/
├── docs/                       # 📚 Comprehensive documentation
│   ├── README.md              # Documentation hub
│   ├── REQUIREMENTS_SPECIFICATION.md
│   ├── UI_MOCKUPS.md
│   └── SYSTEM_ARCHITECTURE.md
├── screens/                    # 📱 Screen components
│   ├── HomeScreen.tsx         # Main content browsing
│   ├── DetailScreen.tsx       # Content details
│   ├── VideoPlayerScreen.tsx  # Video playback
│   ├── SearchScreen.tsx       # Search functionality
│   ├── MyListScreen.tsx       # Saved content
│   └── ProfileScreen.tsx      # User settings
├── components/                 # 🧩 Reusable components
│   ├── ThemedText.tsx
│   ├── ThemedView.tsx
│   ├── HeaderTitle.tsx
│   ├── ErrorBoundary.tsx
│   └── ErrorFallback.tsx
├── navigation/                 # 🧭 Navigation setup
│   ├── BottomTabNavigator.tsx
│   └── types.ts
├── hooks/                      # 🎣 Custom React hooks
├── constants/                  # 🔧 App constants
├── assets/                     # 🖼️ Images, fonts, videos
├── App.tsx                     # 🚀 Entry point
├── app.json                    # ⚙️ Expo configuration
└── package.json                # 📦 Dependencies
```

---

## 🛠️ Technology Stack

### Core
- **React Native** 0.81.5 - Cross-platform mobile framework
- **Expo** SDK 54 - Development platform and tooling
- **TypeScript** 5.9 - Type-safe JavaScript

### Navigation
- **React Navigation** 7 - Screen navigation and routing
- Bottom Tabs + Native Stack navigators

### UI/Animations
- **React Native Reanimated** 4 - High-performance animations
- **React Native Gesture Handler** - Touch interactions
- **Expo Linear Gradient** - Gradient effects
- **Expo Blur** - Glassmorphism effects
- **Expo Haptics** - Tactile feedback

### Media
- **Expo Video** 3 - Video playback
- **Expo AV** - Audio/Video capabilities
- **Expo Image** - Optimized image loading

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 📱 Available Scripts

```bash
# Start development server
npm start
# or
npm run dev

# Run on specific platform
npm run android   # Android emulator
npm run ios       # iOS simulator
npm run web       # Web browser

# Code quality
npm run lint              # Run ESLint
npm run format            # Format with Prettier
npm run check:format      # Check formatting
```

---

## 🎨 Design System

Ignisplay features a comprehensive design system with:

- **Dark-first theme** with deep purple gradients (#1c1022, #2d1b3d)
- **Purple-pink gradient accents** for primary actions
- **Glassmorphism effects** throughout the UI
- **Smooth 60fps animations** using native driver
- **Custom typography** with Inter font family
- **Consistent spacing scale** (4px base unit)

See [UI Mockups](./docs/UI_MOCKUPS.md) for complete design specifications.

---

## 🏗️ Architecture

Ignisplay follows a **layered architecture** pattern:

1. **Presentation Layer** - React Native components and screens
2. **Business Logic Layer** - Navigation, state management, custom hooks
3. **Services Layer** - Media, UI, storage, and platform services
4. **Data Layer** - Mock data (MVP), future backend integration

See [System Architecture](./docs/SYSTEM_ARCHITECTURE.md) for detailed diagrams.

---

## 🚦 Development Status

### Phase 1: Planning & Design ✅ COMPLETE
- ✅ Requirements specification
- ✅ UI mockups (6 screens)
- ✅ System architecture
- ✅ MVP implementation
- ✅ Core features working

### Current Features (v1.0.0)
- ✅ Home screen with content browsing
- ✅ Content detail screen
- ✅ Video player with controls
- ✅ Search functionality
- ✅ My List management
- ✅ Profile & settings
- ✅ Smooth animations
- ✅ Glassmorphism effects

### Future Enhancements
- ⏳ Backend API integration
- ⏳ User authentication
- ⏳ Download for offline viewing
- ⏳ Social features (reviews, sharing)
- ⏳ Advanced recommendations
- ⏳ Multiple user profiles

---

## 📖 Learning Resources

- [Expo Documentation](https://docs.expo.dev/) - Official Expo guides
- [React Native Documentation](https://reactnative.dev/) - React Native fundamentals
- [React Navigation](https://reactnavigation.org/) - Navigation patterns
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide

---

## 🤝 Contributing

This is a proprietary project. Internal contributions should follow:

1. Read the [Requirements Specification](./docs/REQUIREMENTS_SPECIFICATION.md)
2. Follow the [Design System](./docs/UI_MOCKUPS.md)
3. Adhere to the [Architecture](./docs/SYSTEM_ARCHITECTURE.md)
4. Write TypeScript with strict mode
5. Follow ESLint/Prettier rules
6. Test on both iOS and Android

---

## 📄 License

**Proprietary and Confidential**  
© 2025 Ignisplay Project. All rights reserved.

This project is confidential and proprietary. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 📞 Support

**Project Repository:** [Ph4nt0mByte/ignisplay](https://github.com/Ph4nt0mByte/ignisplay)  
**Documentation:** [docs/README.md](./docs/README.md)  
**Version:** 1.0.0  
**Last Updated:** December 27, 2025

---

## 🎉 Acknowledgments

Built with ❤️ using:
- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [TypeScript](https://www.typescriptlang.org)

---

**Ready to explore?** Start by reading the [Documentation Hub](./docs/README.md) 📚
