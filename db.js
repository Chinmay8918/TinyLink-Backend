import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_gw4tv1scrMWu@ep-patient-dew-ahh1l5bs-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});
