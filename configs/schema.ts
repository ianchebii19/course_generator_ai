import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList=pgTable('CourseList', {
    id:serial('id').primaryKey(),
    courseId : varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('username').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('yes'),
    courseOutput:json('courseOutput').notNull(),
    userProfileImage:varchar('UserProfileImage').notNull()

})

export const Chapters=pgTable('Chapters', {
    id:serial('id').primaryKey(),
    chapterId : integer('courseId').notNull(),
    content:json('content').notNull(),
    videoId:varchar('videoId').notNull(),
})