# FinField — Product Requirements Document

**Version:** 1.0  
**Author:** FinField Team  
**Status:** Draft

---

## 1. Product Overview

### 1.1 Summary
FinField is an all-in-one personal finance platform that combines investment tracking, social discussion, long-form blogging, daily financial tips, and tax management — all in a single unified experience.

### 1.2 Tagline
*Track. Talk. Grow.*

### 1.3 Target Users
- Young professionals (22–35) building wealth
- Retail investors tracking portfolios
- Finance enthusiasts who want a community
- Anyone looking to understand their taxes better

### 1.4 Core Value Proposition
> "Instead of using 4 different apps — one to track stocks, one to read blogs, one for community discussion, one for taxes — FinField gives you everything in one place."

---

## 2. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Users actively track investments | Avg. 3+ portfolio entries per user |
| Social engagement | Avg. 5+ posts or comments per active user/week |
| Daily tip engagement | 40%+ open/view rate on daily tips |
| Retention | 30-day retention > 40% |

---

## 3. Scope

### 3.1 In Scope (v1)
- User registration and profiles
- Investment portfolio tracking (manual)
- Social feed (posts, comments, likes)
- Blog system (user-authored)
- Daily financial tips (platform-published)
- Tax module (income, deductions, summary)

### 3.2 Out of Scope (v1)
- Live stock price APIs / broker integrations
- Payment processing
- Mobile app
- AI features (planned for v2)

---

## 4. Features & Requirements

---

### 4.1 Authentication & User System

**Description:** Users can register, log in, and manage their profile.

**User Stories:**
- As a user, I can sign up with email and password
- As a user, I can log in and receive a JWT token
- As a user, I can view and edit my profile (name, bio, avatar)
- As a user, I can log out

**Acceptance Criteria:**
- Passwords are hashed (bcrypt)
- JWT stored in HTTP-only cookie
- Protected routes return 401 if unauthenticated
- Email must be unique

**Fields:**
```
User {
  id, name, email, password (hashed),
  bio, avatarUrl, createdAt
}
```

---

### 4.2 Investment Tracking Module

**Description:** Users manually log their investments and track portfolio performance.

**User Stories:**
- As a user, I can add an investment (name, type, amount invested, current value)
- As a user, I can view all my investments in a portfolio view
- As a user, I can see total invested, total current value, and profit/loss
- As a user, I can edit or delete an investment entry

**Acceptance Criteria:**
- Profit/loss = current value − amount invested
- Portfolio summary computed server-side
- Investments are private (only visible to owner)
- Supports types: Stocks, Mutual Funds, Crypto, Gold, Fixed Deposit, Other

**Fields:**
```
Investment {
  id, userId, name, type,
  amountInvested, currentValue,
  notes, createdAt, updatedAt
}
```

---

### 4.3 Social Feed

**Description:** Users can post short updates, react, and discuss finance topics publicly.

**User Stories:**
- As a user, I can create a text post (with optional tags)
- As a user, I can like/unlike a post
- As a user, I can comment on a post
- As a user, I can reply to a comment (one level of nesting)
- As a user, I can delete my own posts and comments
- As a visitor, I can view the feed sorted by recent / trending

