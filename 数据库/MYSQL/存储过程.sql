-- 存储过程

-- 定义
CREATE PROCEDURE productpricing()
BEGIN
	SELECT AVG(prod_price) AS priceAvg
	FROM products;
END;

-- 调用
CALL productpricing();

-- 删除存储过程
DROP PROCEDURE IF EXISTS productpricing;


-- 表名做参数，需要语句与参数拼接，并预处理
CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_test_shard`(IN p_accountId VARCHAR(50), IN p_flag INT(50), IN p_tableName VARCHAR(20),out p_out VARCHAR(20))
begin
	DECLARE count INT DEFAULT 0;

	SET @sql = CONCAT("UPDATE ", p_tableName, " SET diamond = 1 WHERE accountId =  ", p_accountId, " and diamond = ", p_flag , ";");
	PREPARE stmt FROM @sql;
	EXECUTE stmt;
	SET @p_out= 'test';
	SET count = row_count();
	DEALLOCATE PREPARE stmt;
	SELECT count;
	SELECT @p_out;
end
