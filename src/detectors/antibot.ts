/**
 * Anti-bot protection detection
 */

import type { Page, Response } from 'playwright-core';
import type { AntiBotDetection } from '../types';

/**
 * Detects anti-bot measures on a page
 */
export async function detectAntiBot(
	page: Page,
	response: Response | null,
): Promise<AntiBotDetection> {
	try {
		const details: string[] = [];

		// Check response headers for anti-bot signatures
		const cloudflare = detectCloudflare(response, details);
		const recaptcha = await detectRecaptcha(page, details);
		const hcaptcha = await detectHcaptcha(page, details);
		const datadome = await detectDatadome(page, response, details);
		const perimeter81 = await detectPerimeter81(page, response, details);

		return Object.freeze({
			cloudflare,
			recaptcha,
			hcaptcha,
			datadome,
			perimeter81,
			details: Object.freeze(details),
		});
	} catch (error) {
		console.error('Error detecting anti-bot measures:', error);
		return createDefaultAntiBotDetection();
	}
}

/**
 * Detects Cloudflare protection
 */
function detectCloudflare(
	response: Response | null,
	details: string[],
): boolean {
	if (!response) {
		return false;
	}

	try {
		const headers = response.headers();

		// Check for Cloudflare headers
		if (headers['cf-ray']) {
			details.push('Cloudflare (cf-ray header detected)');
			return true;
		}

		if (headers['cf-cache-status']) {
			details.push('Cloudflare (cf-cache-status header detected)');
			return true;
		}

		if (headers.server?.toLowerCase().includes('cloudflare')) {
			details.push('Cloudflare (server header)');
			return true;
		}
	} catch (error) {
		console.error('Error checking Cloudflare:', error);
	}

	return false;
}

/**
 * Detects reCAPTCHA
 */
async function detectRecaptcha(
	page: Page,
	details: string[],
): Promise<boolean> {
	try {
		// Check for reCAPTCHA scripts and elements
		const hasRecaptcha = await page.evaluate(() => {
			// Check for reCAPTCHA script
			const scripts = Array.from(document.getElementsByTagName('script'));
			const hasScript = scripts.some(
				(script) =>
					script.src.includes('recaptcha') ||
					script.src.includes('gstatic.com'),
			);

			// Check for reCAPTCHA global variables
			const hasGlobal =
				typeof (window as typeof window & { grecaptcha?: unknown })
					.grecaptcha !== 'undefined';

			// Check for reCAPTCHA elements
			const hasElement =
				document.querySelector('.g-recaptcha') !== null ||
				document.querySelector('[data-sitekey]') !== null;

			return hasScript || hasGlobal || hasElement;
		});

		if (hasRecaptcha) {
			details.push('reCAPTCHA detected');
			return true;
		}
	} catch (error) {
		console.error('Error checking reCAPTCHA:', error);
	}

	return false;
}

/**
 * Detects hCaptcha
 */
async function detectHcaptcha(page: Page, details: string[]): Promise<boolean> {
	try {
		const hasHcaptcha = await page.evaluate(() => {
			// Check for hCaptcha script
			const scripts = Array.from(document.getElementsByTagName('script'));
			const hasScript = scripts.some((script) =>
				script.src.includes('hcaptcha.com'),
			);

			// Check for hCaptcha global variables
			const hasGlobal =
				typeof (window as typeof window & { hcaptcha?: unknown }).hcaptcha !==
				'undefined';

			// Check for hCaptcha elements
			const hasElement =
				document.querySelector('.h-captcha') !== null ||
				document.querySelector('[data-hcaptcha-response]') !== null;

			return hasScript || hasGlobal || hasElement;
		});

		if (hasHcaptcha) {
			details.push('hCaptcha detected');
			return true;
		}
	} catch (error) {
		console.error('Error checking hCaptcha:', error);
	}

	return false;
}

/**
 * Detects DataDome protection
 */
async function detectDatadome(
	page: Page,
	response: Response | null,
	details: string[],
): Promise<boolean> {
	try {
		// Check headers
		if (response) {
			const headers = response.headers();
			if (
				headers['x-datadome-cid'] ||
				headers['x-dd-b'] ||
				headers.server?.toLowerCase().includes('datadome')
			) {
				details.push('DataDome (headers detected)');
				return true;
			}
		}

		// Check page content
		const hasDatadome = await page.evaluate(() => {
			const scripts = Array.from(document.getElementsByTagName('script'));
			return scripts.some((script) => script.src.includes('datadome.co'));
		});

		if (hasDatadome) {
			details.push('DataDome (script detected)');
			return true;
		}
	} catch (error) {
		console.error('Error checking DataDome:', error);
	}

	return false;
}

/**
 * Detects Perimeter81 protection
 */
async function detectPerimeter81(
	page: Page,
	response: Response | null,
	details: string[],
): Promise<boolean> {
	try {
		// Check headers
		if (response) {
			const headers = response.headers();
			if (headers['x-per-request-id'] || headers['x-per-session-id']) {
				details.push('Perimeter81 (headers detected)');
				return true;
			}
		}

		// Check page content
		const hasPerimeter = await page.evaluate(() => {
			const scripts = Array.from(document.getElementsByTagName('script'));
			return scripts.some((script) => script.src.includes('perimeter81'));
		});

		if (hasPerimeter) {
			details.push('Perimeter81 (script detected)');
			return true;
		}
	} catch (error) {
		console.error('Error checking Perimeter81:', error);
	}

	return false;
}

/**
 * Creates default anti-bot detection (nothing detected)
 */
function createDefaultAntiBotDetection(): AntiBotDetection {
	return Object.freeze({
		cloudflare: false,
		recaptcha: false,
		hcaptcha: false,
		datadome: false,
		perimeter81: false,
		details: Object.freeze([]),
	});
}

export const AntiBotDetector = Object.freeze({
	detectAntiBot,
});
