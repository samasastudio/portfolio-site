CREATE TABLE `connector_configs` (
	`id` text PRIMARY KEY NOT NULL,
	`source_family` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`manifest` text NOT NULL,
	`invariants` text NOT NULL,
	`last_run_at` text,
	`last_status` text DEFAULT 'idle' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `development_actions` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`action_type` text NOT NULL,
	`action_identifier` text,
	`jurisdiction` text NOT NULL,
	`status` text NOT NULL,
	`filed_date` text,
	`decision_date` text,
	`details` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `environmental_actions` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`agency` text DEFAULT 'TCEQ' NOT NULL,
	`action_type` text NOT NULL,
	`permit_number` text,
	`status` text NOT NULL,
	`effective_date` text,
	`expiration_date` text,
	`emissions_summary` text,
	`water_usage_summary` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `facilities` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`name` text NOT NULL,
	`facility_type` text NOT NULL,
	`status` text NOT NULL,
	`gross_square_feet` real,
	`power_capacity_mw` real,
	`address` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `infrastructure_relationships` (
	`id` text PRIMARY KEY NOT NULL,
	`source_entity_id` text NOT NULL,
	`source_entity_type` text NOT NULL,
	`target_entity_id` text NOT NULL,
	`target_entity_type` text NOT NULL,
	`relationship_type` text NOT NULL,
	`capacity` text,
	`status` text NOT NULL,
	`metadata` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` text PRIMARY KEY NOT NULL,
	`address` text,
	`city` text NOT NULL,
	`county` text NOT NULL,
	`state` text DEFAULT 'TX' NOT NULL,
	`postal_code` text,
	`latitude` real,
	`longitude` real,
	`parcel_id` text,
	`jurisdiction` text,
	`watershed` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `observations` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_type` text NOT NULL,
	`subject_id` text NOT NULL,
	`property` text NOT NULL,
	`value_json` text NOT NULL,
	`observed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`effective_at` text,
	`source_artifact_id` text NOT NULL,
	`connector_version` text NOT NULL,
	`confidence` real DEFAULT 1 NOT NULL,
	`resolution_method` text DEFAULT 'deterministic' NOT NULL,
	FOREIGN KEY (`source_artifact_id`) REFERENCES `source_artifacts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`organization_type` text NOT NULL,
	`headquarters` text,
	`website` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_slug_unique` ON `organizations` (`slug`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`operator` text,
	`stage` text DEFAULT 'proposed' NOT NULL,
	`acreage` real,
	`estimated_cost_usd` real,
	`power_demand_mw` real,
	`location_id` text,
	`organization_id` text,
	`description` text,
	`last_projected_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `repair_audits` (
	`id` text PRIMARY KEY NOT NULL,
	`connector_id` text NOT NULL,
	`failure_reason` text NOT NULL,
	`proposed_patch` text NOT NULL,
	`replay_results` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`connector_id`) REFERENCES `connector_configs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `source_artifacts` (
	`id` text PRIMARY KEY NOT NULL,
	`sha256_hash` text NOT NULL,
	`source_family` text NOT NULL,
	`source_url` text NOT NULL,
	`content_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`storage_path` text NOT NULL,
	`connector_version` text NOT NULL,
	`captured_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `source_artifacts_sha256_hash_unique` ON `source_artifacts` (`sha256_hash`);