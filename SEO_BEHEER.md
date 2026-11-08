# Zoekmachinebeheer Helmond850.nl

De site is een onafhankelijk particulier initiatief, geen officiele gemeentelijke website. Zoekmachineoptimalisatie gebeurt zonder onjuiste historische claims.

## Ingericht op 8 november 2026

- 12 indexeerbare HTML-pagina's met aparte titels en beschrijvingen
- Canonical URLs op https://helmond850.nl/
- Schema.org JSON-LD: WebSite op de startpagina en WebPage per pagina
- Open Graph URL- en Twitter-gegevens per pagina
- Volledige sitemap.xml met lastmod van de uitgevoerde wijzigingen
- robots.txt verwijst naar de sitemap
- IndexNow sleutelbestand op /f5cde794c998f00fa0c76d8a79007812.txt
- GitHub Actions workflow om nieuwe of gewijzigde HTML-pagina's naar IndexNow te sturen bij publicatie

## Eenmalig door domeineigenaar te regelen

1. Voeg https://helmond850.nl toe als domeinproperty in Google Search Console (DNS-TXT verificatie bij de DNS-beheerder).
2. Dien https://helmond850.nl/sitemap.xml in bij Search Console. Inspecteer de startpagina en vraag indexering aan als deze nog niet geindexeerd is.
3. Voeg de site toe aan Bing Webmaster Tools. Importeren vanuit een geverifieerde Google Search Console-property kan meestal.
4. Controleer in GitHub onder Actions of de IndexNow-workflow slaagt. Zo niet: controleer of GitHub Actions voor de repository aanstaat, de site en sleutel live zijn en start de workflow opnieuw met 'Run workflow'.
5. Controleer of https://www.helmond850.nl en http://helmond850.nl doorverwijzen naar https://helmond850.nl/ en of HTTPS werkt. Dit hangt af van DNS en GitHub Pages instellingen, niet van HTML.
6. Bekijk na enkele weken in beide webmasterportalen het aantal geindexeerde pagina's, vertoningen, zoekopdrachten en eventuele indexatieproblemen.

## Bij nieuwe wereldverhalen

- Maak een aparte betekenisvolle URL voor een uitgebreid verhaal, met eigen title, meta description en interne links.
- Voeg die URL toe aan sitemap.xml met de echte datum van inhoudelijke wijziging.
- Zorg dat de JSON-LD en canonical URL naar de eigen pagina verwijzen.
- Blijf bronnen vermelden en maak geen onbewezen claims.
- De IndexNow-workflow pakt gewijzigde root-HTML-bestanden op bij een push naar main. Google gebruikt IndexNow niet; daar werkt de sitemap/Search Console.

Let op: een sitemap, IndexNow-melding en gestructureerde data bevorderen ontdekbaarheid, maar garanderen geen indexering of hoge zoekpositie.
