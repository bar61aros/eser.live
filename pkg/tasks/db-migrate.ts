// Copyright 2024-present the Deno authors. All rights reserved. MIT license.
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, postgresClient } from "@/pkg/main/data/db.ts";
import config from "../../drizzle.config.ts";

/**
 * This script is used to perform migration jobs on the database. These jobs
 * can be performed on remote KV instances using
 * {@link https://github.com/denoland/deno/tree/main/ext/kv#kv-connect|KV Connect}.
 *
 * This script will continually change over time for database migrations, as
 * required.
 *
 * @example
 * ```bash
 * deno task db:migrate
 * ```
 */
const main = async () => {
  await migrate(db, { migrationsFolder: config.out ?? "./drizzle" });
  await postgresClient.end();
};

main();
