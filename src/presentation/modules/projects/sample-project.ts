import { JSONContent } from "@tiptap/react";

export const SampleProject: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: { id: "", startTime: null, duration: null, class: null },
      content: [
        {
          type: "text",
          text: "Write down the basic description of the project. This is the primary readme of your project which provide necessary details for anyone to explore and understand more about this project.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Purpose" }],
    },
    {
      type: "paragraph",
      attrs: { id: null, startTime: null, duration: null, class: null },
      content: [
        {
          type: "text",
          text: "Information about what you will be conducting research on, such as basics about the product, method, and rationale",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Method" }],
    },
    {
      type: "paragraph",
      attrs: { id: null, startTime: null, duration: null, class: null },
      content: [
        {
          type: "text",
          text: "Information regarding the method of conducting this project",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Hypothesis" }],
    },
    {
      type: "paragraph",
      attrs: { id: "", startTime: null, duration: null, class: null },
      content: [
        {
          type: "text",
          text: "Write down the hypothesis statement that you are trying test",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Team" }],
    },
    {
      type: "paragraph",
      attrs: { id: null, startTime: null, duration: null, class: null },
      content: [
        {
          type: "text",
          text: "Provide details of the team members involved in this project",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { id: null, startTime: null, duration: null, class: null },
    },
  ],
};
