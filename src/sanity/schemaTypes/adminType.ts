import { defineField, defineType } from "sanity";

export const adminType = defineType({
  name: "admin",
  title: "Admin",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: any) => Rule.required().email(),
    }),
    defineField({
      name: "password",
      title: "Password",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
