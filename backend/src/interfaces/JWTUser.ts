export default interface JWTUser {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}