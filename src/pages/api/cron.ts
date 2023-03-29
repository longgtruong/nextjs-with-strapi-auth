import { ping } from "../../service/strapi";

export default async function handler(req: any, res: any) {
  await ping();
  res.status(200).send("ping");
}
