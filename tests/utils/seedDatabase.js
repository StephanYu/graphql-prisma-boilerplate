import prisma from "../../src/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const testUser1 = {
  input: {
    name: "Gordon Ryan",
    email: "gordon@dds.com",
    password: bcrypt.hashSync("gordon12"),
  },
  user: undefined,
  jwt: undefined,
};

const testUser2 = {
  input: {
    name: "Andre Galvao",
    email: "andre@atos.com",
    password: bcrypt.hashSync("andre123"),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyUsers();

  // Create testUser1, testUser2 and assign jwt auth tokens to each user
  testUser1.user = await prisma.mutation.createUser({
    data: testUser1.input,
  });
  testUser1.jwt = jwt.sign({ uId: testUser1.user.id }, process.env.JWT_SECRET);

  testUser2.user = await prisma.mutation.createUser({
    data: testUser2.input,
  });
  testUser2.jwt = jwt.sign({ uId: testUser2.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, testUser1, testUser2 };
