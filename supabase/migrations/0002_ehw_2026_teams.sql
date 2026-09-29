-- HyperHub Network — replace the placeholder seed with the verified EHW 2026
-- participating teams list (source: hyperloopweek.com/participating-teams,
-- captured 2026-09-29). Removes highlights/results that were placeholders,
-- not confirmed competition outcomes.

truncate table public.teams;

insert into public.teams (slug, name, university, country, website, is_published, sort_order) values
    ('delft-hyperloop', 'Delft Hyperloop', 'TU Delft', 'Netherlands', 'https://delfthyperloop.nl/', true, 10),
    ('hyped', 'HYPED', 'University of Edinburgh', 'United Kingdom', 'https://www.hyp-ed.com/', true, 20),
    ('hyperloop-upv', 'Hyperloop UPV', 'Universitat Politècnica de València', 'Spain', 'https://hyperloopupv.com/about', true, 30),
    ('swissloop', 'Swissloop', 'ETH Zurich', 'Switzerland', 'https://swissloop.ch/', true, 40),
    ('vegapod-hyperloop', 'VegaPod Hyperloop', 'MIT World Peace University', 'India', 'https://www.vegapodhyperloop.in/', true, 50),
    ('itu-hyperbee', 'ITU HyperBee', 'Istanbul Technical University', 'Türkiye', null, true, 60),
    ('creatiny-technology-society', 'Creatiny Technology Society', 'Karadeniz Technical University', 'Türkiye', 'https://www.creatiny.com/', true, 70),
    ('hermod-hyperloop', 'Hermod Hyperloop', 'Turkish-German University', 'Türkiye', null, true, 80),
    ('loopmit', 'LoopMIT', 'Manipal Institute of Technology', 'India', 'https://loopmit.in/', true, 90),
    ('mu-zero-hyperloop', 'mu-zero HYPERLOOP', 'Karlsruhe Institute of Technology', 'Germany', 'https://www.mu-zero.de/', true, 100),
    ('kilavuz-hyperush', 'KILAVUZ HYPERUSH', 'University of Kocaeli', 'Türkiye', null, true, 110),
    ('hyperloop-manchester', 'Hyperloop Manchester', 'University of Manchester', 'United Kingdom', 'https://hyperloop-manchester.com/', true, 120),
    ('avishkar-hyperloop', 'Avishkar Hyperloop', 'Indian Institute of Technology Madras', 'India', 'https://avishkarhyperloop.com/', true, 130),
    ('selcuk-kapsul', 'Selcuk Kapsul', 'Selçuk University', 'Türkiye', null, true, 140),
    ('hyperlink', 'Hyperlink', 'Queen Mary University of London', 'United Kingdom', 'https://www.hyperlinklondon.com/', true, 150),
    ('duke-hyperloop', 'Duke Hyperloop', 'Duke University', 'United States', 'https://mystarlightco.wixstudio.com/my-site-5', true, 160),
    ('smith-engineering-hyperloop', 'Smith Engineering Hyperloop', 'Queen''s University', 'Canada', 'https://www.queenshyperloop.ca/', true, 170),
    ('hyperloopin-srm', 'Hyperloopin SRM', 'SRM Institute of Science and Technology KTR', 'India', 'https://hyperloop-in.vercel.app/', true, 180),
    ('infinity-hyperloop', 'Infinity Hyperloop', 'Indian Institute of Technology Delhi', 'India', 'https://infinityhyperloop.iitd.ac.in/', true, 190),
    ('warwick-hyperloop', 'Warwick Hyperloop', 'University of Warwick', 'United Kingdom', 'https://warwickhyperloop.com/', true, 200),
    ('partech', 'PARTECH', 'Karabük University', 'Türkiye', null, true, 210),
    ('albertaloop', 'Albertaloop', 'University of Alberta', 'Canada', 'https://albertaloop.ca/', true, 220),
    ('polyloop', 'Polyloop', 'Polytechnique Montreal', 'Canada', 'https://www.polyloop.ca/', true, 230),
    ('texas-guadaloop', 'Texas Guadaloop', 'University of Texas at Austin', 'United States', 'https://guadaloop-website.vercel.app/', true, 240),
    ('vac-vectoor-hyperloop', 'Vac-Vectoor Hyperloop ADYPU', 'Ajeenkya D Y Patil University', 'India', null, true, 250),
    ('cornell-hyperloop', 'Cornell Hyperloop', 'Cornell University', 'United States', 'https://www.cornellhyperloop.com/', true, 260),
    ('dromos', 'DROMOS', 'Vellore Institute of Technology - Chennai', 'India', null, true, 270),
    ('force-hyperloop', 'FORCE HYPERLOOP', 'NIT Tiruchirappalli', 'India', 'https://www.forcehyperloop.com/', true, 280),
    ('transpeed', 'Transpeed', 'AGH University of Science and Technology', 'Poland', null, true, 290),
    ('hyper-pwr', 'HYPER', 'Politechnika Wrocławska', 'Poland', 'https://hypewr.pwr.edu.pl/', true, 300),
    ('levitate-hyperloop', 'Team Levitate Hyperloop', 'Vellore Institute of Technology', 'India', 'https://www.levitatehyperloop.com/', true, 310),
    ('spectraloop', 'Spectraloop', 'Samsun Üniversitesi', 'Türkiye', 'https://spectraloop.com/', true, 320),
    ('hypercage', 'Hypercage', 'Gebze Technical University', 'Türkiye', null, true, 330),
    ('metropolitan-hyperloop', 'Metropolitan Hyperloop', 'Toronto Metropolitan University', 'Canada', 'https://methyperloop.netlify.app/', true, 340)
on conflict (slug) do nothing;
