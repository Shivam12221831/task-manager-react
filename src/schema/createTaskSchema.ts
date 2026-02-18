import * as Yup from 'yup';

export const createTaskSchema = Yup.object({
    title: Yup.string()
                .trim()
                .min(3, "Titlte must be at least 3 characters")
                .max(50, "Title must be at max 50 characters")
                .required("Title is required"),
    description: Yup.string()
                .trim()
                .min(5, "Description must have at least 5 characters")
                .max(150, "Description can have at max 100 characters"),
    priority: Yup.string()
                .oneOf(["low", "medium", "high", "urgent"], "Priority must be low, medium, high, or urgent")
                .required("Priority is required"),
    dueDate: Yup.string()
                .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in MM-DD-YYYY format")
                .optional()
                .test("check-date", "Date must be today or in the future", (val) => {
                    if(!val) return true;
                    const today = new Date();
                    today.setHours(0);
                    const chosenDate = new Date(val);
                    return chosenDate >= today;
                }),
    category: Yup.string()
                .oneOf(["personal", "work", "health", "study", "shopping", "other"])
                .required("Category is required")
})