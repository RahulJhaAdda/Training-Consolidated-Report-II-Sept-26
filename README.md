# September Training Impact Dashboard

Premium leadership dashboard for Rahul Jha, Adda247. Five interactive pages: executive overview, counsellor quality, vertical quality, need generation and PIT business impact. Official supplied Adda247 SVG logo, white background, crimson neon headers and KPI icons, cursor-following card highlights, hover glow and a Neon on/off control, responsive layout, presentation mode, search, vertical/trainer filters and source-row detail.

## Deploy on Vercel

1. Unzip this project. Upload its contents to a **private Git repository**, then import that repository into Vercel. The included source snapshot contains employee information; do not use a public repository.
2. Select **Other** as framework, project root as root directory, `npm run build` as build command and `public` as output directory. Node.js 22 or newer. The `/api/data` function is deployed separately by Vercel.
3. In Google Cloud, enable **Google Sheets API**, create a service account, then create its JSON key. Keep the key private; do not upload it to the repository or send it in chat.
4. Share the existing Google Sheet with the service account's `client_email`, as **Viewer**. Do not publish the sheet publicly.
5. In Vercel → Project → Settings → Environment Variables, add the values below for Production (and Preview if needed). Then deploy/redeploy.

| Variable | Value |
|---|---|
| `GOOGLE_SHEET_ID` | `1IKyZqMEZHckG0ArQQAomXluzRMwyoGfgA5LGwtoYhKU` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON key |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON key; real newlines or literal `\n` supported |
| `DASHBOARD_PASSWORD` | A long randomly generated password shared only with authorised viewers |
| `DEMO_MODE` | `false` for live data |
| `GID_QUALITY` | `158772495` |
| `GID_VERTICAL` | `0` |
| `GID_NEED` | `548945396` |
| `GID_PIT` | `976295352` |

The supplied GIDs are preconfigured. The workbook snapshot does not prove Google GID-to-tab identity. On the first live load the app resolves GIDs through Google metadata, validates expected column positions and reports mismatches rather than loading a different tab silently. GID_VERTICAL must identify the tab with both August and September data, matching the uploaded **Quality Comparison** structure. If GID 0 points to a different layout, set the correct comparison-tab GID and redeploy.

6. Open the Vercel URL, enter your dashboard password and check the **Live Google Sheets** status. Edit a test source value: the active dashboard fetches every 60 seconds; **Refresh** fetches immediately. Restore the value after checking. No new upload or deployment is needed for cell-value changes. Sheet formulas must finish recalculating before the next fetch.

Live access has been implemented and tested with mocked Google responses. It has not been connected to your account or deployed: service-account credentials and sheet sharing still need to be configured.

## Preview now

Node 22+ is sufficient; no npm dependencies are required.

```bash
DEMO_MODE=true DASHBOARD_PASSWORD='choose-a-local-preview-password' npm start
```

Open `http://localhost:3000` and enter that password. This loads the uploaded workbook with a prominent **Snapshot preview** label. To try on Vercel before setting up Google, set `DEMO_MODE=true` and `DASHBOARD_PASSWORD`; set `DEMO_MODE=false` once Google access is ready.

The optional `preview.html` is a self-contained, offline preview using the uploaded data, not a live dashboard. Keep it private. It is outside `public` and is not deployed by Vercel.

## Data behaviour

- Values are fetched server-side, never using a private key in browser code. Read-only Sheets permission only. API requests require the dashboard password; employee data is not embedded in the public app bundle. Password stays in browser memory, clears on reload/lock, and all data responses use `private, no-store`.
- On refresh failure, previous successful values remain visible with a stale status and last-success time. There is no silent fallback from live data to snapshot data.
- Quality target/85% achievement reporting is intentionally omitted. Quality change, observed conversion/revenue movement, PIT 25% growth and floor comparisons remain.
- PIT revenue is summed from paired participant rows, excluding source totals. Snapshot totals: August ₹41,45,293; September ₹43,79,559; change ₹2,34,266. The source summary improvement cell differs, so it is not used.
- PIT floor comparisons use each person's own September benchmark. Other activities have no supplied floor benchmarks; none are invented.
- Cohort conversion averages are unweighted individual averages, **not pooled conversion rates**. Relative growth uses a positive baseline. Missing scores are excluded from paired comparisons; zero values remain as supplied.
- The uploaded counsellor cohort has 126 records, 123 paired scores and 96 improvements. The PIT cohort has 30 participants and 24 meet 25% growth. These populations may overlap.
- Duplicate CTET LKO need-generation entries remain separate by source row. Existing improvement columns are recomputed.
- The overall quality score is the comparison tab's reported Grand Total; weighted detail may differ. The alternate September target-achievement tab is not mixed into this source.
- Narrative describes observed outcomes after training. It does not claim causal revenue attribution, measured ROI or activity completion rates not present in the source.

## Maintenance

Keep source columns in their current order. Adding rows, changing values or renaming a tab is supported (GIDs remain stable). Column reordering is rejected; update `lib/normalize.js` when intentionally changing the schema. Update `public/index.html` and `public/app.js` for a new reporting month. Headers, charts and calculations have no 85% quality-target dependency.

`npm test` verifies cohort reconciliation, missing/zero handling, column validation, authenticated snapshot access and mocked live data refresh. `npm run build` validates the static entry point.

Official setup references: https://vercel.com/docs/environment-variables · https://vercel.com/docs/functions/runtimes/node-js · https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/get · https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/batchGet

## Validation status

Six data/API tests passed, including authenticated access and refreshed Google response mapping. All five page render paths and search/empty-filter states passed JavaScript smoke checks. Browser visual verification could not be completed because the available Chromium download failed. Check the included preview on desktop and mobile before your leadership presentation.

## Executive edition improvements

Overview metrics open exact evidence cohorts. Intervention cards link to coaching, refresher and PIT pages. All detail tables use six columns with keyboard-accessible record dialogs. Conversion charts use a shared, data-appropriate scale; floor-attainment charts show the 100% benchmark marker. Status filters, reset, retained presentation navigation, reduced-motion support and restrained brand-red focus/glow are included. Exact drilldown counts were tested (96 improved quality records, 24 PIT goal achievers, 13 at/above floor). Browser visual verification is still outstanding.
