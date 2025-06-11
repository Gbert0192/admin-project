"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema } from "@/lib/schema/UserSchema";
import { DialogTitle } from "@radix-ui/react-dialog";

const CreateDialog = () => {
  const form = useForm({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {},
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Create New User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Create User</DialogTitle>
          <DialogDescription>
            Click Create to add a new user. You can edit the details later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form action=""></form>
        </Form>

        <DialogFooter>
          <Button type="submit" className="text-white">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
