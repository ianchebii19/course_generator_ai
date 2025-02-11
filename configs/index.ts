import { neon } from '@neondatabase/serverless';
import { drizzle} from 'drizzle-orm/neon-http';

// Ensure the environment variable is properly typed and exists
const connectionString = process.env.NEXT_PUBLIC_DB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Database connection string is not defined in environment variables.');
}

// Create a Neon SQL instance
const sql = neon(connectionString);

// Create a Drizzle database instance


export const db = drizzle(sql);
