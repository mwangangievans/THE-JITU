-- stored procedure to insert and Update a user

ALTER PROCEDURE [dbo].[InsertUpdate]
(
	@user_id varchar(255) null,
	@email varchar(255) null  ,
	@phone varchar(255) null  ,
	@hashedpassword varchar(255)  null,
	@user_role varchar(255)  null ,
	@is_sent bit,
	@name varchar(255) null 
)
AS
begin
if exists (select *  from Users  where user_id=@user_id)
begin
    update Users set user_id=@user_id,user_email=@email,phone=@phone,hashedpassword=@hashedpassword,user_role=@user_role,
	is_sent=@is_sent,user_name=@name WHERE user_id=@user_id
end
else 
begin
		 INSERT INTO Users(user_id,user_email,phone,hashedpassword,user_role,is_sent,user_name)
		VALUES(@user_id,@email,  @phone,@hashedpassword, @user_role,@is_sent,@name)
    end

END


--  check user if exists

ALTER   PROCEDURE [dbo].[check_user_if_exist]( @email VARCHAR(255))

 AS

 BEGIN

 select * from Users u where u.user_email=@email

 END
 
 --  get all users in the database

CREATE PROCEDURE get_all_users

 AS

 BEGIN

 select * from Users

 END

--  get a single user by id


CREATE PROCEDURE get_single_user(@user_id varchar (255))

 AS

 BEGIN

 select * from Users  where   user_id =@user_id ;

 END

 execute get_single_user @user_id='17338670-0c91-40c7-a2e6-01de24662259'



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