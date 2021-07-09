## **TODO**

- [ ] extendet format view (av01.0.08M.08)
- [x] ~~name change~~
- [x] ~~artist in metadata~~
- [ ] Maybe more metadata to Out-file
- [ ] auch mp3 metadata bearbeiten
- [ ] Edit mordal stylen
- [ ] audioContentType auf validität prüfen?
- [ ] Schneller zum Client pipen (dauert ganz schön lange) => weiß nicht ob möglich
- [ ] Handlen wenn kein Artist eingetragen ist
- [ ] **Video editor**
  - [ ] Video zuschneiden
  - [ ] Audio lauter/leiser
  - [ ] Thumnail runterladen
  - [ ] Screenshot von bestimmten Zeitpunkt herunterladen
- [x] ~~fromatDropdown kleiner machen => damit es nicht oben und unten über den rand gehen kann~~
- [ ] Change Download-Button
  - [ ] Wenn format ausgewählt dann beim ersten Klick daten von Server holen und unsichbaren-download-DOM-Element erstellen, erst beim zweiten Klick herunterladen
- [x] **`BUG:`** Formatdropdown zeig mehrermals den gleichn Format und verknotet sich mit andere Videoformate
  - [ ] ===> Ist glaube ich behoben!
- [ ] Formatdropdown ausbauen mit mehreren Formaten (.webm)
- [ ] server und frontend zusammenführen
- [x] ~~Dropdown Animationen~~
- [ ] Animationen
  - [ ] löschen
  - [ ] download
  - [ ] hinzufügen
  - [ ] ladesymbol bei downloaden und hinzufügen
- [ ] FormatDropdown stylen
- [ ] Drag and drop List zum sortieren
- [ ] anzeigen das schon Heruntergeladen wurde => vllt wie bei Steam?
- [x] ~~Liste local speichen -> bei neuladen noch vorhanden!!!~~
- [ ] errors oder mitteilung in kleinen popup an der seite mitteilen
- [ ] Wenn Videos länger in der localStorage gespeichert werden, geht der Download nicht beim server ?????
- [x] ~~!!! **Datein von Backend zum Frontend schicken und mit `WASM` im Browser bearbeiten** !!!~~
  - [x] ~~FFMpeg in Frontend mit eingebunden~~
  - [ ] ~~Backend umbebaut~~
  - [x] Passende Dateien zum Download bereitstellen
    - [x] Server gibt Video und Audio oder nur Audio zurück
  - [ ] Progressbar einbauen
    - [ ] spamen von download-Button verhindern!!!
  - [ ] Loading async, and show it to client
- [ ] Cross-Origin einschränken [Weitere Infos](https://developer.chrome.com/blog/enabling-shared-array-buffer/#cross-origin-isolation)
- [ ] einstellung zum ein/aus für ffmpeg => weniger RAM usage

- [ ] Server/nginx features:
  - [ ] SSL // HTTPS
  - [ ] Login oder andere Authentifizierung
  - [ ] Raspberry Pi Monitoring (nur intern zulassen vllt durch bestimmeten User oder nur vom gleichen Netzwerk?) z.B. Last, Besucherzahlen und Videos heruntergeladen
  - [ ] PM2?? => load balancing: mehrere gleiche Prozesse laufen lassen

#

## ~~**Youtube-API Key:** `AIzaSyDUXCG1zYXFUsaeBJyY1C723Hn4LSMWtZw`~~

#

## **OLD manifest (removed because of error):**

```JSON
{
    "short_name": "React App",
    "name": "Create React App Sample",
    "icons": [
        {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
        },
        {
            "src": "logo192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "logo512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
}
```

#
