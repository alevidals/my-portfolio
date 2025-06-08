CREATE TABLE `educations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`institution` text NOT NULL,
	`degree` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text
);
