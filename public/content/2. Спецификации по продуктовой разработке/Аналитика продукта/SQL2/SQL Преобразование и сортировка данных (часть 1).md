

---

<aside>
✏️ **Alias** – псевдоним для переименования таблиц и колонок

</aside>

**Alias столбца/таблицы с AS, без AS**

Структура запроса:

```sql
SELECT 
	column_name AS column_new_name
FROM table_name table_new_name
WHERE condition(column_new_name)
```

Пример:

```sql
SELECT name AS host_name
FROM hosts airbnb_hosts
WHERE host_name = ‘Mary’
```

<aside>
❗ **Советы по использованию Alias:**
- Alias должен иметь смысл.
- На английском языке, не транслитом.
- Использовать _ для нескольких слов.
- Писать нижним регистром.
- Не слишком длинным.
- Не использовать зарезервированные слова.
- Не использовать названия других колонок/таблиц.
- Как принято в компании.

</aside>

---

**Преобразование UPPER()**

Структура запроса:

```sql
SELECT UPPER(column_name)
FROM table_name
```

Пример:

```sql
SELECT UPPER(name) AS upper_name
FROM hosts
```

**Преобразование LOWER()**

Структура запроса:

```sql
SELECT LOWER(column_name)
FROM table_name
```

Пример:

```sql
SELECT LOWER(name) AS lower_name
FROM hosts
```

UPPER(), LOWER() только для текстовых типов данных

---

**Арифметические операции столбцов с числами**

Структура запроса:

```sql
SELECT column_name + N
FROM table_name
```

Пример:

```sql
SELECT price + 10 AS new_price
FROM listings
```

**Арифметические операции между столбцами**

Структура запроса:

```sql
SELECT 
	column_name_1 * column_name_2
FROM table_name
```

Пример:

```sql
SELECT 
	price * minimum_nights 
	AS min_price
FROM listings
```

---

<aside>
✏️ **CASE** – оператор для проверки условий и возвращения соответствующего результата

</aside>

**Преобразования CASE**

Структура запроса:

```sql
SELECT
	CASE
		WHEN condition_1 THEN result_1
		WHEN condition_2 THEN result_2
		WHEN condition_N THEN result_N
		ELSE result
	END 
FROM table_name
```

Пример:

```sql
SELECT
	CASE
		WHEN is_super_host = 't' 
		THEN 1
		WHEN is_super_host = 'f' 
		THEN 0
		ELSE NULL
	END AS is_super_host_cleaned
FROM hosts
```

<aside>
❗ **Порядок условий в CASE имеет значение.** Если первое условие в CASE для строки выполнится, то результат первого условия - финальный результат для этой строки. Независимо от того, есть ли следующие условия, которые тоже могут выполниться.

</aside>

**Некорректное использование CASE**

```sql
SELECT 
	minimum_nights
	, CASE
		WHEN minimum_nights >= 3 THEN '3-5 minimum nights'
		WHEN minimum_nights >= 6 THEN '6+ minimum nights'
		ELSE 'No information'
	END AS min_nights_group
FROM listings
```