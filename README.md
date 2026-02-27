# NHUC Hymn Projector

A dual-monitor hymn projection desktop app built for **New Hope Universal Church (NHUC)**. The operator controls which verse is displayed from their laptop, while the congregation sees a clean fullscreen display on the projector.

![Electron](https://img.shields.io/badge/Electron-40.x-47848F?logo=electron&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

- 🎵 984 Methodist hymns built in, fully searchable by number or title
- 📖 Multi-book support — add and manage multiple hymn collections
- 🖥️ Dual-monitor projection — operator view on laptop, fullscreen on projector
- ✏️ Built-in hymn editor — create, edit, reorder and delete verses
- 🔤 Live font size control for the projection screen
- ⌨️ Keyboard navigation during service
- 🔄 Auto-update notifications via GitHub Releases

---

## For Church Staff — Installing the App

1. Go to the [Releases page](../../releases) of this repository
2. Download the latest **NHUC Hymn Projector Setup x.x.x.exe** file
3. Run the installer and follow the prompts
4. Launch **NHUC Hymn Projector** from your desktop or Start Menu

> **Tip:** Connect your projector before opening the app. It will automatically detect the second screen and open the projection window on it.

---

## For Church Staff — Using the App

### During a Service

| Action                 | How                                             |
| ---------------------- | ----------------------------------------------- |
| Search for a hymn      | Type the hymn number or title in the search bar |
| Filter by hymn book    | Use the dropdown above the search bar           |
| Project a verse        | Click the verse in the right panel              |
| Navigate verses        | Arrow keys ← → on your keyboard                 |
| Blank the screen       | Press **B** or click the Blank button           |
| Change text size       | Click **A−** or **A+** in the header            |
| Open projection window | Click **Open Projection** in the header         |

### Managing Hymns

Click **Hymn Editor** in the header to open the editor. From there you can:

- **Add a new hymn book** — click the `+` button next to HYMN BOOKS
- **Add a new hymn** — select a book, then click **+ Add Hymn**
- **Edit a hymn's details** — select a hymn and click **Edit Info**
- **Add or edit verses** — select a hymn, then click any verse or **+ Add Verse**
- **Reorder verses** — use the ↑ ↓ Move buttons in the edit form
- **Delete a verse or hymn** — use the Delete button in the edit form

---

## For Developers — Project Setup

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)

### Clone and Install

```bash
git clone https://github.com/Adehwam21/nhuc-hymns-projector.git
cd nhuc-hymns-projector
npm install
```

### Run in Development

```bash
npm start
```

---

## Project Structure

```
nhuc-hymns/
├── main.js                  # Electron main process — windows, IPC handlers
├── preload.js               # Secure bridge between main and renderer
├── package.json             # Dependencies and build config
│
├── data/
│   ├── database.js          # sql.js database class and queries
│   └── mhb_clean.db         # SQLite database — 984 Methodist hymns
│
├── operator/
│   ├── index.html           # Operator control panel UI
│   ├── operator.css         # Operator panel styles
│   └── operator.js          # Search, book filter, projection logic
│
├── projection/
│   ├── projection.html      # Fullscreen congregation display
│   ├── projection.css       # Projection screen styles
│   └── projection.js        # Receives and displays verse blocks
│
├── editor/
│   ├── editor.html          # Hymn editor UI
│   ├── editor.css           # Editor styles
│   └── editor.js            # CRUD logic for books, hymns and verses
│
└── assets/
    ├── images/              # App logo and images
    └── icons/               # Window icons (.ico, .icns)
```

### Tech Stack

| Layer             | Technology                                                                  |
| ----------------- | --------------------------------------------------------------------------- |
| Desktop framework | [Electron](https://electronjs.org) v40                                      |
| Database          | [SQLite](https://sqlite.org) via [sql.js](https://sql-js.github.io/sql.js/) |
| Auto-updates      | [electron-updater](https://www.electron.build/auto-update)                  |
| Build & packaging | [electron-builder](https://www.electron.build)                              |
| UI                | Vanilla HTML, CSS, JavaScript                                               |
| Fonts             | Cinzel, EB Garamond, Inter (Google Fonts)                                   |

---

## Building the .exe Installer

### 1. Bump the version

In `package.json`, update the version number:

```json
"version": "1.1.0"
```

### 2. Build the installer

```bash
npm run build
```

The output will be in the `dist/` folder:

```
dist/
├── NHUC Hymn Projector Setup 1.1.0.exe   ← installer
└── latest.yml                             ← required for auto-updates
```

> **Note:** The build uses `--publish never` so it will never automatically push to GitHub. You always upload manually.

---

## Publishing a GitHub Release

After building, follow these steps to publish a release so users get the update notification in the app.

### 1. Commit and push your changes

```bash
git add .
git commit -m "Release v1.1.0"
git push
```

### 2. Create a new release on GitHub

1. Go to your repository on GitHub
2. Click **Releases** → **Draft a new release**
3. Set the **tag** to match your version exactly, with a `v` prefix:
   ```
   v1.1.0
   ```
4. Set the **release title** to something like `NHUC Hymn Projector v1.1.0`
5. Write release notes describing what changed

### 3. Upload the build files

Drag and drop these two files from your `dist/` folder into the release:

- `NHUC Hymn Projector Setup 1.1.0.exe`
- `latest.yml`

> ⚠️ Both files are required. The app uses `latest.yml` to check for updates. Without it, auto-update will not work.

### 4. Publish the release

Click **Publish release**. Within 5 seconds of the next app launch, users will see a blue notification bar offering the update.

---

## Database

The hymn database is a SQLite file (`data/mhb_clean.db`) with two main tables:

```sql
books        — id, name
hymns        — id, number, title, author, book_id
hymn_blocks  — id, hymn_id, position, type, label, text
```

`type` is one of `verse`, `refrain`, or `chorus`.

The database is bundled into the installer via `extraResources` in `package.json` and loaded into memory at runtime using sql.js. Any edits made through the Hymn Editor are saved back to the file on disk.

---

## Contributing

Pull requests are welcome. For major changes please open an issue first to discuss what you would like to change.

---

## Author

**Aaron Katey Kudadjie**
Built for New Hope Universal Church, Ghana 🇬🇭
