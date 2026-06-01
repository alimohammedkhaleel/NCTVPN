# تعليمات رفع المشروع على GitHub و Netlify

## الخطوة 1: إنشاء Repository على GitHub

1. افتح المتصفح واذهب إلى: https://github.com/new
2. قم بتسجيل الدخول بحساب: **alimohammedkhaleel**
3. املأ البيانات التالية:
   - **Repository name**: `NCTVPN`
   - **Description**: `New Cairo Technological University VPN Integration Initiative - National Unified VPN Framework`
   - **Visibility**: Public (أو Private حسب رغبتك)
   - **لا تضف** README, .gitignore, أو license (لأنها موجودة بالفعل)
4. اضغط **Create repository**

## الخطوة 2: ربط المشروع المحلي بـ GitHub

بعد إنشاء Repository، نفذ الأوامر التالية في Terminal:

```bash
# إضافة remote repository
git remote add origin https://github.com/alimohammedkhaleel/NCTVPN.git

# رفع الكود على GitHub
git branch -M main
git push -u origin main
```

إذا طلب منك username و password:
- **Username**: alimohammedkhaleel
- **Password**: استخدم Personal Access Token (ليس كلمة المرور العادية)

### إنشاء Personal Access Token (إذا لزم الأمر):
1. اذهب إلى: https://github.com/settings/tokens
2. اضغط **Generate new token** → **Generate new token (classic)**
3. أعط Token اسم مثل: "NCTVPN Deployment"
4. اختر Scopes: `repo` (كامل)
5. اضغط **Generate token**
6. **انسخ Token فوراً** (لن تستطيع رؤيته مرة أخرى)
7. استخدم Token كـ password عند git push

## الخطوة 3: نشر على Netlify

### الطريقة الأولى: من خلال GitHub (موصى بها)

1. اذهب إلى: https://app.netlify.com/
2. سجل دخول أو أنشئ حساب
3. اضغط **Add new site** → **Import an existing project**
4. اختر **Deploy with GitHub**
5. ابحث عن repository: `alimohammedkhaleel/NCTVPN`
6. اضغط على Repository
7. في إعدادات Build:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
8. اضغط **Deploy site**

### الطريقة الثانية: من خلال Netlify CLI

```bash
# تثبيت Netlify CLI (إذا لم يكن مثبتاً)
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# بناء المشروع
npm run build

# نشر المشروع
netlify deploy --prod
```

عند السؤال:
- **Publish directory**: `dist`

## الخطوة 4: تخصيص Domain (اختياري)

بعد النشر على Netlify:
1. اذهب إلى **Site settings** → **Domain management**
2. اضغط **Add custom domain**
3. أدخل domain الخاص بك (إذا كان لديك)
4. اتبع التعليمات لتوجيه DNS

## ملاحظات مهمة

✅ **تم حذف المجلدات التالية من المشروع:**
- `.kiro/` - ملفات Kiro AI
- `.claude/` - ملفات Claude AI
- `.sixth/` - ملفات Sixth AI
- `.vscode/` - إعدادات VS Code
- `tests/` - ملفات الاختبار
- `test-results/` - نتائج الاختبار
- `playwright-report/` - تقارير Playwright

✅ **تم إصلاح المشاكل التالية:**
- Footer النصوص تظهر بشكل صحيح
- Footer الخط العلوي يظهر
- Navbar يظهر في جميع الصفحات
- أخطاء Console من Browser Extensions تم إخفاؤها

✅ **الملفات المهمة:**
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `index.html` - Entry point
- `src/` - Source code
- `public/` - Static assets

## روابط مفيدة

- GitHub Repository: https://github.com/alimohammedkhaleel/NCTVPN (بعد الإنشاء)
- Netlify Dashboard: https://app.netlify.com/
- Vite Documentation: https://vitejs.dev/
- React Documentation: https://react.dev/

---

**تم إنشاء هذا الملف بواسطة Kiro AI**
