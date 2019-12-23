EXPLAIN SELECT prod_name FROM products ORDER BY prod_price

-- ORDER BY的使用
SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price,prod_name
SELECT Prod_id,MAX(prod_price) Price FROM products ORDER BY prod_id

SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price DESC
SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price DESC,prod_name LIMIT 2

-- WHERE子句的使用 ，快速选中当前行 ： shift+ 方向下键
SELECT prod_name,prod_price FROM products WHERE prod_price = 2.50
SELECT prod_name,prod_price FROM products WHERE prod_price < 10
SELECT prod_name,prod_price FROM products WHERE prod_price <= 10 ORDER BY prod_price
SELECT vend_id,prod_name FROM products WHERE vend_id <> 1003

-- BETWEEN 匹配范围中所有的值，包括指定的开始值和结束值
SELECT prod_name,prod_price FROM products WHERE prod_price BETWEEN 5 AND 10 ORDER BY prod_price

-- 空值检查
SELECT cust_id,cust_email FROM customers WHERE cust_email IS NULL

-- 数据过滤
SELECT prod_id,prod_price,prod_name,vend_id FROM products WHERE vend_id = 1003 AND prod_price <= 10

-- AND OR IN IN和OR作用相似，但是IN操作更快
SELECT prod_name,prod_price,vend_id FROM products WHERE vend_id = 1002 OR vend_id = 1003
SELECT prod_name,prod_price,vend_id FROM products WHERE (vend_id = 1002 OR vend_id = 1003) 
AND prod_price >= 10
SELECT prod_name,prod_price,vend_id FROM products WHERE vend_id IN (1002,1003) ORDER BY prod_name
SELECT prod_name,prod_price,vend_id FROM products where vend_id NOT IN (1002,1003) ORDER BY prod_name

-- 通配符 like  %匹配多个字符  _匹配单个字符 ,执行多行查询语句，需要加分号
SELECT prod_id,prod_name FROM products WHERE prod_name LIKE '%anvil%'
SELECT prod_id,prod_name FROM products WHERE prod_name LIKE '_ ton anvil';
SELECT prod_id,prod_name FROM products WHERE prod_name LIKE '% ton anvil'

-- 计算字段  别名 AS
SELECT prod_id,quantity,item_price FROM orderitems WHERE order_num = 20005
SELECT prod_id,quantity,item_price,quantity*item_price AS expanded_price FROM orderitems WHERE order_num = 20005

-- 日期时间查询  Date()只取日期 Time()只取时间
SELECT cust_id,order_num,order_date FROM orders WHERE DATE(order_date) BETWEEN '2005-09-01' AND
 '2005-09-30'
-- Year（order_date） 从一个日期中返回年份，Month(order_date) 月份 DAY(date) 获取天数
SELECT cust_id,order_num,order_date FROM orders WHERE YEAR(order_date) = 2005 AND MONTH(order_date) = 9 AND DAY(order_date) = 12

-- 聚集函数 （aggregate function）
-- AVG()     返回某列的平均值 , 忽略列值为NULL的行
-- COUNT()   返回某列的行数
-- MAX()     返回某列的最大值
-- MIN()     返回某列的最小值
-- SUM()      返回某列值之和

SELECT AVG(prod_price) AS avg_price FROM products WHERE vend_id = 1003
SELECT COUNT(*) AS num_cust FROM customers
SELECT COUNT(cust_email) AS num_cust FROM customers
SELECT MAX(prod_price) AS max_price FROM products
SELECT vend_id, min(prod_price) min_price FROM products GROUP BY vend_id
SELECT SUM(quantity) AS items_ordered FROM orderitems WHERE order_num = 20005
SELECT COUNT(*) AS num_items,
			 MIN(prod_price) AS price_min,
			 MAX(prod_price) AS price_max,
			 AVG(prod_price) AS price_avg
FROM products

-- 分组数据 GROUP BY 和 HAVING 子句
-- GROUP BY 子句列出的每个列都必须是检索列或有效的表达式（但是不能是聚集函数）。
-- 如果在SELECT中使用表达式，则必须在GROUP BY子句中指定相同的表达式。不能使用别名
-- GROUP子句必须出现在WHERE子句之后，ORDER BY子句之前
SELECT vend_id,COUNt(*) AS prod_num FROM products GROUP BY vend_id
SELECT vend_id,COUNT(*) AS num_prods FROM products GROUP BY vend_id WITH ROLLUP

