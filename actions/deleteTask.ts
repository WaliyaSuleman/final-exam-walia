"use server"

import prisma from "@/lib/db"

export const deleteTask = async(taskid:string)=>{

    return await prisma.task.delete({
        where: {id:taskid}
    });
}