import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { auctionValidationSchema } from 'validationSchema/auctions';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAuctions();
    case 'POST':
      return createAuction();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAuctions() {
    const data = await prisma.auction
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'auction'));
    return res.status(200).json(data);
  }

  async function createAuction() {
    await auctionValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.item?.length > 0) {
      const create_item = body.item;
      body.item = {
        create: create_item,
      };
    } else {
      delete body.item;
    }
    const data = await prisma.auction.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}