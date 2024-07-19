import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/schema.ts',
	driver: 'd1',
	dbCredentials: {
		dbName: 'MAIN',
		wranglerConfigPath: './wrangler.toml',
	},
	verbose: true,
	strict: true,
	out: './drizzle',
});
