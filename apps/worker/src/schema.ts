import {
  text,
  sqliteTable,
  integer,
  AnySQLiteColumn,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  passwordResetToken: text("passwordResetToken").unique(),
  lastPasswordReset: integer("lastPasswordReset", { mode: "timestamp" }),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  homes: many(homes),
}));

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const homes = sqliteTable("homes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const homesRelations = relations(homes, ({ one, many }) => ({
  rooms: many(rooms),
  members: many(members),
  devices: many(devices),
}));

export const members = sqliteTable(
  "members",
  {
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    homeId: text("home_id").references(() => homes.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["admin", "member", "owner"] }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.homeId, table.userId] }),
  })
);

export const membersRelations = relations(members, ({ one }) => ({
  user: one(users, { fields: [members.userId], references: [users.id] }),
  home: one(homes, { fields: [members.homeId], references: [homes.id] }),
}));

export const rooms = sqliteTable("rooms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  homeId: text("home_id").references(() => homes.id, { onDelete: "cascade" }),
});

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  home: one(homes, { fields: [rooms.homeId], references: [homes.id] }),
  devices: many(devices),
}));

export const devices = sqliteTable("devices", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  roomId: text("room_id").references(() => rooms.id, { onDelete: "set null" }),
  type: text("type").notNull(),
  homeId: text("home_id")
    .references(() => homes.id, { onDelete: "cascade" })
    .notNull(),
  parentDeviceId: text("parent_device_id").references(
    (): AnySQLiteColumn => devices.id,
    {
      onDelete: "cascade",
    }
  ),
  state: text("state", { mode: "json" }).notNull(),
  lastUpdated: integer("last_updated", { mode: "timestamp" }).notNull(),
  token: text("token").notNull(),
});

export const devicesRelations = relations(devices, ({ one, many }) => ({
  room: one(rooms, { fields: [devices.roomId], references: [rooms.id] }),
  subDevices: many(devices),
  parentDevice: one(devices, {
    fields: [devices.parentDeviceId],
    references: [devices.id],
  }),
  home: one(homes, { fields: [devices.homeId], references: [homes.id] }),
}));
