import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method == 'POST') {
    const { body } = req;

    const todos = await prisma.todo.create({ data: JSON.parse(JSON.stringify(body)) });
    res.json(todos);
  }else if(req.method == 'GET') {
    const todos = await prisma.todo.findMany()
    res.json(todos)
  }
}