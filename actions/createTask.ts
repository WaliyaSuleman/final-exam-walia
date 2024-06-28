"use server"

import prisma from "@/lib/db"
import { taskSchema } from "@/schemas/taskSchema"
import { z } from "zod"

export const createTask = async(values: z.infer<typeof taskSchema>)=>{
    
    const validatedvalues = taskSchema.safeParse(values)

    if(!validatedvalues.success){
        return({err:"invalid values"})
    }

    // const task = await prisma.task.create({
    //     data: {
    //         name: validatedvalues?.data.name,
    //         isCompleted: false
    //     }
    // })

    const task = await prisma.task.create({
        data: {
          name: validatedvalues?.data.name,
         isCompleted: true
        },
      })
}