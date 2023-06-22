import { UserRole } from "../user.model"

interface UpdateUserDto {
    name?: string,
    email?:string,
    password?:string,
    role?: UserRole
}

export default UpdateUserDto