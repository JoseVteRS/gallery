"use client";

import InputWithIcon from "@/components/input-with-icon";
import { FormInputField } from "@/components/shared/form-input-field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/tooltip";
import { env } from "@/env";
import { CreateGalleryInput } from "@/features/gallery/gallery.schema";
import { useToast } from "@/hooks/use-toast";
import { slugify } from "@/lib/slugify";
import { cn, generateRandomCode } from "@/lib/utils";
import { api } from "@/trpc/react";
import { GalleryStatus } from "@prisma/client";
import { CalendarIcon, EyeClosedIcon, EyeIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { HeaderSection } from "../../_components/header-section";

const EXPIRATION_TIME = {
  WEEK: 1000 * 60 * 60 * 24 * 7,
  TWO_WEEKS: 1000 * 60 * 60 * 24 * 14,
  THREE_WEEKS: 1000 * 60 * 60 * 24 * 21,
  FOUR_WEEKS: 1000 * 60 * 60 * 24 * 28,
};

const calculateExpirationDate = (value: keyof typeof EXPIRATION_TIME): Date => {
  const today = new Date();
  return new Date(today.getTime() + EXPIRATION_TIME[value]);
};

export default function GalleryAddPageClient() {
  const router = useRouter()
  const [code, setCode] = useState<string>("");
  const { toast } = useToast();

  // Generar el código solo en el cliente
  useEffect(() => {
    setCode(generateRandomCode(8));
  }, []);

  const { mutate, isPending } = api.galery.create.useMutation();

  const form = useForm<CreateGalleryInput>({
    defaultValues: {
      name: "",
      description: "",
      clientName: "",
      clientEmail: "",
      status: GalleryStatus.DRAFT,
      isPrivate: true,
      minSelections: 10,
      maxSelections: 15,
      expiresAt: calculateExpirationDate("TWO_WEEKS"),
    },
  });

  const title = form.watch("name");

  const handleSubmit = async (data: any) => {
    mutate(
      {
        ...data,
        status: data.status as GalleryStatus,
        maxSelections: Number(data.maxSelections),
        minSelections: Number(data.minSelections),
        code,
      },
      {
        onSuccess: () => {
          toast({
            title: "Gallery created successfully",
            description: "You can now share the gallery with your client",
            variant: "default",
          });
          router.push("/dashboard/gallery");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <div>
      <HeaderSection
        breadcrumbs={[
          { title: "Galleries", url: "/dashboard/gallery" },
          { title: "All galleries", url: "/dashboard/gallery" },
          { title: "Add", url: "/dashboard/gallery/add", isActive: true },
        ]}
      />

      <section className="px-5">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-2xl font-bold text-zinc-900">Add a gallery</h1>
          <Button variant="default" onClick={form.handleSubmit(handleSubmit)}>
            {form.formState.isSubmitting || isPending ? "Saving..." : "Save"}
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-4"
          >
            <div className="mt-4 w-3/4 rounded-md border border-zinc-200 p-4">
              <div className="">
                <div>
                  <div className="space-y-4">
                    <fieldset className="rounded-md border p-4">
                      <legend className="p-1 text-lg font-semibold text-zinc-900">
                        Gallery details
                      </legend>

                      <FormInputField
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="Name of the gallery"
                      />

                      <span className="text-sm text-zinc-500">
                        {env.NEXT_PUBLIC_APP_URL}/gallery/{slugify(title)}?code=
                        {code}
                      </span>

                      <FormInputField
                        control={form.control}
                        name="description"
                        label="Description"
                        placeholder="Description of the gallery"
                      />
                    </fieldset>
                    <div className="mt-10">
                      <fieldset className="rounded-md border p-4">
                        <legend className="p-1 text-lg font-semibold text-zinc-900">
                          Client information
                        </legend>
                        <div className="flex gap-4">
                          <div className="w-full">
                            <FormInputField
                              control={form.control}
                              name="clientName"
                              label="Client name"
                              placeholder="Name of the client"
                            />
                          </div>
                          <div className="w-full">
                            <FormInputField
                              control={form.control}
                              name="clientEmail"
                              label="Email"
                              placeholder="jhondoe@email.com"
                            />
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="mt-4 w-1/4 min-w-[300px] rounded-md border border-zinc-200 p-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Estado</h2>
                <div className="border-b pb-5">
                  <div className="mt-2">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={GalleryStatus.DRAFT}>
                              Draft
                            </SelectItem>
                            <SelectItem value={GalleryStatus.PUBLISHED}>
                              Published
                            </SelectItem>
                            <SelectItem value={GalleryStatus.ARCHIVED}>
                              Archived
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pb-5">
                <h3 className="mb-2 font-semibold">Make a private gallery</h3>
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                      <Switch
                        id="isPrivate"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="isPrivate">Private</Label>
                </div>
              </div>

              <div className="mt-5 border-b pb-5">
                <h3 className="font-semibold">Configuration</h3>
                <div className="mb-5">
                  <h2>Set minimum and maximum</h2>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="minSelections"
                        render={({ field }) => (
                          <>
                            <Input
                              id="minSelections"
                              type="number"
                              {...field}
                            />
                            <Label htmlFor="minSelections">
                              Min selections
                            </Label>
                          </>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="maxSelections"
                        render={({ field }) => (
                          <>
                            <Input
                              id="maxSelections"
                              type="number"
                              {...field}
                            />
                            <Label htmlFor="maxSelections">
                              Max selections
                            </Label>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <h2>Expiration date</h2>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="expiresAt"
                        render={({ field }) => (
                          <Select
                          onValueChange={(value) => {
                            const expirationDate = calculateExpirationDate(
                              value as keyof typeof EXPIRATION_TIME
                            );
                            field.onChange(expirationDate);
                            }}
                            defaultValue="TWO_WEEKS"
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select expiration time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="WEEK">Una semana</SelectItem>
                              <SelectItem value="TWO_WEEKS">
                                Dos semanas
                              </SelectItem>
                              <SelectItem value="THREE_WEEKS">
                                Tres semanas
                              </SelectItem>
                              <SelectItem value="FOUR_WEEKS">
                                Cuatro semanas
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <span className="mt-2 block text-sm text-zinc-500">
                        {form.watch("expiresAt") ? (
                          <>
                            Expira el{" "}
                            {new Date(
                              form.watch("expiresAt") || new Date(),
                            ).toLocaleDateString("es-ES")}
                          </>
                        ) : (
                          "Selecciona una fecha de expiración"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </form>
        </Form>
      </section>
    </div>
  );
}
