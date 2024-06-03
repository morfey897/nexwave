ALTER TABLE "events" ADD COLUMN "start_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "duration" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "from_time";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "to_time";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "date";