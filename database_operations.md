
1. Indexing
2. Trigger
3. views
4. stored-procedure

---------------------------------------------------------------------------------------------
1. Indexing
CREATE INDEX name_index ON users (first_name, last_name);
---------------------------------------------------------------------------------------------
2. Trigger
---------------------------------------------------------------------------------------------
```sql
DELIMITER //

CREATE TRIGGER after_user_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (user_id, old_first_name, old_last_name, new_first_name, new_last_name)
    VALUES (OLD.id, OLD.first_name, OLD.last_name, NEW.first_name, NEW.last_name);
END //

DELIMITER ;
```
---------------------------------------------------------------------------------------------
3. VIEW
---------------------------------------------------------------------------------------------

-- It return all users list with phone_number who's date_of_birth is greater then or equal to 2000(year)
CREATE VIEW view_users_phone_number AS
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    phone_number,
    YEAR(date_of_birth) As DOB 
FROM
    users
WHERE
    date_of_birth >= "2000-01-01";


---------------------------------------------------------------------------------------------
4. STORED-PROCEDURE
---------------------------------------------------------------------------------------------
DELIMITER //

CREATE PROCEDURE FetchAllUsers()
BEGIN
    SELECT * FROM users;
END //

DELIMITER ;
---------------------------------------------------------------------------------------------
DELIMITER //

CREATE PROCEDURE GetUserById(IN userId INT)
BEGIN
    SELECT * FROM users WHERE id = userId;
END //

DELIMITER ;
---------------------------------------------------------------------------------------------

