# Quick Setup Instructions

## Initial Setup

1. **Install Dependencies**
```bash
npm install
```

2. **iOS Setup** (macOS only)
```bash
cd ios
pod install
cd ..
```

3. **Clean Android Build** (Important!)
```bash
cd android
./gradlew clean
cd ..
```

## Running the App

### Android Development
```bash
npm run android:dev
```

### iOS Development
```bash
npm run ios:dev
```

### Android Production
```bash
npm run android:prod
```

### iOS Production
```bash
npm run ios:prod
```

## Common Issues & Fixes

### ❌ React Native Gradle Plugin Not Found

**Error:**
```
Plugin [id: 'com.facebook.react.settings'] was not found
```

**Solution:**
Already fixed! The `pluginManagement` block in `android/settings.gradle` now includes proper repository configuration. Just clean and rebuild:
```bash
cd android
./gradlew clean
cd ..
npm run android:dev
```

### ❌ ChoreographerCompat Error (Android)

**Error:**
```
Unresolved reference 'ChoreographerCompat'
```

**Solution:**
Already fixed! The `androidx.core:core:1.12.0` dependency has been added to `android/app/build.gradle`. Just clean and rebuild:
```bash
cd android
./gradlew clean
cd ..
npm run android:dev
```

### ❌ Gradle Build Errors

**Solution:**
```bash
cd android
./gradlew clean
./gradlew --stop
cd ..
npm run android:dev
```

### ❌ iOS Pod Install Errors

**Solution:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios:dev
```

### ❌ Metro Bundler Cache Issues

**Solution:**
```bash
# Clear Metro cache
npm start -- --reset-cache

# Or in a new terminal, run:
npx react-native start --reset-cache
```

### ❌ Environment Variables Not Working

Make sure you're using the environment-specific scripts:
- ✅ `npm run android:dev` (loads .env.development)
- ✅ `npm run ios:dev` (loads .env.development)
- ❌ Don't use: `npm run android` or `react-native run-android`

## Build Commands

### Android Builds
```bash
# Debug APK
npm run build:android:dev

# Release APK
npm run build:android:prod
```

### iOS Builds
```bash
# Debug build
npm run build:ios:dev

# Release build
npm run build:ios:prod
```

## Fastlane Deployment

See [FASTLANE_SETUP.md](./FASTLANE_SETUP.md) for detailed Fastlane configuration.

```bash
# Deploy to Firebase App Distribution
npm run fastlane:android
npm run fastlane:ios
```

## First Time Setup Checklist

- [ ] Run `npm install`
- [ ] (iOS) Run `cd ios && pod install && cd ..`
- [ ] (Android) Run `cd android && ./gradlew clean && cd ..`
- [ ] Configure `.env` file with Firebase credentials (if using Fastlane)
- [ ] Update `android/app/src/main/res/values/strings.xml` with your app name
- [ ] Update `app.json` with your app details
- [ ] (iOS) Update bundle identifier in Xcode
- [ ] (Android) Update package name in `android/app/build.gradle`

## Testing Everything Works

Run a basic test to ensure everything is set up correctly:

```bash
# Check TypeScript
npx tsc --noEmit

# Check ESLint
npm run lint

# Run tests
npm test

# Check React Native doctor
npx react-native doctor
```

## Need Help?

- Check [README.md](./README.md) for full documentation
- Check [FASTLANE_SETUP.md](./FASTLANE_SETUP.md) for deployment setup
- Review the Troubleshooting section in README.md
