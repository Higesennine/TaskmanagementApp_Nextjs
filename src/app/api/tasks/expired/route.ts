import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    const currentDate = new Date().toLocaleDateString('ja-JP', {year: 'numeric', month:'2-digit', day:'2-digit'}).replace(/\//g, '-')
    try {
        await connectDb();
        const expiredTasks: TaskDocument[] = await TaskModel.find({
            isCompleted: false,
            dueDate: { $lt: currentDate}
        });

        return NextResponse.json({message: 'success getting task data', expiredTasks});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'fail to get tasks data'}, {status: 500})
    }
};

export const dynamic = 'force-dynamic' //キャッシュを利用せず常に最新データを取得する