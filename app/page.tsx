"use client";

import { taskSchema } from "@/schemas/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { CgSmileSad } from "react-icons/cg";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { getTasks } from "@/actions/getTasks";
import { deleteTask } from "@/actions/deleteTask";
import { updateTask } from "@/actions/updateTask";
import { createTask } from "@/actions/createTask";

const Home = () => {
  const router = useRouter();
  const TaskInfo = [
    {
      name: "This is task 1 of web engeeniring",
    },
    {
      name: "This is task 1 of web engeeniring",
    },
    {
      name: "This is task 1 of web engeeniring",
    },
  ];
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof taskSchema>) {
  createTask(values).then(()=>{
    router.refresh();
  })
  }

  const [taskInfo, setTaskInfo] = useState<any>();

  useEffect(() => {
    getTasks().then((data: any) => {
      setTaskInfo(data);
      router.refresh();
    });
  }, [taskInfo]);

  const handleDelete = useCallback((taskid: string) => {
    deleteTask(taskid).then(() => {
      router.refresh();
    });
  }, []);

  const handleLiked = useCallback((taskid: string) => {
    updateTask(taskid, true).then(() => {
      router.refresh();
    });
  }, []);

  const handleUnLiked = useCallback((taskid: string) => {
    updateTask(taskid, false).then(() => {
      router.refresh();
    });
  }, []);

  return (
    <div className=" w-full items-center flex flex-col ">
      <div className="grid mt-9  grid-cols-3 gap-x-12   w-[700px]">
        <div className="flex flex-col h-[100px] items-center rounded-lg bg-blue-300 justify-center border border-black">
          <h1 className=" text-xl font-bold">Total Task </h1>
          <h1 className="text-3xl font-bold">04</h1>
        </div>

        <div className="flex flex-col h-[100px] items-center rounded-lg bg-green-300 justify-center border border-black">
          <h1 className=" text-xl font-bold">Total Task </h1>
          <h1 className="text-3xl font-bold">04</h1>
        </div>

        <div className="flex flex-col h-[100px] items-center rounded-lg bg-orange-300 justify-center border border-black">
          <h1 className=" text-xl font-bold">Total Task </h1>
          <h1 className="text-3xl font-bold">04</h1>
        </div>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex mt-8 items-start justify-center gap-x-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Task Here"
                      {...field}
                      className="w-[560px] border border-black"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="">
              <span className="mr-2">
                <FaPlus />
              </span>
              Add Task
            </Button>
          </form>
        </Form>
      </div>

      {taskInfo?.map((taskInfo: any) => {
        return (
          <Card
            key={taskInfo.id}
            className="mt-9 p-6 flex justify-between w-[700px] border border-black"
          >
            <CardContent>
              <p className="font-medium">{taskInfo.name}</p>
            </CardContent>
            <CardFooter className="flex gap-x-8">
              {taskInfo.isCompleted ? (
                <Button
                  variant={"outline"}
                  className="bg-green-100 rounded-full"  onClick={()=>{handleLiked(taskInfo.id)}}
                >
                  <span className="mr-2">
                    <FcLike size={20}/>
                  </span>
                  Mark as completed
                </Button>
              ) : (
                <Button
                  variant={"outline"}
                  className="bg-yellow-200 rounded-full" onClick={()=>{handleUnLiked(taskInfo.id)}}
                >
                  <span className="mr-2">
                    <CgSmileSad size={20}/>
                  </span>
                  Mark as incompleted
                </Button>
              )}

              <span>
                <RiDeleteBin5Line
                  size={25}
                  cursor={"pointer"}
                  onClick={() => {
                    handleDelete(taskInfo.id);
                  }}
                />
              </span>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
