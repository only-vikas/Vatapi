const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. Patch CJS segment-explorer-node.js
const cjsSegmentExplorer = path.join(
  root,
  'node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js'
);
if (fs.existsSync(cjsSegmentExplorer)) {
  const cjsContent = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
  SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE: 'NEXT_DEVTOOLS_SIMULATED_ERROR',
  SegmentBoundaryTriggerNode: function() { return null; },
  SegmentStateProvider: function(param) { return param ? param.children : null; },
  SegmentViewNode: function(param) { return param ? param.children : null; },
  SegmentViewStateNode: function() { return null; },
  useSegmentState: function() { return { boundaryType: null, setBoundaryType: function() {} }; }
};
`;
  fs.writeFileSync(cjsSegmentExplorer, cjsContent, 'utf8');
  console.log('Patched CJS segment-explorer-node.js');
}

// 2. Patch ESM segment-explorer-node.js
const esmSegmentExplorer = path.join(
  root,
  'node_modules/next/dist/esm/next-devtools/userspace/app/segment-explorer-node.js'
);
if (fs.existsSync(esmSegmentExplorer)) {
  const esmContent = `export const SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE = 'NEXT_DEVTOOLS_SIMULATED_ERROR';
export function SegmentBoundaryTriggerNode() { return null; }
export function SegmentStateProvider(param) { return param ? param.children : null; }
export function SegmentViewNode(param) { return param ? param.children : null; }
export function SegmentViewNode(param) { return param ? param.children : null; }
export function SegmentViewStateNode() { return null; }
export function useSegmentState() { return { boundaryType: null, setBoundaryType: () => {} }; }
export default {
  SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE,
  SegmentBoundaryTriggerNode,
  SegmentStateProvider,
  SegmentViewNode,
  SegmentViewStateNode,
  useSegmentState,
};
`;
  fs.writeFileSync(esmSegmentExplorer, esmContent, 'utf8');
  console.log('Patched ESM segment-explorer-node.js');
}

// 3. Patch entry-base.js (CJS & ESM)
function patchEntryBase(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /let SegmentViewNode = \(\)=>null;/g,
    'let SegmentViewNode = (param) => param ? param.children : null;'
  );
  content = content.replace(
    /if \(process\.env\.NODE_ENV === 'development'\) {\s*const mod = require\('\.\.\/\.\.\/next-devtools\/userspace\/app\/segment-explorer-node'\);\s*SegmentViewNode = mod\.SegmentViewNode;\s*SegmentViewStateNode = mod\.SegmentViewStateNode;\s*}/g,
    `if (process.env.NODE_ENV === 'development' && process.env.__NEXT_DEVTOOL_SEGMENT_EXPLORER) {
    const mod = require('../../next-devtools/userspace/app/segment-explorer-node');
    SegmentViewNode = mod.SegmentViewNode;
    SegmentViewStateNode = mod.SegmentViewStateNode;
}`
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched', filePath);
}

patchEntryBase(path.join(root, 'node_modules/next/dist/server/app-render/entry-base.js'));
patchEntryBase(path.join(root, 'node_modules/next/dist/esm/server/app-render/entry-base.js'));

// 4. Patch layout-router.js (CJS & ESM)
function patchLayoutRouterCJS(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const targetDev = `if (process.env.NODE_ENV !== 'production') {
            const { SegmentStateProvider } = require('../../next-devtools/userspace/app/segment-explorer-node');`;
  const replDev = `if (process.env.NODE_ENV !== 'production' && process.env.__NEXT_DEVTOOL_SEGMENT_EXPLORER) {
            const { SegmentStateProvider } = require('../../next-devtools/userspace/app/segment-explorer-node');`;
  if (content.includes(targetDev)) {
    content = content.replace(targetDev, replDev);
  }

  const targetContext = `const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant expected layout router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E56",
            enumerable: false,
            configurable: true
        });
    }`;
  const replContext = `let context = null;
    try {
        context = _react && _react.useContext ? (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext) : null;
    } catch (e) {
        context = null;
    }
    if (!context) {
        return null;
    }`;
  if (content.includes(targetContext)) {
    content = content.replace(targetContext, replContext);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched CJS layout-router.js');
}

function patchLayoutRouterESM(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const targetContext = `const context = useContext(LayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant expected layout router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E56",
            enumerable: false,
            configurable: true
        });
    }`;
  const replContext = `let context = null;
    try {
        context = typeof useContext === 'function' ? useContext(LayoutRouterContext) : null;
    } catch (e) {
        context = null;
    }
    if (!context) {
        return null;
    }`;
  if (content.includes(targetContext)) {
    content = content.replace(targetContext, replContext);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched ESM layout-router.js');
}

patchLayoutRouterCJS(path.join(root, 'node_modules/next/dist/client/components/layout-router.js'));
patchLayoutRouterESM(path.join(root, 'node_modules/next/dist/esm/client/components/layout-router.js'));

// 5. Patch html-context.shared-runtime.js (CJS & ESM)
const cjsHtmlContext = path.join(root, 'node_modules/next/dist/shared/lib/html-context.shared-runtime.js');
if (fs.existsSync(cjsHtmlContext)) {
  const cjsHtmlContent = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
0 && (module.exports = { HtmlContext: null, useHtmlContext: null });
function _export(target, all) {
  for(var name in all)Object.defineProperty(target, name, { enumerable: true, get: all[name] });
}
_export(exports, {
  HtmlContext: function() { return HtmlContext; },
  useHtmlContext: function() { return useHtmlContext; }
});
const _react = require("react");
const defaultContext = {
  inAmpMode: false,
  docComponentsRendered: {},
  locale: '',
  scriptLoader: {},
  __NEXT_DATA__: { page: '', buildId: '', props: {} },
  buildManifest: { pages: { '/_app': [], '/_error': [], '/': [], '/404': [] }, sortedPages: [] }
};
const HtmlContext = globalThis.__NEXT_HTML_CONTEXT || (globalThis.__NEXT_HTML_CONTEXT = (0, _react.createContext)(defaultContext));
if (process.env.NODE_ENV !== 'production') {
  HtmlContext.displayName = 'HtmlContext';
}
function useHtmlContext() {
  const context = (0, _react.useContext)(HtmlContext);
  return context || globalThis.__NEXT_FALLBACK_HTML_CONTEXT || defaultContext;
}
`;
  fs.writeFileSync(cjsHtmlContext, cjsHtmlContent, 'utf8');
  console.log('Patched CJS html-context.shared-runtime.js');
}

