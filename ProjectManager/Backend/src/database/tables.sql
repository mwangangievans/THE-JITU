-- create database  ProjectManagementSystem

CREATE DATABASE ProjectManagementSystem

-- create table  Users


use ProjectManagementSystem

CREATE TABLE Users
(
user_id varchar,
user_email varchar(255) NOT NULL  ,
user_password varchar(255) NOT NULL,
user_role varchar(255),
user_name varchar(255),
  PRIMARY KEY (user_id),
);


-- ////////////////////////////////////////////

CREATE TABLE Projects (
  project_id varchar(255),
  project_name varchar(255) NOT NULL,
  project_description varchar(255) NOT NULL,
  completion_date DATE  NOT NULL,
  Assigned_to varchar(255),
  Is_completed bit
  PRIMARY KEY (project_id),
  FOREIGN KEY (Assigned_to)
      REFERENCES Users (user_id)
      ON DELETE CASCADE
);


