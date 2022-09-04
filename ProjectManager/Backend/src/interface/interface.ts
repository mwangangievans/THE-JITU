export interface  User
{
    user_id:string
    user_email:string
    user_password:string
    user_role:string
    user_name:string
}

export interface  Data
{
    user_id: string,
    user_email: string,
    user_name:string,
    user_role:string
    iat: number,
    exp: number
}

export interface  Project
{
    project_id:string
    user_id:string|null
    project_name:string
    project_description:string
    completion_date:Date
    Is_assigned?:boolean
    Is_completed?:boolean
}