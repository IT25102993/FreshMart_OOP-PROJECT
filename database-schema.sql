-- Optional: create database manually (app can create it automatically with createDatabaseIfNotExist=true)
-- Run in phpMyAdmin or MySQL command line if you prefer.

CREATE DATABASE IF NOT EXISTS freshmart_db;
USE freshmart_db;

-- Tables are created automatically by Spring Boot JPA (ddl-auto=update).
-- For reference, the structure is:
--
-- products: id (PK), product_id (unique), name, price, category, image_path, created_at
-- product_quantity: id (PK), product_id, quantity, where_bought, created_at
--
-- Admin and customer data are stored in text files: data/admins.txt, data/customers.txt
