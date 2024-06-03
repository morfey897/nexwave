ALTER TABLE "users" ALTER COLUMN "contacts" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "branches" ADD COLUMN "info" text;--> statement-breakpoint
ALTER TABLE "branches" ADD COLUMN "state" varchar(32);--> statement-breakpoint
ALTER TABLE "branches" ADD COLUMN "address" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "branches" ADD COLUMN "contacts" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "branches" ADD COLUMN "spaces" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "info" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "state" varchar(32);--> statement-breakpoint
ALTER TABLE "branches" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "visited_at";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "status";