<p align="center">
  <img src="src/assets/images/icon.png" alt="Scrape-LE Logo" width="96" height="96"/>
</p>
<h1 align="center">Scrape-LE: Zero Hassle Web Scrapeability Checker</h1>
<p align="center">
  <b>Check site scrapeability in 2-5 seconds</b> • <b>Save 2+ hours of wasted coding</b><br/>
  <i>Real Browser • Screenshots • Console Errors • Anti-Bot Detection</i>
</p>

<p align="center">
  <a href="https://open-vsx.org/extension/OffensiveEdge/scrape-le">
    <img src="https://img.shields.io/badge/Install%20from-Open%20VSX-blue?style=for-the-badge&logo=visualstudiocode" alt="Install from Open VSX" />
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.scrape-le">
    <img src="https://img.shields.io/badge/Install%20from-VS%20Code-blue?style=for-the-badge&logo=visualstudiocode" alt="Install from VS Code" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/open-vsx/dt/OffensiveEdge/scrape-le?label=downloads&color=green" alt="Downloads" />
  <img src="https://img.shields.io/open-vsx/rating/OffensiveEdge/scrape-le?label=rating&color=yellow" alt="Rating" />
  <img src="https://img.shields.io/badge/Open%20Source-100%25-purple" alt="100% Open Source" />
  <img src="https://img.shields.io/badge/Vulnerabilities-0%20Critical-brightgreen" alt="Zero Critical Vulnerabilities" />
</p>

<p align="center">
  <i>💡 First time? Run <b>"Scrape-LE: Setup Browser"</b> from Command Palette to install Chromium (~130MB one-time setup)</i>
</p>

---

<p align="center">
  <img src="src/assets/images/demo.gif" alt="Scrapeability Check Demo" style="max-width: 100%; height: auto;" />
</p>

<p align="center">
  <img src="src/assets/images/command-palette.png" alt="Command Palette" style="max-width: 80%; height: auto;" />
</p>

---

## ⚡ See It In Action

**Before**: Writing scraper code, deploying, then discovering Cloudflare blocked you (2 hours wasted)

```python
# 2 hours of coding
scraper = MyScraper("https://example.com")
scraper.run()  # Error: Cloudflare challenge detected!
```

**After**: Check first, code later (2 seconds to validate)

```
✅ Site reachable
⚠️ Cloudflare detected
⚠️ Rate limit: 100 requests/hour
✅ robots.txt allows crawling
📸 Screenshot saved
```

**Time Saved**: 2 hours of wasted coding → 2 seconds of validation ⚡

---

## ✅ Why Scrape-LE?

- **2-5 seconds to validate** - vs. 30+ minutes of trial and error
- **Zero Config** - Install Chromium → Press `Cmd+Alt+S` → Get full report
- **Battle-Tested** - 207 unit tests, 87% coverage, zero critical vulnerabilities
- **Security-Hardened** - 65 tests prevent command injection, shell metacharacter exploits

Perfect for validating scraper targets before writing code.

---

## 🙏 Thank You

