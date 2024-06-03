ALTER TABLE "events" ALTER COLUMN "service_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "service_id" DROP NOT NULL;