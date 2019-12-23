-- 增INSERT  删DELETE 改UPDATE

-- 严重依赖表中列的顺序
INSERT INTO customers VALUES(NULL,'Pep E. LaPew','100 Main Street','Los Angeles','CA',
														'90046','USA',NULL,NULL)
-- 指定列名														
INSERT INTO customers(cust_name,cust_address,cust_city,cust_state,cust_zip,
cust_country,cust_contact,cust_email) VALUES('Pep E. LaPewB','101 Main Street',
'Los Angeles Two','CA','90047','USA',NULL,NULL)

-- 更新 不要省略WHERE子句，不然会直接更新了表中的所有行
UPDATE customers SET cust_email = 'email2fudd.com' WHERE cust_id = 10005

--  删除数据
DELETE FROM customers WHERE cust_id = 10006

-- DELETE 删除表的内容而不是表本身，DELETE语句从表中删除行，甚至是删除表中所有行，
-- 但是，DELETE不删除表本身

-- 更快的删除： 如果想从表中删除所有行，不要使用DELETE,可以使用 TRUNCATE TABLE语句，
-- 它完成相同的工作，但速度更快（TRUNCATE 实际是删除原来的表并重新创建一个表，而不
-- 是逐行删除表中的数据）

-- 创建表
CREATE TABLE IF NOT EXISTS customers(...)

IF EXISTS customers DROP customers
CREATE TABLE customers(
	cust_id  			int			     NOT NULL AUTO_INCREMENT,
	cust_name 		char(50)     NOT NULL,
	cust_address  char(50)     NULL,
	cust_city     char(50)     NULL,
	cust_state    char(50)     NULL,
	PRIMARY KEY(cust_id)
) ENGINE=INNODB DEFAULT CHARSET = utf8


-- 更新表

-- 添加列
ALTER TABLE vendors ADD vend_phone CHAR(20)

-- 删除列
ALTER TABLE vendors DROP COLUMN vend_phone

-- 定义外键
ALTER TABLE orderitems
ADD CONSTRAINT fk_orderitems_orders
FOREIGN KEY (order_num) REFERENCES orders(order_num)

-- 删除表
DROP TABLE customers

-- 重命名表
RENAME TABLE customers TO customersNew


-- 视图 （用途:隐藏复杂的SQL,可重用，格式化检索出来的数据） --（缺点：使用多了，性能会下降的很厉害）
-- a. 视图用CREATE VIEW 语句来创建
-- b. 使用SHOW CREATE VIEW viewname;来查看创建视图的语句
-- c. 用DROP删除视图，其语法为DROP VIEW viewName
-- d. 更新视图时，可以先用DROP再用CREATE,也可以直接用CREATE OR 
--    REPLACE VIEW。

-- 也可以使用Navicat Premium可视化工具来创建视图
CREATE VIEW productcustomers AS
SELECT cust_name,cust_contact,prod_id
FROM customers,orders,orderitems
WHERE customers.cust_id = orders.cust_id
AND orderitems.order_num = orders.order_num;

-- 从视图检索数据
SELECT cust_name,cust_contact,prod_id
FROM productcustomers
WHERE prod_id = 'TNT2'