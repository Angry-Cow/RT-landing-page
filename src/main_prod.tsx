/**
 * PRODUCTION ENTRY POINT — REMOTE SERVER
 *
 * Instructions:
 * 1. Fill in the configuration values below with your remote database credentials.
 * 2. Rename this file to main.tsx on your remote server (replacing the Anima SDK version).
 * 3. Make sure your remote server runs: npm install && npm run build
 *    Then serve the generated dist/ folder as static files.
 *
 * This file removes the Anima Playground SDK and replaces it with a direct
 * database connection using your own backend API or database client.
 */

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Install your preferred database/API client, for example:
//   npm install axios           (for REST API calls)
//   npm install @supabase/supabase-js   (for Supabase)
//   npm install mysql2           (for MySQL — server-side only)
//   npm install pg               (for PostgreSQL — server-side only)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: Set your remote database / API connection details below
// ─────────────────────────────────────────────────────────────────────────────

export const DB_CONFIG = {
  // Base URL of your backend REST API (if using a REST API layer)
  apiBaseUrl: 'https://YOUR_REMOTE_SERVER_URL/api',

  // If using Supabase, replace with your project URL and anon key:
  // supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
  // supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',

  // If using a direct database, configure your ORM or client here
  // (typically done in a separate db.ts file on the server side)
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: Replace AnimaProvider with your own context/provider if needed.
//         If your backend is a simple REST API, you may not need any provider.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Example: If you have your own AppProvider wrapping auth/db context, import it here:
// import { AppProvider } from './providers/AppProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*
      Replace or remove <AnimaProvider> here.
      If your backend exposes a REST API, you likely do NOT need a wrapper provider —
      just render <App /> directly and make fetch/axios calls inside your components.

      If you are using Supabase, wrap with your SupabaseProvider here.
      If you built a custom context, wrap with your own <AppProvider> here.
    */}
    <App />
  </React.StrictMode>
);

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: Update your components
//
// Any component that currently uses:
//   import { useQuery, useMutation } from '@animaapp/playground-react-sdk';
//
// Will need to be updated to use your own data-fetching approach, for example:
//   - React Query (useQuery from @tanstack/react-query) + fetch/axios calls
//   - Supabase hooks
//   - Your own custom hooks that call your REST API
//
// The key components to update are:
//   src/sections/BookingSection/components/BookingForm.tsx       (useMutation Booking)
//   src/sections/BookingSection/components/GroupRateModal.tsx    (useMutation Booking)
//   src/sections/BookingSection/components/CourseInvestmentList.tsx (useQuery Offering)
//   src/sections/CoursesSection/index.tsx                        (useQuery Course)
//   src/sections/ServicesSection/index.tsx                       (useQuery Service)
//   src/sections/FaqSection/index.tsx                            (useQuery Faq)
// ─────────────────────────────────────────────────────────────────────────────
