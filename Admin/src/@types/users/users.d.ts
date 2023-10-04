export interface User {
  userId: string
  roleId?: string
  companyId?: string | null
  googleId?: string | null
  facebookId?: string | null
  appleId?: string | null
  firstName: string
  lastName: string
  secondLastName?: string | null
  email: string
  password?: string | null
  phoneNumber: string | null
  age: number
  state: string
  gender: string
  profilePicture?: string | null
}
