import { collection, doc, writeBatch, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const seed500TasksToFirebase = async () => {
  try {
    const batch = writeBatch(db);
    const tasksRef = collection(db, "tasks");

    const statuses = ["pending", "completed", "in-progress"];
    const priorities = ["low", "medium", "high"];
    const categories = ["personal", "work", "health", "study", "shopping", "other"];

    for (let i = 0; i < 500; i++) {
      const randomFutureDate = new Date();
      randomFutureDate.setDate(
        randomFutureDate.getDate() + Math.floor(Math.random() * 30)
      );

      const newTask = {
        title: `Task ${i + 1}`,
        description: `Auto-generated task number ${i + 1} for testing purposes.`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        dueDate: randomFutureDate.toISOString().split("T")[0],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const newDocRef = doc(tasksRef);
      batch.set(newDocRef, newTask);
    }

    await batch.commit();

    console.log("✅ 500 tasks seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding 500 tasks:", error);
    throw error;
  }
};