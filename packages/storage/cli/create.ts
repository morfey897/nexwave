import { program } from 'commander';
import { writeFile } from 'fs/promises';
import path from 'path';

program
	.description('CLI for create a new migration file')
	.option('-name, --name <TABLE>', 'name of table');
program.parse();

const opts = program.opts();

void (async function create() {

  const tableName = opts.name;

	const fileName = new Date()
		.toISOString()
		.replace(/\.\d*Z/, '')
		.replace(/:/g, '_');
	const absolutePath = path.resolve(
		__dirname,
		`../migrations/${fileName}__${tableName}.ts`,
	);

	const data = await writeFile(
		absolutePath,
		`
  import { Kysely, sql } from 'kysely';

  export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
      .createTable('${tableName}')
      // .addColumn('<field>', '<type>', <rule>)
      .execute();
  };
  
  export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('${tableName}').execute();
  };
`,
	);

	console.log('File created at', absolutePath);
})();
