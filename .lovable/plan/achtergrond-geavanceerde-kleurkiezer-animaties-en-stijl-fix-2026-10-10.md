# Achtergrond: geavanceerde kleurkiezer, animaties en stijl-fix

Stap 1 uit het document (de grote "Achtergrond aanpassen"-box vervangen door een schuifjes-icoon naast "ROUT-presets") is al live. Dit plan dekt de rest.

## 1. Uitgebreide kleurkiezer voor "Achtergrondkleur"

Het huidige `ColorField` is alleen een hex-invoer met een klein kleurvlak. In het uitklapbare achtergrondpaneel komt een volledige kleurkiezer:

- Schuifbalken voor **tint (hue)**, **verzadiging** en **helderheid**, plus de bestaande hex-invoer en het kleurvlak.
- Omrekening hex ↔ HSL gebeurt in een kleine helper in `src/lib/` (pure functies, met tests).
- De gekozen kleur blijft opgeslagen als hex in `canvasColor`/`wallpaperColor` — er verandert niets aan de opgeslagen data.

## 2. Drie geanimeerde achtergronden

Nieuwe opties onder "Achtergrondtype", naast Effen/Gradient/Eigen afbeelding. Puur CSS (keyframes in `src/styles.css`), geen extra libraries, dus licht en snel:

- **Vloeiend mesh** — zachte, bewegende gradient-bollen (radial-gradients die langzaam verschuiven).
- **Scrollend raster** — een subtiel rasterrpatroon dat oneindig langzaam omhoog beweegt.
- **Golvend weefsel** — een vloeiende sinusgolf-animatie die op zijde/licht vloeistof lijkt.

Elke animatie gebruikt de thema-/accentkleuren van het profiel en respecteert `prefers-reduced-motion` (animatie staat dan stil). De keuze wordt opgeslagen als nieuwe `wallpaperType`-waarden, zodat bestaande profielen ongemoeid blijven.

## 3. Fix: "Achtergrondstijl" doet niets bij een eigen achtergrond

Nu geldt: zodra een eigen achtergrond (effen/gradient/afbeelding) actief is, wint die en worden de stijl-texturen (Subtiel raster, Subtiele ruis, Dot matrix, …) genegeerd — daarom lijken ze "kapot".

- `backgroundLayers()` in `src/lib/profile-display.ts` wordt opgesplitst: de textuur-laag (raster, ruis, dots, …) wordt los van de basiskleur teruggegeven.
- In `ProfileView.tsx` wordt de textuur als extra laag **bovenop** de gekozen achtergrond gelegd (effen kleur, gradient, afbeelding of animatie), in plaats van eronder te verdwijnen.
- "Effen" en "Zachte gradient" blijven volledige achtergronden zoals nu.

## 4. Verificatie

- Tests voor de kleur-omrekening en de laag-logica; bestaande tests blijven groen.
- Build moet foutloos zijn.
- Visuele check in de preview: kleurkiezer bedienen, elke animatie aanzetten, en een textuur over een gradient leggen.

## Technische details

- `src/components/dashboard/DesignTabEditor.tsx` — kleurkiezer + nieuwe type-tegels in `DesignWallpaperSection`.
- `src/lib/profile-design.ts` — nieuwe `WallpaperType`-waarden (`mesh-flow`, `grid-scroll`, `fluid-wave`) met labels; `wallpaperStyle()` markeert ze als "animerend".
- `src/lib/profile-display.ts` — `backgroundLayers()` split in textuur + basis.
- `src/components/profile/ProfileView.tsx` — lagen samenstellen; nieuwe `AnimatedBackground`-laag.
- `src/styles.css` — keyframes voor de drie animaties, met `motion-reduce`-fallback.
- `src/lib/color-hsl.ts` (nieuw) + testbestand — hex ↔ HSL helpers.
- Geen database-wijziging nodig: nieuwe waarden passen in de bestaande tekstvelden.
