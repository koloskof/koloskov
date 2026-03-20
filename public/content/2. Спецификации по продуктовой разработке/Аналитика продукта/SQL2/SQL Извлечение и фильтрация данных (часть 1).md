
---

<aside>
✏️ **SELECT** – ключевое слово для **извлечения столбца(ов)** из таблицы.

</aside>

<aside>
✏️ **FROM** – ключевое слово для обозначения **таблицы**, из которой мы будем извлекать данные.

</aside>

**Извлечение столбцов из таблицы**

Структура запроса:

```sql
SELECT column_name(s) 
FROM table_name
```

Пример:

```sql
SELECT name, id 
FROM hosts
```

**Извлечение всех столбцов из таблицы**

Структура запроса:

```sql
SELECT *
FROM table_name
```

Пример:

```sql
SELECT * 
FROM hosts
```

**Извлечение уникальных значений**

Структура запроса:

```sql
SELECT DISTINCT column_name(s) 
FROM table_name
```

Пример:

```sql
SELECT DISTINCT name 
FROM hosts
```

---

<aside>
✏️ **LIMIT** - ключевое слово для **извлечения указанного количества строк** из таблицы

</aside>

**Извлечение определенного количества строк**

Структура запроса:

```sql
SELECT *
FROM table_name
LIMIT N
```

Пример:

```sql
SELECT *
FROM hosts
LIMIT 10
```

---

<aside>
✏️ **WHERE** - ключевое слово для **фильтрации строк** таблицы с различными условиями

</aside>

**Фильтрация строк по соответствию = или IS**

Структура запроса:

```sql
SELECT * 
FROM table_name
WHERE column_name = value
```

Пример:

```sql
SELECT * 
FROM hosts
WHERE host_since = ‘2020-01-01’
```

**Фильтрация строк по соответствию >, ≥, <, ≤**

Структура запроса:

```sql
SELECT * 
FROM table_name
WHERE column_name > value
```

Пример:

```sql
SELECT * 
FROM hosts
WHERE host_since <= ‘2020-01-01’
```

**Фильтрация строк по не соответствию !=, <> или IS NOT**

Структура запроса:

```sql
SELECT * 
FROM table_name
WHERE column_name != value
```

Пример:

```sql
SELECT * 
FROM hosts
WHERE host_since != ‘2020-01-01’
```

**Фильтрация строк по частичному соответствию LIKE ‘%’**

Структура запроса:

```sql
SELECT * 
FROM table_name
WHERE column_name LIKE '%value%'
```

Пример:

```sql
SELECT * 
FROM hosts
WHERE location LIKE '%Dublin%'
```

---

<aside>
❗ **Порядок написания ключевых слов в SQL**:
- SELECT
- FROM
- WHERE
- GROUP BY
- HAVING
- ORDER BY
- LIMIT

</aside>

<aside>
❗ **Написание типов данных**:
- **Числовой** тип данных — число.   Пример: id = 1223
- **Текстовый** тип данных — ‘текст’. Пример: name = ‘Mary’
- Тип данных с **датой** — ‘год-месяц-день’. Пример: date = ‘2020-01-30’

</aside>

И важно заметить, что запросы по прошедшему материалу не меняют никоим образом саму базу данных и данные в ней. Фильтрация строк происходит в результате, сама таблица в базе данных остается такой же как и была.