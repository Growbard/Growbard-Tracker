# Growbard — Marketing Agency Dashboard

A full, customizable dashboard to run a marketing agency: sales pipeline,
projects, client health, team capacity, and channel-wise financials (paid,
organic, tools and all other expenses).

Built with **Next.js + React + Tailwind + Recharts**. Everything is editable
right on the page, and every chart recomputes automatically when you change a
number.

---

## ✨ What you can do

- **Edit anything live.** Click the **Edit** button (top-right). Any number or
  label with a dashed blue outline becomes editable — click it, type, press
  Enter. Charts, bars, donuts and totals update instantly.
- **It remembers your data.** Your edits are saved automatically in your
  browser (localStorage). Refreshing keeps them.
- **Export / Import.** In Edit mode, use **Export** to download your data as a
  `growbard-data.json` backup, and **Import** to load it back (or share between
  devices).
- **Reset** returns everything to the defaults in `lib/data.ts`.

---

## 🚀 Deploy to GitHub + Vercel (step by step)

### 1. Put this on GitHub
1. Create a new repository on GitHub (e.g. `growbard-dashboard`). Leave it empty.
2. In this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Growbard dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/growbard-dashboard.git
   git push -u origin main
   ```

### 2. Deploy on Vercel
1. Go to **https://vercel.com** and sign in with GitHub.
2. Click **Add New… → Project**.
3. **Import** your `growbard-dashboard` repo.
4. Vercel auto-detects **Next.js** — you don't need to change any settings.
5. Click **Deploy**.
6. In ~1 minute you'll get a live URL like `https://growbard-dashboard.vercel.app`.

That's it. Every time you push to GitHub, Vercel redeploys automatically.

---

## 🖥️ Run it locally (optional)

Requires Node.js 18.17+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To check the production build:
```bash
npm run build
npm start
```

---

## ✏️ Two ways to change your data

### A) Live, in the browser (easiest)
Click **Edit**, then click any highlighted value. Saved automatically. This is
per-browser, so it's perfect for your own day-to-day tracking.

### B) In the code (permanent defaults for everyone)
Open **`lib/data.ts`** — it's one well-commented file holding every value on the
dashboard (stats, chart series, pipeline stages, clients, team, etc.). Change
the numbers, commit, push. Vercel redeploys with your new defaults.

> Tip: to turn a live-edited version into the new permanent default, click
> **Export**, open the downloaded JSON, and paste the values into `lib/data.ts`.

---

## 🗂️ Project structure

```
growbard/
├── app/
│   ├── layout.tsx         # root layout + fonts + data provider
│   ├── page.tsx           # dashboard layout (all the rows)
│   └── globals.css        # Tailwind + base styles
├── components/            # one file per panel
│   ├── Sidebar.tsx        # left navigation
│   ├── Header.tsx         # greeting + Edit/Export/Import/Reset toolbar
│   ├── StatCards.tsx      # top 5 KPI cards with sparklines
│   ├── MiniStats.tsx      # 8 small metric cards
│   ├── RevenueExpenses.tsx# bar chart
│   ├── RevenueByChannel.tsx# donut (paid/organic/etc.)
│   ├── Pipeline.tsx       # pipeline value bars
│   ├── ProjectStatus.tsx  # project donut
│   ├── ClientHealth.tsx   # health score bars
│   ├── TeamCapacity.tsx   # capacity bars
│   ├── RecentActivity.tsx
│   ├── UpcomingDeadlines.tsx
│   ├── TopClients.tsx     # profit & margin auto-calculated
│   ├── Editable.tsx       # click-to-edit wrapper
│   ├── Icon.tsx           # icon-by-name helper
│   └── Card.tsx
├── lib/
│   ├── data.ts            # ⭐ ALL your data lives here
│   ├── store.tsx          # state + localStorage persistence
│   └── format.ts          # currency / number / percent formatting
└── ...config files
```

---

## 🔧 Customizing further

- **Rename the agency:** in Edit mode click the name in the header, or change
  `agencyName` in `lib/data.ts`.
- **Add a pipeline stage / client / team member:** add an entry to the matching
  array in `lib/data.ts` (copy an existing one and change the values).
- **Change colors:** each slice/stage/bar carries its own `color` hex in
  `lib/data.ts`.

---

Made for tracking a real agency. Edit freely — you can't break the charts;
they always redraw from your data.
