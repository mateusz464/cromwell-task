import Users from "../../models/Users";

export async function getUserByEmail(email: string) {
  const user = await Users.findOne({ email });

  if (!user) {
    return null;
  }

  return user;
}

export async function createUser(name: string, email: string, password: string) {
  const user = await Users.create({ name, email, password });

  return user ? user : null;
}