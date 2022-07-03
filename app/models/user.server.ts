import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return { id };
}

export async function getUserByEmail(email: User["email"]) {
  return { email };
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  };
}

export async function deleteUserByEmail(email: User["email"]) {
  return { email };
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await {
    email,
    password,
  };

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
