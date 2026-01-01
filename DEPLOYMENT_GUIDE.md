# Vercel Deployment Guide

Your application is now configured for deployment on Vercel. Follow these steps using your Git Bash.

## 1. Prepare Git Repository

Run these commands in your project root (`e:\Web DEv\custom_lms`):

```bash
# Add all files to staging
git add .

# Commit your changes
git commit -m "Configure app for Vercel deployment"

# Ensure you are on the main branch
git branch -M main
```

## 2. Push to GitHub

1.  Go to **[GitHub](https://github.com/)** and create a **New Repository** (e.g., `custom-lms`).
2.  **Do not** initialize with README or .gitignore (we already have them).
3.  Copy the URL of your new repository (e.g., `https://github.com/StartDust/custom-lms.git`).
4.  Run these commands in Git Bash (replace URL with yours):

```bash
# Link your local folder to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Upload your code
git push -u origin main
```

## 3. Deploy not Vercel

1.  Go to **[Vercel Dashboard](https://vercel.com/dashboard)**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `custom-lms` repository.
4.  **Configure Project**:
    *   **Framework Preset**: Vite (should detect automatically).
    *   **Root Directory**: Leave as `./` (Root).
5.  **Environment Variables** (Expand the section):
    Add the following variables:

    | Name | Value |
    | :--- | :--- |
    | `MONGO_URI` | Your MongoDB Connection String (from Atlas) |
    | `JWT_SECRET` | A secret secure string (e.g., `mysupersecretkey123`) |
    | `VITE_API_URL` | `https://your-project-name.vercel.app/api` |

    *Note: For the first deployment, you might not know the exact URL for `VITE_API_URL`. You can deploy first, then get the URL, update the variable, and redeploy.*

6.  Click **Deploy**.

## 4. Troubleshooting

*   If the frontend shows "Network Error", check if `VITE_API_URL` is set correctly in Vercel.
*   If the backend fails, check Cloudwatch/Vercel Logs and ensure `MONGO_URI` is correct and allows access from anywhere (0.0.0.0/0).
