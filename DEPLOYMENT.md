# CityFlow Deployment Guide

This guide covers deploying CityFlow to production for iOS, Android, and Web platforms.

## Prerequisites

- Expo account (free tier is sufficient)
- Apple Developer Account ($99/year) for iOS
- Google Play Developer Account ($25 one-time) for Android
- Domain name (for web deployment)

## 1. Prepare for Production

### Update App Configuration

Edit `app.json`:

```json
{
  "expo": {
    "name": "CityFlow",
    "slug": "cityflow",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.cityflow",
      "buildNumber": "1",
      "supportsTablet": true
    },
    "android": {
      "package": "com.yourcompany.cityflow",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundColor": "#E6F4FE"
      }
    }
  }
}
```

### Environment Variables

Create production environment file `.env.production`:

```bash
EXPO_PUBLIC_API_URL=https://api.cityflow.com
EXPO_PUBLIC_API_KEY=your_production_api_key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### Update Assets

Replace placeholder assets:
- `assets/images/icon.png` (1024x1024)
- `assets/images/splash-icon.png` (1284x2778)
- `assets/images/android-icon-foreground.png`
- `assets/images/favicon.png`

## 2. Build for iOS

### Install EAS CLI

```bash
npm install -g eas-cli
```

### Login to Expo

```bash
eas login
```

### Configure EAS Build

Create `eas.json`:

```json
{
  "build": {
    "production": {
      "ios": {
        "buildType": "release",
        "distribution": "store"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "your-app-store-connect-id",
        "appleTeamId": "your-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "./google-play-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

### Build iOS App

```bash
eas build --platform ios --profile production
```

This will:
1. Upload your code to Expo servers
2. Build the iOS app
3. Provide a download link for the `.ipa` file

### Submit to App Store

```bash
eas submit --platform ios --profile production
```

Or manually:
1. Download the `.ipa` file
2. Open Xcode → Window → Organizer
3. Upload to App Store Connect
4. Fill in app metadata
5. Submit for review

## 3. Build for Android

### Build Android App

```bash
eas build --platform android --profile production
```

This creates an APK or AAB file.

### Submit to Google Play

```bash
eas submit --platform android --profile production
```

Or manually:
1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Upload the APK/AAB
4. Fill in store listing details
5. Submit for review

## 4. Deploy Web Version

### Build for Web

```bash
npx expo export:web
```

This creates a `web-build` directory with static files.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=web-build
```

### Deploy to AWS S3 + CloudFront

```bash
# Install AWS CLI
aws s3 sync web-build/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 5. Over-The-Air (OTA) Updates

Expo supports OTA updates for JavaScript changes without app store review.

### Configure Updates

In `app.json`:

```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

### Publish Update

```bash
eas update --branch production --message "Bug fixes and improvements"
```

Users will receive the update automatically on next app launch.

## 6. CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy CityFlow

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
          
      - name: Build iOS
        run: eas build --platform ios --non-interactive --profile production
        
      - name: Build Android
        run: eas build --platform android --non-interactive --profile production
```

## 7. App Store Optimization (ASO)

### iOS App Store

Required assets:
- App icon (1024x1024)
- Screenshots (6.5", 5.5" displays)
- App preview video (optional)
- Privacy policy URL
- Support URL

Metadata:
- App name (30 characters)
- Subtitle (30 characters)
- Description (4000 characters)
- Keywords (100 characters)
- Category: Navigation or Lifestyle

### Google Play Store

Required assets:
- App icon (512x512)
- Feature graphic (1024x500)
- Screenshots (at least 2)
- Privacy policy URL

Metadata:
- Title (50 characters)
- Short description (80 characters)
- Full description (4000 characters)
- Category: Maps & Navigation or Shopping

## 8. Monitoring & Analytics

### Setup Sentry for Error Tracking

```bash
npm install @sentry/react-native
```

Configure in `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "@sentry/react-native/expo",
        {
          "organization": "your-org",
          "project": "cityflow"
        }
      ]
    ]
  }
}
```

### Setup Analytics

```bash
npm install expo-firebase-analytics
```

Or use Amplitude, Mixpanel, etc.

## 9. Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   npm install -g sharp-cli
   sharp -i assets/images/*.png -o assets/images/optimized/
   ```

2. **Enable Hermes** (Android)
   In `app.json`:
   ```json
   {
     "expo": {
       "android": {
         "enableHermes": true
       }
     }
   }
   ```

3. **Bundle Size Analysis**
   ```bash
   npx expo-bundle-analyzer
   ```

4. **Remove Console Logs**
   ```bash
   npm install babel-plugin-transform-remove-console --save-dev
   ```

## 10. Post-Deployment Checklist

- [ ] Test on real devices (iOS and Android)
- [ ] Verify all API endpoints work in production
- [ ] Test payment flows
- [ ] Verify push notifications
- [ ] Test deep linking
- [ ] Check analytics tracking
- [ ] Monitor error rates in Sentry
- [ ] Set up app store monitoring
- [ ] Prepare customer support channels
- [ ] Create user documentation
- [ ] Set up feedback collection

## 11. Versioning Strategy

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

Example: `1.2.3`

### Update Process

1. Update version in `app.json`
2. Update `buildNumber` (iOS) and `versionCode` (Android)
3. Create git tag: `git tag v1.2.3`
4. Build and submit

## 12. Rollback Strategy

### If Critical Bug Found

1. **Immediate**: Publish OTA update with fix
   ```bash
   eas update --branch production --message "Critical bug fix"
   ```

2. **If OTA not possible**: Submit expedited review
   - iOS: Request expedited review in App Store Connect
   - Android: Use staged rollout, pause at low percentage

3. **Worst case**: Remove app from stores temporarily

## 13. Maintenance

### Regular Tasks

- **Weekly**: Check crash reports and fix critical issues
- **Bi-weekly**: Review user feedback and ratings
- **Monthly**: Update dependencies
- **Quarterly**: Major feature releases

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update Expo SDK
npx expo upgrade

# Update other dependencies
npm update
```

## 14. Cost Estimates

### Development & Deployment

- Apple Developer: $99/year
- Google Play: $25 one-time
- Expo (optional): Free - $299/month
- Domain: $10-15/year
- Hosting (web): $0-50/month
- Backend hosting: Varies
- Push notifications: Free - $50/month
- Analytics: Free - $100/month
- Error tracking: Free - $50/month

### Ongoing Costs

- Server costs: $50-500/month
- Payment processing: 2.9% + $0.30 per transaction
- SMS/Email: $0.01-0.05 per message
- Maps API: $0-200/month (based on usage)
- CDN: $0-100/month

## Support

For deployment issues:
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Forums](https://forums.expo.dev/)
- [Expo Discord](https://chat.expo.dev/)
