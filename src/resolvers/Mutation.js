import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateAuthToken from "../utils/generateAuthToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async createUser(parent, { data }, { prisma }, info) {
    const password = await hashPassword(data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password,
      },
    });

    return {
      user,
      token: generateAuthToken(user.id),
    };
  },
  async loginUser(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new Error("User login failed");
    }
    const isPwdMatch = await bcrypt.compare(data.password, user.password);

    if (!isPwdMatch) {
      throw new Error("User login failed");
    }

    return {
      user,
      token: generateAuthToken(user.id),
    };
  },
  async updateUser(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data,
      },
      info
    );
  },
  deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
};

export { Mutation as default };
