import getUserId from "../utils/getUserId";

const Query = {
  users(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
    };

    if (query) {
      opArgs.where = {
        name_contains: query,
      };
    }

    return prisma.query.users(opArgs, info);
  },
  myProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId,
      },
    });
  },
};

export { Query as default };
