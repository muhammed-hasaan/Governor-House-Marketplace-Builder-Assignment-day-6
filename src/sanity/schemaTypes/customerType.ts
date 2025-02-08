import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const customerType = defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "clerkId",
      title: "Clerk ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "isAdmin", type: "boolean", title: "Admin" }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "clerkId",
    },
    prepare: ({ title, subtitle }) => ({
      title: `${title} ${subtitle}`,
    }),
  },
});
