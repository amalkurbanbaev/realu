# Архитектура блога

## Обзор

Новая архитектура блога построена с использованием современных практик Next.js 15 и включает:

- **Строгую типизацию** с TypeScript
- **Кеширование** с React cache API
- **Интернационализацию** с next-intl
- **MDX поддержку** с улучшенными компонентами
- **SEO оптимизацию** с метаданными
- **Навигацию между постами**

## Структура файлов

```
src/
├── lib/
│   └── blog.ts                 # Основная логика блога
├── templates/
│   ├── blog.tsx               # Шаблон списка статей
│   └── article.tsx            # Шаблон отдельной статьи
├── components/modules/
│   ├── mdx.tsx               # MDX компоненты
│   └── post-navigation.tsx   # Навигация между постами
├── app/[locale]/blog/
│   ├── page.tsx              # Страница списка статей
│   └── [slug]/
│       ├── page.tsx          # Страница статьи
│       └── not-found.tsx     # 404 для статей
├── content/posts/
│   └── [slug]/
│       ├── ru.mdx
│       └── en.mdx
└── messages/
    ├── ru.json
    └── en.json
```

## Ключевые улучшения

### 1. Производительность
- **React Cache API**: Кеширование запросов к файловой системе
- **Promise.all**: Параллельная загрузка данных
- **Статическая генерация**: Предварительная сборка всех страниц

### 2. Типизация
- **Строгие интерфейсы**: PostFrontmatter, PostMeta, Post
- **Type Guards**: Валидация frontmatter
- **Поддержка локалей**: SupportedLocale тип

### 3. Функциональность
- **Время чтения**: Автоматический расчет
- **Теги**: Поддержка категоризации
- **Навигация**: Переход между соседними постами
- **Fallback**: Автоматический переход на английский

### 4. UX/UI
- **Адаптивный дизайн**: Мобильная оптимизация
- **Темная тема**: Поддержка через Tailwind
- **Анимации**: Плавные переходы
- **Подсветка кода**: Syntax highlighting

## API функции

### Основные функции

```typescript
// Получить все слаги постов
getAllSlugs(): Promise<string[]>

// Получить пост по слагу и локали
getPostBySlug(slug: string, locale: Locale): Promise<Post | null>

// Получить все посты для локали
getAllPosts(locale: Locale): Promise<PostMeta[]>

// Получить соседние посты
getAdjacentPosts(currentSlug: string, locale: Locale): Promise<{
  previous?: PostMeta
  next?: PostMeta
}>

// Проверить существование поста
checkPostExists(slug: string, locale: Locale): Promise<boolean>
```

### Дополнительные функции

```typescript
// Получить посты по тегу
getPostsByTag(tag: string, locale: Locale): Promise<PostMeta[]>

// Получить все теги
getAllTags(locale: Locale): Promise<string[]>

// Генерация статических параметров
generateStaticParams(): Promise<Array<{ slug: string }>>
```

## Frontmatter схема

```yaml
---
title: "Заголовок статьи"
summary: "Краткое описание"
date: "2025-01-01"
cover: "/blog/image.jpg"      # Опционально
draft: false                  # Опционально
tags: ["медитация", "йога"]   # Опционально
author: "Автор"               # Опционально
---
```

## Локализация

### Поддерживаемые языки
- `ru` - Русский (основной)
- `en` - Английский (fallback)

### Fallback логика
1. Ищем статью на запрошенной локали
2. Если не найдена, ищем на английском
3. Если и там нет - возвращаем null

### Переводы
Тексты интерфейса хранятся в `src/messages/`:
- `blog.title` - Заголовок блога
- `blog.description` - Описание блога
- `blog.noPosts` - Сообщение об отсутствии статей

## MDX компоненты

### Поддерживаемые элементы
- **Изображения**: Оптимизированные с Next.js Image
- **Цитаты**: Стилизованные blockquote
- **Таблицы**: Адаптивные таблицы

### Пример использования

```mdx
# Заголовок

Обычный текст с **жирным** и *курсивом*.

```javascript
const example = "код с подсветкой";
```

> Цитата с красивым оформлением

![Изображение](/path/to/image.jpg)
```

## SEO оптимизация

### Метаданные
- **Open Graph**: Для социальных сетей
- **Twitter Cards**: Для Twitter
- **Structured Data**: JSON-LD разметка
- **Alternate Languages**: hreflang теги

### Sitemap
Автоматическая генерация через Next.js:
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const posts = await getAllPosts('ru')
  // ... генерация sitemap
}
```

## Развертывание

### Сборка
```bash
npm run build
```

### Проверки
```bash
npm run check-all  # Линтинг + типы + форматирование
```

### Оптимизация
- Статическая генерация всех страниц
- Оптимизация изображений
- Минификация CSS/JS
- Кеширование на уровне CDN

## Расширение

### Добавление новых языков
1. Добавить локаль в `SUPPORTED_LOCALES`
2. Создать файлы переводов в `messages/`
3. Добавить MDX файлы для постов

### Новые поля frontmatter
1. Обновить интерфейс `PostFrontmatter`
2. Добавить валидацию в `validateFrontmatter`
3. Обновить компоненты для отображения

### Кастомные MDX компоненты
```typescript
// components/modules/mdx.tsx
export const mdxComponents = {
  // ... существующие
  CustomComponent: ({ children }) => <div>{children}</div>
}
```
