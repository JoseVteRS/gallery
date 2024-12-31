import slugifyLib from "@sindresorhus/slugify";

export const slugify = (text: string) => {
  if (typeof text !== "string") throw new Error("text must be a string");

  return slugifyLib(text, { lowercase: true, decamelize: false });
};
