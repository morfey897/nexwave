ALTER TABLE "events" ADD COLUMN "from_time" time NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "to_time" time NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "space_short_id" varchar(32);--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "start_at";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "duration";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "space_id";