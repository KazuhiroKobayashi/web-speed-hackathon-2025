DROP INDEX `episode_order_index`;--> statement-breakpoint
CREATE INDEX `episode_seriesId_order_index` ON `episode` (`seriesId`,`order`);--> statement-breakpoint
DROP INDEX `recommendedItem_order_index`;--> statement-breakpoint
CREATE INDEX `recommendedItem_moduleId_order_index` ON `recommendedItem` (`moduleId`,`order`);--> statement-breakpoint
DROP INDEX `recommendedModule_order_index`;--> statement-breakpoint
DROP INDEX `recommendedModule_referenceId_index`;--> statement-breakpoint
CREATE INDEX `recommendedModule_referenceId_order_index` ON `recommendedModule` (`referenceId`,`order`);--> statement-breakpoint
CREATE INDEX `user_email_index` ON `user` (`email`);