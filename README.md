# React Native Template

A production-ready React Native template with TypeScript, React Navigation, React Native Reanimated, and environment configuration support.

## Features

- ⚛️ **React Native 0.82.1** - Latest stable version
- 📘 **TypeScript** - Full type safety
- 🧭 **React Navigation V6** - Native stack navigation with type-safe routing
- 🎨 **React Native Reanimated** - Smooth 60fps animations
- ⚙️ **React Native Config** - Environment-specific configuration
- 🚀 **Fastlane** - Automated deployment to Firebase App Distribution
- 📱 **iOS & Android** - Full platform support
- 🎯 **Clean Architecture** - Organized folder structure

## Project Structure

```
.
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx           # Main navigation setup
│   ├── screens/
│   │   ├── HomeScreen.tsx             # Home screen with env config demo
│   │   └── DetailsScreen.tsx          # Details screen with navigation params
│   └── components/
│       ├── AnimatedBox.tsx            # Reanimated animation demo
│       └── AnimatedButton.tsx         # Interactive animated button
├── android/
│   └── fastlane/                      # Fastlane configuration for Android
├── ios/
│   └── fastlane/                      # Fastlane configuration for iOS
├── .env                               # Fastlane & Firebase configuration
├── .env.development                   # Development environment variables
├── .env.production                    # Production environment variables
├── App.tsx                            # Root component
└── package.json                       # Dependencies and scripts
```

## Prerequisites

Before running this project, ensure you have the following installed:

### Required for All Platforms

