export interface RegisterDto {
    userName: string,
    password: string,
    confirmPassword: string,
    email: string,
    fullName: string | null,
    role: string
}