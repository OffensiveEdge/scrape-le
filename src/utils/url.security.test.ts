import { describe, expect, it } from 'vitest';
import {
	convertUrlToFilename,
	extractUrl,
	normalizeUrl,
	validateUrl,
} from './url';

describe('URL Security Tests', () => {
	describe('Command Injection Prevention', () => {
		it('should reject javascript: protocol', () => {
			const url = 'javascript:alert(1)';
			expect(validateUrl(url)).toBe(false);
		});

		it('should reject data: protocol', () => {
			const url = 'data:text/html,<script>alert(1)</script>';
			expect(validateUrl(url)).toBe(false);
		});

		it('should reject file: protocol', () => {
			const url = 'file:///etc/passwd';
			expect(validateUrl(url)).toBe(false);
		});

		it('should reject ftp: protocol', () => {
			const url = 'ftp://ftp.example.com/file.txt';
			expect(validateUrl(url)).toBe(false);
		});

		it('should only accept http: protocol', () => {
			const url = 'http://example.com';
			expect(validateUrl(url)).toBe(true);
		});

		it('should only accept https: protocol', () => {
			const url = 'https://example.com';
			expect(validateUrl(url)).toBe(true);
		});
	});

	describe('Shell Metacharacter Sanitization', () => {
		it('should handle URLs with semicolons', () => {
			const url = 'https://example.com/path;param=value';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with ampersands', () => {
			const url = 'https://example.com/search?q=test&page=1';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with pipes', () => {
			const url = 'https://example.com/path|section';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with backticks', () => {
			const url = 'https://example.com/path`command`';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with dollar signs', () => {
			const url = 'https://example.com/path$(whoami)';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with parentheses', () => {
			const url = 'https://example.com/path(test)';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with quotes', () => {
			const url = 'https://example.com/path"test"';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with single quotes', () => {
			const url = "https://example.com/path'test'";
			expect(validateUrl(url)).toBe(true);
		});
	});

	describe('URL Normalization', () => {
		it('should add https:// to URLs without protocol', () => {
			const url = 'example.com';
			expect(normalizeUrl(url)).toBe('https://example.com');
		});

		it('should preserve http:// protocol', () => {
			const url = 'http://example.com';
			expect(normalizeUrl(url)).toBe('http://example.com');
		});

		it('should preserve https:// protocol', () => {
			const url = 'https://example.com';
			expect(normalizeUrl(url)).toBe('https://example.com');
		});

		it('should trim whitespace', () => {
			const url = '  https://example.com  ';
			expect(normalizeUrl(url)).toBe('https://example.com');
		});

		it('should handle empty string', () => {
			const url = '';
			expect(normalizeUrl(url)).toBe('https://');
		});
	});

	describe('Filename Sanitization', () => {
		it('should convert URL to safe filename', () => {
			const url = 'https://example.com/path';
			const filename = convertUrlToFilename(url);
			expect(filename).toMatch(/^example-com-\d{4}-\d{2}-\d{2}$/);
		});

		it('should sanitize shell metacharacters in filename', () => {
			const url = 'https://example.com/path;rm -rf /';
			const filename = convertUrlToFilename(url);
			expect(filename).not.toContain(';');
			expect(filename).not.toContain(' ');
			expect(filename).not.toContain('/');
		});

		it('should sanitize backticks in filename', () => {
			const url = 'https://example.com/`whoami`';
			const filename = convertUrlToFilename(url);
			expect(filename).not.toContain('`');
		});

		it('should sanitize dollar signs in filename', () => {
			const url = 'https://example.com/$(whoami)';
			const filename = convertUrlToFilename(url);
			expect(filename).not.toContain('$');
			expect(filename).not.toContain('(');
			expect(filename).not.toContain(')');
		});

		it('should sanitize pipes in filename', () => {
			const url = 'https://example.com/path|cat /etc/passwd';
			const filename = convertUrlToFilename(url);
			expect(filename).not.toContain('|');
		});

		it('should sanitize ampersands in filename', () => {
			const url = 'https://example.com/path&background';
			const filename = convertUrlToFilename(url);
			expect(filename).not.toContain('&');
		});

		it('should sanitize quotes in filename', () => {
			const url = 'https://example.com/path"test"';
			const filename = convertUrlToFilename(url);
			expect(filename).not.toContain('"');
		});

		it('should limit filename length', () => {
			const url = `https://example.com/${'a'.repeat(200)}`;
			const filename = convertUrlToFilename(url);
			expect(filename.length).toBeLessThanOrEqual(100);
		});

		it('should handle invalid URLs gracefully', () => {
			const url = 'not-a-url';
			const filename = convertUrlToFilename(url);
			expect(filename).toBe('not-a-url');
		});

		it('should convert to lowercase', () => {
			const url = 'https://EXAMPLE.COM/PATH';
			const filename = convertUrlToFilename(url);
			expect(filename).toMatch(/^example-com-\d{4}-\d{2}-\d{2}$/);
		});
	});

	describe('URL Extraction', () => {
		it('should extract HTTPS URL from text', () => {
			const text = 'Check out https://example.com for more info';
			expect(extractUrl(text)).toBe('https://example.com');
		});

		it('should extract HTTP URL from text', () => {
			const text = 'Visit http://example.com';
			expect(extractUrl(text)).toBe('http://example.com');
		});

		it('should extract URL with path', () => {
			const text = 'See https://example.com/path/to/page';
			expect(extractUrl(text)).toBe('https://example.com/path/to/page');
		});

		it('should extract URL with query parameters', () => {
			const text = 'Search https://example.com/search?q=test';
			expect(extractUrl(text)).toBe('https://example.com/search?q=test');
		});

		it('should extract first URL from multiple URLs', () => {
			const text = 'Visit https://example.com or https://other.com';
			expect(extractUrl(text)).toBe('https://example.com');
		});

		it('should normalize URL without protocol', () => {
			const text = 'example.com';
			expect(extractUrl(text)).toBe('https://example.com');
		});

		it('should return null for text without URLs', () => {
			const text = 'This is just plain text';
			expect(extractUrl(text)).toBe(null);
		});

		it('should return null for empty string', () => {
			expect(extractUrl('')).toBe(null);
		});

		it('should not extract javascript: URLs', () => {
			const text = 'Click javascript:alert(1)';
			expect(extractUrl(text)).toBe(null);
		});

		it('should not extract data: URLs', () => {
			const text = 'Image: data:image/png;base64,abc123';
			expect(extractUrl(text)).toBe(null);
		});
	});

	describe('Protocol Validation', () => {
		it('should validate http protocol', () => {
			expect(validateUrl('http://example.com')).toBe(true);
		});

		it('should validate https protocol', () => {
			expect(validateUrl('https://example.com')).toBe(true);
		});

		it('should reject javascript protocol', () => {
			expect(validateUrl('javascript:alert(1)')).toBe(false);
		});

		it('should reject data protocol', () => {
			expect(validateUrl('data:text/html,<h1>Test</h1>')).toBe(false);
		});

		it('should reject file protocol', () => {
			expect(validateUrl('file:///etc/passwd')).toBe(false);
		});

		it('should reject ftp protocol', () => {
			expect(validateUrl('ftp://ftp.example.com')).toBe(false);
		});

		it('should reject mailto protocol', () => {
			expect(validateUrl('mailto:user@example.com')).toBe(false);
		});

		it('should reject tel protocol', () => {
			expect(validateUrl('tel:+1234567890')).toBe(false);
		});

		it('should reject chrome-extension protocol', () => {
			expect(validateUrl('chrome-extension://abcdef/popup.html')).toBe(false);
		});

		it('should reject about protocol', () => {
			expect(validateUrl('about:blank')).toBe(false);
		});
	});

	describe('Edge Cases', () => {
		it('should reject empty string', () => {
			expect(validateUrl('')).toBe(false);
		});

		it('should reject whitespace-only string', () => {
			expect(validateUrl('   ')).toBe(false);
		});

		it('should reject null', () => {
			expect(validateUrl(null as any)).toBe(false);
		});

		it('should reject undefined', () => {
			expect(validateUrl(undefined as any)).toBe(false);
		});

		it('should reject non-string values', () => {
			expect(validateUrl(123 as any)).toBe(false);
		});

		it('should handle very long URLs', () => {
			const url = `https://example.com/${'a'.repeat(2000)}`;
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URLs with IPv4 addresses', () => {
			expect(validateUrl('http://192.168.1.1')).toBe(true);
		});

		it('should handle URLs with ports', () => {
			expect(validateUrl('https://example.com:8080')).toBe(true);
		});

		it('should handle URLs with authentication', () => {
			expect(validateUrl('https://user:pass@example.com')).toBe(true);
		});

		it('should handle URLs with fragments', () => {
			expect(validateUrl('https://example.com/page#section')).toBe(true);
		});

		it('should handle URLs with Unicode characters', () => {
			expect(validateUrl('https://例え.jp')).toBe(true);
		});
	});

	describe('Security Attack Vectors', () => {
		it('should reject CRLF injection in URL', () => {
			const url = 'https://example.com\r\nSet-Cookie: evil=true';
			// URL parser will fail on CRLF
			expect(validateUrl(url)).toBe(false);
		});

		it('should reject null byte in URL', () => {
			const url = 'https://example.com\0.evil.com';
			// URL parser will fail on null byte
			expect(validateUrl(url)).toBe(false);
		});

		it('should handle URL with path traversal', () => {
			const url = 'https://example.com/../../etc/passwd';
			// Path traversal is valid in URLs (handled by server)
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URL with encoded characters', () => {
			const url = 'https://example.com/%2e%2e%2f%2e%2e%2fetc%2fpasswd';
			expect(validateUrl(url)).toBe(true);
		});

		it('should handle URL with backslashes', () => {
			const url = 'https://example.com\\path\\to\\resource';
			// URL parser normalizes backslashes
			expect(validateUrl(url)).toBe(true);
		});
	});
});
