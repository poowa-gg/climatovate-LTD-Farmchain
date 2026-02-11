# Deployment Guide: Voice to Value

Since you have pushed your project to GitHub, the best and most professional way to deploy it is using **Vercel** or **GitHub Pages**.

## Option 1: Vercel (Recommended - Most Professional)
Vercel is the gold standard for deploying modern web apps. It's fast, provides HTTPS automatically (required for voice), and looks great in a pitch deck.

1.  **Go to [Vercel.com](https://vercel.com)** and sign in with your GitHub account.
2.  Click **"Add New"** -> **"Project"**.
3.  Import the repository: `poowa-gg/climatovate-LTD-Farmchain`.
4.  **Framework Preset**: Select "Other" or "Vite" (it should auto-detect "Other"/Static).
5.  **Root Directory**: Leave as `./`.
6.  Click **"Deploy"**.
7.  **Result**: You will get a professional URL like `farmchain-xyz.vercel.app`.

---

## Option 2: GitHub Pages (Easiest - Already Built-in)
You can deploy directly from your existing GitHub repository.

1.  Go to your repository: [climatovate-LTD-Farmchain](https://github.com/poowa-gg/climatovate-LTD-Farmchain).
2.  Click **Settings** (top tab).
3.  Click **Pages** (left sidebar).
4.  Under **Build and deployment** > **Branch**:
    *   Select `main`.
    *   Select `/(root)`.
    *   Click **Save**.
5.  Wait 1-2 minutes. GitHub will give you a link like `https://poowa-gg.github.io/climatovate-LTD-Farmchain/`.

---

## 🚨 Critical Note: Voice Requirements
The **Web Speech API** (Microphone) only works over **HTTPS** (Secure connection). 
-   Both Vercel and GitHub Pages provide HTTPS by default.
-   **If you test the site and the microphone doesn't respond**, check the URL bar to ensure it shows the 🔒 (lock) icon and that you have granted microphone permissions to the site.

## Pitch Tip 💡
Use the **Vercel URL** in your pitch deck. It looks cleaner and more like a finished "Product" rather than a "Code Repository."
