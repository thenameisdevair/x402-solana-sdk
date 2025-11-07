# x402 Solana SDK - Documentation Website

## Overview

This is the complete x402 Solana SDK project - a production-ready TypeScript SDK that implements HTTP 402 payment flows on the Solana blockchain. The SDK enables autonomous AI agents and applications to make micropayments for API access using Solana's fast finality (~400ms) and negligible fees (~$0.00025). 

**Project Includes:**
1. **Production SDK** (`/sdk`) - Client and server modules with full TypeScript support
2. **Documentation Website** (`/client`) - Interactive developer-focused documentation
3. **Working Examples** (`/examples`) - Client agent and API server demonstrations
4. **Comprehensive Tests** - Type-safe with complete error handling

Built for the **Solana x402 Hackathon** - "Best x402 Dev Tool" category ($10,000 prize)

**Core Purpose:** Accelerate x402 protocol adoption across the Solana ecosystem by providing the simplest, most developer-friendly SDK available.

## Recent Changes

### November 7, 2025 - Production Hardening
**Critical Security & Functionality Fixes:**
1. **BigInt Arithmetic** - Replaced Number() with BigInt for lamport amounts to prevent overflow
2. **ATA Validation** - Added checks for sender token accounts with clear error messages
3. **Payment Verification** - Implemented comprehensive on-chain validation:
   - Transaction fetching with configurable commitment
   - Success/error status checking
   - Finality slot validation (32+ slots for finalized)
   - Recipient and amount verification with BigInt safety
   - Token balance delta parsing for USDC/USDT
4. **Commitment Honored** - Client now respects commitment config throughout payment flow
5. **Security Export** - verifyPaymentTransaction properly exported and documented as security-critical

**Status:** SDK is now production-ready for hackathon submission

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React 18+ with TypeScript, using Vite as the build tool and development server.

**Routing:** Client-side routing implemented with Wouter, a lightweight alternative to React Router. The application currently has a single-page architecture (home page) with a 404 fallback.

**UI Component System:** 
- Built on Radix UI primitives for accessibility and headless component architecture
- Custom component library following shadcn/ui patterns stored in `client/src/components/ui/`
- Comprehensive set of pre-built components (40+ components including accordion, dialog, dropdown, form elements, etc.)
- Design system inspired by Stripe Docs, Tailwind CSS Docs, and Linear for developer-focused aesthetics

**Styling Approach:**
- Tailwind CSS for utility-first styling with custom configuration
- CSS variables for theme customization supporting light/dark modes
- Theme system managed via React Context (`ThemeProvider`)
- Design tokens for consistent spacing (4, 6, 8, 12, 16, 24px scale), typography (Inter for UI, JetBrains Mono for code), and color schemes
- Custom hover/active state utilities (`hover-elevate`, `active-elevate-2`) for subtle interactive feedback

**State Management:**
- React Query (TanStack Query v5) for server state and API data fetching
- React Context for global UI state (theme management)
- Local component state with React hooks

**Typography & Design System:**
- Display font: Inter (weights 400-700)
- Code font: JetBrains Mono (weights 400-500)
- Developer-first presentation with code examples as hero content
- Minimalist, trust-building design signaling production-readiness

### Backend Architecture

**Server Framework:** Express.js running on Node.js with TypeScript.

**Server Structure:**
- Main entry point: `server/index.ts` handles middleware setup, request logging, and server initialization
- Route registration separated in `server/routes.ts` (currently minimal, placeholder for API routes)
- Custom Vite integration for development mode with HMR (Hot Module Replacement)
- Production build serves static assets from `dist/public`

**Development vs Production:**
- Development: Vite dev server integrated as Express middleware with Replit-specific plugins
- Production: Pre-built static assets served from Express
- Environment-aware configuration through `NODE_ENV`

**Storage Layer:**
- Interface-based storage abstraction (`IStorage`) for flexibility
- In-memory storage implementation (`MemStorage`) as default
- Designed to support database backends (schema defined for PostgreSQL via Drizzle ORM)
- User CRUD operations defined (currently unused by active routes)

### SDK Architecture (Production-Ready)

The `/sdk` directory contains the complete production SDK implementation:

**Security & Correctness (November 2025 Fixes):**
- BigInt arithmetic for lamport amounts (prevents precision loss with large values)
- Associated Token Account validation and auto-creation for token transfers
- Commitment level configuration honored throughout client/server
- Comprehensive on-chain payment verification with finality checks
- Proper recipient/amount/mint validation preventing spoofed payments