- **Node.js**: Version 20 or higher
  - Check: `node --version`
  - Download: [https://nodejs.org/](https://nodejs.org/)

- **npm**: Comes with Node.js (or use yarn/pnpm)
  - Check: `npm --version`

- **Watchman** (recommended for better performance)
  - macOS: `brew install watchman`
  - Check: `watchman --version`

### For iOS Development (macOS only)

- **Xcode**: Version 14.0 or higher
  - Download from Mac App Store
  - Check: `xcodebuild -version`

- **Xcode Command Line Tools**
  - Install: `xcode-select --install`
  - Check: `xcode-select -p`

- **CocoaPods**: Version 1.13 or higher (excluding 1.15.0 and 1.15.1)
  - Install: `sudo gem install cocoapods`
  - Check: `pod --version`

- **Ruby**: Version 2.6.10 or higher
  - Check: `ruby --version`
  - Recommended: Use [rbenv](https://github.com/rbenv/rbenv) or [rvm](https://rvm.io/) for version management

- **iOS Simulator**: Install via Xcode
  - Minimum iOS version supported: Check Podfile for `min_ios_version_supported`

### For Android Development

- **JDK (Java Development Kit)**: Version 17 or higher
  - Check: `java -version`
  - Download: [https://adoptium.net/](https://adoptium.net/)

- **Android Studio**: Latest stable version
  - Download: [https://developer.android.com/studio](https://developer.android.com/studio)
  - Check: `android --version` or check in Android Studio

- **Android SDK**: Install via Android Studio
  - Required SDK versions (as configured in `android/build.gradle`):
    - **compileSdkVersion**: 35
    - **targetSdkVersion**: 35
    - **minSdkVersion**: 24
    - **buildToolsVersion**: 35.0.0
  - Install these via Android Studio SDK Manager

- **Android NDK**: Version 27.1.12297006
  - Install via Android Studio SDK Manager
  - Check: Located in Android SDK directory under `ndk/`

- **Gradle**: Version 9.0.0 (handled by wrapper, no manual install needed)
  - Automatically downloaded by `gradlew`
  - Check: `./gradlew --version` (run from android directory)

- **Kotlin**: Version 2.1.20 (configured in project, no manual install needed)

- **Android Emulator** or **Physical Device**
  - Set up via Android Studio AVD Manager
  - Enable USB debugging on physical devices

### For Fastlane Deployment (Optional)

- **Bundler**: Ruby dependency manager
  - Install: `gem install bundler`
  - Check: `bundle --version`

- **Fastlane Dependencies**
  - Install: `cd android && bundle install && cd ..` (for Android)
  - Install: `cd ios && bundle install && cd ..` (for iOS)

- **Firebase Project**: For App Distribution
  - Create project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
  - Download service account credentials

### Environment Variables Setup

Create the following environment files in the project root:

- `.env.development` - Development configuration
- `.env.production` - Production configuration
- `.env` - Fastlane and Firebase configuration (if using deployment)

### Verify Your Setup

Run these commands to verify your setup:

```bash
# Check Node.js
node --version  # Should be >= 20

# Check npm
npm --version

# Check Java (for Android)
java -version  # Should be >= 17

# Check Ruby (for iOS)
ruby --version  # Should be >= 2.6.10

# Check CocoaPods (for iOS, macOS only)
pod --version  # Should be >= 1.13

# Check Xcode (macOS only)
xcodebuild -version  # Should be >= 14.0

# Check Android SDK
# Open Android Studio > Settings > Android SDK
# Verify SDK 35 and build tools 35.0.0 are installed
```

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd RNTemplate
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

## Environment Configuration

This template uses `react-native-config` for environment-specific configuration.

### Environment Files

- `.env.development` - Development environment
- `.env.production` - Production environment

### Usage

The environment variables are automatically loaded based on your build configuration. Access them in your code:

```typescript
import Config from 'react-native-config';

console.log(Config.API_URL);
console.log(Config.APP_NAME);
console.log(Config.ENABLE_DEBUG);
```

### Changing Environment

**iOS:**
The environment is automatically selected based on build scheme (Debug uses `.env.development`, Release uses `.env.production`).

**Android:**
```bash
# Development build
ENVFILE=.env.development react-native run-android

# Production build
ENVFILE=.env.production react-native run-android --variant=release
```

## Running the App

### iOS

```bash
npm run ios
```

Or open `ios/RNTemplate.xcworkspace` in Xcode and run from there.

### Android

```bash
npm run android
```

Or open the `android` folder in Android Studio and run from there.

### Start Metro Bundler

```bash
npm start
```

## Available Scripts

### Basic Scripts
- `npm start` - Start Metro bundler
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Run Scripts (Development)
- `npm run android:dev` - Run Android app with development environment
- `npm run ios:dev` - Run iOS app with development environment

### Run Scripts (Production)
- `npm run android:prod` - Run Android app with production environment
- `npm run ios:prod` - Run iOS app with production environment

### Build Scripts (Development)
- `npm run build:android:dev` - Build Android debug APK
- `npm run build:ios:dev` - Build iOS debug IPA

### Build Scripts (Production)
- `npm run build:android:prod` - Build Android release APK
- `npm run build:ios:prod` - Build iOS release IPA

### Fastlane Deployment
- `npm run fastlane:android` - Deploy Android build to Firebase App Distribution
- `npm run fastlane:ios` - Deploy iOS build to Firebase App Distribution

## Libraries Included

### React Navigation V6
Provides native-like navigation with type-safe routing. Configured with Native Stack Navigator for optimal performance.

**Example:**
```typescript
navigation.navigate('Details', { itemId: 1, title: 'Item' });
```

### React Native Reanimated
The most powerful animation library for React Native, running animations on the native thread for 60fps performance.

**Example:**
```typescript
const offset = useSharedValue(0);

const animatedStyles = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));

offset.value = withSpring(100);
```

### React Native Config
Manage environment variables for different build configurations.

**Features:**
- Separate configurations for dev/staging/production
- Native access on both iOS and Android
- Type-safe with TypeScript definitions

### Fastlane
Automated deployment to Firebase App Distribution.

**Setup:**

1. Install Fastlane dependencies:
```bash
# Android
cd android && bundle install && cd ..

# iOS
cd ios && bundle install && cd ..
```

2. Configure Firebase App Distribution:
   - Create a Firebase project
   - Add your Android/iOS apps to Firebase
   - Download the service account JSON file
   - Update `.env` file with your Firebase configuration:

```env
FIREBASE_APP_ID_ANDROID=your_firebase_app_id_android
FIREBASE_APP_ID_IOS=your_firebase_app_id_ios
FIREBASE_SERVICE_CREDENTIALS_FILE=path/to/firebase-service-credentials.json
APPLE_ID=your_apple_id@example.com
TEAM_ID=your_team_id
```

3. Deploy:
```bash
# Deploy Android
npm run fastlane:android

# Deploy iOS
npm run fastlane:ios
```

**Custom Lanes:**
You can customize Fastlane lanes in:
- `android/fastlane/Fastfile` - Android deployment configuration
- `ios/fastlane/Fastfile` - iOS deployment configuration

## TypeScript

This template is fully typed with TypeScript. Key type definitions:

- Navigation types in `src/navigation/AppNavigator.tsx`
- Environment config types in `react-native-config.d.ts`

## Customization

### Changing App Name

1. Update `app.json`:
```json
{
  "name": "YourAppName",
  "displayName": "Your App Name"
}
```

2. For iOS, update display name in Xcode
3. For Android, update `android/app/src/main/res/values/strings.xml`

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add route type to `RootStackParamList` in `AppNavigator.tsx`
3. Add screen to stack navigator

### Adding Environment Variables

1. Add variable to `.env.development` and `.env.production`
2. Update type definitions in `react-native-config.d.ts`
3. Access via `Config.YOUR_VARIABLE`

## Troubleshooting

### react-native-screens ChoreographerCompat Error (Android)

If you encounter `Unresolved reference 'ChoreographerCompat'` error:

1. The `androidx.core:core` dependency has been added to `android/app/build.gradle`
2. Clean and rebuild:
```bash
cd android
./gradlew clean
cd ..
npm run android:dev
```

### iOS Build Issues

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Build Issues

```bash
cd android
./gradlew clean
cd ..
```

### After Installing Dependencies

If you get errors after `npm install`:

**Android:**
```bash
cd android && ./gradlew clean && cd ..
npm run android:dev
```

**iOS:**
```bash
cd ios && pod install && cd ..
npm run ios:dev
```

### Metro Bundler Issues

```bash
npm start -- --reset-cache
```

### Reanimated Not Working

Make sure `react-native-reanimated/plugin` is listed **last** in your `babel.config.js` plugins array.

### Environment Variables Not Loading

Make sure you're using the correct script:
- Development: `npm run android:dev` or `npm run ios:dev`
- Production: `npm run android:prod` or `npm run ios:prod`

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Config](https://github.com/luggit/react-native-config)
- [Fastlane Documentation](https://docs.fastlane.tools/)
- [Firebase App Distribution](https://firebase.google.com/docs/app-distribution)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
