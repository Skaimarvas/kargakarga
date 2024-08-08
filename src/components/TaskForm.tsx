import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { postTask } from "@/api/controller/boardController";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const defaultTask = {
  name: "",
  description: "",
  boardId: 1,
  flagId: null,
  startDate: "",
  endDate: "",
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "The board name must contain at least 2 characters.",
    })
    .max(20, {
      message: "The board name must not exceed 20 characters.",
    }),
  description: z.string(),
  boardId: z.number(),
  flagId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

export type TaskFormSchemaType = z.infer<typeof formSchema>;

interface Iprop {
  handleNewTask: (columnId: number | null) => void;
  columnId: number;
  boardId: number;
  onTaskCreated: () => void;
}

const TaskForm: React.FC<Iprop> = ({
  handleNewTask,
  columnId,
  boardId,
  onTaskCreated,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultTask,
  });

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const createTask = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      toast.success("Task was created successfully!");
      form.reset();
      onTaskCreated();
      handleNewTask(null);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createTask.mutate(values);
    console.log("Task Values :", values);
  };

  const handleTask = () => {
    handleNewTask(null);
    form.reset();
  };

  useEffect(() => {
    form.setValue("boardId", boardId);
    if (date?.from) {
      form.setValue("startDate", format(date.from, "yyyy-MM-dd'T'HH:mm:ss"));
    } else {
      form.setValue("startDate", "");
    }

    if (date?.to) {
      form.setValue("endDate", format(date.to, "yyyy-MM-dd'T'HH:mm:ss"));
    } else {
      form.setValue("endDate", "");
    }
  }, [date, form]);

  return (
    <div className="p-1 rounded-md border border-gray-300">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flagId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">High Priority</SelectItem>
                    <SelectItem value="2">Medium Priority</SelectItem>
                    <SelectItem value="3">Low Priority</SelectItem>
                    <SelectItem value="4">Standart Priority</SelectItem>
                    <SelectItem value="5">Neutral Priority</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-1 jus">
            <Button
              className="bg-[#145389] transition-all duration-200 ease-in-out hover:bg-[#2e6697]"
              onClick={handleTask}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#145389] transition-all duration-200 ease-in-out hover:bg-[#2e6697]"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
