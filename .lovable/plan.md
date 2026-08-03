# Nuovo sito Hyperloop Development Program

Sì, si può fare. Ricostruzione completa del sito con estetica moderna in stile Apple: sezioni full-width a schermo pieno, immagini cinematografiche, tipografia grande e animazioni allo scroll.

## Direzione visiva

- Palette **Midnight Indigo**: fondo blu notte (#0a0a1a), superfici #141432 / #1e1e5a, accento indaco elettrico #4f46e5.
- Tipografia: **Sora** per i titoli, **Manrope** per il testo (caricate via link nel head).
- Layout: bande full-width impilate, ampio respiro, angoli morbidi, glow sottili sugli accenti.
- Animazioni: reveal al scroll (fade + slide), parallasse leggero sulle immagini hero, contatori animati sulle statistiche, hover magnetico su card e pulsanti, header che si condensa allo scroll, transizioni di pagina. Motion for React per l'orchestrazione, con rispetto di `prefers-reduced-motion`.

## Struttura del sito (contenuti dal sito attuale, riscritti e riorganizzati)

- `/` — Hero cinematografico con claim del Chairman, sezioni: About HDP, About Hyperloop, EU Testing Infrastructure, Ecosystem, Latest News, CTA contatti.
- `/about-hdp` — missione, governance, team/ruoli, partnership pubblico-privata.
- `/hyperloop` — come funziona la tecnologia, benefici (capacità, energia, ambiente), timeline di sviluppo.
- `/testing-infrastructure` — cluster europeo: European Hyperloop Center, EuroTube DemoTube, goTube IHT, con capacità di ciascun sito.
- `/partners` — ecosistema di oltre 25 organizzazioni: griglia partner con filtro per categoria (industria / ricerca / infrastrutture).
- `/news` — elenco notizie con card e data.
- `/news/$slug` — pagina di dettaglio notizia.
- `/contact` — form contatti + riferimenti.
- Header sticky con navigazione e menu mobile a schermo pieno; footer con link e social.

Nota: i contenuti testuali e le immagini verranno adattati dal sito attuale; per le immagini non scaricabili genero visual coerenti (rendering veicolo, tubo, centro test) in stile fotografico realistico.

## Dettagli tecnici

- Token di design (colori oklch, radius, gradienti, glow) in `src/styles.css`; nessun colore hardcoded nei componenti.
- Route TanStack in `src/routes/`, ognuna con il proprio `head()` (title, description, og/twitter).
- Componenti riutilizzabili in `src/components/`: `SiteHeader`, `SiteFooter`, `Reveal` (wrapper animazione scroll), `SectionFullWidth`, `StatCounter`, `PartnerGrid`, `NewsCard`.
- Notizie e partner come dati statici tipizzati in `src/data/` (nessun backend). Il form contatti in questa fase valida e mostra conferma lato client.
- Immagini generate salvate in `src/assets/` e importate come ES module, con lazy loading e `alt` descrittivi.

## Cosa non è incluso ora

- CMS/backend per pubblicare notizie e invio email reale del form (si possono aggiungere in un secondo momento con Lovable Cloud).
- Shop/cart presente sul sito attuale.
