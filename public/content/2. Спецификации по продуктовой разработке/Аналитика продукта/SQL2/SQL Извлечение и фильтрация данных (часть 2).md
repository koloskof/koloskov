

---

**Фильтрация строк с пустым значением IS NULL**

Структура запроса:

```sql
SELECT *
FROM table_name
WHERE column_name IS NULL
```

Пример:

```sql
SELECT *
FROM hosts
WHERE location IS NULL
```

**Фильтрация строк с не пустым значением IS NOT NULL**

Структура запроса:

```sql
SELECT *
FROM table_name
WHERE column_name IS NOT NULL
```

Пример:

```sql
SELECT *
FROM hosts
WHERE location IS NOT NULL
```

**Фильтрация строк, присутствующих в списке IN()**

Структура запроса:

```sql
SELECT *
FROM table_name
WHERE column_name IN (value(s))
```

Пример:

```sql
SELECT *
FROM listings
WHERE city IN 
	('Dublin', 'Churchtown')
```

**Фильтрация строк, отсутствующих в списке NOT IN()**

Структура запроса:

```sql
SELECT *
FROM table_name
WHERE column_name NOT IN (value(s))
```

Пример:

```sql
SELECT *
FROM listings
WHERE city NOT IN ('Dublin', 'Churchtown')
```

**Фильтрация строк c несколькими условиями AND**

Структура запроса:

```sql
SELECT *
FROM table_name
WHERE condition_1 AND condition_2
```

Пример:

```sql
SELECT *
FROM hosts
WHERE name = 'Mary' 
AND host_since > ‘2015-01-01’
```

**Фильтрация строк c несколькими условиями OR**

Структура запроса:

```sql
SELECT *
FROM table_name
WHERE condition_1 OR condition_2
```

Пример:

```sql
SELECT *
FROM hosts
WHERE name = 'Mary' 
OR name IS NULL
```

**Фильтрация строк c N условиями AND и OR**

Структура запроса:

```sql
SELECT *
FROM table_name
WHERE condition_1
AND (condition_2 OR condition_3)
```

Пример:

```sql
SELECT *
FROM hosts
WHERE name = 'Mary'
AND (about LIKE ‘%travel%’ 
OR about IS NULL)
```

---

<aside>
❗ Чувствительность SQL к регистру:
- Ключевые слова можно писать разным регистром: SELECT = SeLecT
- Названия столбцов/таблиц можно писать разным регистром: name = NaMe
- Значения в таблице (например, при написании условий в WHERE) нужно писать тем же регистром как в таблице: ‘Mary’ != ‘mary’

</aside>

Важно заметить, что запросы по прошедшему материалу не меняют никоим образом саму базу данных и данные в ней. Дополнительные столбцы у нас появляются в результате, сама таблица в базе данных остается такой же как и была.

<aside>
✏️ **Комментарии** – пояснения, которые игнорируются при выполнении запроса

</aside>

Пояснения нам нужны для того, чтобы давать подсказки другим аналитикам и самому себе в будущем для понимания запроса. Также с помощью комментариев можно отметить части запроса, которые не должны быть выполнены.

Пример:

```sql
-- it’s a comment
SELECT * 
/* again a comment
still a comment*/ 
FROM listings
WHERE host_name = 'Mary' 
```