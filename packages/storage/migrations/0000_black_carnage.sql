CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(511) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"password" text,
	"name" varchar(255),
	"surname" varchar(255),
	"birthday" date,
	"avatar" text,
	"gender" varchar(2),
	"bio" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	"contacts" jsonb,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