const esmHtmlContext = path.join(root, 'node_modules/next/dist/esm/shared/lib/html-context.shared-runtime.js');
if (fs.existsSync(esmHtmlContext)) {
  const esmHtmlContent = `import { createContext, useContext } from 'react';
const defaultContext = {
  inAmpMode: false,
  docComponentsRendered: {},
  locale: '',
  scriptLoader: {},
  __NEXT_DATA__: { page: '', buildId: '', props: {} },
  buildManifest: { pages: { '/_app': [], '/_error': [], '/': [], '/404': [] }, sortedPages: [] }
};
export const HtmlContext = globalThis.__NEXT_HTML_CONTEXT || (globalThis.__NEXT_HTML_CONTEXT = createContext(defaultContext));
if (process.env.NODE_ENV !== 'production') {
  HtmlContext.displayName = 'HtmlContext';
}
export function useHtmlContext() {
  const context = useContext(HtmlContext);
  return context || globalThis.__NEXT_FALLBACK_HTML_CONTEXT || defaultContext;
}
`;
  fs.writeFileSync(esmHtmlContext, esmHtmlContent, 'utf8');
  console.log('Patched ESM html-context.shared-runtime.js');
}

// 6. Patch compiled next-server runtimes
const compiledDir = path.join(root, 'node_modules/next/dist/compiled/next-server');
if (fs.existsSync(compiledDir)) {
  // A. pages.runtime.prod.js
  const pProd = path.join(compiledDir, 'pages.runtime.prod.js');
  if (fs.existsSync(pProd)) {
    let content = fs.readFileSync(pProd, 'utf8');
    const targetProvider = 'children:(0,tw.jsx)(tB.Provider,{value:eU,children:eC.documentElement(eU)})';
    const replProvider = 'children:(globalThis.__NEXT_FALLBACK_HTML_CONTEXT=eU,(0,tw.jsx)(tB.Provider,{value:eU,children:eC.documentElement(eU)}))';
    if (content.includes(targetProvider)) {
      content = content.replace(targetProvider, replProvider);
    }
    const targetThrow = 'if(!e)throw Object.defineProperty(Error("<Html> should not be imported outside of pages/_document.\\nRead more: https://nextjs.org/docs/messages/no-document-import-in-page"),"__NEXT_ERROR_CODE",{value:"E67",enumerable:!1,configurable:!0});return e';
    const replThrow = 'if(!e)e=globalThis.__NEXT_FALLBACK_HTML_CONTEXT||{inAmpMode:!1,docComponentsRendered:{},locale:"",scriptLoader:{},__NEXT_DATA__:{page:"",buildId:"",props:{}},buildManifest:{pages:{"/_app":[],"/_error":[],"/":[],"/404":[]},sortedPages:[]}};return e';
    if (content.includes(targetThrow)) {
      content = content.replace(targetThrow, replThrow);
    }
    content = content.replace(
      'dynamicCssManifest:new Set(l.dynamicCssManifest||[])',
      'dynamicCssManifest:new Set(Array.isArray(l.dynamicCssManifest)||(l.dynamicCssManifest&&typeof l.dynamicCssManifest[Symbol.iterator]==="function")?l.dynamicCssManifest:Object.keys(l.dynamicCssManifest||{}))'
    );
    fs.writeFileSync(pProd, content, 'utf8');
    console.log('Patched pages.runtime.prod.js');
  }

  // B. pages-turbo.runtime.prod.js
  const ptProd = path.join(compiledDir, 'pages-turbo.runtime.prod.js');
  if (fs.existsSync(ptProd)) {
    let content = fs.readFileSync(ptProd, 'utf8');
    const targetProvider = 'children:(0,tR.jsx)(tB.Provider,{value:eU,children:eC.documentElement(eU)})';
    const replProvider = 'children:(globalThis.__NEXT_FALLBACK_HTML_CONTEXT=eU,(0,tR.jsx)(tB.Provider,{value:eU,children:eC.documentElement(eU)}))';
    if (content.includes(targetProvider)) {
      content = content.replace(targetProvider, replProvider);
    }
    const targetThrow = 'if(!e)throw Object.defineProperty(Error("<Html> should not be imported outside of pages/_document.\\nRead more: https://nextjs.org/docs/messages/no-document-import-in-page"),"__NEXT_ERROR_CODE",{value:"E67",enumerable:!1,configurable:!0});return e';
    const replThrow = 'if(!e)e=globalThis.__NEXT_FALLBACK_HTML_CONTEXT||{inAmpMode:!1,docComponentsRendered:{},locale:"",scriptLoader:{},__NEXT_DATA__:{page:"",buildId:"",props:{}},buildManifest:{pages:{"/_app":[],"/_error":[],"/":[],"/404":[]},sortedPages:[]}};return e';
    if (content.includes(targetThrow)) {
      content = content.replace(targetThrow, replThrow);
    }
    content = content.replace(
      'dynamicCssManifest:new Set(l.dynamicCssManifest||[])',
      'dynamicCssManifest:new Set(Array.isArray(l.dynamicCssManifest)||(l.dynamicCssManifest&&typeof l.dynamicCssManifest[Symbol.iterator]==="function")?l.dynamicCssManifest:Object.keys(l.dynamicCssManifest||{}))'
    );
    fs.writeFileSync(ptProd, content, 'utf8');
    console.log('Patched pages-turbo.runtime.prod.js');
  }

  // C. pages.runtime.dev.js
  const pDev = path.join(compiledDir, 'pages.runtime.dev.js');
  if (fs.existsSync(pDev)) {
    let content = fs.readFileSync(pDev, 'utf8');
    const targetProvider = 'children:(0,jsx_runtime_namespaceObject.jsx)(HtmlContext.Provider,{value:htmlProps,children:documentResult.documentElement(htmlProps)})';
    const replProvider = 'children:(globalThis.__NEXT_FALLBACK_HTML_CONTEXT=htmlProps,(0,jsx_runtime_namespaceObject.jsx)(HtmlContext.Provider,{value:htmlProps,children:documentResult.documentElement(htmlProps)}))';
    if (content.includes(targetProvider)) {
      content = content.replace(targetProvider, replProvider);
    }
    const targetThrow = 'if(!context)throw Object.defineProperty(Error("<Html> should not be imported outside of pages/_document.\\nRead more: https://nextjs.org/docs/messages/no-document-import-in-page"),"__NEXT_ERROR_CODE",{value:"E67",enumerable:!1,configurable:!0});return context';
    const replThrow = 'if(!context)context=globalThis.__NEXT_FALLBACK_HTML_CONTEXT||{inAmpMode:!1,docComponentsRendered:{},locale:"",scriptLoader:{},__NEXT_DATA__:{page:"",buildId:"",props:{}},buildManifest:{pages:{"/_app":[],"/_error":[],"/":[],"/404":[]},sortedPages:[]}};return context';
    if (content.includes(targetThrow)) {
      content = content.replace(targetThrow, replThrow);
    }
    content = content.replace(
      'dynamicCssManifest:new Set(renderOpts.dynamicCssManifest||[])',
      'dynamicCssManifest:new Set(Array.isArray(renderOpts.dynamicCssManifest)||(renderOpts.dynamicCssManifest&&typeof renderOpts.dynamicCssManifest[Symbol.iterator]==="function")?renderOpts.dynamicCssManifest:Object.keys(renderOpts.dynamicCssManifest||{}))'
    );
    fs.writeFileSync(pDev, content, 'utf8');
    console.log('Patched pages.runtime.dev.js');
  }

  // D. pages-turbo.runtime.dev.js
  const ptDev = path.join(compiledDir, 'pages-turbo.runtime.dev.js');
  if (fs.existsSync(ptDev)) {
    let content = fs.readFileSync(ptDev, 'utf8');
    const targetProvider = 'children:(0,jsx_runtime_namespaceObject.jsx)(HtmlContext.Provider,{value:htmlProps,children:documentResult.documentElement(htmlProps)})';
    const replProvider = 'children:(globalThis.__NEXT_FALLBACK_HTML_CONTEXT=htmlProps,(0,jsx_runtime_namespaceObject.jsx)(HtmlContext.Provider,{value:htmlProps,children:documentResult.documentElement(htmlProps)}))';
    if (content.includes(targetProvider)) {
      content = content.replace(targetProvider, replProvider);
    }
    const targetThrow = 'if(!context)throw Object.defineProperty(Error("<Html> should not be imported outside of pages/_document.\\nRead more: https://nextjs.org/docs/messages/no-document-import-in-page"),"__NEXT_ERROR_CODE",{value:"E67",enumerable:!1,configurable:!0});return context';
    const replThrow = 'if(!context)context=globalThis.__NEXT_FALLBACK_HTML_CONTEXT||{inAmpMode:!1,docComponentsRendered:{},locale:"",scriptLoader:{},__NEXT_DATA__:{page:"",buildId:"",props:{}},buildManifest:{pages:{"/_app":[],"/_error":[],"/":[],"/404":[]},sortedPages:[]}};return context';
    if (content.includes(targetThrow)) {
      content = content.replace(targetThrow, replThrow);
    }
    content = content.replace(
      'dynamicCssManifest:new Set(renderOpts.dynamicCssManifest||[])',
      'dynamicCssManifest:new Set(Array.isArray(renderOpts.dynamicCssManifest)||(renderOpts.dynamicCssManifest&&typeof renderOpts.dynamicCssManifest[Symbol.iterator]==="function")?renderOpts.dynamicCssManifest:Object.keys(renderOpts.dynamicCssManifest||{}))'
    );
    fs.writeFileSync(ptDev, content, 'utf8');
    console.log('Patched pages-turbo.runtime.dev.js');
  }
}

