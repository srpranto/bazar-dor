# বাজার দর / BazarDor

> A real-time commodity price tracking web application for daily essentials across Bangladesh.

🌐 **Live Application:** [https://bazar-dor-io.vercel.app](https://bazar-dor-io.vercel.app)

---

### About the Project
Shopping for everyday essentials shouldn't require guessing what things cost yesterday or how much prices differ across neighborhoods. **BazarDor** collects daily retail commodity prices for rice, lentils, edible oil, fish, meat, vegetables, and more—highlighting daily price shifts, market-specific variations, and category-level pricing across major divisions in Bangladesh.

---

### Technologies Used
- **Framework:** Next.js 16 (App Router, Turbopack, Partial Prerendering)
- **Library:** React 19
- **Language:** Strict TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI Primitives & Lucide Icons
- **Authentication:** Better Auth (Credentials & Social OAuth)
- **Database:** MongoDB Atlas (via `@better-auth/mongo-adapter`)
- **Notifications:** Sonner Toast Notifications

---

### 5 Key Features
1. **Daily Price Shifts & Indicators:** Instant identification of commodities that rose, dropped, or remained steady in price today with percentage changes and clear visual badges.
2. **Infinite Live Price Strip:** A marquee price ticker streaming real-time rates for essential everyday staples across the top of the interface.
3. **Market-Wise Price Comparisons:** Comprehensive breakdowns comparing commodity costs across 12 major local markets and metropolitan divisions.
4. **Sortable Category Catalog:** Interactive commodity browsing allowing users to filter by category and sort products from lowest to highest price.
5. **Personal Accounts & Profile Management:** User accounts powered by Better Auth and MongoDB, enabling users to update profile details with real-time validation and view market reports.
