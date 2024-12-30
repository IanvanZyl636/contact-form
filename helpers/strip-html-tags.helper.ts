// utils/sanitizeHtml.ts
import DOMPurify from 'dompurify';

/**
 * Removes HTML tags from a string.
 * @param {string} html - The HTML string from the database.
 * @returns {string} - The plain text string.
 */
export function stripHtmlTags(html: string): string {
    if (typeof window !== 'undefined') {
        // Sanitize HTML to remove any harmful elements
        const sanitizedHtml = DOMPurify.sanitize(html);
        // Use a browser method to extract text content
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizedHtml, 'text/html');
        return doc.body.textContent || '';
    }
    // Fallback for SSR
    return html.replace(/<[^>]*>?/gm, '');
}
