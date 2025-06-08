CREATE TABLE `portfolio_urls` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portfolio_urls_user_id_unique` ON `portfolio_urls` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `portfolio_urls_slug_unique` ON `portfolio_urls` (`slug`);--> statement-breakpoint
DROP INDEX `user_profiles_slug_unique`;--> statement-breakpoint
ALTER TABLE `user_profiles` DROP COLUMN `slug`;