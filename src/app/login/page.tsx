"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/api/controller/userController";
import { toast } from "react-toastify";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const postLogin = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      toast.success("User has been logged in succesfully");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    postLogin.mutate(values);
  };

  useEffect(() => {
    const tokenLS = localStorage.getItem("token");
    setToken(tokenLS);

    if (token) {
      router.push("/dashboard/board");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span>Yükleniyor</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full h-screen bg-[#F6F5F5]">
      <Image width={100} height={100} src={"/karga.svg"} alt="kargaicon" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col bg-[#145389] p-6 border-black border-[1px] rounded-md shadow-lg space-y-8 min-w-72"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
