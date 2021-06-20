CREATE DATABASE IF NOT EXISTS `server_main`;
USE `server_main`;

CREATE TABLE `server_accounts` (
  `account_id` int(11) NOT NULL,
  `account_name` text NOT NULL,
  `account_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `server_accounts`
  ADD PRIMARY KEY (`account_id`);
  
ALTER TABLE `server_accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;