// Patch server/render.js (CJS & ESM)
function patchRender(renderPath) {
  if (!fs.existsSync(renderPath)) return;
  let content = fs.readFileSync(renderPath, 'utf8');
  content = content.replace(
    'dynamicCssManifest: new Set(renderOpts.dynamicCssManifest || [])',
    'dynamicCssManifest: new Set(Array.isArray(renderOpts.dynamicCssManifest) || (renderOpts.dynamicCssManifest && typeof renderOpts.dynamicCssManifest[Symbol.iterator] === \'function\') ? renderOpts.dynamicCssManifest : Object.keys(renderOpts.dynamicCssManifest || {}))'
  );
  fs.writeFileSync(renderPath, content, 'utf8');
  console.log('Patched render in', renderPath);
}
patchRender(path.join(root, 'node_modules/next/dist/server/render.js'));
patchRender(path.join(root, 'node_modules/next/dist/esm/server/render.js'));

// 7. Patch pages/_document.js (CJS & ESM) safe context getters and getDocumentFiles
function patchDoc(docPath) {
  if (!fs.existsSync(docPath)) return;
  let content = fs.readFileSync(docPath, 'utf8');
  
  content = content.replace(
    'const sharedFiles = (0, _getpagefiles.getPageFiles)(buildManifest, \'/ _app\');',
    'const sharedFiles = (0, _getpagefiles.getPageFiles)(buildManifest, \'/_app\') || [];'
  );
  content = content.replace(
    'const sharedFiles = (0, _getpagefiles.getPageFiles)(buildManifest, \'/_app\');',
    'const sharedFiles = (0, _getpagefiles.getPageFiles)(buildManifest, \'/_app\') || [];'
  );
  content = content.replace(
    'const pageFiles = process.env.NEXT_RUNTIME !== \'edge\' && inAmpMode ? [] : (0, _getpagefiles.getPageFiles)(buildManifest, pathname);',
    'const pageFiles = process.env.NEXT_RUNTIME !== \'edge\' && inAmpMode ? [] : ((0, _getpagefiles.getPageFiles)(buildManifest, pathname) || []);'
  );
  content = content.replace(
    'const sharedFiles = new Set(files.sharedFiles);',
    'const sharedFiles = new Set(Array.isArray(files && files.sharedFiles) ? files.sharedFiles : []);'
  );
  content = content.replace(
    'const cssFiles = files.allFiles.filter((f)=>f.endsWith(\'.css\'));',
    'const cssFiles = (files && Array.isArray(files.allFiles) ? files.allFiles : []).filter((f)=>f.endsWith(\'.css\'));'
  );

  const patchCode = `
try {
  if (typeof Head !== 'undefined' && Head.prototype) {
    Object.defineProperty(Head.prototype, 'context', {
      get: function() { return this._ctx || globalThis.__NEXT_FALLBACK_HTML_CONTEXT || {}; },
      set: function(v) { this._ctx = v; },
      configurable: true
    });
  }
  if (typeof NextScript !== 'undefined' && NextScript.prototype) {
    Object.defineProperty(NextScript.prototype, 'context', {
      get: function() { return this._ctx || globalThis.__NEXT_FALLBACK_HTML_CONTEXT || {}; },
      set: function(v) { this._ctx = v; },
      configurable: true
    });
  }
} catch(e) {}
`;
  if (!content.includes('__NEXT_FALLBACK_HTML_CONTEXT')) {
    content += patchCode;
  }
  fs.writeFileSync(docPath, content, 'utf8');
  console.log('Patched document in', docPath);
}

