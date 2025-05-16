CREATE TABLE `work_experiences` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`company_name` text NOT NULL,
	`position` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`description` text
);
