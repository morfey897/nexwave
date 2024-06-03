ALTER TABLE "events" RENAME TO "slots";--> statement-breakpoint
ALTER TABLE "slots" DROP CONSTRAINT "events_branch_id_branches_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "slots" ADD CONSTRAINT "slots_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
