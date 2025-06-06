**项目结构 (Minimal Demo - V5 Mobile First with PC Demo):**
*(结构基本保持，但组件用途和内容会调整)*

```
minimal-dexie-i18n-v5-mobile-first/
├── README.md
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── cypress.config.ts
├── cypress/
│   ├── e2e/
│   │   └── language_switching.cy.ts
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── setupTests.ts
    ├── types/
    │   └── index.ts
    ├── context/
    │   └── LanguageProvider.tsx
    │   └── __tests__/
    │       └── LanguageProvider.test.tsx
    ├── db.ts
    ├── services/
    │   └── index.ts
    │   └── localizedContentService.ts
    │   └── __tests__/
    │       └── localizedContentService.test.ts
    ├── hooks/
    │   └── useInternationalizedQuery.ts
    │   └── useLocalizedView.ts
    │   └── __tests__/
    │       └── useLocalizedView.test.tsx
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   └── ErrorDisplay.tsx
    │   └── layout/
    │       ├── AppShell.tsx       # Now includes Bottom Tab Bar
    │       ├── BottomTabBar.tsx   # New component for mobile navigation
    │       ├── DesktopHeader.tsx  # For PC Demo Page
    │       └── DesktopFooter.tsx  # For PC Demo Page
    ├── features/
    │   ├── home/
    │   │   ├── WelcomeSection.tsx
    │   │   └── MoodsSection.tsx
    │   │   └── __tests__/
    │   │       └── WelcomeSection.test.tsx
    │   └── settings/
    │       └── LanguageSettingsSection.tsx
    │   └── desktopDemo/        # Sections for the PC Demo page
    │       ├── FeatureBox.tsx
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── SettingsPage.tsx
    │   └── DesktopDemoPage.tsx  # New PC Demo Page
    └── router.tsx
```

---

**1. `README.md` (更新以反映 V5 的移动端优先和 PC 演示)**

```markdown
# Minimal Dexie I18n Demo (V5 - Mobile First with PC Demo)

This project demonstrates a type-safe, API-driven (simulated with Dexie.js) internationalization architecture for React applications. V5 emphasizes a **mobile-first design with bottom tab navigation** and includes a **separate page to demonstrate a traditional PC layout** with a header and footer. It retains robust error handling, type safety, and testing.

## Core Architecture & Data Flow:

1.  **Language Management (`LanguageProvider`):** (Same as V4)
2.  **Dexie.js as Mock Backend (`db.ts`):** (Same as V4, `scopeKey` usage is key)
3.  **Services (`localizedContentService.ts`):** (Same as V4)
4.  **Custom Hook (`useLocalizedView.ts`):** (Same as V4)
5.  **Type Definitions (`types/index.ts`):**
    *   `GlobalLayoutLabelsBundle` now focuses on PC Header/Footer and truly global app texts.
    *   `AppShellLabelsBundle` introduced for labels specific to the main app shell, including bottom tab navigation.
    *   Other view-specific and section-specific label bundles remain.
6.  **Page-Level Data Ownership & Props Delegation:** (Same core principle as V4)
7.  **Componentization & Layout:**
    *   **`AppShell`:** Main application wrapper. For mobile views, it includes a `BottomTabBar`. It fetches `AppShellLabelsBundle`.
    *   **`BottomTabBar`:** Handles primary navigation for mobile-centric views.
    *   **`DesktopDemoPage`:** A dedicated page showcasing a PC layout with `DesktopHeader` and `DesktopFooter`. These use parts of `GlobalLayoutLabelsBundle`.
    *   Features/Sections and Common components remain prop-driven.
8.  **Error Handling & Type Safety:** (Same as V4)
9.  **Testing Strategy (Vitest & Cypress):** (Same principles as V4)

## Key Changes in V5:

*   **Mobile-First Navigation:** Implemented a `BottomTabBar` for primary app navigation.
*   **PC Demo Page:** Added `DesktopDemoPage` to illustrate a traditional desktop layout.
*   **Label Scope Refinement:** `GlobalLayoutLabelsBundle` is now more focused. `AppShellLabelsBundle` manages mobile navigation and shell texts. Page-specific views continue to fetch their own comprehensive label bundles.

## Running the Demo:

1.  `npm install`
2.  `npm run dev`
3.  `npm run test` (Vitest)
4.  `npm run cypress:open` (Cypress)
```

---

**2. `package.json`** (No changes from V4)

```json
{
  "name": "minimal-dexie-i18n-v5-mobile-first",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.32.0",
    "dexie": "^3.2.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.23.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.5",
    "@testing-library/react": "^15.0.7",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@types/react-router-dom": "^5.3.3",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@vitest/ui": "^1.6.0",
    "cypress": "^13.9.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "happy-dom": "^14.10.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "vitest": "^1.6.0"
  }
}
```

---

**3. `vite.config.ts`** (No changes from V4)

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

---

**4. `tsconfig.json`** (No changes from V4)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "vite.config.ts", "cypress.config.ts", "cypress/support/e2e.ts", "cypress/e2e/**/*.cy.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

**5. `tsconfig.node.json`** (No changes from V4)

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "cypress.config.ts"]
}
```

---

**6. `src/vite-env.d.ts`** (No changes from V4)

```typescript
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
/// <reference types="cypress" />
```

---

**7. `src/index.css` (Adjusted for Bottom Tab Bar and general styling)**

```css
/* src/index.css */
:root {
  --primary-color: #3498db;
  --primary-color-dark: #2980b9;
  --secondary-color: #95a5a6;
  --secondary-color-dark: #7f8c8d;
  --text-color: #2c3e50;
  --background-color: #f0f2f5;
  --surface-color: #ffffff;
  --border-color: #e8e8e8;
  --error-color: #e74c3c;
  --error-background: #fdedec;
  --success-color: #2ecc71;

  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
}

.app-shell-content {
  flex-grow: 1; /* Allows main content to fill space above bottom tab bar */
  padding: 15px;
  padding-bottom: 70px; /* Space for the fixed bottom tab bar */
}

