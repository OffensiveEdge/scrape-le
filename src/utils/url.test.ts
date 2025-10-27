/**
 * Tests for URL utilities
 */
import { describe, expect, it } from 'vitest';
import {
	convertUrlToFilename,
	extractUrl,
	normalizeUrl,
	validateUrl,
} from './url';

describe('URL Utilities', () => {
	describe('validateUrl', () => {
		it('should validate correct HTTP URLs', () => {
			expect(validateUrl('http://example.com')).toBe(true);
			expect(validateUrl('http://www.example.com')).toBe(true);
			expect(validateUrl('http://example.com/path')).toBe(true);
		});

		it('should validate correct HTTPS URLs', () => {
			expect(validateUrl('https://example.com')).toBe(true);
			expect(validateUrl('https://www.example.com')).toBe(true);
			expect(validateUrl('https://example.com/path?query=1')).toBe(true);
		});

		it('should reject invalid URLs', () => {
			expect(validateUrl('')).toBe(false);
			expect(validateUrl('not a url')).toBe(false);
			expect(validateUrl('ftp://example.com')).toBe(false);
			expect(validateUrl('javascript:alert(1)')).toBe(false);
		});

		it('should handle edge cases', () => {
			expect(validateUrl('   ')).toBe(false);
			expect(validateUrl('https://')).toBe(false);
		});
	});

	describe('normalizeUrl', () => {
		it('should keep URLs with protocol unchanged', () => {
			expect(normalizeUrl('http://example.com')).toBe('http://example.com');
			expect(normalizeUrl('https://example.com')).toBe('https://example.com');
		});

		it('should add https:// to URLs without protocol', () => {
			expect(normalizeUrl('example.com')).toBe('https://example.com');
			expect(normalizeUrl('www.example.com')).toBe('https://www.example.com');
		});

		it('should trim whitespace', () => {
			expect(normalizeUrl('  example.com  ')).toBe('https://example.com');
		});
	});

	describe('extractUrl', () => {
		it('should extract URLs from text', () => {
			const text = 'Check out https://example.com for more info';
			expect(extractUrl(text)).toBe('https://example.com');
		});

		it('should extract first URL when multiple exist', () => {
			const text = 'Visit https://first.com or https://second.com';
			expect(extractUrl(text)).toBe('https://first.com');
		});

		it('should handle URLs without protocol', () => {
			const text = 'example.com';
			expect(extractUrl(text)).toBe('https://example.com');
		});

		it('should return null for text without URLs', () => {
			expect(extractUrl('no url here')).toBe(null);
			expect(extractUrl('')).toBe(null);
		});
	});

	describe('convertUrlToFilename', () => {
		it('should create safe filenames from URLs', () => {
			const filename = convertUrlToFilename('https://example.com');
			expect(filename).toMatch(/^example-com-/);
			expect(filename).toMatch(/\d{4}-\d{2}-\d{2}$/);
		});

		it('should handle complex URLs', () => {
			const filename = convertUrlToFilename(
				'https://sub.example.com/path?query=1',
			);
			expect(filename).toMatch(/^sub-example-com-/);
		});

		it('should handle invalid URLs gracefully', () => {
			const filename = convertUrlToFilename('not a url');
			expect(filename).toBeTruthy();
			expect(filename.length).toBeLessThanOrEqual(100);
		});
	});
});
