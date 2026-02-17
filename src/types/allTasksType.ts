import type { Timestamp } from "firebase/firestore"

export type AllTasksType = {
    id: string,
    title: string,
    description: string,
    priority: string,
    dueDate: string,
    category: string,
    status: string,
    createdAt: Timestamp;
    updatedAt: Timestamp | null;
}