import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { NextApiRequest, NextApiResponse } from "next";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let output;
  const { method } = req;
  if (method === "GET") {
    output = await handleGet(req);
  } else if (method === "POST") {
    output = await handlePost(req);
  }
  res.status(200).json(output);
}

async function handleGet(req: NextApiRequest) {
  await db.read();
  // @ts-ignore
  return db.data[req.query.key];
}

async function handlePost(req: NextApiRequest) {
  const start = new Date();
  await db.read();
  db.data ||= {};
  console.log(db.data);
  let key = req.query.key;
  if (!key) {
    throw new Error("no key?");
  }
  // @ts-ignore
  db.data[key] = req.body;
  const result = await db.write();
  return {
    status: "ok",
    write: result,
    runtime: (new Date().getTime() - start.getTime()) / 1000,
  };
}
