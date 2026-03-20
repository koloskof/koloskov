
Примеры: https://github.com/productstar-team/sql_course

Среда: [https://sqliteonline.com/](https://sqliteonline.com/)

С помощью SQL можно:

- Извлекать данные;
- Изменять данные;
- Добавлять данные.

## Ключевые слова

SELECT — слово для извлечения столбцов

FROM — ключевое слово для обозначения таблицы, из которой мы будем извлекать данные

Для извлечения данных мы пишем:

```sql
SELECT что мы хотим (столбец/-цы)  FROM откуда мы хотим (таблица)
```

## Порядок ключевых слов

1. SELECT
2. FROM
3. WHERE
4. GROUP BY
5. HAVING ORDER
6. ORDER BY

## Извлечение столбцов из таблицы

```sql
SELECT
	column_name_1
	, column_name_2
FROM
	table_name

```

```sql
SELECT
	name
	, location
FROM
	host
```

| name | location |
| --- | --- |
| Anna | Ireland |
| Deids And Eoin | Dublin, Dublin, Ireland |
| ... | ... |

## Извлечение всей таблицы

```sql
SELECT DISTINCT
	column_name_1
	, column_name_2
FROM
	table_name
```

```sql
SELECT DISTINCT
	city
	, room_type
FROM
	listings
```

| id | url | name | ... |
| --- | --- | --- | --- |
| 43984 | https://airbnb.com | Anna | ... |
| 67159 | https://airbnb.com | John | ... |

## Извлечение уникальных комбинаций значений

```sql
SELECT DISTINCT
	column_name_1
	, column_name_2
FROM
	table_name

```

```sql
SELECT DISTINCT
	city
	, room_typo
FROM
	listings
```

| city | room_type |
| --- | --- |
| Dublin | Private room |
| Dublin | Entire home/apt |

## Таким образом, типы данных нужно писать так

**Числовой тип данных — число**

Пример: id = 1223 i~~d = ’1223’~~

**Числовой тип данных — ‘Текст’**

Пример: name = ‘Mary’ i~~d = Mary~~ 

**Тип данных с датой — ‘год-месяц-день’**

Пример: date = ‘2020-01-30’ date ~~= ’2030 30 01’ date=2020 01 30~~ 

## Фильтрация строк по соответствию = или IS

```sql
SELECT *
FROM
	hosts
WHERE
	host_since = '2020-01-01'
```

```sql
SELECT *
FROM
	hosts
WHERE
	name IS 'Mary'
```

## Фильтрация строк по соответствию <, ≤

```sql
SELECT *
FROM
	table_name
WHERE
	column_name <= value
```

```sql
SELECT *
FROM
	listings
WHERE
	minimum_nights <= 3
```

| id | ... | minimum_nights |
| --- | --- | --- |
| 440077 | ... | 3 |
| 85148 | ... | 1 |
| ... | .... | ... |

## Проверка условий и возвращение соответствующего результата CASE

```sql
SELECT minimun_nights
	,CASE
		WHEN minimun_nights < 3 THEN
		'1-2 minimum nights'
		WHEN minimun_nights BETWEEN 
		3 AND 5 THEN '3-5 minimum nights'
		WHEN minimun_nights >= 6 THEN
		'6+ minimum nights'
		ELSE 'No information'
	END AS min_nights_group
FROM listings
```

| minimum_nights | minimum_nights_group |
| --- | --- |
| 10 | 6+ minimum nights |
| 2 | 1-2 minimum nights |
| 3 | 3-5 minimum nights |
| 0 | 1-2 minimum nights |
| Null | No information |
| ... | ... |

## Alias — псевдоним для переименования таблиц и колонок

```sql

SELECT
	column_name
	column_new_name
FROM
	table_name
WHERE
	condition(column_new_name)
```

```sql
SELECT
	name_host_name
FROM
	host airbnb_hosts
WHERE
	ho
```

| host_name |
| --- |
| Mary |
| Mary |
| ... |

## Фильтрация строк по диапазону BETWEEN

```sql
SELECT *
FROM
	table_name
WHERE
	column_name BETWEEN value_1
	AND value_2

```

```sql
SELECT *
FROM
	host
WHERE
	host_since BETWEEN '2018-01-01'
	AND '2018-12-13'
```

## Фильтрация строк c N условиями AND и OR

```sql

SELCT *
FROM
	table_name
WHERE
	condition_1
	AND
	(condition_2 OR condition_3)
```

```sql
SELCT *
FROM
	hosts
WHERE
	name = 'Mary'
	AND
	(about LIKE '%travel%' OR about IS NULL)
```

## Фильтрация строк по частичному соответствию LIKE ‘%’

```sql

SELECT *
FROM
	table_name
WHERE
	column_name
	LIKE '%value%'
```

```sql
SELECT *
FROM
	hosts
WHERE
	location LIKE
	'%Dublin%'
```

| id | url | location | ... |
| --- | --- | --- | --- |
| 67159 | ... | Ireland, Dublin | ... |
| 70706 | ... | Dublin IE | ... |
| ... | ... | ... | … |

## Фильтрация строк по не соответствию ≠, <> или IS NOT

Пример #1

```sql

SELECT *
FROM
	hosts
WHERE
	name != 'Mary'
```

Пример #2

```sql
SELECT *
FROM
	hosts
WHERE
	name <> 'Mary'
```

Пример #3

```sql
SELECT *
FROM
	hosts
WHERE
	name IS NOT 'Mary'
```

## Сортировка

 ORDER BY — ключевое слово для сортировки записей по столбцам

Сортировка столбца по возрастающей

```sql
SELECT *
FROM
	table_name
ORDER BY
	column_name ASC
```

```sql
SELECT *
FROM
	listings
ORDER BY
	price ASC
```

| id | … | price |
| --- | --- | --- |
| 34823 | … | 0 |
| 23472 | … | 10 |
| 34504 | … | 20 |
| 34534 | … | 20 |
| … | … | … |

Сортировка столбца по убыванию

```sql
SELECT *
FROM
	table_name
ORDER BY
	column_name DESC
```

```sql
SELECT *
FROM
	listings
ORDER BY
	price DESC
```

| id |  | price |
| --- | --- | --- |
| 34543 | ... | 10000 |
| 23345 | … | 8500 |
| 34346 | … | 7600 |
| 34345 | … | 7600 |
| … | … |  |

Сортировка нескольких столбцов

```sql
SELECT *
FROM
	table_name
ORDER BY
	column_name(s)
```

```sql
SELECT *
FROM
	listings
ORDER BY
	minimum_nights
	, price

```

| … | price | minimum_nights |
| --- | --- | --- |
| … | 0 | 1 |
| … | 9 | 1 |
| … | 9 | 1 |
| … | 10 | 1 |
| … | … | .. |

Сортировка c помощью порядковых чисел

```sql
SELECT *
FROM
	table_name
ORDER BY
	1,2
```

```sql
SELECT
		minimum_nights
		, price
FROM
	listings
ORDER BY
	1, 2
```

| price | minimum_nights |
| --- | --- |
| 0 | 1 |
| 9 | 1 |
| 0 | 1 |
| 10 | 1 |
| … | … |

## Извлечение N первых/последних записей

с помощью ключевых слов ORDER BY и LIMIT

Первые 5 записей

```sql
SELECT *
FROM
	teble_name
ORDER BY
	column_name DESC
LIMIT N

```

```sql
SELECT *
FROM
	listings
ORDER BY
	price DESC
LIMIT 5
```

| id | … | price |
| --- | --- | --- |
| 34543 | … | 10000 |
| 23345 | … | 8500 |
| 34346 | … | 7600 |
| 34345 | … | 7600 |
| 78979 | … | 7547 |

Извлечение последней 3 записи

```sql
SELECT *
FROM
	table_name
ORDER BY
	column_name_ASC
LIMIT N
```

```sql
SELECT *
FROM
	listings
ORDER BY
	price
LIMIT 3
```

| id | … | price |
| --- | --- | --- |
| 34823 | … | 0 |
| 23472 | … | 10 |
| 34504 | … | 20 |

## **Функции агрегации MIN(), MAX(), SUM(), AVG(), COUNT()**

Группировка наименьшим значением MIN()

```sql
SELECT
	MIN(column_name)
FROM
	table_name
```

```sql
SELECT
	MIN(price) AS
	min_price
FROM
	listings
```

| min_price |
| --- |
| 0 |

Группировка средним арифметическим значения AVG()

```sql
SELECT
	AVG(column_name)
FROM
	table_name
```

```sql
SELECT
	AVG(price) AS
	avg_price
FROM
	listings
```

| avg_price |
| --- |
| 137.97 |

Группировка количеством значений всей таблицы COUNT()

```sql
SELECT
	COUNT(*)
FROM
	table_name
```

```sql
SELECT
	COUNT(*) AS
	total_count
FROM
	listings
```

| total_count |
| --- |
| 8961 |

Группировка количеством значений столбца COUNT()

```sql
SELECT
	COUNT(column_name)
FROM
	table_name
```

```sql
SELECT
	COUNT(about) AS about_count
FROM
	hosts
```

| about_count |
| --- |
| 2959 |

## **GROUP BY**

GROUP BY — ключевое слово для группировки данных

```sql
SELECT
	column_name(s)
FROM
	table_name
GROUP BY
	column_name(s)
```

```sql
SELECT
	room_type
	, city
FROM
	listings
GROUP BY
	room_type
	, city
```

| room_type | city |
| --- | --- |
| Entire home/apt | Null |
| Entire home/apt | Arbour Hill |
| Entire home/apt | Ard Na Greine |
| … | … |

## Group by и функции агрегации

Пример 1

```sql
SELECT
	column_name()
	, MIN(column_name)
FROM
	table_name
GROUP BY
	column_name(s)
```

```sql
SELECT
	room_type
	, MIN(price) AS
	min_price
FROM
	listings
GROUP BY
	room_type
```

| room_type | min_price |
| --- | --- |
| Entire home/apt | 10 |
| Hotel room | 30 |
| Private room | 0 |
| Shared room | 11 |

Пример 2

```sql
SELECT
	coloun_name(s)
	, COUNT(*)
FROM
	table_name
GROUP BY
	coliumn_name(s)
```

```sql
SELECT
	room_type
	, COUNT(*) AS
	total_count
FROM
	listings
GROUP BY
	room_type
```

| room_type | total_count |
| --- | --- |
| Entire home/apt | 4435 |
| Hotel room | 84 |
| Private room | 4295 |
| Shared room | 147 |

Пример 3

```sql
SELECT
	column_name(s)
	, COUNT (DISTINCT column_name)
FROM
	table_name
GROUP BY
	coloumn_name(s)
```

```sql
SELECT
	room_type
	, COUNT (DISTINCT column_city) AS unique_cities_count
FROM
	listings
GROUP BY
	room_type
```

| room_type | unique_cities_count |
| --- | --- |
| Entire home/apt | 207 |
| Hotel room | 13 |
| Private room | 236 |
| Shared room | 33 |

## HAVING

Ключевое слово для фильтрации сгруппированных значений

WHERE тоже используется для фильтрации значений.

Но WHERE не может быть использован для результатов группировок, а HAVING может.

Фильтрация сгруппированных значений HAVING

```sql
SELECT
	column_name_1
	, MIN(column_name_2)
FROM
	table_name
GROUP BY
	column_name
HAVING
	condition()
```

```sql
SELECT
	room_type
	, COUNT(*) AS
	total_count
FROM listings
GROUP BY
	room_type
HAVING
	total_count > 100
```

| room_type | total_count |
| --- | --- |
| Entire home/apt | 4435 |
| Private room | 4295 |
| Shared room | 147 |

Фильтрация сгруппированных значений HAVING

```sql
SELECT
	column_name_1
	, MIN(column_name_2)
FROM
	table_name
GROUP BY
	column_name
HAVING
	condition(s) 
```

```sql
SELECT
	room_type
	, COUNT(*) AS
	total_count
FROM listings
GROUP BY
	room_type
HAVING
	room_type !=
	'Shared_room'
```

| room_type | total_count |
| --- | --- |
| Entire home/apt | 4435 |
| Hotel room | 84 |
| Private room | 4295 |

## Порядок выполнения SQL-запросов

Порядок выполнения ключевых запросов

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT

Порядок написания

```sql
SELECT
	category
	, COUNT(*) AS
	total_count
FROM movies
WHERE
	release_date >
	'2020-01-01'
GROUP BY
	category
HAVING
	total_count > 1
ORDER BY
	total_count DESC
```

## Разница между WHERE и HAVING

WHERE — выбирает строки для группировки

HAVING — отбирает результаты для группировки

```sql
SELECT
	room_type
	, COUNT(*) AS total_count
FROM listings
WHERE
	room_type != 'Hotel room'
GROUP BY
	room_type
HAVING
	total_count > 150
```

[Задания](Задания.md)