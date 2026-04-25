# Deployment Instructions for Iesa Pharma Website

This website is built with **React** and **Vite**. Below are the easiest ways to deploy it.

## Option 1: Vercel (Recommended - Fastest & Easiest)
Vercel is the best platform for Vite projects. It offers automatic deployments whenever you push to GitHub.

1.  **Sign up/Login** at [vercel.com](https://vercel.com/).
2.  Click **"Add New"** → **"Project"**.
3.  Connect your GitHub account and import the `iseapharma-website` repository.
4.  Vercel will automatically detect the settings:
    *   **Framework Preset**: Vite
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
5.  Click **"Deploy"**. Your site will be live in seconds.

---

## Option 2: Netlify
Another excellent choice with a simple drag-and-drop or GitHub integration.

1.  **Sign up/Login** at [netlify.com](https://www.netlify.com/).
2.  Click **"Add new site"** → **"Import an existing project"**.
3.  Connect to GitHub and select `iseapharma-website`.
4.  Ensure settings are:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  Click **"Deploy site"**.

---

## Option 3: Manual Deployment (Any Web Hosting)
If you have your own hosting (cPanel, Hostinger, Bluehost, etc.):

1.  **Build the project locally**:
    ```bash
    npm run build
    ```
2.  This will create a folder named `dist` in your project directory.
3.  **Upload the contents** of the `dist` folder to your server's root (usually `public_html`).

---

## Option 4: Deployment on a VPS (Linux / Nginx)
If you are using a VPS (DigitalOcean, AWS, Linode, etc.), follow these steps:

### 1. Prepare your VPS
Connect to your VPS via SSH and install the necessary tools:
```bash
sudo apt update
sudo apt install nginx git -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
```

### 2. Clone and Build
```bash
cd /var/www
sudo git clone https://github.com/shaadahmade/iseapharma-website.git
cd iseapharma-website
sudo npm install
sudo npm run build
```

### 3. Configure Nginx
Create a configuration file for your site:
```bash
sudo nano /etc/nginx/sites-available/iseapharma
```
Paste this configuration (replace `yourdomain.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/iseapharma-website/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
Enable the configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/iseapharma /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Important Notes:
*   **3D Compatibility**: Ensure your hosting supports serving static `.png` and `.jpg` assets (all modern hosts do).
*   **Custom Domain**: Both Vercel and Netlify allow you to add your own domain (e.g., `www.iesapharma.com`) for free.
