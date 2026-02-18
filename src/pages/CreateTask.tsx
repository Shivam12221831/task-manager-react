import { Formik, Field, ErrorMessage, Form } from "formik"
import type { FormikHelpers } from "formik";
import { addTaskToFirebase } from "../services/taskServices";
import { useNavigate } from "react-router-dom";
import { createTaskSchema } from "../schema/createTaskSchema";
import type { CreateTaskFormType } from "../types/createTaskFormType";
import { blankTask } from "../assets/constant/blankTask";
import { PageHeader } from "../components/ui/PageHeader";
import { toast } from "sonner";

export const CreateTask = () => {
    const navigate = useNavigate();
    
    const handleSubmit = async (values: CreateTaskFormType, {setSubmitting, resetForm}: FormikHelpers<CreateTaskFormType>) => {
        try{
            await addTaskToFirebase(values);
            toast.success("Task created successfully");
            resetForm();
            navigate('/tasks');
        } catch(err){
            console.log(err);
            toast.error("Task creation failed");
        } finally{
            setSubmitting(false);
        }
    }
    
    return (
        <div className="py-4 px-4">
            <div className="max-w-xl mx-auto">
                <PageHeader title="Create Task" subTitle="Turn your plans into actionable tasks by filling in the information below" />

                <div className="bg-white rounded-lg shadow p-6">
                    <Formik
                        initialValues={blankTask as CreateTaskFormType}
                        validationSchema={createTaskSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting, resetForm}) => (
                            <Form className="space-y-3 text-left">
                                <div>
                                    <label htmlFor="title" className="create-task-label required">Task Title</label>
                                    <Field type="text" name="title" id="title" placeholder="Enter task title" className="create-task-field"/>
                                    <ErrorMessage name="title" component="div" className="create-task-error"/>
                                </div>

                                <div>
                                    <label htmlFor="description" className="create-task-label">Description</label>
                                    <Field as="textarea" name="description" id="description" placeholder="Enter task description" rows="3" className="create-task-field resize-none"/>
                                    <ErrorMessage name="description" component="div" className="create-task-error"/>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="priority" className="create-task-label required">Priority</label>
                                        <Field as="select" name="priority" id="priority" className="cursor-pointer create-task-field bg-white">
                                            <option value="">Select priority</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </Field>
                                        <ErrorMessage name="priority" component="div" className="create-task-error"/>
                                    </div>

                                    <div>
                                        <label htmlFor="dueDate" className="create-task-label">Due Date</label>
                                        <Field type="date" name="dueDate" id="dueDate" placeholder="Select date" className="create-task-field bg-white"/>
                                        <ErrorMessage name="dueDate" component="div" className="create-task-error"/>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="category" className="create-task-label required">Category</label>
                                    <Field as="select" name="category" id="category" className="create-task-field bg-white">
                                        <option value="">Select category</option>
                                        <option value="work">Work</option>
                                        <option value="personal">Personal</option>
                                        <option value="study">Study</option>
                                        <option value="health">Health</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="category" component="div" className="create-task-error"/>
                                </div>
                                
                                <div className="pt-2 px-5 flex justify-end items-center gap-3">
                                    <button type="button" onClick={() => resetForm()} className=" bg-red-700 hover:bg-red-600 cursor-pointer text-sm text-white font-medium py-1.5 px-4 rounded-md transition">
                                        Clear
                                    </button>
                                    <button type="submit" disabled={isSubmitting} className="bg-blue-700 hover:bg-blue-600 cursor-pointer disabled:bg-blue-900 disabled:cursor-not-allowed text-white text-sm font-medium py-1.5 px-4 rounded-md transition">
                                        {isSubmitting ? 'Creating...' : 'Create'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}