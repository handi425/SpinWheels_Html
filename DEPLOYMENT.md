# 🚀 Deployment Guide

Panduan lengkap untuk deploy SpinWheels Game ke berbagai platform hosting.

## 📋 Prerequisites

- Game sudah berjalan dengan baik di local development
- Semua file sudah di-commit ke Git repository
- Repository sudah di-push ke GitHub

## 🌐 Platform Deployment Options

### 1. 🔥 Netlify (Recommended)

#### Keunggulan:
- ✅ Free tier yang generous
- ✅ Automatic deployments dari Git
- ✅ Custom domain support
- ✅ HTTPS otomatis
- ✅ Form handling (untuk future features)

#### Langkah Deploy:

1. **Buat akun di [Netlify](https://netlify.com)**

2. **Connect Repository:**
   - Klik "New site from Git"
   - Pilih GitHub dan authorize
   - Pilih repository SpinWheels

3. **Configure Build Settings:**
   ```
   Build command: (leave empty)
   Publish directory: . (root directory)
   ```

4. **Deploy:**
   - Klik "Deploy site"
   - Site akan otomatis deploy dan dapat diakses

#### Custom Domain (Optional):
```bash
# Di Netlify dashboard
Site settings > Domain management > Add custom domain
```

### 2. ⚡ Vercel

#### Keunggulan:
- ✅ Excellent performance
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Git integration

#### Langkah Deploy:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd SpinWheels
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project? No
   - Project name: spinwheels-game
   - Directory: ./
   - Override settings? No

### 3. 📄 GitHub Pages

#### Keunggulan:
- ✅ Free untuk public repositories
- ✅ Terintegrasi dengan GitHub
- ✅ Custom domain support

#### Langkah Deploy:

1. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: main / (root)

2. **Access site:**
   ```
   https://username.github.io/spinwheels-game
   ```

#### Custom Domain:
```bash
# Buat file CNAME di root directory
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### 4. 🔥 Firebase Hosting

#### Keunggulan:
- ✅ Google infrastructure
- ✅ Fast global CDN
- ✅ Easy SSL setup

#### Langkah Deploy:

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure:**
   ```
   Public directory: . (current directory)
   Single-page app: No
   Overwrite index.html: No
   ```

4. **Deploy:**
   ```bash
   firebase deploy
   ```

### 5. 🌊 Surge.sh

#### Keunggulan:
- ✅ Super simple deployment
- ✅ Custom domain support
- ✅ Command line focused

#### Langkah Deploy:

1. **Install Surge:**
   ```bash
   npm install -g surge
   ```

2. **Deploy:**
   ```bash
   cd SpinWheels
   surge
   ```

3. **Follow prompts:**
   - Email dan password (first time)
   - Project path: (current directory)
   - Domain: (use suggested atau custom)

## 🔧 Pre-Deployment Checklist

### 📋 Code Quality
- [ ] Semua console.log debug statements dihapus
- [ ] No hardcoded localhost URLs
- [ ] Error handling yang proper
- [ ] Code sudah di-minify (jika diperlukan)

### 🧪 Testing
- [ ] Game berfungsi di berbagai browser
- [ ] Responsive design tested
- [ ] All features working properly
- [ ] No JavaScript errors di console

### 📁 File Structure
- [ ] Semua assets (images, fonts) included
- [ ] Relative paths digunakan (bukan absolute)
- [ ] No missing dependencies
- [ ] .gitignore configured properly

### 🔒 Security
- [ ] No sensitive data di code
- [ ] CSP headers configured (jika diperlukan)
- [ ] HTTPS akan digunakan di production

## ⚙️ Environment Configuration

### Production Optimizations

#### 1. **Minify CSS (Optional):**
```bash
# Install cssnano
npm install -g cssnano-cli

# Minify CSS files
cssnano styles/main.css styles/main.min.css
```

#### 2. **Optimize Images:**
```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize screenshots
imagemin screenshot/*.png --out-dir=screenshot/optimized
```

#### 3. **Add Service Worker (Future Enhancement):**
```javascript
// sw.js - untuk offline functionality
const CACHE_NAME = 'spinwheels-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/js/main.js',
  '/styles/main.css'
];
```

## 🌍 Custom Domain Setup

### DNS Configuration
```
# A Record
Type: A
Name: @
Value: [hosting provider IP]

# CNAME Record  
Type: CNAME
Name: www
Value: yourdomain.com
```

### SSL Certificate
Semua platform modern menyediakan SSL gratis:
- Netlify: Otomatis
- Vercel: Otomatis  
- GitHub Pages: Otomatis
- Firebase: Otomatis

## 📊 Performance Optimization

### 1. **Enable Gzip Compression:**
```nginx
# Netlify _headers file
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
```

### 2. **Cache Headers:**
```
# Netlify _headers
/js/*
  Cache-Control: public, max-age=31536000

/styles/*
  Cache-Control: public, max-age=31536000

/screenshot/*
  Cache-Control: public, max-age=31536000
```

### 3. **Preload Critical Resources:**
```html
<link rel="preload" href="js/main.js" as="script">
<link rel="preload" href="styles/main.css" as="style">
```

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: '.'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🐛 Troubleshooting

### Common Issues:

#### 1. **404 Errors:**
```
Problem: Files not found
Solution: Check file paths are relative, not absolute
```

#### 2. **CORS Errors:**
```
Problem: ES6 modules blocked
Solution: Ensure hosting serves with proper MIME types
```

#### 3. **Slow Loading:**
```
Problem: Large file sizes
Solution: Optimize images and minify CSS/JS
```

#### 4. **Mobile Issues:**
```
Problem: Layout broken on mobile
Solution: Test responsive design, check viewport meta tag
```

## 📈 Monitoring & Analytics

### 1. **Google Analytics (Optional):**
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 2. **Performance Monitoring:**
- Lighthouse CI
- Web Vitals
- Netlify Analytics
- Vercel Analytics

## 🎯 Post-Deployment

### Testing Checklist:
- [ ] Site loads correctly
- [ ] All game features work
- [ ] Mobile responsive
- [ ] Fast loading times
- [ ] No console errors
- [ ] SSL certificate active

### Share Your Game:
- [ ] Update README dengan live demo link
- [ ] Share di social media
- [ ] Submit ke game directories
- [ ] Get feedback dari users

---

**Selamat! SpinWheels Game Anda sekarang live di internet! 🎉** 