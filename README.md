# PocketTrail

A new, offline-capable open-source AI prototype prepared for the DEV Hacktoberfest Week 1 “Touch Grass” challenge, started 8 October 2026. No entry has been submitted or prize won.

Run `python serve.py --port 8801` in this directory and open http://127.0.0.1:8801. Python 3 and any modern browser suffice; no installation, accounts, API keys, paid hosting or model downloads. The three local asset requests are served from your computer. Leave the server running; all planning inference happens in the browser without network calls. Test with `node --test test.mjs` (Node 18+).

Type an English activity, choose a time budget and a starting point. A small multinomial Naive Bayes model infers an activity from developer-authored examples; a deterministic constraint planner chooses one of the included parks and leaves time for the return journey. You can override the model. Download or print a pocket card and leave the screen.

The Paris start point is an example, not Jordan's location. No GPS, tracking, personal accounts, surveys or backend storage. Check venue hours yourself. Time is a rough straight-line walking estimate with a distance multiplier; this is not turn-by-turn navigation, a safety assessment, weather forecast or accessibility guarantee. Park coordinates approximate centres; activity tags are developer suggestions, not verified visitor data. Add your own places by editing places.json, with a venue source and honest limitations.

The model, examples, source and weights-generating code are MIT licensed. AI-assisted development: Codex generated implementation, tests and documentation. No human experiences, outing reports or user testimonials have been invented. There has been no actual outdoor use test yet. Model quality is measured only on a tiny authored holdout, not real users; read model-card.md.

Competition: https://dev.to/challenges/hacktoberfest-week1-2026-10-05. Overall cash prize 250 USD; not guaranteed. Deadline 12 October 2026 06:59 UTC. Entry preparation is in progress. Contest terms must be accepted before entry; publication of the repository alone is not a contest submission. Public source: https://github.com/prosgames45-del/pockettrail. The demonstration capture is demo.png.
