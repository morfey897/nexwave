ALTER TABLE "branches" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "branches" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "role_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_slug_unique" UNIQUE("slug");