import { UserRole } from "./user.model";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export default User;
