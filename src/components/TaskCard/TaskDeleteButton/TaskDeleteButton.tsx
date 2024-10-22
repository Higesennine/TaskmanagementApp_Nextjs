'use client'

import { deleteTask, FormState } from "@/actions/task";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaTrashAlt } from "react-icons/fa"

type TaskDeleteButtonProps = {
  id: string,
}

const TaskDeleteButton: React.FC<TaskDeleteButtonProps> = ({ id }) => {
  const deleteTaskWithId = deleteTask.bind(null, id);
  const initialState: FormState = { error: '' };
  const [state, formAction] = useFormState(deleteTaskWithId, initialState);

  useEffect(() => {
    if (state && state.error !== '') {
      alert(state.error);
    }
  }, [state])

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        type="submit"
        disabled={pending}
        className="hover: text-gray-700 text-lg cursor-pointer disabled:bg-gray-400">
        <FaTrashAlt />
      </button>
    )
  }

  //ルートハンドラーで実装する場合
  // const handleDelete = async(paramId: string) => {
  //   console.log("paramId:" ,paramId);
    
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${paramId}`, {
  //     method: 'DELETE',
  //     cache: 'no-store'
  //   })  

  //   if(!res.ok) {
  //     throw new Error("fail to delete task data")
  //   }

  //   window.location.reload();
  // }

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  )
}

export default TaskDeleteButton