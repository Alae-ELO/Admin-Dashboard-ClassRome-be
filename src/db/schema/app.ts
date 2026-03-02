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

export type Departments = typeof departments.$inferSelect;
export type Newdepartments = typeof departments.$inferInsert;

export type Subjects = typeof subjects.$inferSelect;
export type Newsubjects= typeof subjects.$inferInsert;
