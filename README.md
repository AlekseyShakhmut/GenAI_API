# GenAI API Testing (Playwright + TypeScript)

## Описание проекта

Проект демонстрирует подход к тестированию GenAI API (на примере OpenAI Responses API) с использованием Playwright.

Основной фокус:

* тестирование API
* тестирование LLM (GenAI) поведения
* разделение слоёв (fixture / client / tests)
* работа с недетерминированными ответами моделей

---

## Что тестируется

### API (базовые проверки)

* статус-коды (200, 401, 400, 429)
* структура ответа
* корректность JSON

### Функциональность

* создание response (`/v1/responses`)
* работа с параметрами (temperature и др.)

### GenAI-специфичные проверки

#### Variability (недетерминированность)

Проверка, что модель генерирует разные ответы при одинаковом input.

#### Hallucination (галлюцинации)

Проверка, что модель:

* не выдумывает несуществующие факты
* корректно отвечает "не знаю"

#### Response Quality (качество ответа)

Проверка:

* релевантности ответа
* наличия ключевых слов
* минимальной осмысленности

---

## Архитектура проекта

```text
test → fixture → client → API → response → assertions
```

---

## Структура проекта

```
genai-api-tests/
│
├── tests/
│   ├── responses/
│   │   ├── positive.spec.ts
│   │   ├── negative.spec.ts
│   │   ├── variability.spec.ts
│   │   ├── hallucination.spec.ts
│   │   └── quality.spec.ts
│
├── fixtures/
│   └── api.fixture.ts
│
├── clients/
│   └── openai.client.ts
│
├── utils/
│   ├── data.factory.ts
│   └── llm.assertions.ts
│
├── config/
│   └── env.ts
│
├── playwright.config.ts
├── .env
├── .env.example
└── README.md
```

---

## Основные компоненты

### Config (config/env.ts)

Источник конфигурации:

* API URL
* API KEY

Данные берутся из `.env`

---

### Fixture (fixtures/api.fixture.ts)

Создаёт API-контексты:

* `apiAuth` — с авторизацией
* `apiWithoutAuth` — без авторизации
* `apiInvalidAuth` — невалидный токен

Назначение:

* переиспользование
* изоляция тестов
* централизованная настройка

---

### Client (clients/openai.client.ts)

Обёртка над API:

```
client.createResponse(input, options)
```

Назначение:

* скрывает детали API
* делает тесты читаемыми
* упрощает поддержку

---

### Utils

#### data.factory.ts

Генерация тестовых данных

#### llm.assertions.ts

Помощники для работы с LLM:

* извлечение текста
* проверка ключевых слов

---

### Tests

Тесты не содержат:

* настройки headers
* baseURL
* реализацию API

Они проверяют только:

* поведение
* результат

---

## Примеры тестов

### Variability test

Проверяет, что модель даёт разные ответы:

```
expect(t1).not.toEqual(t2);
```

---

### Hallucination test

Проверяет, что модель не выдумывает факты:

```
expect(isSafe || !isHallucination).toBeTruthy();
```

---

### Quality test

Проверяет:

* длину ответа
* наличие ключевых слов

```
expect(text.length).toBeGreaterThan(20);
expect(containsAny(text, keywords)).toBeTruthy();
```

---

## Allure Report

# Тесты + генерация и открытие Allure отчета
npm run test:allure

# Генерация и открытие Allure отчета (после прогона)
npm run allure:report


### Запуск конкретного теста + отчет
```bash
# 1) Очистить старые результаты
rm -rf allure-results

# 2) Запустить конкретный spec
npx playwright test api-tests/tests/products/products.hallucination.spec.ts

# 3) Построить и открыть Allure отчет
npm run allure:report
```


В отчёте доступны:

* шаги тестов
* статус выполнения
* ошибки
* история запусков

---

## Установка и запуск

### Установка зависимостей

```bash
npm install
```

---

### Настройка .env

```env
OPENAI_API_KEY=your_api_key
API_BASE_URL=https://api.openai.com/v1/
```

---

### Запуск тестов

```bash
npx playwright test
```

---

## Что демонстрирует проект

* Архитектуру API тестов (fixture + client)
* Подход к тестированию GenAI
* Работа с недетерминированными системами
* Практики, применяемые в AI-командах

---

## Ограничения

* LLM ответы недетерминированы, возможны нестабильные тесты
* Hallucination тесты не гарантируют 100% точность
* Требуется API ключ и положительный баланс

---

## Возможные улучшения

* Retry для нестабильных тестов
* Mock API для стабильности
* Тестирование streaming
* Judge model (оценка ответа моделью)
* Load и performance тесты

