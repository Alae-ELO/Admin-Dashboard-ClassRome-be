import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

const timestamps = {
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().$onUpdate(()=> new Date()),
}


export const departments = pgTable("departments", {
  id: serial('id').primaryKey(),
  code: varchar('code', {length: 50}).notNull().unique(),
  name: varchar('name', {length: 255}). notNull(),
  description: varchar('description', {length: 255}),
   ...timestamps,
});

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  departmentId: serial('department_id').notNull().references(() => departments.id, { onDelete: 'restrict' }),
  name: varchar('name', {length: 255}).notNull(),
  code: varchar('code', {length: 50}).notNull().unique(),
  description: varchar('description', {length: 255}),
  ... timestamps
});
export const Departmentsrelation= relations(departments, ({ many } ) => ({subjects :many(subjects)}))
export const Subjectrelation= relations(subjects, ({ one ,many } ) => ({departments :one(
    departments , { fields:[subjects.departmentId ], references : [departments.id]}
  )}))

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;

export type Subject = typeof subjects.$inferSelect;
export type NewSubject = typeof subjects.$inferInsert;
