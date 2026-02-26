# 🚀 React FSD Template

Production-ready React template з архітектурою **Feature-Sliced Design (FSD)**.

Підходить для середніх і великих проєктів.

---

## 🧰 Stack

* React + Vite + TypeScript
* Zustand
* TanStack Query
* Axios
* i18next
* SCSS
* React Router
* ESLint + Prettier

---

## ⚙️ System Requirements

Перед встановленням переконайся, що у тебе встановлено:

```bash
node -v
v24.14.0
```

Якщо версія відрізняється — рекомендується використовувати `nvm`.

---

## 📦 Installation

```bash
git clone <your-repository-url>
cd <project-name>
npm install
```

---

## 🏃 Run project

```bash
npm run dev
```

---

## 🏗 Build project

```bash
npm run build
```

---

## 📁 Project Architecture (FSD)

Архітектура побудована за принципом:

```
shared → entities → features → widgets → pages → app
```

Нижній рівень не знає про верхній.

---

# 📂 Структура

```
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
├── shared/
├── main.tsx
└── App.tsx
```

---

# 🧠 Архітектурна модель

## 🔹 shared — база

Універсальні речі без бізнес-логіки:

* UI-kit
* hooks
* utils
* axios instance
* глобальні типи

```
shared/ui
shared/hooks
shared/api
shared/lib
shared/types
```

---

## 🔹 entities — бізнес сутності

Описує те, що існує у системі:

* user
* product
* order
* post

Приклад:

```
entities/user/
  model/types.ts
  api/getUser.ts
```

❗ Тут немає login/logout логіки.

---

## 🔹 features — бізнес дії

Описує дії над сутностями:

* auth
* updateProfile
* changeTheme
* createPost

Приклад:

```
features/auth/
  model/store.ts
  api/login.ts
  ui/LoginForm.tsx
```

---

## 🔹 widgets — великі UI блоки

Композиція фіч:

* Header
* Sidebar
* DashboardCard

```
widgets/Header/
widgets/Sidebar/
```

---

## 🔹 pages — маршрути

Конкретні сторінки застосунку:

```
pages/HomePage/
pages/LoginPage/
pages/NotFoundPage/
```

---

## 🔹 app — корінь застосунку

* Router
* Providers
* Layouts
* Global store
* Theme provider

---

# 🏪 Store Strategy

### 🔹 app/store

Глобальні речі:

* theme
* language
* sidebar
* глобальний UI state

### 🔹 feature store

Бізнес логіка:

* auth token
* cart
* profile state

---

# 🧩 Environment Variables

Створи `.env` файл:

```
VITE_API_URL=https://api.example.com
VITE_APP_ENV=development
```

Використання:

```ts
import.meta.env.VITE_API_URL
```

---

# 🧹 Linting

Запуск ESLint:

```bash
npm run lint
```

---

# 🎯 Основні правила FSD

* shared не знає ні про кого
* entities не знають про features
* features можуть використовувати entities
* widgets можуть використовувати features
* pages можуть використовувати все нижче
* app — корінь композиції

---

# 🔥 Часті помилки

❌ Класти auth store в shared
❌ Класти login в entities
❌ Робити один великий global store
❌ Змішувати бізнес-логіку з UI

---

# 💎 Next Level Improvements

* Refresh token interceptor
* Global modal manager
* Suspense-ready architecture
* Lazy loaded routes
* Strict FSD ESLint rules
* Husky + lint-staged
* CI-ready configuration

---

# 📌 Philosophy

Якщо файл можна видалити без зламу бізнес-логіки — він у `shared`.

Якщо він описує сутність — `entities`.

Якщо він щось робить — `features`.

---

# 📄 License

MIT

---

Якщо хочеш — можу зробити версію README з бейджами, структурною діаграмою і enterprise описом (як у серйозних GitHub boilerplate).
