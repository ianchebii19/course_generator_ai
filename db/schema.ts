import { pgTable, serial, text, varchar, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  subject: varchar('subject', { length: 255 }).notNull(),
  topicDescription: text('topic_description').notNull(),
  level: varchar('level', { length: 50 }).notNull(),
  duration: integer('duration').notNull(),
  includeVideo: boolean('include_video').default(false),
  numberOfChapters: integer('number_of_chapters').notNull(),
  imageUrl: varchar('image_url').notNull(),
  createdBy: varchar('created_by', { length: 255 }).notNull(),
  courseOutput: text('course_output').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Course = typeof courses.$inferInsert;