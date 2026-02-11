# How to Push Your Code to GitHub

Since the GitHub CLI is not installed, you will need to manually create a repository on GitHub and then push your local code to it.

## Step 1: Create a Repository on GitHub
1.  Go to [https://github.com/new](https://github.com/new) in your browser.
2.  **Repository name**: Enter `farmchain` (or any name you prefer).
3.  **Public/Private**: Choose your preference.
4.  **Initialize this repository with**: DO NOT check any boxes (Readme, .gitignore, License). You already have these locally.
5.  Click **Create repository**.

## Step 2: Push Your Local Code
Once the repository is created, you will see a "Quick setup" page. Look for the section **"…or push an existing repository from the command line"**.

Copy and run the following commands in your terminal (you can paste them one by one):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/farmchain.git
git branch -M main
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your actual GitHub username)*

## Step 3: Verify
-   Refresh your GitHub repository page. You should see your files (`prototype/`, `whisper-hausa/`, etc.).
-   Visit `http://127.0.0.1:5500/` to see your prototype running locally.