**Client Module (`sdk/client.ts`):**
- Provides `x402Fetch()` wrapper for automatic HTTP 402 payment handling
- Supports both Keypair (Node.js agents) and WalletAdapter (browser wallets) signers
- Automatic retry logic for failed transactions
- Configurable commitment levels for Solana transactions

**Server Module (`sdk/server.ts`):**
- Express middleware for payment requirement enforcement
- Payment verification against Solana blockchain
- Optional caching layer for verified payments (TTL-based)
- Request enrichment with payment proof data

**Solana Utilities (`sdk/solana-utils.ts`):**
- Connection management for different networks (mainnet-beta, devnet, testnet)
- Transaction creation for SOL and SPL token (USDC, USDT) transfers with BigInt safety
- Associated Token Account (ATA) validation and creation for first-time payers
- Security-critical payment verification with on-chain validation:
  - Transaction existence and success confirmation
  - Finality checks (32+ slots for finalized)
  - Recipient address validation
  - Amount verification (BigInt comparison with tolerance)
  - Token mint matching for USDC/USDT
  - Pre/post balance delta validation
- Token mint address management per network

**Type System (`shared/x402-types.ts`):**
- Zod schemas for runtime validation
- PaymentRequirements, PaymentProof, and related types
- Custom error classes (PaymentRequiredError, TransactionFailedError, etc.)
- Network and token type definitions

### Page Structure

**Home Page (`client/src/pages/Home.tsx`):**
Composed of modular sections:
- Header: Sticky navigation with theme toggle and branding
- Hero: Value proposition with code example
- QuickStart: Three-step installation guide
- Features: Grid showcasing six key SDK capabilities
- ServerExample: Express middleware integration demo
- InteractiveDemo: Visual payment flow demonstration
- Footer: Links, documentation navigation, and licensing

**Component Architecture:**
- Presentational components in `client/src/components/`
- Reusable UI primitives in `client/src/components/ui/`
- Example components for testing/development in `client/src/components/examples/`

### Build System

**Development Build:**
- Vite dev server with React Fast Refresh
- TypeScript type checking (non-emitting)
- Replit-specific plugins: runtime error overlay, cartographer (code mapping), dev banner
- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)

**Production Build:**
- Frontend: Vite build to `dist/public`
- Backend: esbuild bundles `server/index.ts` to `dist/index.js` (ESM format, external packages)
- Two-stage build separating client and server bundles

**TypeScript Configuration:**
- Strict mode enabled
- ESNext modules with bundler resolution
- Path aliases matching Vite config
- Incremental builds with cache file

## External Dependencies

### Blockchain & Payments
- **@solana/web3.js** (v1.98.4): Solana JavaScript SDK for blockchain interactions
- **@solana/spl-token** (v0.4.14): SPL token program interactions for USDC/USDT transfers

### Database & ORM
- **drizzle-orm** (v0.39.1): TypeScript ORM for type-safe database queries
- **@neondatabase/serverless** (v0.10.4): Serverless PostgreSQL driver (Neon-optimized)
- **drizzle-kit**: CLI for database migrations and schema management
- **connect-pg-simple** (v10.0.0): PostgreSQL session store for Express

### UI Component Library
- **@radix-ui/*** (v1.x - v2.x): Comprehensive suite of 25+ accessible, unstyled UI primitives including dialogs, dropdowns, popovers, navigation, form controls
- **cmdk** (v1.1.1): Command palette component (⌘K interface)
- **class-variance-authority** (v0.7.1): Type-safe variant API for component styling
- **lucide-react**: Icon library with 1000+ icons

### State Management & Data Fetching
- **@tanstack/react-query** (v5.60.5): Async state management, server data fetching, and caching

### Form Handling
- **react-hook-form**: Form state management (implied by @hookform/resolvers)
- **@hookform/resolvers** (v3.10.0): Validation resolver integration
- **zod**: Schema validation and TypeScript type inference

### Styling
- **tailwindcss**: Utility-first CSS framework
- **autoprefixer**: PostCSS plugin for vendor prefixes
- **tailwind-merge** & **clsx**: Utility class merging and conditional classes

### Development Tools
- **Vite**: Next-generation frontend build tool with HMR
- **tsx**: TypeScript execution for Node.js (development scripts)
- **esbuild**: JavaScript bundler for production server build
- **@replit/** plugins: Development tooling specific to Replit platform (error overlay, cartographer, dev banner)

### Fonts
- **Inter**: Primary UI typeface (Google Fonts)
- **JetBrains Mono**: Monospace font for code blocks (Google Fonts)

### Network Environment
- RPC endpoints configurable per Solana network (mainnet-beta, devnet, testnet)
- Token mint addresses maintained for each network/token combination