-- stored procedure to insert a user

CREATE PROCEDURE insert_User( @user_id VARCHAR(80),@user_email VARCHAR(255), @user_password VARCHAR(255), @user_role VARCHAR(255),
  @user_name VARCHAR(255),@Is_assigned bit)

 AS

 BEGIN

 INSERT INTO Users(user_id,user_email,user_password,user_role,user_name,Is_assigned) VALUES(@user_id,@user_email,  @user_password,@user_role,
 @user_name,@Is_assigned)

 END

--  check user if exists

CREATE PROCEDURE check_user_if_exist( @user_email VARCHAR(255))

 AS

 BEGIN

 select * from Users u where u.user_email=@user_email

 END

--  get all users in the database

CREATE PROCEDURE get_all_users

 AS

 BEGIN

 select * from Users

 END

--  get a single user by id


CREATE PROCEDURE get_single_user(@id varchar (255))

 AS

 BEGIN

 select * from Users  where   user_id =@id ;

 END

--  Procedure to delete a user


CREATE PROCEDURE deleteUser(@id VARCHAR(100))
 AS
 BEGIN
 DELETE FROM Users  WHERE  user_id =@id
 END

--  Procedure to update a user 

CREATE PROCEDURE updateUser(@id VARCHAR(100) , @email VARCHAR(200) , @name VARCHAR(200),@role VARCHAR(200))
 AS
 BEGIN 
 UPDATE Users SET  user_email=@email , user_name=@name , user_role=@role WHERE user_id=@id

 END


-- Procudure to create Project

CREATE PROCEDURE create_project( @project_id VARCHAR(255), @user_id VARCHAR(255), @project_name VARCHAR(255),
@project_description VARCHAR(255),
  @completion_date date,@Is_assigned bit ,@Is_completed bit )

 AS

 BEGIN

 INSERT INTO Projects(project_id,user_id,project_name,project_description,completion_date,Is_assigned,Is_completed)

 VALUES(@project_id,@user_id,  @project_name,@project_description,@completion_date,@Is_assigned,@Is_completed)

 END

--  Procedure to update a project

 CREATE PROCEDURE updateProject(@id VARCHAR(100) , @name VARCHAR(200) , @description VARCHAR(200),@date VARCHAR(200))
 AS
 BEGIN 
 UPDATE Projects SET  project_id=@id , project_name=@name , project_description=@description ,
 completion_date=@date WHERE project_id=@id

 END

--  Procedure to get a single project by id

  CREATE PROCEDURE get_single_project(@id varchar (255))

 AS

 BEGIN

 select * from Projects  where   project_id =@id ;

 END

--  Procedure to delete a Project by id

 CREATE PROCEDURE deleteProject(@id VARCHAR(100))
 AS
 BEGIN
 DELETE FROM Projects  WHERE  project_id =@id
 END

--  Stored Procure to get all the projects
CREATE PROCEDURE get_all_Projects

 AS

 BEGIN

 select project_id ,project_name,project_description,completion_date, t1.user_name as 'Assigned_to',Is_completed from Projects p INNER JOIN Users t1 On t1.user_id = p.Assigned_to;

 END