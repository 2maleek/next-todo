// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function(req:NextApiRequest , res: NextApiResponse) {
  if(req.method == 'PUT') {
    const { id } = req.query;
    const { body } = req;

    const todos = await prisma.todo.update({
      where: {
        id: Number(id)
      },
      data: body
    })
    res.json(todos)
  }else if(req.method == 'DELETE') {
    const {id} = req.query
    const todos = await prisma.todo.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(todos)
  }
}