**Acceptance Criteria:**
- Feed supports pagination (cursor or offset)
- Trending = posts with most likes + comments in last 24h
- Tags are filterable (#stocks, #crypto, #tax, etc.)
- A post cannot be edited after 15 minutes

**Fields:**
```
Post {
  id, authorId, content, tags[],
  likesCount, commentsCount,
  createdAt, updatedAt
}

Comment {
  id, postId, authorId, content,
  parentCommentId (nullable),
  createdAt
}

Like {
  id, postId, userId, createdAt
}
```

---

### 4.4 Blog System

**Description:** Users can write long-form financial content — articles, guides, breakdowns.

**User Stories:**
- As a user, I can create a blog post with title, body, cover image URL, and tags
- As a user, I can publish or save as draft
- As a user, I can edit or delete my own blogs
- As a reader, I can browse blogs filtered by tag or author
- As a reader, I can search blogs by keyword

**Acceptance Criteria:**
- Only published blogs are visible to others
- Body supports rich text (stored as HTML or Markdown string)
- Reading time is calculated server-side (avg. 200 words/min)
- Blogs are paginated

**Fields:**
```
Blog {
  id, authorId, title, body,
  coverImageUrl, tags[],
  status (draft | published),
  readingTimeMinutes,
  createdAt, updatedAt
}
```

---

### 4.5 Daily Financial Tips

**Description:** The platform publishes one financial tip per day. Users can view the tip feed and react.

**User Stories:**
- As a user, I can view today's financial tip
- As a user, I can browse past tips
- As a user, I can like a tip
- As an admin, I can create a new tip (manually, or automated via cron)

**Acceptance Criteria:**
- Only one tip per calendar day is shown as "today's tip"
- Tips are paginated (older tips accessible)
- Likes tracked per user per tip
- Admin role required to create tips

**Fields:**
```
Tip {
  id, title, content,
  category (investing | tax | savings | general),
  publishedAt, likesCount
}
```

---

### 4.6 Tax Module

**Description:** Users can track income sources and deductions to get a simplified tax summary.

**User Stories:**
- As a user, I can add an income entry (salary, freelance, rental, etc.)
- As a user, I can add a deduction entry (80C, HRA, medical, etc.)
- As a user, I can view a summary: total income, total deductions, estimated taxable income
- As a user, I can edit or delete entries

**Acceptance Criteria:**
- Tax summary is computed server-side
- All data is private to the user
- Financial year filter (e.g., FY 2025–26)
- Estimated tax calculated based on Indian income tax slabs

**Fields:**
```
IncomeEntry {
  id, userId, source, amount,
  financialYear, createdAt
}

DeductionEntry {
  id, userId, section (80C | HRA | Medical | Other),
  amount, description, financialYear, createdAt
}

TaxSummary (computed, not stored) {
  totalIncome, totalDeductions,
  taxableIncome, estimatedTax
}
```

---

## 5. UI Layout

### 5.1 Layout Decision
Sidebar-based single app — not separate products. Code is modular internally per domain.

### 5.2 Sidebar Navigation
```
FinField
├── Dashboard
├── Investments
├── Feed
├── Blogs
├── Daily Tips
├── Tax
└── Profile
```

### 5.3 Dashboard
- Portfolio summary widget (total invested, P&L)
- Today's financial tip card
- Recent feed activity
- Quick links to each module

---

## 6. Technical Architecture

### 6.1 Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Next.js |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT (HTTP-only cookies) |
| Background Jobs | Bull + Redis (Phase 6) |
| File Storage | Cloudinary or AWS S3 (Phase 4+) |

### 6.2 Backend Folder Structure
```
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── investments/
│   ├── feed/
│   ├── blogs/
│   ├── tips/
│   └── tax/
├── middleware/
├── utils/
└── config/
```

### 6.3 API Base URL
```
/api/v1/
```

### 6.4 API Response Shape (consistent across all endpoints)
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

Error shape:
```json
{
  "success": false,
  "message": "...",
  "errors": [ ... ]
}
```

---

## 7. Build Phases

### Build Order
```
Auth → Feed → Investments → Blogs → Tax → Daily Tips → Dashboard → Security → AI
```

| Phase | Scope |
|---|---|
| **Phase 1** | Auth (JWT) + User system (register, login, logout, profile) |
| **Phase 2** | Social Feed (posts, comments, likes, trending) |
| **Phase 3** | Investment tracking + portfolio summary (P&L) |
| **Phase 4** | Blog system (drafts, publish, search, tags) |
| **Phase 5** | Tax module (income, deductions, estimated tax) |
| **Phase 6** | Daily tips + cron job automation |
| **Phase 7** | Dashboard (aggregation from all modules) |
| **Phase 8** | Security hardening (input validation, rate limiting, helmet) |
| **Phase 9** | AI features (summarization, suggestions, tax tips) |

---

## 8. v2 AI Features (Planned)

- AI blog summarizer ("Summarize this article in 3 points")
- "Explain this stock simply" assistant
- Smart investment allocation suggestions
- Tax saving tips generator based on user's income/deductions
- Auto-generate daily financial tips via LLM

---

## 9. Non-Functional Requirements

| Requirement | Detail |
|---|---|
| Security | Passwords hashed (bcrypt), JWT in HTTP-only cookies, helmet.js headers |
| Validation | All inputs validated server-side (Zod or Joi) |
| Error Handling | Global error middleware, consistent error response shape |
| Pagination | All list endpoints paginated (default limit: 20) |
| Rate Limiting | Applied to auth endpoints and public routes (express-rate-limit) |
| Logging | HTTP request logging (morgan), application logging (winston) |
| Environment | All secrets in `.env`, never committed to version control |
