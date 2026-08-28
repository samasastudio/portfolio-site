---
name: deploy-to-vercel
description: Deploy applications and websites to Vercel. Use when the user requests deployment actions like "deploy my app", "deploy and give me the link", "push this live", or "create a preview deployment".
---

# Deploy to Vercel

Use this skill to deploy the application or preview builds to Vercel.

## Step 1: Inspect Project & Auth State

Check git remotes and Vercel CLI authentication:
```bash
# 1. Check git remote
git remote get-url origin

# 2. Check Vercel link status
cat .vercel/project.json 2>/dev/null || cat .vercel/repo.json 2>/dev/null

# 3. Check Vercel CLI login
vercel whoami 2>/dev/null
```

---

## Step 2: Deployment Methods

### Method A: Git Integration (Recommended)
If connected via GitHub / Git remote:
1. Confirm commit changes with the user.
2. Push to `main` (for production) or a feature branch (for preview deployment):
   ```bash
   git push origin <branch-name>
   ```
3. Retrieve latest deployment preview URL:
   ```bash
   vercel ls --format json
   ```

### Method B: Direct CLI Deployment
If deploying directly without git push:
- **Preview Deployment**:
  ```bash
  vercel deploy --yes --no-wait
  ```
- **Production Deployment** (only when explicitly requested):
  ```bash
  vercel deploy --prod --yes --no-wait
  ```
- Check build progress:
  ```bash
  vercel inspect <deployment-url>
  ```

---

## Output
Always report the live **Preview URL** or **Production URL** directly back to the user upon completion.
