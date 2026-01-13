
import { BackgroundPreset } from '../components/editor/EditorTypes';

export const remToPx = (styleStr: string) => {
  if (!styleStr) return '';
  return styleStr.replace(/([\d.]+)rem/g, (_, p1) => `${parseFloat(p1) * 16}px`);
};

/**
 * Process HTML for WeChat Official Account Platform
 * Key features:
 * 1. Converts <div> containers to <section> for better styling support.
 * 2. Inlines all CSS styles.
 * 3. Handles code blocks and images.
 * 4. Wraps content in the selected background.
 */
export const processHtmlForWechat = (rawHtml: string, bg: BackgroundPreset | null): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');

  // WeChat Style Mapping (High Fidelity)
  const styleMap: Record<string, string> = {
    'h1': 'font-size: 24px; font-weight: bold; color: #1e293b; margin: 25px 0 15px; line-height: 1.4; padding: 0;',
    'h2': 'font-size: 20px; font-weight: bold; color: #1e293b; margin: 22px 0 12px; line-height: 1.4; border-bottom: 2px solid #f1f5f9; padding: 0 0 8px 0;',
    'h3': 'font-size: 18px; font-weight: bold; color: #334155; margin: 18px 0 10px; line-height: 1.4; padding: 0;',
    'p': 'font-size: 16px; line-height: 1.75; color: #333333; margin: 16px 0; text-align: justify; padding: 0;',
    'blockquote': 'border-left: 4px solid #137fec; padding: 12px 18px; background-color: #f8fafc; color: #666666; margin: 18px 0; border-radius: 8px;',
    'strong': 'color: #1e293b; font-weight: bold !important;',
    'ul': 'list-style-type: disc; margin: 15px 0; padding-left: 25px;',
    'li': 'margin-bottom: 8px; font-size: 16px; color: #333333;',
    'img': 'display: block; max-width: 100% !important; height: auto !important; margin: 20px auto; border-radius: 6px;',
    'pre': 'background-color: #1e293b; border-radius: 12px; padding: 16px; margin: 20px 0; overflow-x: auto; color: #e2e8f0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 13px; line-height: 1.6; tab-size: 4;',
    'code': 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 13px; background-color: rgba(30, 41, 59, 0.05); color: #475569; padding: 2px 4px; border-radius: 4px;'
  };

  // 1. Critical Fix: Convert styled divs (Cards) to sections
  // WeChat supports styles on <section> much better than <div>
  doc.querySelectorAll('div').forEach(el => {
    const style = el.getAttribute('style');
    // If it has inline style or utility classes, treat as a container/card
    if (style || el.className) {
      const section = doc.createElement('section');
      section.innerHTML = el.innerHTML;
      
      // Copy attributes
      Array.from(el.attributes).forEach(attr => {
        section.setAttribute(attr.name, attr.value);
      });
      
      // Ensure box-sizing is forced for correct padding rendering
      const currentStyle = section.getAttribute('style') || '';
      // Ensure it doesn't conflict with map
      section.setAttribute('style', `box-sizing: border-box; margin: 16px 0; ${currentStyle}`);
      
      el.parentNode?.replaceChild(section, el);
    }
  });

  // 2. Handle Code Blocks (Pre -> Section)
  const preNodes = doc.querySelectorAll('pre');
  preNodes.forEach(pre => {
    const code = pre.querySelector('code');
    const codeText = code ? code.innerHTML : pre.innerHTML;
    const section = doc.createElement('section');
    section.setAttribute('style', styleMap['pre'] + ' display: block; white-space: pre-wrap; word-break: break-all;');
    section.innerHTML = `<code>${codeText}</code>`;
    const innerCode = section.querySelector('code');
    if (innerCode) {
      innerCode.setAttribute('style', 'background: none !important; color: inherit !important; border: none !important; padding: 0 !important; font-family: inherit !important;');
    }
    pre.parentNode?.replaceChild(section, pre);
  });

  // 3. Apply Inline Styles to All Elements
  const allElements = doc.body.querySelectorAll('*');
  allElements.forEach(el => {
    const tagName = el.tagName.toLowerCase();
    
    // Skip sections that we just styled (code blocks)
    if (tagName === 'section' && el.getAttribute('style')?.includes('#1e293b')) return;

    const baseStyle = styleMap[tagName] || '';
    const existingStyle = remToPx(el.getAttribute('style') || '');
    
    // For images, we want strict defaults
    if (tagName === 'img') {
        // Preserve alignment styles if present in existingStyle
        el.setAttribute('style', `${baseStyle} ${existingStyle}`);
    } else {
        el.setAttribute('style', `box-sizing: border-box !important; max-width: 100% !important; ${baseStyle} ${existingStyle}`.trim());
    }
    
    // Cleanup classes to ensure pure inline styling (avoids WeChat filter stripping)
    el.removeAttribute('class');
  });

  // 4. Background Wrapper Construction
  const bgStyleObj = bg?.style || {};
  let bgStyleStr = '';
  if (bgStyleObj.background) bgStyleStr += `background: ${bgStyleObj.background};`;
  if (bgStyleObj.backgroundImage) bgStyleStr += `background-image: ${bgStyleObj.backgroundImage.replace(/"/g, "'")};`;
  if (bgStyleObj.backgroundColor) bgStyleStr += `background-color: ${bgStyleObj.backgroundColor};`;
  if (bgStyleObj.backgroundSize) bgStyleStr += `background-size: ${bgStyleObj.backgroundSize};`;
  if (bgStyleObj.backgroundRepeat) bgStyleStr += `background-repeat: ${bgStyleObj.backgroundRepeat};`;

  // Provide a safe font-family stack
  const fontStack = `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;`;

  return `<section style="margin: 0; padding: 20px 15px; box-sizing: border-box; ${fontStack} ${bgStyleStr}">${doc.body.innerHTML}</section>`;
};

export const processHtmlForToutiao = (rawHtml: string) => {
    // Toutiao uses a similar engine but is more permissive with Divs. 
    // However, the WeChat optimization (Section conversion) works safely on Toutiao too.
    return processHtmlForWechat(rawHtml, null);
};
