'use server';

import { Task, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { redirect } from "next/navigation";

export interface FormState { //server actions内でエラーが発生した際のエラーの型定義
    error: string;
}

export const createTask = async (state: FormState, formData: FormData) => {
    const newTask: Task = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        dueDate: formData.get('dueDate') as string,
        isCompleted: false,
    }

        try {
            await connectDb() //念のために毎度DBに接続している
            await TaskModel.create(newTask)
        } catch (error) {
            state.error = 'fail to create new task'
            return state;
        }

        redirect('/')
}

export const updateTask = async (id: string, state: FormState, formData: FormData) => {
    const updateTask: Task = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        dueDate: formData.get('dueDate') as string,
        isCompleted: Boolean(formData.get('isCompleted')),
    }

        try {
            await connectDb() //念のために毎度DBに接続している 
            await TaskModel.updateOne({_id: id}, updateTask) //_idはmongoDBのidなので_が必要
        } catch (error) {
            state.error = 'fail to update task'
            return state;
        }

        redirect('/')
}

export const deleteTask = async (id: string, state: FormState) => {
           try {
            await connectDb() //念のために毎度DBに接続している 
            await TaskModel.deleteOne({_id: id}) //_idはmongoDBのidなので_が必要
        } catch (error) {
            state.error = 'fail to delete task'
            return state;
        }

        redirect('/')
}