-- 过滤分组  WHERE过滤行，HAVING过滤分组
SELECT cust_id,COUNT(*) AS orders FROM orders GROUP BY cust_id HAVING COUNT(*) >= 2
SELECT vend_id,COUNT(*) AS num_prods FROM products WHERE prod_price >= 10
GROUP BY vend_id HAVING COUNT(*) >= 2

SELECT order_num,SUM(quantity*item_price) AS ordertotal FROM orderitems
GROUP BY order_num HAVING SUM(quantity*item_price) >= 50
SELECT order_num,SUM(quantity*item_price) AS ordertotal FROM orderitems
GROUP BY order_num 
HAVING SUM(quantity*item_price) >= 50
ORDER BY ordertotal DESC

-- 使用子查询
SELECT order_num,prod_id FROM orderitems WHERE prod_id = 'TNT2'
SELECT cust_id,order_num FROM orders WHERE order_num IN (20005,20007)
SELECT cust_name,cust_contact FROM customers WHERE cust_id IN (10001,10004)

SELECT cust_id,order_num FROM orders WHERE order_num IN (SELECT order_num FROM orderitems WHERE prod_id = 'TNT2')

SELECT
	cust_name,
	cust_contact 
FROM
	customers 
WHERE
	cust_id IN ( SELECT cust_id FROM orders WHERE order_num IN ( SELECT order_num FROM orderitems WHERE prod_id = 'TNT2' ) )

-- 相关子查询 涉及外部查询的子查询
SELECT cust_name,cust_state,(SELECT COUNT(*) FROM orders WHERE orders.cust_id = customers.cust_id) AS orders FROM customers ORDER BY cust_name

-- 联结

-- 等值联结 equijion  <==> 内部连接 INNER JOIN
SELECT vend_name,prod_name,prod_price
FROM vendors,products
WHERE vendors.vend_id = products.vend_id
ORDER BY vend_name,prod_name

SELECT vend_name,prod_name,prod_price
FROM vendors INNER JOIN products
ON vendors.vend_id = products.vend_id
ORDER BY vend_name,prod_name

SELECT prod_name,vend_name,prod_price,quantity
FROM orderitems,products,vendors
WHERE products.vend_id = vendors.vend_id
AND orderitems.prod_id = products.prod_id
AND order_num = 20005

-- 高级联结
-- 自联结
SELECT p1.prod_id,p1.prod_name FROM products AS p1,products AS p2
WHERE p1.vend_id = p2.vend_id AND p2.prod_id = 'DTNTR'

-- 外部联结 LEFT JOIN  ，RIGHT JOIN
SELECT customers.cust_id,orders.order_num
FROM customers LEFT JOIN orders
ON customers.cust_id = orders.cust_id

-- 带聚合函数的联结
SELECT customers.cust_name,customers.cust_id,COUNT(orders.order_num) AS num_order
FROM customers INNER JOIN orders
ON customers.cust_id = orders.cust_id
GROUP BY customers.cust_id

SELECT customers.cust_name,customers.cust_id,COUNT(orders.order_num) AS num_order
FROM customers LEFT JOIN orders
ON customers.cust_id = orders.cust_id
GROUP BY customers.cust_id

-- 组合查询 UNION 会自动去除结果集中重复的行（这是默认行为）
-- 如果想返回所有匹配行，可以使用UNION ALL
SELECT vend_id,prod_id,prod_price FROM products WHERE prod_price <= 5
SELECT vend_id,prod_id,prod_price FROM products WHERE vend_id IN (1001,1002)

SELECT vend_id,prod_id,prod_price FROM products WHERE prod_price <= 5
UNION
SELECT vend_id,prod_id,prod_price FROM products WHERE vend_id IN (1001,1002

SELECT vend_id,prod_id,prod_price FROM products WHERE prod_price < 5 
OR vend_id IN (1001,1002)

-- 对结果集排序，使用UNION组合查询时，只能使用一条ORDER BY子句，它必须出现在最后一条
-- SELECT语句之后。对于结果集，不存在用一种方式排序一部分，而又用另一种方式排序另一
-- 部分的情况，因此不允许使用多条ORDER BY子句
SELECT vend_id,prod_id,prod_price
FROM products
WHERE prod_price <= 5
UNION
SELECT vend_id,prod_id,prod_price
FROM products
WHERE vend_id IN(1001,1002)
ORDER BY vend_id,prod_price

