DO $$ BEGIN
 CREATE TYPE "color" AS ENUM('red', 'green', 'blue', 'yellow', 'indigo', 'orange', 'skyblue', 'purple', 'pink', 'gray');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "branches" DROP CONSTRAINT "branches_slug_unique";--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_slug_unique";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "color" "color" DEFAULT 'gray' NOT NULL;--> statement-breakpoint
ALTER TABLE "branches" DROP COLUMN IF EXISTS "slug";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "slug";