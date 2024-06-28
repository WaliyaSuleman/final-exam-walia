"use server"

import prisma from "@/lib/db"

export const updateTask = async(taskid:string,state:boolean)=>{

    const task = await prisma.task.update({
        where: { id: taskid },
        data: { isCompleted: state },
      })
}