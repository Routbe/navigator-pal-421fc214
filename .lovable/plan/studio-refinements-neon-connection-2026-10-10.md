# Studio refinements + Neon connection

## 0. Leftovers from the previous round
- Fix any remaining error from the last check (build/test log), then re-run the check.
- Screenshot the Studio and the public profile at 375px width and fix any overflow found.
- A real signed-in connection test needs the database, so it runs after step 4.

## 1. Mobile action bar (Studio top bar)
- The bar with URL, Copy, Undo/Redo, "Bekijk live profiel", "Verwerpen" and "Publiceren" wraps on small screens: URL + copy on row 1 (truncated), the actions on row 2, and "Publiceren" always visible.
- Check this at 375px.

## 2. Status section: names + Custom/Emoji
- Rename "Statusbolletje" to "Status indicator" and "Statuslijn" to "Status bericht" everywhere it appears (Studio, editor, status picker).
- Add a 7th tile, "Custom / Emoji". Picking it deselects the color dots and shows a one-character emoji field.
- On the profile, an emoji status shows inside a solid circle that adapts to light or dark mode, so it stays readable on top of the photo.

## 3. Cleaning up the tab layout
- Move the "Icoon toevoegen" and emoji choices out of Design & styling and into Links & components → "Live Status & Gedachten".
- Remove the large black preview box under Design → Avatar, Header & Frames.
- Ballon - stijl options become: Obsidian, Glass, Bubble, Cartoon, Natuur, Sierlijk, Techno, Vuur, Water, Aarde. Ballon position, background color and font stay where they are.
- Profiles that saved a style that no longer exists switch to Obsidian.

## 4. Neon database connection
- Request `DATABASE_URL` (app user) and `MIGRATION_URL` (owner) through the secure form. Never paste them in chat.
- Run the db/ migrations, then sign in, save a profile change and connect an integration, and confirm it all reads back after a page reload. This clears the "Niet opgeslagen" error.
- Storage, email and payment keys are requested separately, later.

## Technical details
- Files: `ProfileEditor.tsx` (action bar near lines 860-880), `StatusSettings.tsx`, `AvatarDecorationPicker.tsx`, `LiveStatusAccordion.tsx`, `status-bubble.ts` (+ test), `AvatarFrameWrapper.tsx` / `profile-display.ts` (emoji badge rendering).
- `presenceIndicator: "emoji"` already exists; the new tile maps to it. New bubble style ids go in `BUBBLE_STYLES` with CSS per style, and `normalizeBubbleStyle` falls back to `obsidian-flat`.
- Migrations run via `scripts/migrate.ts` with `MIGRATION_URL`; runtime uses `DATABASE_URL`.
