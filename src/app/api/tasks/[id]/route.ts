import { TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, {params}: {params: {id: string}}) => { //_:NextRequestは必須
    try {
        await connectDb();
        const task = await TaskModel.findById(params.id);

        if(!task) {
            return NextResponse.json(
                {message: 'Task does not exist'},
                {status: 404}
            );
        }

        return NextResponse.json({message: 'success to get task data', task})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'fail to get task data'}, {status: 500});        
    }
};

export const DELETE = async (_:NextRequest, {params}: {params:{id: string}}) => {
    try {
        await connectDb();
        console.log('params:', new mongoose.Types.ObjectId(params.id));
        
        const deletedTask = await TaskModel.deleteOne(new mongoose.Types.ObjectId(params.id));

        if(!deletedTask) {
            return NextResponse.json({message: 'Task does not exist'}, {status: 404})
        }

        return NextResponse.json({message: "deleted Task"}) //deleteの時はデータをリターンする必要がないがクライアントサイドでdelete完了後にデータを受け取る代わりにページをリロードする必要がある

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "fail to delete task data", })
    }
}

export const dynamic = 'force-dynamic';