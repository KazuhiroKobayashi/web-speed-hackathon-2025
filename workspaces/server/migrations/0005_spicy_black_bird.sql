CREATE INDEX `episode_order_index` ON `episode` (`order`);--> statement-breakpoint
CREATE INDEX `program_startAt_index` ON `program` (`startAt`);--> statement-breakpoint
CREATE INDEX `recommendedItem_order_index` ON `recommendedItem` (`order`);--> statement-breakpoint
CREATE INDEX `recommendedModule_order_index` ON `recommendedModule` (`order`);--> statement-breakpoint
CREATE INDEX `recommendedModule_referenceId_index` ON `recommendedModule` (`referenceId`);