--  PROCEDURE TO INSERT AND UPDATE PARCEL

ALTER PROCEDURE [dbo].[InsertUpdateParcel]
(
		@parcel_no INTEGER  NULL,
		@Cost varchar(255)  NULL  ,
        @Receiver varchar(255)  NULL  ,
        @Sender varchar(255)  NULL  ,
        @deliverde_notify bit   , 
        @destination varchar(255)  NULL   ,
        @dispatch_notify bit   ,
        @is_deleted bit   ,
        @is_delived bit   ,
        @is_dispatched bit   ,
        @lat INTEGER  NULL,
        @logi INTEGER  NULL,
        @time_Dispatched  varchar(255)  NULL  ,
        @weight  varchar(255)  NULL  
  
	)
AS
begin
if exists (select *  from Parcel_table  where parcel_no=@parcel_no)
begin
    update Parcel_table set 
		parcel_no = @parcel_no ,
		Cost=@Cost ,
        Receiver=@Receiver  ,
        Sender = @Sender   ,
        deliverde_notify=@deliverde_notify   , 
        destination = @destination  ,
        dispatch_notify = @dispatch_notify   ,
        is_deleted = @is_deleted   ,
        is_delived =@is_delived   ,
        is_dispatched =@is_dispatched   ,
        lat  =@lat,
        logi = @logi  ,
        time_Dispatched  =  @time_Dispatched  ,
        weight  = @weight  
		WHERE parcel_no=@parcel_no
end
else 
begin
		 INSERT INTO Parcel_table(
	parcel_no ,
	Cost ,
	Receiver ,
	Sender ,
	deliverde_notify   ,
	destination   ,
	dispatch_notify    ,
	is_deleted    ,
	is_delived    ,
	is_dispatched    ,
	lat   ,
	logi,
	time_Dispatched,
	weight
		 )
		VALUES(
	@parcel_no ,
	@Cost ,
	@Receiver ,
	@Sender ,
	@deliverde_notify   ,
	@destination   ,
	@dispatch_notify    ,
	@is_deleted    ,
	@is_delived    ,
	@is_dispatched    ,
	@lat   ,
	@logi,
	@time_Dispatched,
	@weight
	) 
    end

END

-- -----------------------PROCEDURE TO GET ALL PARCELS

CREATE PROCEDURE get_all_parcels

 AS

 BEGIN

 select * from Parcel_table

 END

--  ----------------------------PROCEDURE TO DELETE PARCEL
CREATE PROCEDURE deleteParcel(@parcel_no int)

 AS

 BEGIN

 DELETE FROM Parcel_table  WHERE  parcel_no =@parcel_no
 
 END

--  -------------------------------------GET SINGLE PARCEL--------------------------

 CREATE PROCEDURE get_single_parcel(@parcel_no int)

 AS

 BEGIN

 select * from Parcel_table  where   parcel_no =@parcel_no ;

 END
