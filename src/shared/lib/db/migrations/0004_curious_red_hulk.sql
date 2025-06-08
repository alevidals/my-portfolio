ALTER TABLE `user_profiles` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_profiles_slug_unique` ON `user_profiles` (`slug`);