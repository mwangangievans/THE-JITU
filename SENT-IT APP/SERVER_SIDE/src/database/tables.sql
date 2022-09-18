-- create database  Parcels
CREATE DATABASE Parcels;

-- create table  Users
use Parcels

CREATE TABLE Users
(
	user_id varchar(255),
	user_email varchar(255) NOT NULL  ,
	phone varchar(255) NOT NULL  ,
	hashedpassword varchar(255) NOT NULL,
	user_role varchar(255),
	is_sent bit,
	user_name varchar(255),
    PRIMARY KEY (user_id),
);
-- ////////////////////////////////////////////

CREATE TABLE Parcel_table
(
	parcel_no INTEGER NOT NULL,
	sender_id varchar(255) NOT NULL  ,
	receiver_id varchar(255) NOT NULL  ,
	charge money NOT NULL  ,
	parcel_weight decimal(6,2) NOT NULL  ,
	Is_deleted bit  ,
	Is_dispatched bit   ,
	Is_sent_ondispatch bit   ,
	Is_delivered bit   ,
	Is_sent_ondelivery bit   ,
	destination_lat Decimal(8,6) NOT NULL  ,
	destination_logi Decimal(9,6) NOT NULL  ,
    PRIMARY KEY (parcel_no),
	FOREIGN KEY (sender_id) REFERENCES Users(user_id),
	FOREIGN KEY (receiver_id) REFERENCES Users(user_id)
);



