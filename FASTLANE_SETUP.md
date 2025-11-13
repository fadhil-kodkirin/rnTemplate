# Fastlane Setup Guide

This guide will walk you through setting up Fastlane for automated deployment to Firebase App Distribution.

## Prerequisites

- Ruby (comes pre-installed on macOS)
- Firebase project with Android/iOS apps configured
- Firebase service account credentials

## Step 1: Install Fastlane

### Android
```bash
cd android
bundle install
cd ..
```

### iOS
```bash
cd ios
bundle install
cd ..
```

## Step 2: Firebase Setup

### 2.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2.2 Add Your Apps to Firebase

**For Android:**
1. Click "Add app" → Android
2. Enter package name: `com.rntemplate`
3. Download `google-services.json` (optional, only if using Firebase SDK)

**For iOS:**
1. Click "Add app" → iOS
2. Enter bundle ID: `com.rntemplate`
3. Download `GoogleService-Info.plist` (optional, only if using Firebase SDK)

### 2.3 Enable App Distribution

1. In Firebase Console, go to "App Distribution" in the left menu
2. Get started with App Distribution
3. Note your App IDs:
   - Android: `1:123456789:android:abcdef123456`
   - iOS: `1:123456789:ios:abcdef123456`

### 2.4 Create Service Account

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file securely (e.g., `firebase-service-credentials.json`)
4. **IMPORTANT:** Never commit this file to version control

## Step 3: Configure Environment Variables

Update the `.env` file in the project root:

```env
# Firebase App Distribution
FIREBASE_APP_ID_ANDROID=1:123456789:android:abcdef123456
FIREBASE_APP_ID_IOS=1:123456789:ios:abcdef123456
FIREBASE_SERVICE_CREDENTIALS_FILE=/absolute/path/to/firebase-service-credentials.json

# Apple Developer (for iOS builds)
APPLE_ID=your_apple_id@example.com
TEAM_ID=XXXXXXXXXX
```

**Note:** Use absolute paths for `FIREBASE_SERVICE_CREDENTIALS_FILE`.

## Step 4: iOS Code Signing (iOS Only)

For iOS deployments, you need proper code signing:

### Option 1: Manual Setup
1. Open Xcode
2. Select your project → Signing & Capabilities
3. Enable "Automatically manage signing"
4. Select your Team

### Option 2: Fastlane Match (Recommended for Teams)
```bash
cd ios
bundle exec fastlane match development
bundle exec fastlane match adhoc
cd ..
```

## Step 5: Test Your Setup

### Android Test
```bash
cd android
bundle exec fastlane deploy_dev
cd ..
```

### iOS Test
```bash
cd ios
bundle exec fastlane deploy_dev
cd ..
```

## Step 6: Add Testers to Firebase

1. Go to Firebase Console → App Distribution
2. Click "Testers & Groups"
3. Add tester groups:
   - `internal-testers` - for development builds
   - `testers` - for production builds
4. Add tester email addresses

## Using Fastlane

### Via npm scripts
```bash
# Deploy Android
npm run fastlane:android

# Deploy iOS
npm run fastlane:ios
```

### Direct Fastlane commands

**Android:**
```bash
cd android

# Deploy release build
bundle exec fastlane deploy

# Deploy development build
bundle exec fastlane deploy_dev

cd ..
```

**iOS:**
```bash
cd ios

# Deploy release build
bundle exec fastlane deploy

# Deploy development build
bundle exec fastlane deploy_dev

cd ..
```

## Customizing Fastlane

### Android Fastfile
Located at `android/fastlane/Fastfile`

```ruby
lane :deploy do
  gradle(
    task: "clean assembleRelease",
    project_dir: "."
  )

  firebase_app_distribution(
    app: ENV["FIREBASE_APP_ID_ANDROID"],
    service_credentials_file: ENV["FIREBASE_SERVICE_CREDENTIALS_FILE"],
    release_notes: "New release from Fastlane",
    groups: "testers"  # Change tester group here
  )
end
```

### iOS Fastfile
Located at `ios/fastlane/Fastfile`

```ruby
lane :deploy do
  build_app(
    workspace: "RNTemplate.xcworkspace",
    scheme: "RNTemplate",
    configuration: "Release",
    export_method: "development",  # or "ad-hoc", "app-store"
    output_directory: "./build",
    output_name: "RNTemplate.ipa"
  )

  firebase_app_distribution(
    app: ENV["FIREBASE_APP_ID_IOS"],
    service_credentials_file: ENV["FIREBASE_SERVICE_CREDENTIALS_FILE"],
    release_notes: "New release from Fastlane",
    groups: "testers"  # Change tester group here
  )
end
```

## Common Customizations

### Custom Release Notes
```ruby
firebase_app_distribution(
  # ... other options
  release_notes: "Version 1.0.0\n- Feature 1\n- Feature 2\n- Bug fixes"
)
```

### Release Notes from File
```ruby
firebase_app_distribution(
  # ... other options
  release_notes_file: "./release_notes.txt"
)
```

### Multiple Tester Groups
```ruby
firebase_app_distribution(
  # ... other options
  groups: "internal-testers,qa-team,beta-testers"
)
```

### Individual Testers
```ruby
firebase_app_distribution(
  # ... other options
  testers: "tester1@example.com,tester2@example.com"
)
```

## Troubleshooting

### "Firebase service credentials file not found"
- Ensure the path in `.env` is absolute, not relative
- Verify the file exists at the specified location

### "App not found in Firebase"
- Double-check your Firebase App IDs in `.env`
- Ensure the app is properly added to your Firebase project

### iOS Code Signing Issues
- Verify your Apple Developer account is active
- Check that provisioning profiles are up to date
- Try using Fastlane Match for team certificate management

### Android Build Failures
- Clean the build: `cd android && ./gradlew clean && cd ..`
- Check that all SDK components are installed in Android Studio

### Permission Denied on Service Account
- Ensure the service account has "Firebase App Distribution Admin" role
- Re-download the service account JSON if necessary

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.0
      - name: Install dependencies
        run: |
          cd android
          bundle install
      - name: Deploy
        env:
          FIREBASE_APP_ID_ANDROID: ${{ secrets.FIREBASE_APP_ID_ANDROID }}
          FIREBASE_SERVICE_CREDENTIALS_FILE: ${{ secrets.FIREBASE_CREDENTIALS }}
        run: |
          cd android
          bundle exec fastlane deploy
```

## Security Best Practices

1. **Never commit sensitive files:**
   - Add `firebase-service-credentials.json` to `.gitignore`
   - Add `.env` to `.gitignore` (already done)

2. **Use environment variables:**
   - Store credentials in CI/CD secrets
   - Use different service accounts for different environments

3. **Limit service account permissions:**
   - Only grant "Firebase App Distribution Admin" role
   - Avoid using project owner accounts

## Additional Resources

- [Fastlane Documentation](https://docs.fastlane.tools/)
- [Firebase App Distribution](https://firebase.google.com/docs/app-distribution)
- [Fastlane Firebase Plugin](https://firebase.google.com/docs/app-distribution/android/distribute-fastlane)
