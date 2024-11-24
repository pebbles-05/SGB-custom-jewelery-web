"use server";

import { cookies } from "next/headers";

const setCookies = async (data) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "cartid",
    value: "lee",
    httpOnly: false,
    path: "/store",
  });
};
const getCookies = async () => {
  const cookieStore = await cookies();
  const id = cookieStore.get("cartid");
  console.log("running");
};
export { setCookies, getCookies };