If Scrape-LE saves you time, a quick rating helps other developers discover it:  
⭐ [Open VSX](https://open-vsx.org/extension/OffensiveEdge/scrape-le) • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.scrape-le)

---

### Key Features

- **Real browser** - Uses Playwright (Chromium) for accurate rendering
- **Full-page screenshots** - Visual confirmation of page state
- **Anti-bot detection** - Cloudflare, reCAPTCHA, hCaptcha, DataDome, Perimeter81
- **Auth detection** - Login forms, OAuth, SSO, API keys
- **Rate limit detection** - X-RateLimit headers, Retry-After, HTTP 429
- **robots.txt parsing** - Check crawling permissions
- **Console errors** - Catch JavaScript errors
- **13 languages** - English, Chinese, German, Spanish, French, Indonesian, Italian, Japanese, Korean, Portuguese, Russian, Ukrainian, Vietnamese

## 🚀 More from the LE Family

- **[String-LE](https://open-vsx.org/extension/OffensiveEdge/string-le)** - Extract user-visible strings for i18n and validation • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.string-le)
- **[Numbers-LE](https://open-vsx.org/extension/OffensiveEdge/numbers-le)** - Extract and analyze numeric data with statistics • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.numbers-le)
- **[EnvSync-LE](https://open-vsx.org/extension/OffensiveEdge/envsync-le)** - Keep .env files in sync with visual diffs • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.envsync-le)
- **[Paths-LE](https://open-vsx.org/extension/OffensiveEdge/paths-le)** - Extract file paths from imports and dependencies • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.paths-le)
- **[Regex-LE](https://open-vsx.org/extension/OffensiveEdge/regex-le)** - Test and validate regex patterns with live feedback • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.regex-le)
- **[Secrets-LE](https://open-vsx.org/extension/OffensiveEdge/secrets-le)** - Detect and sanitize secrets before you commit • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.secrets-le)
- **[Colors-LE](https://open-vsx.org/extension/OffensiveEdge/colors-le)** - Extract and analyze colors from stylesheets • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.colors-le)
- **[URLs-LE](https://open-vsx.org/extension/OffensiveEdge/urls-le)** - Extract URLs from any codebase with precision • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.urls-le)
- **[Dates-LE](https://open-vsx.org/extension/OffensiveEdge/dates-le)** - Extract temporal data from logs and APIs • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.dates-le)

## 💡 Use Cases

- **Pre-Scraper Validation** - Check if sites are reachable before writing scraper code
- **Anti-Bot Detection** - Identify Cloudflare, reCAPTCHA, hCaptcha before deployment
- **Rate Limit Discovery** - Find rate limits before hitting them in production
- **robots.txt Compliance** - Verify crawling is allowed by site policies
- **Auth Wall Detection** - Check if login or paywalls block access
  Disallow: /admin/, /api/internal/
  Crawl-delay: 10 seconds
  Sitemap: https://example.com/sitemap.xml

````

## 🚀 Quick Start

1. **Install from Open VSX or VS Code Marketplace**
   - Open VSX: [Install here](https://open-vsx.org/extension/OffensiveEdge/scrape-le)
   - VS Code Marketplace: [Install here](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.scrape-le)
2. Open Command Palette (`Cmd/Ctrl + Shift + P`).
3. Run **"Scrape-LE: Check URL"** or press `Cmd+Alt+S` / `Ctrl+Alt+S`.
4. Enter URL and view detailed results.

**Need test URLs?** Check out [`sample/README.md`](sample/README.md) for 10 categorized test cases including static sites, SPAs, APIs, protected sites, and more.

### First-Time Setup

On first use, Scrape-LE automatically detects if Chromium is installed and prompts you to install it. This is a one-time setup (~130MB download).

**Automatic Installation:**

1. Run any check command
2. Click "Install Chromium" when prompted
3. Wait for installation to complete

**Manual Setup:**

```bash
bunx playwright install chromium
````

Or run from Command Palette: **"Scrape-LE: Setup Browser"**

## ⚙️ Configuration

### Basic Settings

- `scrape-le.browser.timeout` – Navigation timeout (5s - 120s)
- `scrape-le.browser.viewport.width` – Viewport width (320px - 3840px)
- `scrape-le.browser.viewport.height` – Viewport height (240px - 2160px)
- `scrape-le.screenshot.enabled` – Enable screenshot capture
- `scrape-le.screenshot.path` – Screenshot save location
- `scrape-le.checkConsoleErrors` – Capture console errors
- `scrape-le.notificationsLevel` – Control notification verbosity
- `scrape-le.statusBar.enabled` – Show status bar entry

### Detection Features

- `scrape-le.detections.antiBot` – Detect anti-bot systems (Cloudflare, reCAPTCHA, hCaptcha, DataDome, Perimeter81)
- `scrape-le.detections.rateLimit` – Detect rate limiting headers
- `scrape-le.detections.robotsTxt` – Check robots.txt policies
- `scrape-le.detections.authentication` – Detect authentication walls

### Real-World Configuration Examples

**Production Scraper Validation**

```json
{
  "scrape-le.browser.timeout": 30000,
  "scrape-le.screenshot.enabled": true,
  "scrape-le.detections.antiBot": true,
  "scrape-le.detections.rateLimit": true,
  "scrape-le.detections.robotsTxt": true,
  "scrape-le.notificationsLevel": "important"
}
```

**Quick Reachability Check**

```json
{
  "scrape-le.browser.timeout": 10000,
  "scrape-le.screenshot.enabled": false,
  "scrape-le.detections.antiBot": false,
  "scrape-le.detections.rateLimit": false,
  "scrape-le.detections.robotsTxt": false,
  "scrape-le.notificationsLevel": "silent"
}
```

**Development Mode**

```json
{
  "scrape-le.browser.timeout": 60000,
  "scrape-le.screenshot.enabled": true,
  "scrape-le.checkConsoleErrors": true,
  "scrape-le.detections.antiBot": true,
  "scrape-le.detections.authentication": true,
  "scrape-le.notificationsLevel": "all"
}
```

### ⚠️ Behaviors & Limits

- Browser launch requires ~130MB Chromium installation (one-time)
- Timeout ranges from 5s to 120s; adjust based on target site complexity
- Screenshots saved to `.vscode/scrape-le/` by default
- Large pages may take longer to capture full screenshots
- Anti-bot detection uses heuristics; some systems may not be detected
- robots.txt fetch has 5-second timeout
- Authentication detection checks HTTP status, forms, and keywords

See [`docs/CONFIGURATION.md`](docs/CONFIGURATION.md).

## ⚡ Performance

Scrape-LE performance varies by target website and network. See [detailed benchmarks](docs/PERFORMANCE.md).

For detailed information, see [Performance Monitoring](docs/PERFORMANCE.md).

| Scenario           | Page Size     | Duration | Memory    | Status |
| ------------------ | ------------- | -------- | --------- | ------ |
| **Simple HTML**    | < 100 KB      | < 2s     | < 20 MB   | ✅     |
| **Complex**        | 500 KB - 1 MB | 3-5s     | 30-50 MB  | ✅     |
| **Heavy JS (SPA)** | 1-3 MB        | 5-10s    | 50-100 MB | ⚠️     |
| **Image-heavy**    | 2-5 MB        | 5-15s    | 60-120 MB | ⚠️     |

**Browser**: Launch 1-2s, screenshot 200-800ms PNG / 150-600ms JPEG  
**Detection**: Anti-bot 85-90% accuracy (< 100ms), Rate limits 80-85% (< 50ms)  
**Full Metrics**: [docs/PERFORMANCE.md](docs/PERFORMANCE.md) • Network-dependent performance

- **Timeout Configuration**: Adjust based on target site complexity
- **Screenshot Impact**: Adds 1-2s to overall check time
- **Detection Suite**: Adds 500ms-2s for all checks combined

## 🧩 System Requirements

**VS Code** 1.70.0+ • **Platform** Windows, macOS, Linux  
**Memory** 1GB recommended • **Storage** 150MB (includes Chromium)

## 🔒 Privacy

100% local processing. URLs only sent to sites you specify. No analytics or tracking.

## 🌍 Language Support

**13 languages**: English, German, Spanish, French, Indonesian, Italian, Japanese, Korean, Portuguese (Brazil), Russian, Ukrainian, Vietnamese, Chinese (Simplified)

## 🔧 Troubleshooting

**"Executable doesn't exist" error?**  
Run **"Scrape-LE: Setup Browser"** from Command Palette to install Chromium

**Check times out?**  
Increase timeout: `scrape-le.browser.timeout` (default 30s) or check network connection

**Need help?**  
Check [Issues](https://github.com/OffensiveEdge/scrape-le/issues) or enable verbose logging: `scrape-le.notificationsLevel: "all"`

## ❓ FAQ

**Need to install Chromium?**  
No, Scrape-LE handles it automatically on first use (~130MB download)

**Works with localhost?**  
Yes, supports localhost, local IPs, and any accessible URL

**Works with React/Vue/Angular?**  
Yes, uses real browser so SPAs render properly

**Will sites detect this?**  
Uses headless Chromium which some sites detect. Use responsibly and check robots.txt

## 📊 Testing

**207 unit tests** • **87% function coverage, 91% line coverage**  
Powered by Vitest • Run with `bun run test:coverage`

### Core Principle

**No broken or failed tests are allowed in commits.** All tests must pass before code can be committed or merged.

### Test Suite Highlights

- **65 security tests** for command injection & URL validation
- **46 detection logic tests** for anti-bot, auth, rate limits, robots.txt
- **Comprehensive coverage** of browser automation, screenshot capture, and error handling

For detailed testing guidelines, see [Testing Guidelines](docs/TESTING.md).

---

Copyright © 2025  
<a href="https://github.com/OffensiveEdge">@OffensiveEdge</a>. All rights reserved.
