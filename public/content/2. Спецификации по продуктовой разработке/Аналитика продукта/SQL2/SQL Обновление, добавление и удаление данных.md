

---

### Добавление данных `INSERT`

**По положению столбцов в таблице**

Структура запроса:

```sql
INSERT INTO table

VALUES (value1,…, valueN)

```

Пример:

```sql
INSERT INTO reviews 

VALUES (625722631, 4407, '2020-06-19',
393348, 'Christian')
```

**По названию столбцов в таблице**

Структура запроса:

```sql
INSERT INTO table 

(column1, column2, …, columnN) 

VALUES (value1, value2, …, valueN)

```

Пример:

```sql
INSERT INTO reviews 

(id, listing_id, date, 
reviewer_id, reviewer_name)

VALUES (625722633, 4407, 
'2020-06-19', 393348, 'Christian')
```

**Из одной таблицы в другую**

Структура запроса:

```sql
INSERT INTO table 

SELECT ...

```

Пример:

```sql
INSERT INTO reviews 

SELECT 
  id, 
	listing_id, 
	date, 
	reviewer_id, 
	reviewer_name
FROM reviews 
WHERE id = 625722630
```

### Обновление данных `UPDATE`

**Замена данных**

<aside>
❗ При выполнении этого запроса заменяются все данные.

</aside>

Структура запроса:

```sql
UPDATE table
SET column = ...
```

Пример:

```sql
UPDATE reviews
SET reviewer_name = 'John Doe'
```

**Замена с условием**

Структура запроса:

```sql
UPDATE table
SET column_1 = ... , 
column_n = …
WHERE ...
```

Пример:

```sql
UPDATE hosts
SET about = 'No description', 
is_super_host = 'f'
WHERE about = ' '
```

**Увеличение**

Структура запроса:

```sql
UPDATE table
SET column_1  = column_1 * 2
WHERE ...
```

Пример:

```sql
UPDATE listings
SET price = price * 2 
WHERE room_type = 'Hotel room'
```

### Удаление данных `DELETE`

**Удаление строк**

Структура запроса:

```sql
DELETE FROM table
WHERE ...
```

Пример:

```sql
DELETE FROM reviews
WHERE date >= '2019-01-01’
```

**Удаление всех строк**

Структура запроса:

```sql
DELETE FROM table
```

Пример:

```sql
DELETE FROM reviews
```