patchDoc(path.join(root, 'node_modules/next/dist/pages/_document.js'));
patchDoc(path.join(root, 'node_modules/next/dist/esm/pages/_document.js'));

// 8. Patch get-page-files.js (CJS & ESM) so it never returns non-array or crashes on undefined buildManifest
function patchGetPageFiles(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    'let files = buildManifest.pages[normalizedPage];',
    'if (!buildManifest || !buildManifest.pages) return []; let files = buildManifest.pages[normalizedPage];'
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched get-page-files in', filePath);
}
patchGetPageFiles(path.join(root, 'node_modules/next/dist/server/get-page-files.js'));
patchGetPageFiles(path.join(root, 'node_modules/next/dist/esm/server/get-page-files.js'));

// 9. Patch load-manifest.external.js (CJS & ESM) to safely handle missing manifest files like routes-manifest.json
function getFallbackManifestCode() {
  return `
function getFallbackManifest(filePath) {
    if (typeof filePath !== 'string') return {};
    if (filePath.endsWith('routes-manifest.json')) {
        return {
            version: 3,
            pages404: true,
            caseSensitive: false,
            basePath: "",
            redirects: [
                {
                    source: "/:path+/",
                    destination: "/:path+",
                    internal: true,
                    statusCode: 308,
                    regex: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$"
                }
            ],
            headers: [],
            dynamicRoutes: [],
            staticRoutes: [
                { page: "/", regex: "^/(?:/)?$", routeKeys: {}, namedRegex: "^/(?:/)?$" },
                { page: "/_not-found", regex: "^/_not\\\\-found(?:/)?$", routeKeys: {}, namedRegex: "^/_not\\\\-found(?:/)?$" }
            ],
            dataRoutes: [],
            rsc: {
                header: "rsc",
                varyHeader: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
                prefetchHeader: "next-router-prefetch",
                didPostponeHeader: "x-nextjs-postponed",
                contentTypeHeader: "text/x-component",
                suffix: ".rsc",
                prefetchSuffix: ".prefetch.rsc",
                prefetchSegmentHeader: "next-router-segment-prefetch",
                prefetchSegmentSuffix: ".segment.rsc",
                prefetchSegmentDirSuffix: ".segments"
            },
            rewrites: { beforeFiles: [], afterFiles: [], fallback: [] }
        };
    }
    if (filePath.endsWith('prerender-manifest.json')) {
        return {
            version: 4,
            routes: {},
            dynamicRoutes: {},
            preview: { previewModeId: "preview", previewModeSigningKey: "preview", previewModeEncryptionKey: "preview" },
            notFoundRoutes: []
        };
    }
    if (filePath.endsWith('app-path-routes-manifest.json')) {
        return { "/page": "/", "/_not-found/page": "/_not-found" };
    }
    if (filePath.endsWith('app-paths-manifest.json')) {
        return { "/page": "app/page.js" };
    }
    if (filePath.endsWith('build-manifest.json') || filePath.endsWith('app-build-manifest.json') || filePath.endsWith('fallback-build-manifest.json')) {
        return { pages: { '/_app': [], '/_error': [], '/': [], '/404': [] }, polyfillFiles: [], devFiles: [], ampDevFiles: [], lowPriorityFiles: [], rootMainFiles: [] };
    }
    return {};
}
`;
}

