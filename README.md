# BI AI Microsoft

A responsive briefing page for the DataLand Round 2 agent-governance discussion. It covers the Agent 365 and APIM control-plane position, identity-aware retrieval, tests 21–26, and the actions required before the workshop.

**Published briefing:** [ishasalania.github.io/BI-ai-microsoft](https://ishasalania.github.io/BI-ai-microsoft/)

## Local development

```bash
npm install
npm run dev
```

## GitHub Pages

Push the project to a GitHub repository with `main` as the default branch. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source. Every push to `main` will then build and publish the site.

The Vite build uses relative asset paths, so no repository-name configuration is required.# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
