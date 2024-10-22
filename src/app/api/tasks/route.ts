import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database"
import { connect } from "http2"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDb();
        const allTasks: TaskDocument[] = await TaskModel.find();

        return NextResponse.json({message: 'success getting task data', allTasks});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'fail to get tasks data'}, {status: 500})
    }
};

export const dynamic = 'force-dynamic' //キャッシュを利用せず常に最新データを取得する