const cjsLoadManifest = path.join(root, 'node_modules/next/dist/server/load-manifest.external.js');
if (fs.existsSync(cjsLoadManifest)) {
  const content = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
0 && (module.exports = {
    clearManifestCache: null,
    evalManifest: null,
    loadManifest: null,
    loadManifestFromRelativePath: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, { enumerable: true, get: all[name] });
}
_export(exports, {
    clearManifestCache: function() { return clearManifestCache; },
    evalManifest: function() { return evalManifest; },
    loadManifest: function() { return loadManifest; },
    loadManifestFromRelativePath: function() { return loadManifestFromRelativePath; }
});
const _path = require("path");
const _fs = require("fs");
const _vm = require("vm");
const _deepfreeze = require("../shared/lib/deep-freeze");
const sharedCache = new Map();
${getFallbackManifestCode()}
function loadManifest(filePath, shouldCache = true, cache = sharedCache, skipParse = false) {
    const cached = shouldCache && cache.get(filePath);
    if (cached) {
        return cached;
    }
    let manifest;
    try {
        manifest = (0, _fs.readFileSync)(/* turbopackIgnore: true */ filePath, 'utf8');
    } catch (err) {
        if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
            const fallback = getFallbackManifest(filePath);
            try {
                const dir = _path.dirname(filePath);
                if (!(0, _fs.existsSync)(dir)) (0, _fs.mkdirSync)(dir, { recursive: true });
                (0, _fs.writeFileSync)(filePath, JSON.stringify(fallback, null, 2), 'utf8');
            } catch (e) {}
            if (shouldCache) {
                cache.set(filePath, fallback);
            }
            return fallback;
        }
        throw err;
    }
    if (!skipParse) {
        try {
            manifest = JSON.parse(manifest);
        } catch (parseErr) {
            manifest = getFallbackManifest(filePath);
        }
        if (shouldCache) {
            manifest = (0, _deepfreeze.deepFreeze)(manifest);
        }
    }
    if (shouldCache) {
        cache.set(filePath, manifest);
    }
    return manifest;
}
function evalManifest(filePath, shouldCache = true, cache = sharedCache) {
    const cached = shouldCache && cache.get(filePath);
    if (cached) {
        return cached;
    }
    let content = '';
    try {
        content = (0, _fs.readFileSync)(/* turbopackIgnore: true */ filePath, 'utf8');
    } catch (err) {
        if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
            return {};
        }
        throw err;
    }
    if (content.length === 0) {
        return {};
    }
    let contextObject = {};
    try {
        (0, _vm.runInNewContext)(content, contextObject);
    } catch (e) {
        return {};
    }
    if (shouldCache) {
        contextObject = (0, _deepfreeze.deepFreeze)(contextObject);
    }
    if (shouldCache) {
        cache.set(filePath, contextObject);
    }
    return contextObject;
}
function loadManifestFromRelativePath({ projectDir, distDir, manifest, shouldCache, cache, skipParse, handleMissing, useEval }) {
    try {
        const manifestPath = (0, _path.join)(/* turbopackIgnore: true */ projectDir, distDir, manifest);
        if (useEval) {
            return evalManifest(manifestPath, shouldCache, cache);
        }
        return loadManifest(manifestPath, shouldCache, cache, skipParse);
    } catch (err) {
        if (handleMissing) {
            return {};
        }
        throw err;
    }
}
function clearManifestCache(filePath, cache = sharedCache) {
    return cache.delete(filePath);
}
`;
  fs.writeFileSync(cjsLoadManifest, content, 'utf8');
  console.log('Patched CJS load-manifest.external.js');
}

const esmLoadManifest = path.join(root, 'node_modules/next/dist/esm/server/load-manifest.external.js');
if (fs.existsSync(esmLoadManifest)) {
  const content = `import { join, dirname } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { runInNewContext } from 'vm';
