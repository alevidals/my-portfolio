CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`deployment_url` text,
	`repository_url` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
