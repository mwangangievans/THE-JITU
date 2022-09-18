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