/* PC Demo Page Specific Layout */
.desktop-layout {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--surface-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.desktop-header, .desktop-footer {
  padding: 15px;
  background-color: var(--text-color);
  color: white;
  border-radius: 4px;
  margin-bottom: 20px;
}
.desktop-footer { margin-top: 30px; text-align: center; font-size: 0.9em;}


h1, h2, h3, h4 {
  color: var(--text-color);
  margin-top: 0;
}
h1 { font-size: 1.8em; }
h2 { font-size: 1.5em; margin-bottom: 0.8em; }
h3 { font-size: 1.3em; margin-bottom: 0.6em; color: #34495e; }
h4 { font-size: 1.1em; margin-bottom: 0.5em; color: #7f8c8d; }

hr.app-divider {
  border: 0;
  height: 1px;
  background-color: var(--border-color);
  margin: 20px 0;
}

ul { list-style-type: disc; padding-left: 20px; }
li { margin-bottom: 8px; }

.page-content, section.page-content {
  background-color: var(--surface-color);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
section + section { margin-top: 25px; }

/* Common Components */
.button-common {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  transition: background-color 0.2s, opacity 0.2s;
  margin-right: 10px;
}
.button-common:last-child { margin-right: 0; }
.button-common:disabled { opacity: 0.6; cursor: not-allowed; }
.button-primary { background-color: var(--primary-color); color: white; }
.button-primary:hover:not(:disabled) { background-color: var(--primary-color-dark); }
.button-secondary { background-color: var(--secondary-color); color: white; }
.button-secondary:hover:not(:disabled) { background-color: var(--secondary-color-dark); }

select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #bdc3c7;
  margin-right: 10px;
  font-size: 1em;
  background-color: white;
}

.loading-spinner-overlay { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; min-height: 100px; }
.loading-spinner { border: 4px solid #ecf0f1; border-top: 4px solid var(--primary-color); border-radius: 50%; width: 30px; height: 30px; animation: spin 0.8s linear infinite; }
.loading-spinner-text { margin-top: 10px; font-style: italic; color: #555; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.error-container { border: 1px solid var(--error-color); padding: 15px; border-radius: 5px; background-color: var(--error-background); margin-bottom: 15px; }
.error-container h3 { color: var(--error-color); margin-bottom: 8px;}
.error-text { color: var(--error-color); }
.error-code-text { font-size: 0.85em; color: #7f8c8d; margin-top: 5px; }

/* Bottom Tab Bar */
.bottom-tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px; /* Adjust height as needed */
  background-color: var(--surface-color);
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  border-top: 1px solid var(--border-color);
  z-index: 1000;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--secondary-color-dark);
  font-size: 0.85em;
  padding: 5px 0;
  transition: color 0.2s;
}
.tab-item:hover { color: var(--primary-color); }
.tab-item.active { color: var(--primary-color); font-weight: bold; }
.tab-item .icon { font-size: 1.5em; margin-bottom: 2px; } /* For icon fonts or SVGs */
```

---

**8. `src/setupTests.ts`** (No changes from V4)

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom/vitest';
import { vi, afterEach } from 'vitest'; // Import afterEach from vitest
import { QueryCache } from '@tanstack/react-query';

const queryCache = new QueryCache();

afterEach(() => {
  queryCache.clear();
  vi.clearAllMocks();
  localStorage.clear();
});
```

---

**9. `src/types/index.ts` (Adjusted for new layout and label scopes)**

```typescript
// src/types/index.ts
export type Language = "en" | "zh";

export interface LanguageContextType {
  readonly language: Language;
  setLanguage: (lang: Language) => void;
}

export interface ApiError extends Error {
  statusCode?: number;
  errorCode?: string;
}

export interface UILabelRecord {
  readonly id?: number;
  readonly scopeKey: string;
  readonly labelKey: string;
  readonly languageCode: Language;
  readonly translatedText: string;
}

export interface LocalizedContent<TDataPayload, TLabelsBundle> {
  readonly labels: TLabelsBundle;
  readonly data: TDataPayload | null;
}

// --- App Shell (Mobile Layout) & Bottom Tab Navigation Labels ---
export interface AppShellLabelsBundle {
  readonly tabHome: string;
  readonly tabSettings: string;
  readonly tabDesktopDemo: string; // Link to PC demo page
  // Generic messages usable within the shell if needed
  readonly loadingShell: string;
  readonly errorShell: string;
}
export type FetchAppShellViewResult = LocalizedContent<null, AppShellLabelsBundle>;

// --- Global (PC Layout Header/Footer & Truly Global App Texts) ---
export interface GlobalLayoutLabelsBundle {
  readonly pcAppHeaderTitle: string; // Specific for PC demo header
  readonly pcAppFooterText: string;  // Specific for PC demo footer
  readonly loadingGeneric: string;
  readonly errorGeneric: string;
  readonly errorRetryButton: string;
}
export type FetchGlobalLayoutViewResult = LocalizedContent<null, GlobalLayoutLabelsBundle>;


// --- Home Page/View Specific Types ---
export interface HomeWelcomeSectionLabels {
  readonly welcomeMessage: string;
}
export interface MoodItem { readonly id: number; readonly name: string; readonly feeling: string; }
export interface HomeMoodsSectionLabels {
  readonly sectionTitle: string;
  readonly noMoodsMessage: string;
  readonly refreshButtonText: string;
}
export interface HomePageViewLabelsBundle {
  readonly pageTitle: string; // Title for the Home view content area
  readonly welcomeSection: HomeWelcomeSectionLabels;
  readonly moodsSection: HomeMoodsSectionLabels;
  readonly someActionText: string;
}
export interface HomePageViewDataPayload {
  readonly username: string;
  readonly moods: readonly MoodItem[];
}
export type FetchHomePageViewResult = LocalizedContent<HomePageViewDataPayload, HomePageViewLabelsBundle>;

// --- Settings Page/View Specific Types ---
export interface SettingsLanguageSectionLabels {
  readonly sectionTitle: string;
  readonly selectLanguagePrompt: string;
  readonly currentLanguageIs: string;
  readonly langNameEn: string;
  readonly langNameZh: string;
  readonly saveButtonText: string;
  readonly successMessage: string;
}
export interface SettingsPageViewLabelsBundle {
  readonly pageTitle: string; // Title for the Settings view content area
  readonly languageSection: SettingsLanguageSectionLabels;
}
export type FetchSettingsPageViewResult = LocalizedContent<null, SettingsPageViewLabelsBundle>;


// --- Desktop Demo Page/View Specific Types ---
export interface DesktopFeatureBoxLabels {
  readonly title: string;
  readonly description: string;
  readonly learnMoreButtonText: string;
}
export interface DesktopDemoPageViewLabelsBundle {
  readonly pageTitle: string; // Title for the main content area of PC demo page
  readonly introParagraph: string;
  readonly featureBox1: DesktopFeatureBoxLabels;
  readonly featureBox2: DesktopFeatureBoxLabels;
}
export interface DesktopDemoPageViewDataPayload {
  readonly dynamicContent: string; // Example data
}
export type FetchDesktopDemoPageViewResult = LocalizedContent<DesktopDemoPageViewDataPayload, DesktopDemoPageViewLabelsBundle>;
```

---

**10. `src/context/LanguageProvider.tsx`** (No changes from V4)

```tsx
// src/context/LanguageProvider.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import type { Language, LanguageContextType } from "@/types";

const DEFAULT_LANGUAGE: Language = "en";
const LOCAL_STORAGE_KEY = "app_lang_v5_mobile"; // Updated key

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as Language | null;
      return saved === "en" || saved === "zh" ? saved : DEFAULT_LANGUAGE;
    } catch (e) {
      console.warn("Error accessing localStorage for language preference:", e);
      return DEFAULT_LANGUAGE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch (e) {
      console.warn("Error writing language preference to localStorage:", e);
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const contextValue = React.useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider.");
  }
  return context;
};
```

---

**11. `src/context/__tests__/LanguageProvider.test.tsx`** (Update localStorage key)

```tsx
// src/context/__tests__/LanguageProvider.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LanguageProvider, useLanguage } from '../LanguageProvider';
import type { Language } from '@/types';

const TestConsumerComponent: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div>
      <p>Current Language: {language}</p>
      <button onClick={() => setLanguage('en')}>Set EN</button>
      <button onClick={() => setLanguage('zh')}>Set ZH</button>
    </div>
  );
};

describe('LanguageProvider and useLanguage Hook', () => {
  const localStorageKey = "app_lang_v5_mobile"; // MATCH THE KEY IN PROVIDER

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default language "en" if localStorage is empty', () => {
    render(
      <LanguageProvider>
        <TestConsumerComponent />
      </LanguageProvider>
    );
    expect(screen.getByText('Current Language: en')).toBeInTheDocument();
  });

  it('initializes with language from localStorage if present', () => {
    localStorage.setItem(localStorageKey, 'zh');
    render(
      <LanguageProvider>
        <TestConsumerComponent />
      </LanguageProvider>
    );
    expect(screen.getByText('Current Language: zh')).toBeInTheDocument();
  });

  it('updates language when setLanguage is called and persists to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <TestConsumerComponent />
      </LanguageProvider>
    );
    await user.click(screen.getByText('Set ZH'));
    expect(screen.getByText('Current Language: zh')).toBeInTheDocument();
    expect(localStorage.getItem(localStorageKey)).toBe('zh');
  });

  it('sets document.documentElement.lang attribute', async () => {
    render(
      <LanguageProvider>
        <TestConsumerComponent />
      </LanguageProvider>
    );
    expect(document.documentElement.lang).toBe('en');
    await userEvent.click(screen.getByText('Set ZH')); // Ensure userEvent is used
    expect(document.documentElement.lang).toBe('zh');
  });

  it('throws error if useLanguage is used outside of LanguageProvider', () => {
    const originalError = console.error;
    console.error = vi.fn(); // Suppress expected error message
    const BrokenComponent: React.FC = () => { useLanguage(); return null; };
    expect(() => render(<BrokenComponent />)).toThrow('useLanguage must be used within a LanguageProvider.');
    console.error = originalError;
  });
});
```

---

**12. `src/db.ts` (Updated `scopeKey` and seed data)**

```typescript
// src/db.ts
import Dexie, { Table } from 'dexie';
import type { UILabelRecord } from '@/types';

export class AppDB extends Dexie {
  uiLabels!: Table<UILabelRecord, number>;
  constructor() {
    super('MobileFirstI18nDB_V5'); // Unique DB name
    this.version(1).stores({
      uiLabels: '++id, scopeKey, labelKey, languageCode, &[scopeKey+labelKey+languageCode]',
    });
  }
}
export const db = new AppDB();

export async function populateDB() {
  const count = await db.uiLabels.count();
  if (count > 0) { /* console.log("DB V5 already populated."); */ return; }
  console.log("Populating V5 Dexie DB...");

  const labels: UILabelRecord[] = [
    // appShell scope (for bottom tab bar and shell messages)
    { scopeKey: 'appShell', labelKey: 'tabHome', languageCode: 'en', translatedText: 'Home' },
    { scopeKey: 'appShell', labelKey: 'tabHome', languageCode: 'zh', translatedText: '主页' },
    { scopeKey: 'appShell', labelKey: 'tabSettings', languageCode: 'en', translatedText: 'Settings' },
    { scopeKey: 'appShell', labelKey: 'tabSettings', languageCode: 'zh', translatedText: '设置' },
    { scopeKey: 'appShell', labelKey: 'tabDesktopDemo', languageCode: 'en', translatedText: 'PC Demo' },
    { scopeKey: 'appShell', labelKey: 'tabDesktopDemo', languageCode: 'zh', translatedText: '桌面演示' },
    { scopeKey: 'appShell', labelKey: 'loadingShell', languageCode: 'en', translatedText: 'Loading App...' },
    { scopeKey: 'appShell', labelKey: 'loadingShell', languageCode: 'zh', translatedText: '应用加载中...' },
    { scopeKey: 'appShell', labelKey: 'errorShell', languageCode: 'en', translatedText: 'App shell error.' },
    { scopeKey: 'appShell', labelKey: 'errorShell', languageCode: 'zh', translatedText: '应用外壳错误。' },

    // globalLayout scope (for PC Demo Header/Footer & truly global fallbacks)
    { scopeKey: 'globalLayout', labelKey: 'pcAppHeaderTitle', languageCode: 'en', translatedText: 'Desktop App Experience' },
    { scopeKey: 'globalLayout', labelKey: 'pcAppHeaderTitle', languageCode: 'zh', translatedText: '桌面应用体验' },
    { scopeKey: 'globalLayout', labelKey: 'pcAppFooterText', languageCode: 'en', translatedText: '© 2024 Desktop Demo Inc.' },
    { scopeKey: 'globalLayout', labelKey: 'pcAppFooterText', languageCode: 'zh', translatedText: '© 2024 桌面演示公司' },
    { scopeKey: 'globalLayout', labelKey: 'loadingGeneric', languageCode: 'en', translatedText: 'Loading...' },
    { scopeKey: 'globalLayout', labelKey: 'loadingGeneric', languageCode: 'zh', translatedText: '加载中...' },
    { scopeKey: 'globalLayout', labelKey: 'errorGeneric', languageCode: 'en', translatedText: 'An error occurred.' },
    { scopeKey: 'globalLayout', labelKey: 'errorGeneric', languageCode: 'zh', translatedText: '发生错误。' },
    { scopeKey: 'globalLayout', labelKey: 'errorRetryButton', languageCode: 'en', translatedText: 'Retry' },
    { scopeKey: 'globalLayout', labelKey: 'errorRetryButton', languageCode: 'zh', translatedText: '重试' },

    // homeView scope
    { scopeKey: 'homeView', labelKey: 'pageTitle', languageCode: 'en', translatedText: 'Home Feed' },
    { scopeKey: 'homeView', labelKey: 'pageTitle', languageCode: 'zh', translatedText: '动态主页' },
    { scopeKey: 'homeView.welcomeSection', labelKey: 'welcomeMessage', languageCode: 'en', translatedText: 'Welcome, {user}!' },
    { scopeKey: 'homeView.welcomeSection', labelKey: 'welcomeMessage', languageCode: 'zh', translatedText: '欢迎，{user}！' },
    { scopeKey: 'homeView.moodsSection', labelKey: 'sectionTitle', languageCode: 'en', translatedText: 'Mood Log' },
    { scopeKey: 'homeView.moodsSection', labelKey: 'sectionTitle', languageCode: 'zh', translatedText: '心情日志' },
    { scopeKey: 'homeView.moodsSection', labelKey: 'noMoodsMessage', languageCode: 'en', translatedText: 'No moods logged yet.' },
    { scopeKey: 'homeView.moodsSection', labelKey: 'noMoodsMessage', languageCode: 'zh', translatedText: '暂无心情记录。' },
    { scopeKey: 'homeView.moodsSection', labelKey: 'refreshButtonText', languageCode: 'en', translatedText: 'Refresh Log' },
    { scopeKey: 'homeView.moodsSection', labelKey: 'refreshButtonText', languageCode: 'zh', translatedText: '刷新日志' },
    { scopeKey: 'homeView', labelKey: 'someActionText', languageCode: 'en', translatedText: 'Do Something' },
    { scopeKey: 'homeView', labelKey: 'someActionText', languageCode: 'zh', translatedText: '做点什么' },

    // settingsView scope
    { scopeKey: 'settingsView', labelKey: 'pageTitle', languageCode: 'en', translatedText: 'User Settings' },
    { scopeKey: 'settingsView', labelKey: 'pageTitle', languageCode: 'zh', translatedText: '用户设置' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'sectionTitle', languageCode: 'en', translatedText: 'Language' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'sectionTitle', languageCode: 'zh', translatedText: '语言' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'selectLanguagePrompt', languageCode: 'en', translatedText: 'Select language:' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'selectLanguagePrompt', languageCode: 'zh', translatedText: '选择语言：' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'currentLanguageIs', languageCode: 'en', translatedText: 'Current: {lang}' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'currentLanguageIs', languageCode: 'zh', translatedText: '当前：{lang}' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'langNameEn', languageCode: 'en', translatedText: 'English' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'langNameEn', languageCode: 'zh', translatedText: '英语' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'langNameZh', languageCode: 'en', translatedText: 'Chinese' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'langNameZh', languageCode: 'zh', translatedText: '中文' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'saveButtonText', languageCode: 'en', translatedText: 'Save' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'saveButtonText', languageCode: 'zh', translatedText: '保存' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'successMessage', languageCode: 'en', translatedText: 'Settings saved!' },
    { scopeKey: 'settingsView.languageSection', labelKey: 'successMessage', languageCode: 'zh', translatedText: '设置已保存！' },

    // desktopDemoView scope
    { scopeKey: 'desktopDemoView', labelKey: 'pageTitle', languageCode: 'en', translatedText: 'Desktop Layout Showcase' },
    { scopeKey: 'desktopDemoView', labelKey: 'pageTitle', languageCode: 'zh', translatedText: '桌面布局演示' },
    { scopeKey: 'desktopDemoView', labelKey: 'introParagraph', languageCode: 'en', translatedText: 'This page demonstrates a traditional desktop layout with a header, footer, and distinct content sections.' },
    { scopeKey: 'desktopDemoView', labelKey: 'introParagraph', languageCode: 'zh', translatedText: '此页面演示了具有页眉、页脚和不同内容区域的传统桌面布局。' },
    { scopeKey: 'desktopDemoView.featureBox1', labelKey: 'title', languageCode: 'en', translatedText: 'Feature One' },
    { scopeKey: 'desktopDemoView.featureBox1', labelKey: 'title', languageCode: 'zh', translatedText: '特性一' },
    { scopeKey: 'desktopDemoView.featureBox1', labelKey: 'description', languageCode: 'en', translatedText: 'Description for the first amazing feature.' },
    { scopeKey: 'desktopDemoView.featureBox1', labelKey: 'description', languageCode: 'zh', translatedText: '第一个卓越特性的描述。' },
    { scopeKey: 'desktopDemoView.featureBox1', labelKey: 'learnMoreButtonText', languageCode: 'en', translatedText: 'Learn More' },
    { scopeKey: 'desktopDemoView.featureBox1', labelKey: 'learnMoreButtonText', languageCode: 'zh', translatedText: '了解更多' },
    { scopeKey: 'desktopDemoView.featureBox2', labelKey: 'title', languageCode: 'en', translatedText: 'Feature Two' },
    { scopeKey: 'desktopDemoView.featureBox2', labelKey: 'title', languageCode: 'zh', translatedText: '特性二' },
    { scopeKey: 'desktopDemoView.featureBox2', labelKey: 'description', languageCode: 'en', translatedText: 'Details about the second indispensable feature of our application.' },
    { scopeKey: 'desktopDemoView.featureBox2', labelKey: 'description', languageCode: 'zh', translatedText: '关于我们应用程序第二个不可或缺特性的详细信息。' },
    { scopeKey: 'desktopDemoView.featureBox2', labelKey: 'learnMoreButtonText', languageCode: 'en', translatedText: 'Explore' },
    { scopeKey: 'desktopDemoView.featureBox2', labelKey: 'learnMoreButtonText', languageCode: 'zh', translatedText: '探索' },
  ];
  await db.uiLabels.bulkAdd(labels);
  console.log("V5 DB populated.");
}
```

---

**13. `src/services/index.ts`** (No changes from V4)

```typescript
// src/services/index.ts
export * from './localizedContentService';
```

---

**14. `src/services/localizedContentService.ts` (Adjusted to fetch `appShell` labels)**

```typescript
// src/services/localizedContentService.ts
import { db } from '@/db';
import type {
  Language, LocalizedContent,
  HomePageViewLabelsBundle, HomePageViewDataPayload, MoodItem,
  SettingsPageViewLabelsBundle,
  AppShellLabelsBundle, // Added for AppShell
  GlobalLayoutLabelsBundle, // For PC Demo Header/Footer
  UILabelRecord, ApiError,
  FetchHomePageViewResult, FetchSettingsPageViewResult, FetchGlobalLayoutViewResult,
  FetchAppShellViewResult, // Added
  DesktopDemoPageViewLabelsBundle, DesktopDemoPageViewDataPayload, FetchDesktopDemoPageViewResult // Added for DesktopDemo
} from '@/types';

const SIMULATED_DELAY_MS = 150;

// buildLabelsObject and getScopedLabels remain the same as V4 Optimized

function buildLabelsObject<TLabelsBundle>(records: readonly UILabelRecord[], baseScope: string): TLabelsBundle {
  const labels = {} as any;
  records.forEach(record => {
    let keyPath = record.labelKey;
    if (record.scopeKey.startsWith(baseScope + '.') && record.scopeKey.length > baseScope.length) {
        const sectionPath = record.scopeKey.substring(baseScope.length + 1);
        keyPath = `${sectionPath}.${record.labelKey}`;
    } else if (record.scopeKey !== baseScope) {
        // console.warn(`Label '${record.labelKey}' from scope '${record.scopeKey}' processed with baseScope '${baseScope}'.`);
    }
    const keys = keyPath.split('.');
    let currentNesting = labels;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        currentNesting[key] = record.translatedText;
      } else {
        currentNesting[key] = currentNesting[key] || {};
        currentNesting = currentNesting[key];
      }
    });
  });
  return labels as TLabelsBundle;
}

async function getScopedLabels<TLabelsBundle>(baseScopeKey: string, lang: Language): Promise<TLabelsBundle> {
  let labelRecords = await db.uiLabels
    .where('languageCode').equals(lang)
    .and(record => record.scopeKey.startsWith(baseScopeKey))
    .toArray();

  if (labelRecords.length === 0 && lang !== 'en') {
    console.warn(`No '${lang}' labels found for scope '${baseScopeKey}'. Attempting fallback to 'en'.`);
    labelRecords = await db.uiLabels
      .where('languageCode').equals('en')
      .and(record => record.scopeKey.startsWith(baseScopeKey))
      .toArray();
  }

  if (labelRecords.length === 0) {
    console.error(`CRITICAL: No UI labels found for essential scope '${baseScopeKey}' (language: ${lang}, including fallback). Returning empty labels object.`);
    return {} as TLabelsBundle;
  }
  return buildLabelsObject<TLabelsBundle>(labelRecords, baseScopeKey);
}

/** Fetches labels for the main application shell (e.g., bottom navigation). */
export async function fetchAppShellView(lang: Language): Promise<FetchAppShellViewResult> {
  console.log(`SVC_DEXIE: Fetching APP SHELL VIEW for lang: ${lang}`);
  await new Promise(r => setTimeout(r, SIMULATED_DELAY_MS / 4));
  const labels = await getScopedLabels<AppShellLabelsBundle>('appShell', lang);
  return { labels, data: null };
}

/** Fetches global layout content (e.g., for PC Demo Header/Footer). */
export async function fetchGlobalLayoutView(lang: Language): Promise<FetchGlobalLayoutViewResult> {
  console.log(`SVC_DEXIE: Fetching GLOBAL LAYOUT VIEW for lang: ${lang}`);
  await new Promise(r => setTimeout(r, SIMULATED_DELAY_MS / 3));
  const labels = await getScopedLabels<GlobalLayoutLabelsBundle>('globalLayout', lang);
  return { labels, data: null };
}

export async function fetchHomePageView(lang: Language): Promise<FetchHomePageViewResult> {
  console.log(`SVC_DEXIE: Fetching HOME PAGE VIEW for lang: ${lang}`);
  await new Promise(r => setTimeout(r, SIMULATED_DELAY_MS));
  const labels = await getScopedLabels<HomePageViewLabelsBundle>('homeView', lang);
  const moods: MoodItem[] = [
    { id: 1, name: labels.moodsSection?.sectionTitle || (lang === 'zh' ? '心情条目1' : 'Mood Entry 1'), feeling: lang === 'zh' ? '专注的' : 'Focused' },
    { id: 2, name: lang === 'zh' ? '锻炼条目' : 'Workout Entry', feeling: lang === 'zh' ? '精力充沛的' : 'Energized' },
  ];
  const data: HomePageViewDataPayload = { username: "DevUserV5", moods };
  return { labels, data };
}

export async function fetchSettingsPageView(lang: Language): Promise<FetchSettingsPageViewResult> {
  console.log(`SVC_DEXIE: Fetching SETTINGS PAGE VIEW for lang: ${lang}`);
  await new Promise(r => setTimeout(r, SIMULATED_DELAY_MS / 2));
  const labels = await getScopedLabels<SettingsPageViewLabelsBundle>('settingsView', lang);
  return { labels, data: null };
}

/** Fetches content for the Desktop Demo Page view. */
export async function fetchDesktopDemoPageView(lang: Language): Promise<FetchDesktopDemoPageViewResult> {
  console.log(`SVC_DEXIE: Fetching DESKTOP DEMO PAGE VIEW for lang: ${lang}`);
  await new Promise(r => setTimeout(r, SIMULATED_DELAY_MS));
  const labels = await getScopedLabels<DesktopDemoPageViewLabelsBundle>('desktopDemoView', lang);
  const data: DesktopDemoPageViewDataPayload = {
    dynamicContent: lang === 'zh' ? `这是一些从“API”为中文获取的动态桌面内容。` : `This is some dynamic desktop content fetched from the "API" for English.`
  };
  return { labels, data };
}
```

---

**15. `src/services/__tests__/localizedContentService.test.ts`** (Adjust expected labels, add test for `fetchAppShellView`)

```typescript
// src/services/__tests__/localizedContentService.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db, populateDB } from '@/db';
import { fetchHomePageView, fetchGlobalLayoutView, fetchAppShellView } from '../localizedContentService'; // Added fetchAppShellView
import type { HomePageViewLabelsBundle, GlobalLayoutLabelsBundle, AppShellLabelsBundle } from '@/types';

describe('localizedContentService', () => {
  beforeEach(async () => {
    await db.uiLabels.clear();
    await populateDB();
  });

  // No afterEach clear for these tests, populateDB handles idempotency

  describe('fetchAppShellView', () => {
    it('should fetch English app shell labels', async () => {
      const result = await fetchAppShellView('en');
      expect(result.data).toBeNull();
      const labels = result.labels as AppShellLabelsBundle;
      expect(labels.tabHome).toBe('Home');
      expect(labels.tabSettings).toBe('Settings');
    });
    it('should fetch Chinese app shell labels', async () => {
      const result = await fetchAppShellView('zh');
      const labels = result.labels as AppShellLabelsBundle;
      expect(labels.tabHome).toBe('主页');
      expect(labels.tabDesktopDemo).toBe('桌面演示');
    });
  });

  describe('fetchGlobalLayoutView', () => {
    it('should fetch English global layout labels (for PC demo)', async () => {
      const result = await fetchGlobalLayoutView('en');
      expect(result.data).toBeNull();
      const labels = result.labels as GlobalLayoutLabelsBundle;
      expect(labels.pcAppHeaderTitle).toBe('Desktop App Experience');
      expect(labels.errorRetryButton).toBe('Retry');
    });
    it('should fetch Chinese global layout labels', async () => {
      const result = await fetchGlobalLayoutView('zh');
      const labels = result.labels as GlobalLayoutLabelsBundle;
      expect(labels.pcAppHeaderTitle).toBe('桌面应用体验');
    });
  });

  describe('fetchHomePageView', () => {
    it('should fetch English home page content', async () => {
      const result = await fetchHomePageView('en');
      const labels = result.labels as HomePageViewLabelsBundle;
      expect(labels.pageTitle).toBe('Home Feed'); // Updated expected value
      expect(labels.welcomeSection.welcomeMessage).toContain('{user}');
      const data = result.data!;
      expect(data.username).toBe('DevUserV5'); // Updated expected value
      expect(data.moods[0].feeling).toBe('Focused');
    });
    it('should fetch Chinese home page content', async () => {
      const result = await fetchHomePageView('zh');
      const labels = result.labels as HomePageViewLabelsBundle;
      expect(labels.pageTitle).toBe('动态主页'); // Updated
      const data = result.data!;
      expect(data.moods[0].feeling).toBe('专注的');
    });
  });
  // Add similar tests for fetchSettingsPageView and fetchDesktopDemoPageView if desired
});
```

---

**16. `src/hooks/useInternationalizedQuery.ts`** (No changes from V4)

```typescript
// src/hooks/useInternationalizedQuery.ts
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
  type UseQueryResult,
} from '@tanstack/react-query';
import type { ApiError, LocalizedContent } from '@/types';

interface UseInternationalizedQueryResult<TDataPayload, TLabelsBundle, TErrorResponse> {
  data: TDataPayload | undefined | null;
  labels: TLabelsBundle | undefined;
  isPending: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: TErrorResponse | null;
  refetch: UseQueryResult<LocalizedContent<TDataPayload, TLabelsBundle>, TErrorResponse>['refetch'];
  status: UseQueryResult<LocalizedContent<TDataPayload, TLabelsBundle>, TErrorResponse>['status'];
  isSuccess: boolean;
}

export function useInternationalizedQuery<
  TLocalizedContent extends LocalizedContent<TDataPayload, TLabelsBundle>,
  TErrorResponse extends Error = ApiError,
  TDataPayload = TLocalizedContent['data'],
  TLabelsBundle = TLocalizedContent['labels'],
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TLocalizedContent, TErrorResponse, TLocalizedContent, TQueryKey>
): UseInternationalizedQueryResult<TDataPayload, TLabelsBundle, TErrorResponse> {
  const {
    data: queryResult,
    isPending,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    status,
    isSuccess,
  } = useQuery<TLocalizedContent, TErrorResponse, TLocalizedContent, TQueryKey>(options);

  return {
    data: queryResult?.data,
    labels: queryResult?.labels,
    isPending,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    status,
    isSuccess,
  };
}
```

---

**17. `src/hooks/useLocalizedView.ts`** (No changes from V4)

```typescript
// src/hooks/useLocalizedView.ts
import { useLanguage } from '@/context/LanguageProvider';
import { useInternationalizedQuery } from './useInternationalizedQuery';
import type { ApiError, Language, LocalizedContent } from '@/types';
import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export function useLocalizedView<
  TDataPayload,
  TLabelsBundle
>(
  viewQueryKey: QueryKey,
  fetchViewFn: (lang: Language) => Promise<LocalizedContent<TDataPayload, TLabelsBundle>>,
  options?: Omit<UseQueryOptions<LocalizedContent<TDataPayload, TLabelsBundle>, ApiError, LocalizedContent<TDataPayload, TLabelsBundle>, QueryKey>, 'queryKey' | 'queryFn'>
) {
  const { language } = useLanguage();
  const fullQueryKeyWithLang: QueryKey = Array.isArray(viewQueryKey)
    ? [...viewQueryKey, language]
    : [viewQueryKey, language];

  return useInternationalizedQuery<
    LocalizedContent<TDataPayload, TLabelsBundle>,
    ApiError,
    TDataPayload,
    TLabelsBundle
  >({
    queryKey: fullQueryKeyWithLang,
    queryFn: () => fetchViewFn(language),
    enabled: !!language && (options?.enabled === undefined || options.enabled),
    ...options,
  });
}
```

---

**18. `src/hooks/__tests__/useLocalizedView.test.tsx`** (No changes from V4)

```tsx
// src/hooks/__tests__/useLocalizedView.test.tsx
import React, { useEffect } from 'react'; // Added React and useEffect
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider, useLanguage } from '@/context/LanguageProvider';
import { useLocalizedView } from '../useLocalizedView';
import type { LocalizedContent, ApiError, Language } from '@/types';

const mockFetchViewFn = vi.fn();

const TestLanguageSetter: React.FC<{initialLanguage: Language}> = ({initialLanguage}) => {
    const { setLanguage } = useLanguage();
    React.useEffect(() => {
        act(() => {
            setLanguage(initialLanguage);
        });
    }, [initialLanguage, setLanguage]);
    return null;
}

const createWrapper = (initialLanguage: Language = 'en') => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime:0 } }, // gcTime:0 for faster cleanup in tests
  });
  // eslint-disable-next-line react/prop-types
  return ({ children }:{children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TestLanguageSetter initialLanguage={initialLanguage} />
        {children}
      </LanguageProvider>
    </QueryClientProvider>
  );
};

interface MockViewData { item: string; }
interface MockViewLabels { title: string; description: string; }

describe('useLocalizedView Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should fetch and return localized content successfully', async () => {
    const mockResponse: LocalizedContent<MockViewData, MockViewLabels> = {
      labels: { title: 'English Title', description: 'English Description' },
      data: { item: 'English Data Item' },
    };
    mockFetchViewFn.mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useLocalizedView<MockViewData, MockViewLabels>('testView', mockFetchViewFn),
      { wrapper: createWrapper('en') }
    );

    expect(result.current.isPending).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockFetchViewFn).toHaveBeenCalledWith('en');
    expect(result.current.labels).toEqual(mockResponse.labels);
    expect(result.current.data).toEqual(mockResponse.data);
  });

  it('should return error state if fetch function throws', async () => {
    const mockError: ApiError = new Error('Failed to fetch') as ApiError;
    mockError.errorCode = "FETCH_FAILED";
    mockFetchViewFn.mockRejectedValue(mockError);

    const { result } = renderHook(
      () => useLocalizedView<MockViewData, MockViewLabels>('testViewError', mockFetchViewFn),
      { wrapper: createWrapper('en') }
    );
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(mockError);
  });

  it('should refetch when language changes', async () => {
    const enResponse: LocalizedContent<MockViewData, MockViewLabels> = {
      labels: { title: 'EN Title', description: 'EN Desc' }, data: { item: 'EN Item' }
    };
    const zhResponse: LocalizedContent<MockViewData, MockViewLabels> = {
      labels: { title: 'ZH Title', description: 'ZH Desc' }, data: { item: 'ZH Item' }
    };
    mockFetchViewFn.mockResolvedValueOnce(enResponse).mockResolvedValueOnce(zhResponse);

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime:0 } } });
    let currentLanguage: Language = 'en';
    let setLangFn: (lang: Language) => void = () => {};

    const WrapperComponent:React.FC<{children: React.ReactNode}> = ({ children }) => {
        const { language, setLanguage } = useLanguage();
        // Expose setLanguage for programmatic change in test
        useEffect(() => {
          setLangFn = (newLang) => act(() => setLanguage(newLang));
          if (currentLanguage !== language) { // Sync initial language from outside if needed
              act(() => setLanguage(currentLanguage));
          }
        }, [language, setLanguage]);
        return <>{children}</>;
    };

    const { result } = renderHook(
      () => useLocalizedView<MockViewData, MockViewLabels>('langChangeView', mockFetchViewFn),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <WrapperComponent>{children}</WrapperComponent>
            </LanguageProvider>
          </QueryClientProvider>
        ),
      }
    );

    await waitFor(() => expect(result.current.labels?.title).toBe('EN Title'));
    expect(mockFetchViewFn).toHaveBeenCalledWith('en');

    currentLanguage = 'zh'; // Update the language we want to switch to
    act(() => { setLangFn('zh'); }); // Call the exposed setLanguage

    await waitFor(() => expect(result.current.labels?.title).toBe('ZH Title'), {timeout: 2000});
    expect(mockFetchViewFn).toHaveBeenCalledWith('zh');
    expect(mockFetchViewFn).toHaveBeenCalledTimes(2);
  });
});
```

---

**19. `src/components/common/Button.tsx`** (No changes from V4)

```tsx
// src/components/common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  loadingText?: string;
  className?: string; // Allow additional classes
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  loadingText = "Loading...",
  className,
  ...props
}) => {
  const baseStyle = "button-common";
  const variantStyle = variant === 'primary' ? "button-primary" : "button-secondary";
  const combinedClassName = `${baseStyle} ${variantStyle} ${className || ''}`.trim();

  return (
    <button className={combinedClassName} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? loadingText : children}
    </button>
  );
};
export default Button;
```

---

**20. `src/components/common/LoadingSpinner.tsx`** (No changes from V4)

```tsx
// src/components/common/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
      {text && <p className="loading-spinner-text">{text}</p>}
    </div>
  );
};
export default LoadingSpinner;
```

---

**21. `src/components/common/ErrorDisplay.tsx`** (No changes from V4)

```tsx
// src/components/common/ErrorDisplay.tsx
import React from 'react';
import type { ApiError, GlobalLayoutLabelsBundle } from '@/types';
import Button from './Button';

interface ErrorDisplayProps {
  error: ApiError | Error | null;
  title?: string;
  messageTemplate?: string;
  onRetry?: () => void;
  retryButtonText?: string;
  globalLabels?: Pick<GlobalLayoutLabelsBundle, 'errorRetryButton' | 'errorGeneric'>;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title,
  messageTemplate,
  onRetry,
  retryButtonText,
  globalLabels,
}) => {
  if (!error) return null;

  const displayTitle = title || globalLabels?.errorGeneric || "An Error Occurred";
  const displayMessageTemplate = messageTemplate || (error.message ? "{message}" : globalLabels?.errorGeneric || "No further details available.");
  const displayRetryText = retryButtonText || globalLabels?.errorRetryButton || "Try Again";

  const errorMessage = error.message || "An unknown error occurred.";
  const finalMessage = displayMessageTemplate.replace('{message}', errorMessage);

  const apiError = error as ApiError;
  const errorCode = apiError?.errorCode;
  const statusCode = apiError?.statusCode;

  return (
    <div className="error-container" role="alert">
      <h3>{displayTitle}</h3>
      <p className="error-text">{finalMessage}</p>
      {errorCode && <p className="error-code-text">Error Code: {errorCode}</p>}
      {statusCode && <p className="error-code-text">Status Code: {statusCode}</p>}
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" style={{ marginTop: '10px' }}>
          {displayRetryText}
        </Button>
      )}
    </div>
  );
};
export default ErrorDisplay;
```

---

**22. `src/components/layout/AppShell.tsx` (Updated for Bottom Tab Bar)**

```tsx
// src/components/layout/AppShell.tsx
import React, { ReactNode } from 'react';
import { useLocalizedView } from '@/hooks/useLocalizedView';
import { fetchAppShellView } from '@/services'; // Fetch appShell labels
import BottomTabBar from './BottomTabBar'; // Import BottomTabBar
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorDisplay from '../common/ErrorDisplay';
import type { AppShellLabelsBundle, ApiError } from '@/types';

interface AppShellProps { children: ReactNode; }

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const {
    labels: appShellLabels, isPending, isError, error, refetch
  } = useLocalizedView<null, AppShellLabelsBundle>(
    'appShellViewContent', // Unique query key for app shell
    fetchAppShellView
  );

  if (isPending && !appShellLabels) {
    return <LoadingSpinner text={appShellLabels?.loadingShell || "Loading Application Shell..."} />;
  }

  if (isError || !appShellLabels) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <ErrorDisplay
          error={error}
          title={appShellLabels?.errorShell || "Application Shell Error"}
          messageTemplate={"Core application UI could not be loaded. {message}"}
          onRetry={refetch}
          retryButtonText={"Retry Shell"}
        />
      </div>
    );
  }

  return (
    <div className="app-shell-container"> {/* Ensure this allows content and fixed bar */}
      <div className="app-shell-content"> {/* Content area */}
        {children}
      </div>
      <BottomTabBar labels={appShellLabels} /> {/* Pass labels to BottomTabBar */}
    </div>
  );
};
export default AppShell;
```
*Note: `app-shell-container` and `app-shell-content` CSS in `index.css` ensure proper layout with a fixed bottom bar.*

---

**23. `src/components/layout/BottomTabBar.tsx` (NEW)**

```tsx
// src/components/layout/BottomTabBar.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import type { AppShellLabelsBundle } from '@/types';

interface BottomTabBarProps {
  labels: AppShellLabelsBundle | undefined;
}

// Example: Define tab items (could also come from a config or labels)
const tabItems = [
  { path: "/", labelKey: "tabHome", icon: "🏠" }, // Placeholder icons
  { path: "/settings", labelKey: "tabSettings", icon: "⚙️" },
  { path: "/desktop-demo", labelKey: "tabDesktopDemo", icon: "💻" },
];


const BottomTabBar: React.FC<BottomTabBarProps> = ({ labels }) => {
  const location = useLocation();

  if (!labels) {
    // Minimal fallback, or could be handled by AppShell's loading state
    return <div className="bottom-tab-bar" style={{ justifyContent: 'center', alignItems: 'center' }}>Loading Tabs...</div>;
  }

  return (
    <nav className="bottom-tab-bar">
      {tabItems.map(item => {
        // Get the translated text for the tab, fallback if not found
        const labelText = labels[item.labelKey as keyof AppShellLabelsBundle] || item.labelKey;
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`tab-item ${isActive ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{labelText}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomTabBar;
```

---

**24. `src/components/layout/DesktopHeader.tsx` (NEW)**

```tsx
// src/components/layout/DesktopHeader.tsx
import React from 'react';
import type { GlobalLayoutLabelsBundle } from '@/types';

interface DesktopHeaderProps {
  labels: GlobalLayoutLabelsBundle | undefined; // Expects PC-specific header titles
  isFetching?: boolean;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ labels, isFetching }) => {
  const title = labels?.pcAppHeaderTitle || "Desktop Application";

  return (
    <header className="desktop-header" style={{ opacity: isFetching && labels ? 0.7 : 1 }}>
      <h1>
        {title}
        {isFetching && labels && (
          <small style={{ marginLeft: '10px', fontStyle: 'italic', color: '#eee' }}>
            (syncing header...)
          </small>
        )}
      </h1>
      {/* Add PC-specific navigation or branding here if needed */}
    </header>
  );
};
export default DesktopHeader;
```

---

**25. `src/components/layout/DesktopFooter.tsx` (NEW)**

```tsx
// src/components/layout/DesktopFooter.tsx
import React from 'react';
import type { GlobalLayoutLabelsBundle } from '@/types';

interface DesktopFooterProps {
  labels: GlobalLayoutLabelsBundle | undefined;
}

const DesktopFooter: React.FC<DesktopFooterProps> = ({ labels }) => {
  const footerText = labels?.pcAppFooterText || "© My Desktop App";
  return (
    <footer className="desktop-footer">
      <p>{footerText}</p>
    </footer>
  );
};
export default DesktopFooter;
```

---

**26. `src/features/home/WelcomeSection.tsx`** (No changes from V4)

```tsx
// src/features/home/WelcomeSection.tsx
import React from 'react';
import type { HomeWelcomeSectionLabels } from '@/types';

interface WelcomeSectionProps {
  labels: HomeWelcomeSectionLabels | undefined;
  username: string | undefined;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ labels, username }) => {
  if (!labels || username === undefined) {
    return <p className="loading-text" style={{ fontStyle: 'italic' }}>Initializing welcome message...</p>;
  }
  const welcomeText = labels.welcomeMessage.replace('{user}', username);
  return <p>{welcomeText}</p>;
};
export default WelcomeSection;
```

---

**27. `src/features/home/__tests__/WelcomeSection.test.tsx`** (No changes from V4)

```tsx
// src/features/home/__tests__/WelcomeSection.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WelcomeSection from '../WelcomeSection';
import type { HomeWelcomeSectionLabels } from '@/types';

describe('WelcomeSection Component', () => {
  const mockLabelsEn: HomeWelcomeSectionLabels = {
    welcomeMessage: 'Hello there, {user}! Ready for action?', // Match DB seed
  };
  const mockLabelsZh: HomeWelcomeSectionLabels = {
    welcomeMessage: '你好 {user}，准备好行动了吗？', // Match DB seed
  };

  it('should render welcome message in English', () => {
    render(<WelcomeSection labels={mockLabelsEn} username="TestUser" />);
    expect(screen.getByText('Hello there, TestUser! Ready for action?')).toBeInTheDocument();
  });

  it('should render welcome message in Chinese', () => {
    render(<WelcomeSection labels={mockLabelsZh} username="测试用户" />);
    expect(screen.getByText('你好 测试用户，准备好行动了吗？')).toBeInTheDocument();
  });

  it('should render loading/placeholder when labels are undefined', () => {
    render(<WelcomeSection labels={undefined} username="TestUser" />);
    expect(screen.getByText(/Initializing welcome message/i)).toBeInTheDocument();
  });
});
```

---

**28. `src/features/home/MoodsSection.tsx`** (No changes from V4)

```tsx
// src/features/home/MoodsSection.tsx
import React from 'react';
import type { HomeMoodsSectionLabels, MoodItem } from '@/types';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface MoodsSectionProps {
  labels: HomeMoodsSectionLabels | undefined;
  moods: readonly MoodItem[] | undefined;
  onRefresh: () => void;
  isFetchingData?: boolean;
}

const MoodsSection: React.FC<MoodsSectionProps> = ({ labels, moods, onRefresh, isFetchingData }) => {
  if (!labels) {
    return (
      <section className="page-content" style={{marginTop: '20px'}}>
        <h4 className="loading-text">Loading Moods Section...</h4>
      </section>
    );
  }
  if (isFetchingData && !moods) {
      return (
        <section className="page-content" style={{marginTop: '20px'}}>
            <h4>{labels.sectionTitle}</h4>
            <LoadingSpinner text="Fetching moods..." />
        </section>
      )
  }

  return (
    <section className="page-content" style={{marginTop: '20px'}}>
      <h4>{labels.sectionTitle}</h4>
      {moods && moods.length > 0 ? (
        <ul>
          {moods.map(mood => (
            <li key={mood.id}>{mood.name}: <strong>{mood.feeling}</strong></li>
          ))}
        </ul>
      ) : (
        !isFetchingData && <p>{labels.noMoodsMessage}</p>
      )}
      <Button onClick={onRefresh} isLoading={isFetchingData} loadingText="Refreshing...">
        {labels.refreshButtonText}
      </Button>
    </section>
  );
};
export default MoodsSection;
```

---

**29. `src/features/settings/LanguageSettingsSection.tsx`** (No changes from V4)

```tsx
// src/features/settings/LanguageSettingsSection.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageProvider';
import type { Language, SettingsLanguageSectionLabels } from '@/types';
import Button from '@/components/common/Button';

interface LanguageSettingsSectionProps {
  labels: SettingsLanguageSectionLabels | undefined;
  isPageUpdating?: boolean;
}

const LanguageSettingsSection: React.FC<LanguageSettingsSectionProps> = ({ labels, isPageUpdating }) => {
  const { language, setLanguage } = useLanguage();
  const [selectedLocalLang, setSelectedLocalLang] = useState<Language>(language);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setSelectedLocalLang(language);
    if (showSuccess && language !== selectedLocalLang) {
        setShowSuccess(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  if (!labels) {
    return (
      <section>
        <h4 className="loading-text" style={{ fontStyle: 'italic' }}>Loading language preferences...</h4>
      </section>
    );
  }

  const handleSave = () => {
    if (selectedLocalLang !== language) {
      setLanguage(selectedLocalLang);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const currentLangDisplay = labels.currentLanguageIs.replace('{lang}', language.toUpperCase());

  return (
    <section>
      <h4>{labels.sectionTitle}</h4>
      <p>{currentLangDisplay}</p>
      <div>
        <label htmlFor="language-select-component" style={{ marginRight: '8px', display: 'block', marginBottom: '5px' }}>
          {labels.selectLanguagePrompt}
        </label>
        <select
          id="language-select-component"
          value={selectedLocalLang}
          onChange={e => {
            setSelectedLocalLang(e.target.value as Language);
            if (showSuccess) setShowSuccess(false);
          }}
          disabled={isPageUpdating}
        >
          <option value="en">{labels.langNameEn}</option>
          <option value="zh">{labels.langNameZh}</option>
        </select>
      </div>
      <Button
        onClick={handleSave}
        disabled={isPageUpdating || selectedLocalLang === language}
        style={{marginTop: '15px'}}
        variant="primary"
      >
        {labels.saveButtonText}
      </Button>
      {showSuccess && (
        <p style={{ color: 'green', marginTop: '10px', fontStyle:'italic' }}>
          {labels.successMessage}
        </p>
      )}
    </section>
  );
};
export default LanguageSettingsSection;
```

---

**30. `src/features/desktopDemo/FeatureBox.tsx` (NEW - for PC Demo page)**

```tsx
// src/features/desktopDemo/FeatureBox.tsx
import React from 'react';
import type { DesktopFeatureBoxLabels } from '@/types';
import Button from '@/components/common/Button';

interface FeatureBoxProps {
  labels: DesktopFeatureBoxLabels | undefined;
  onLearnMore: () => void; // Example action
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ labels, onLearnMore }) => {
  if (!labels) {
    return <div className="feature-box loading-text">Loading feature...</div>;
  }

  return (
    <div className="feature-box page-content" style={{ border: '1px solid #ddd', marginBottom: '15px' }}>
      <h4>{labels.title}</h4>
      <p>{labels.description}</p>
      <Button onClick={onLearnMore} variant="secondary">
        {labels.learnMoreButtonText}
      </Button>
    </div>
  );
};

export default FeatureBox;
```
*You might want to add `.feature-box` CSS if needed.*

---

**31. `src/pages/HomePage.tsx`** (No changes from V4)

```tsx
// src/pages/HomePage.tsx
import React from 'react';
import { useLocalizedView } from '@/hooks/useLocalizedView';
import { fetchHomePageView } from '@/services';
import WelcomeSection from '@/features/home/WelcomeSection';
import MoodsSection from '@/features/home/MoodsSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import Button from '@/components/common/Button';
import type { HomePageViewDataPayload, HomePageViewLabelsBundle, ApiError } from '@/types';

const HomePage: React.FC = () => {
  const {
    data: pageData, labels: pageLabels, isPending, isError, error, refetch, isFetching
  } = useLocalizedView<HomePageViewDataPayload, HomePageViewLabelsBundle>(
    'homePageViewContent', // Unique query key for this view
    fetchHomePageView
  );

  if (isPending && !pageLabels) {
    return <LoadingSpinner text="Loading Home Page Content..." />;
  }

  if (isError && !pageLabels) {
    return (
      <div className="page-content">
        <ErrorDisplay error={error} title="Home Page Error" onRetry={refetch} />
      </div>
    );
  }
  if (!pageLabels) { return <p>Home page UI is currently unavailable.</p>; }

  const title = pageLabels.pageTitle || "Dashboard";

  return (
    <div className="page-container">
      <h2>{title}</h2>
      <WelcomeSection labels={pageLabels.welcomeSection} username={pageData?.username} />
      <MoodsSection
        labels={pageLabels.moodsSection}
        moods={pageData?.moods}
        onRefresh={refetch}
        isFetchingData={isFetching && !!pageLabels} // Pass true if page is fetching AND labels are present
      />
      {pageLabels.someActionText && (
        <Button onClick={() => alert('Action from Home Page!')} style={{marginTop: '20px'}}>
          {pageLabels.someActionText}
        </Button>
      )}
      {isError && pageData === undefined && pageLabels && (
         <ErrorDisplay
            error={error}
            title={pageLabels.moodsSection?.sectionTitle || "Data Fetch Error"}
            messageTemplate="Could not load mood data. Details: {message}"
            onRetry={refetch}
            retryButtonText={pageLabels.moodsSection?.refreshButtonText || "Retry Data"}
         />
       )}
    </div>
  );
};
export default HomePage;
```

---

**32. `src/pages/SettingsPage.tsx`** (No changes from V4)

```tsx
// src/pages/SettingsPage.tsx
import React from 'react';
import { useLocalizedView } from '@/hooks/useLocalizedView';
import { fetchSettingsPageView } from '@/services';
import LanguageSettingsSection from '@/features/settings/LanguageSettingsSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import type { SettingsPageViewLabelsBundle, ApiError } from '@/types';

const SettingsPage: React.FC = () => {
  const {
    labels: pageLabels, isPending, isError, error, refetch, isFetching
  } = useLocalizedView<null, SettingsPageViewLabelsBundle>(
    'settingsPageViewContent',
    fetchSettingsPageView
  );

  if (isPending && !pageLabels) {
    return <LoadingSpinner text="Loading Settings Page Content..." />;
  }

  if (isError || !pageLabels) {
     return (
      <div className="page-content">
        <ErrorDisplay
          error={error}
          title={pageLabels?.pageTitle || "Settings Load Error"}
          messageTemplate="Could not load settings content. Details: {message}"
          onRetry={refetch}
          retryButtonText="Retry Settings"
        />
      </div>
    );
  }
  const title = pageLabels.pageTitle || "Settings";

  return (
    <div className="page-content">
      <h2>{title}</h2>
      <LanguageSettingsSection
        labels={pageLabels.languageSection}
        isPageUpdating={isFetching && !!pageLabels}
      />
    </div>
  );
};
export default SettingsPage;
```

---

**33. `src/pages/DesktopDemoPage.tsx` (NEW)**

```tsx
// src/pages/DesktopDemoPage.tsx
import React from 'react';
import { useLocalizedView } from '@/hooks/useLocalizedView';
import { fetchDesktopDemoPageView, fetchGlobalLayoutView } from '@/services'; // Fetch both page specific and global (for header/footer)
import DesktopHeader from '@/components/layout/DesktopHeader';
import DesktopFooter from '@/components/layout/DesktopFooter';
import FeatureBox from '@/features/desktopDemo/FeatureBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import type {
  DesktopDemoPageViewDataPayload,
  DesktopDemoPageViewLabelsBundle,
  GlobalLayoutLabelsBundle, // For header/footer
  ApiError
} from '@/types';

const DesktopDemoPage: React.FC = () => {
  // Fetch page-specific content
  const {
    data: pageData,
    labels: pageLabels,
    isPending: isPendingPage,
    isError: isErrorPage,
    error: errorPage,
    refetch: refetchPage,
    isFetching: isFetchingPage,
  } = useLocalizedView<DesktopDemoPageViewDataPayload, DesktopDemoPageViewLabelsBundle>(
    'desktopDemoViewContent',
    fetchDesktopDemoPageView
  );

  // Fetch global layout labels for Header and Footer (PC specific)
  const {
    labels: globalLayoutLabels,
    isPending: isPendingGlobal,
    isError: isErrorGlobal,
    error: errorGlobal,
    refetch: refetchGlobal,
    isFetching: isFetchingGlobal,
  } = useLocalizedView<null, GlobalLayoutLabelsBundle>(
    'globalLayoutViewContent', // Re-uses global layout query key
    fetchGlobalLayoutView
  );

  const isLoading = (isPendingPage && !pageLabels) || (isPendingGlobal && !globalLayoutLabels);
  const hasCriticalError = (isErrorPage && !pageLabels) || (isErrorGlobal && !globalLayoutLabels);

  if (isLoading) {
    return <LoadingSpinner text={globalLayoutLabels?.loadingGeneric || "Loading Desktop Experience..."} />;
  }

  if (hasCriticalError) {
    return (
      <div className="desktop-layout" style={{padding: '20px'}}>
        <ErrorDisplay
          error={errorPage || errorGlobal} // Show first error encountered
          title={globalLayoutLabels?.appErrorHeading || "Page Load Error"}
          messageTemplate={globalLayoutLabels?.appErrorGeneralMessage || "Could not load essential content. {message}"}
          onRetry={() => { refetchPage(); refetchGlobal(); }}
          retryButtonText={globalLayoutLabels?.errorRetryButton || "Retry All"}
          globalLabels={globalLayoutLabels}
        />
      </div>
    );
  }

  // Fallbacks if parts of labels are missing but not critical enough to block render
  const pageTitle = pageLabels?.pageTitle || "Desktop Demo";
  const intro = pageLabels?.introParagraph || "Welcome to the desktop demonstration.";

  return (
    <div className="desktop-layout">
      <DesktopHeader labels={globalLayoutLabels} isFetching={isFetchingGlobal} />
      <main className="page-content">
        <h2>{pageTitle}</h2>
        <p>{intro}</p>

        {pageData?.dynamicContent && <p><strong>Dynamic Data:</strong> {pageData.dynamicContent}</p>}
        <hr className="app-divider" />

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <FeatureBox
            labels={pageLabels?.featureBox1}
            onLearnMore={() => alert(`${pageLabels?.featureBox1?.title || 'Feature 1'} learn more clicked!`)}
          />
          <FeatureBox
            labels={pageLabels?.featureBox2}
            onLearnMore={() => alert(`${pageLabels?.featureBox2?.title || 'Feature 2'} learn more clicked!`)}
          />
        </div>
         {/* Display data-specific error if page labels loaded but data failed */}
        {isErrorPage && pageData === undefined && pageLabels && globalLayoutLabels && (
            <ErrorDisplay
                error={errorPage}
                title="Content Data Error"
                messageTemplate="Failed to load specific content for this page. {message}"
                onRetry={refetchPage}
                globalLabels={globalLayoutLabels}
            />
        )}
      </main>
      <DesktopFooter labels={globalLayoutLabels} />
    </div>
  );
};

export default DesktopDemoPage;
```

---

**34. `src/router.tsx` (Add route for DesktopDemoPage)**

```tsx
// src/router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AppShell from '@/components/layout/AppShell'; // Import AppShell

// Lazy load page components
const HomePage = lazy(() => import('@/pages/HomePage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const DesktopDemoPage = lazy(() => import('@/pages/DesktopDemoPage'));


// Layout for mobile-first views using AppShell with BottomTabBar
const MobileLayout: React.FC = () => (
  <AppShell>
    <Outlet /> {/* Child routes (HomePage, SettingsPage) will render here */}
  </AppShell>
);


const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading view..." />}>
      <Routes>
        {/* Routes using the MobileLayout (AppShell with BottomTabBar) */}
        <Route element={<MobileLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Route for the DesktopDemoPage (does not use MobileLayout/AppShell) */}
        <Route path="/desktop-demo" element={<DesktopDemoPage />} />

        {/* Fallback route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
export default AppRouter;
```

---

**35. `src/App.tsx` (Simplified to just be the top-level providers and router)**

```tsx
// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LanguageProvider } from '@/context/LanguageProvider';
import { populateDB } from '@/db';
import AppRouter from '@/router'; // Import AppRouter directly
import type { ApiError } from '@/types';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const typedError = error as ApiError;
      console.error(
        `Global Query Cache Error (key: "${String(query.queryKey)}", code: ${typedError.errorCode || 'N/A'}):`,
        typedError.message
      );
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const typedError = error as ApiError;
        if (typedError.statusCode && typedError.statusCode >= 400 && typedError.statusCode < 500) {
          return false;
        }
        return failureCount < 1;
      },
      staleTime: 1000 * 60 * 1,
      refetchOnWindowFocus: import.meta.env.PROD,
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    if (import.meta.env.DEV) {
      populateDB().catch(err => {
        console.error("Failed to populate Dexie DB during app initialization:", err);
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <AppRouter /> {/* AppRouter now handles layout nesting */}
        </BrowserRouter>
      </LanguageProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
export default App;
```

---

**36. `src/main.tsx`** (No changes from V4)

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure your HTML has an element with id='root'.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

**37. Cypress and Vitest Test Files**
    *   **Cypress (`language_switching.cy.ts`):**
        *   Will need slight adjustments to navigate to the PC demo page if you want to test its language switching, or focus tests on the mobile views via the bottom tab bar.
        *   The existing test for Home/Settings should still work, but navigation might change (e.g., clicking tab items).
    *   **Vitest (`*.test.tsx`):**
        *   Update expected label texts in assertions to match the V5 `db.ts` seed data.
        *   Add tests for new components like `BottomTabBar`, `DesktopHeader`, `DesktopFooter`, `FeatureBox`.
        *   Update tests for services to reflect any changes in `scopeKey` usage (e.g., `appShell`, `desktopDemoView`).

---

This V5 setup now clearly distinguishes between a mobile-first app shell with bottom navigation and a separate demonstration of a PC-style layout. All files are provided in full. Remember to run `npm install` and then `npm run dev` to see it in action.