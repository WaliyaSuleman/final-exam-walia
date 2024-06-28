"use server"

import prisma from "@/lib/db"

export const getTasks = async()=>{

    return await prisma.task.findMany();
}