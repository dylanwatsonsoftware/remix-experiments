import type { User, Note } from "@prisma/client";

export type { Note } from "@prisma/client";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return { id, userId };
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return { userId };
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"];
}) {
  return {
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  };
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return { id, userId };
}
