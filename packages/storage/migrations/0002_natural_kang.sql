ALTER TABLE "invitations" RENAME COLUMN "role_id" TO "role";--> statement-breakpoint
ALTER TABLE "projects_to_users" RENAME COLUMN "role_id" TO "role";--> statement-breakpoint
ALTER TABLE "invitations" ALTER COLUMN "role" SET DATA TYPE varchar(63);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "roles" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "projects_to_users" ALTER COLUMN "role" SET DATA TYPE varchar(63);