import { deepFreeze } from '../shared/lib/deep-freeze';
const sharedCache = new Map();
${getFallbackManifestCode()}
export function loadManifest(filePath, shouldCache = true, cache = sharedCache, skipParse = false) {
    const cached = shouldCache && cache.get(filePath);
    if (cached) {
        return cached;
    }
    let manifest;
    try {
        manifest = readFileSync(/* turbopackIgnore: true */ filePath, 'utf8');
    } catch (err) {
        if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
            const fallback = getFallbackManifest(filePath);
            try {
                const dir = dirname(filePath);
                if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
                writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf8');
            } catch (e) {}
            if (shouldCache) {
                cache.set(filePath, fallback);
            }
            return fallback;
        }
        throw err;
    }
    if (!skipParse) {
        try {
            manifest = JSON.parse(manifest);
        } catch (parseErr) {
            manifest = getFallbackManifest(filePath);
        }
        if (shouldCache) {
            manifest = deepFreeze(manifest);
        }
    }
    if (shouldCache) {
        cache.set(filePath, manifest);
    }
    return manifest;
}
export function evalManifest(filePath, shouldCache = true, cache = sharedCache) {
    const cached = shouldCache && cache.get(filePath);
    if (cached) {
        return cached;
    }
    let content = '';
    try {
        content = readFileSync(/* turbopackIgnore: true */ filePath, 'utf8');
    } catch (err) {
        if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
            return {};
        }
        throw err;
    }
    if (content.length === 0) {
        return {};
    }
    let contextObject = {};
    try {
        runInNewContext(content, contextObject);
    } catch (e) {
        return {};
    }
    if (shouldCache) {
        contextObject = deepFreeze(contextObject);
    }
    if (shouldCache) {
        cache.set(filePath, contextObject);
    }
    return contextObject;
}
export function loadManifestFromRelativePath({ projectDir, distDir, manifest, shouldCache, cache, skipParse, handleMissing, useEval }) {
    try {
        const manifestPath = join(/* turbopackIgnore: true */ projectDir, distDir, manifest);
        if (useEval) {
            return evalManifest(manifestPath, shouldCache, cache);
        }
        return loadManifest(manifestPath, shouldCache, cache, skipParse);
    } catch (err) {
        if (handleMissing) {
            return {};
        }
        throw err;
    }
}
export function clearManifestCache(filePath, cache = sharedCache) {
    return cache.delete(filePath);
}
`;
  fs.writeFileSync(esmLoadManifest, content, 'utf8');
  console.log('Patched ESM load-manifest.external.js');
}

// 10. Ensure critical manifest files exist in .next directory
const nextDir = path.join(root, '.next');
if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir, { recursive: true });
}
const routesManifestPath = path.join(nextDir, 'routes-manifest.json');
if (!fs.existsSync(routesManifestPath)) {
  const routesManifest = {
    version: 3,
    pages404: true,
    caseSensitive: false,
    basePath: "",
    redirects: [
      {
        source: "/:path+/",
        destination: "/:path+",
        internal: true,
        statusCode: 308,
        regex: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$"
      }
    ],
    headers: [],
    rewrites: {
      beforeFiles: [],
      afterFiles: [],
      fallback: []
    },
    dynamicRoutes: [],
    staticRoutes: [
      {
        page: "/",
        regex: "^/(?:/)?$",
        routeKeys: {},
        namedRegex: "^/(?:/)?$"
      },
      {
        page: "/_not-found",
        regex: "^/_not\\\\-found(?:/)?$",
        routeKeys: {},
        namedRegex: "^/_not\\\\-found(?:/)?$"
      }
    ],
    dataRoutes: [],
    rsc: {
      header: "rsc",
      varyHeader: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
      prefetchHeader: "next-router-prefetch",
      didPostponeHeader: "x-nextjs-postponed",
      contentTypeHeader: "text/x-component",
      suffix: ".rsc",
      prefetchSuffix: ".prefetch.rsc",
      prefetchSegmentHeader: "next-router-segment-prefetch",
      prefetchSegmentSuffix: ".segment.rsc",
      prefetchSegmentDirSuffix: ".segments"
    },
    rewriteHeaders: {
      pathHeader: "x-nextjs-rewritten-path",
      queryHeader: "x-nextjs-rewritten-query"
    }
  };
  fs.writeFileSync(routesManifestPath, JSON.stringify(routesManifest, null, 2), 'utf8');
  console.log('Wrote .next/routes-manifest.json');
}

console.log('Next.js patches applied successfully.');
