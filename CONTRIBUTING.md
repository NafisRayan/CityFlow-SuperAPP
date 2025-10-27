# Contributing to CityFlow

Thank you for your interest in contributing to CityFlow! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Project Structure](#project-structure)
8. [Testing](#testing)
9. [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Accept responsibility for mistakes

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Any unprofessional conduct

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)
- iOS Simulator (Mac) or Android Emulator

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cityflow.git
   cd cityflow
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/cityflow.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow the coding standards
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Test on iOS
npm run ios

# Test on Android
npm run android

# Test on Web
npm run web
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

See [Commit Guidelines](#commit-guidelines) for commit message format.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub and create a Pull Request
- Fill in the PR template
- Link related issues
- Request review from maintainers

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use type inference where appropriate

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // implementation
}

// Bad
function getUser(id: any): any {
  // implementation
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

```typescript
// Good
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

### Styling

- Use StyleSheet.create() for styles
- Follow the existing design system
- Use constants for colors and spacing
- Keep styles close to components

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    padding: SPACING.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});
```

### File Organization

```
src/
├── app/              # Screens (one per file)
├── components/       # Reusable components
│   └── common/      # Shared UI components
├── services/        # API services
├── contexts/        # React contexts
├── types/           # TypeScript types
├── utils/           # Helper functions
└── data/            # Mock data
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
  - `Button.tsx`, `UserProfile.tsx`
  - `helpers.ts`, `constants.ts`

- **Components**: PascalCase
  - `UserProfile`, `RideCard`

- **Functions**: camelCase
  - `getUserData`, `calculatePrice`

- **Constants**: UPPER_SNAKE_CASE
  - `API_BASE_URL`, `MAX_RETRIES`

- **Types/Interfaces**: PascalCase
  - `User`, `RideRequest`, `ApiResponse`

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
# Feature
git commit -m "feat(rides): add real-time driver tracking"

# Bug fix
git commit -m "fix(food): resolve cart item duplication issue"

# Documentation
git commit -m "docs: update API integration guide"

# Refactor
git commit -m "refactor(services): simplify API error handling"
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Reference issues and PRs in the footer

## Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Tested on iOS and Android (if applicable)
- [ ] No TypeScript errors
- [ ] No ESLint warnings

### PR Title Format

Follow the same format as commit messages:

```
feat(rides): add real-time driver tracking
fix(food): resolve cart item duplication
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on Web

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Added comments
- [ ] Updated documentation
- [ ] No new warnings
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited in the changelog

## Project Structure

### Adding a New Screen

1. Create file in `src/app/` or `src/app/(tabs)/`
2. Export a React component
3. Add navigation if needed
4. Update types if necessary

```typescript
// src/app/settings.tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}
```

### Adding a New Component

1. Create file in `src/components/` or `src/components/common/`
2. Define prop types
3. Export component
4. Add to index if creating a component library

```typescript
// src/components/common/Badge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary';
}

export default function Badge({ text, variant = 'primary' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant]]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  primary: {
    backgroundColor: '#3B82F6',
  },
  secondary: {
    backgroundColor: '#10B981',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
```

### Adding a New API Service

1. Create file in `src/services/`
2. Import base API service
3. Define service methods
4. Export service object

```typescript
// src/services/example.service.ts
import api from './api';
import type { Example } from '../types';

export const exampleService = {
  async getAll(): Promise<Example[]> {
    return api.get<Example[]>('/examples');
  },

  async getById(id: string): Promise<Example> {
    return api.get<Example>(`/examples/${id}`);
  },

  async create(data: Partial<Example>): Promise<Example> {
    return api.post<Example>('/examples', data);
  },
};
```

### Adding Types

Add to `src/types/index.ts`:

```typescript
export interface NewType {
  id: string;
  name: string;
  // ... other fields
}
```

## Testing

### Manual Testing

Test your changes on all supported platforms:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] UI looks correct on different screen sizes
- [ ] Navigation works properly
- [ ] State updates correctly
- [ ] Error handling works

### Future: Automated Testing

We plan to add:
- Unit tests (Jest)
- Component tests (React Native Testing Library)
- E2E tests (Detox)

## Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document component props
- Explain non-obvious logic

```typescript
/**
 * Calculates the estimated ride price based on distance and ride type
 * @param distance - Distance in kilometers
 * @param rideType - Type of ride (economy, comfort, premium, xl)
 * @param basePrice - Base price for the ride (default: 5)
 * @returns Estimated price in dollars
 */
export function calculateRidePrice(
  distance: number,
  rideType: string,
  basePrice: number = 5
): number {
  // implementation
}
```

### README Updates

Update relevant documentation when:
- Adding new features
- Changing architecture
- Updating dependencies
- Modifying setup process

## Questions?

- Check existing documentation
- Search closed issues
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Credited in release notes
- Added to contributors list

Thank you for contributing to CityFlow! 🚀
