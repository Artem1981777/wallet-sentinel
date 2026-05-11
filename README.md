# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# 🛡️ Wallet Sentinel

**Wallet Sentinel** is a professional-grade tool for crypto asset security monitoring and real-time market data analysis. The project is deeply integrated with the **Trust Wallet Developer Portal**, leveraging official APIs to validate tokens and deliver actionable market insights.

## 🚀 Key Features

* **Security Validation:** Verify smart contracts for legitimacy and identify potential threats using the Trust Wallet V1 API.
* **Market Intelligence:** Real-time price tracking and analysis of trending assets.
* **Secure Proxy Architecture:** All requests are routed through a server-side proxy (`api/proxy.ts`), ensuring that sensitive credentials (Access ID / Secret) are never exposed to the client side.
* **Termux Optimized:** Built with a mobile-first development approach. Fully tested and deployed within the Android/Termux environment.

## 🛠 Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Next.js (API Routes)
* **Integrations:** Trust Wallet Agent Skills (TWS API)
* **Workflow:** Developed using **Claude Code CLI** for automated code audits and efficiency.

## 📦 Quick Start

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Artem1981777/wallet-sentinel.git](https://github.com/Artem1981777/wallet-sentinel.git)
   cd wallet-sentinel

