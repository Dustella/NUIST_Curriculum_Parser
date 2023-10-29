import { parser, merger } from "./parser";
import * as cheerio from "cheerio";

async function test() {
  const fs = await import("fs");

  // use sync fs to read text from file content.txt
  const text = fs.readFileSync("./content.txt", "utf8");
  const $ = cheerio.load(text);
  const result = parser($);
  // write result to res.json
  fs.writeFileSync("./res.json", JSON.stringify(result));
  // merge the result
  const merged = merger(result);
  // write merged result to merged.json
  fs.writeFileSync("./merged.json", JSON.stringify(merged));
}

test();
