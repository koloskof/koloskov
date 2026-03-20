

---

### Создание таблиц

**Новая таблица  `CREATE TABLE`**

При создании новой таблицы необходимо **указать:**

1. Название таблицы
2. Названия столбцов
3. Типы данных 
4. Ограничения (опционально)

Основные **виды** **ограничений**:

- `NOT NULL` - не разрешает присваивать столбцу значение null
- `DEFAULT` - задает для столбца значение по умолчанию
- `PRIMARY KEY` - задает столбец первичного ключа для таблицы
- `FOREIGN KEY` - задает столбец (столбцы) внешнего ключа для таблицы
- `UNIQUE` - не разрешает добавлять в столбец повторяющиеся значения
- `CHECK` - ограничивает значения, которые могут добавляться в столбец, с помощью логических выражений

Основные **типы данных:** 

- Текстовые: CHAR, VARCHAR, TEXT
- Числовые (целый и с плавающей точкой): INTEGER, FLOAT, REAL
- Дата и время: DATE, DATETIME, TIMESTAMP
- Прочие

Структура запроса:

```sql
CREATE TABLE table ( 
column1 data_type1 [constraints1],
column2 data_type2 [constraints2],
 … 
columnN data_typeN [constraintsN] 
)

```

Пример:

```sql
CREATE TABLE books ( 
title_id CHAR(3) NOT NULL,
title_name VARCHAR(40) NOT NULL,
pages INTEGER,
price DECIMAL(5,2),
pubdate DATE 
)
```

**Временная таблица  `CREATE TEMPORARY TABLE`**

Структура запроса:

```sql
CREATE TEMPORARY TABLE table ( 
column1 data_type1 [constraints1],
column2 data_type2 [constraints2],
 … 
columnN data_typeN [constraintsN] 
)

```

Пример:

```sql
CREATE TEMPORARY TABLE editors ( 
id CHAR(3) NOT NULL PRIMARY KEY,
first_name VARCHAR(15), 
last_name VARCHAR(15), 
phone VARCHAR(12),
pub_id CHAR(3) 
)
```

**Таблица на основе существующей `SELECT INTO`**

Структура запроса:

```sql
SELECT columns
INTO new_table 
FROM existing_table 
-- [WHERE search_condition]
```

Пример:

```sql
SELECT * 
INTO authors2 
FROM authors

```

### Изменение таблиц `ALTER TABLE`

**Типы действий**

- ADD (добавить)
- ALTER (изменить)
- DROP (удалить)

**Объекты**

- Столбец
- Ключ
- Ограничение

**Добавить столбец  `ADD COLUMN`**

Структура запроса:

```sql
ALTER TABLE table
ADD COLUMN column1 data_type1 
col_constraints1
```

Пример:

```sql
ALTER TABLE users
ADD COLUMN email VARCHAR(255) 
NOT NULL
```

**Добавить внешний ключ  `ADD FOREIGN KEY`**

Структура запроса:

```sql
ALTER TABLE table1
ADD FOREIGN KEY (column1) 
REFERENCES table2(column2)
```

Пример:

```sql
ALTER TABLE orders
ADD FOREIGN KEY (user_id) 
REFERENCES users(id)
```

**Добавить ограничение  `ALTER`**

Структура запроса:

```sql
ALTER TABLE table
ALTER COLUMN column1 data_type1 
constraints1
```

Пример:

```sql
ALTER TABLE users
ALTER COLUMN birthdate year 
NOT NULL
```

### Удаление таблиц `DROP TABLE`

<aside>
❗ Удаляет таблицу и все её данные. Единственный способ восстановить удаленную таблицу – заново создать ее и восстановить данные из **резервной копии** (если она была)

</aside>

Структура запроса:

```sql
DROP TABLE table
```

Пример:

```sql
DROP TABLE users
```