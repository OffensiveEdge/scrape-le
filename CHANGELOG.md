# Changelog

All notable changes to Scrape-LE will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.0] - 2025-10-26

### Security & Enterprise Readiness

- **Command Injection Prevention** - Added 65 comprehensive security tests covering:
  - Shell metacharacter sanitization (`;`, `|`, `&`, `$`, backticks)
  - Browser command validation
  - Filename sanitization for screenshots
  - URL validation and normalization
  - Protocol restriction enforcement
- **Detection Logic Validation** - Added 46 tests for reliability:
  - Anti-bot detection (Cloudflare, reCAPTCHA, hCaptcha, DataDome, Perimeter81)
  - Authentication detection (401/403, login forms, OAuth, SSO, API keys)
  - Rate limit detection (X-RateLimit headers, Retry-After, HTTP 429)
  - robots.txt parsing and interpretation
- **Test Suite Expansion** - Increased from 96 to 207 unit tests (+115%)
  - 87% function coverage, 91% line coverage
  - Zero critical vulnerabilities
  - Enterprise-grade reliability

### Quality Improvements

- **Type Safety** - 100% TypeScript strict mode compliance
- **Immutability** - All exports frozen with `Object.freeze()`
- **Dependency Security** - Zero vulnerabilities in dependency chain

## [1.7.0] - 2025-01-27

### Initial Public Release

Scrape-LE brings zero-hassle web scrapeability checking to VS Code. Simple, reliable, focused.

#### Core Features

- **Pre-deployment validation** - Test target URLs before writing scraper code
- **Visual confirmation** - Full-page screenshots provide instant visual proof
- **Advanced detection suite** - Identify anti-bot systems:
  - Cloudflare protection
  - reCAPTCHA detection
  - hCaptcha detection
  - Rate limits
  - robots.txt policies
  - Authentication walls
- **Console error detection** - Identify JavaScript errors that might break scrapers
- **Fast feedback loop** - Get results in seconds, not minutes
- **One-click setup** - Automatic Chromium installation

#### Technology Stack

- **Real browser automation** - Uses Playwright for authentic browser testing
- **Chromium integration** - Automatic browser setup and management
- **Screenshot capture** - Full-page visual verification
- **Console monitoring** - JavaScript error detection and reporting
- **Network analysis** - Request/response monitoring and validation

#### Features

- **Multi-language support** - Comprehensive localization
- **Status bar integration** - Shows check progress without blocking workflow
- **Command palette integration** - Easy access to all features
- **One-command checking** - `Ctrl+Alt+S` (`Cmd+Alt+S` on macOS)
- **Sample test cases** - 10 categorized test cases including static sites, SPAs, APIs, protected sites
- **Developer-friendly** - 96 passing tests (86.99% function coverage, 91.37% line coverage), TypeScript strict mode, functional programming, MIT licensed

#### Use Cases

- **Pre-Scraper Validation** - Check if sites are reachable before writing scraper code
- **Anti-Bot Detection** - Identify Cloudflare, reCAPTCHA, hCaptcha before deployment
- **Rate Limit Discovery** - Find rate limits before hitting them in production
- **robots.txt Compliance** - Verify crawling is allowed by site policies
- **Auth Wall Detection** - Check if login or paywalls block access
