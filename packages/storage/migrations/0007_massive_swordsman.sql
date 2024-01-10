ALTER TABLE "branches" ALTER COLUMN "status" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "branches" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "branches" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "color" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "color" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "color" DROP NOT NULL;