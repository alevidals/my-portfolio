DROP INDEX "user_profiles_slug_unique";--> statement-breakpoint
ALTER TABLE `user_profiles` ALTER COLUMN "full_name" TO "full_name" text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_profiles_slug_unique` ON `user_profiles` (`slug`);