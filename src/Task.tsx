import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean) => void
    removeTask: (taskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    task: TaskType
}
export const Task = memo((props: TaskPropsType) => {
    const {
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        task
    } = props
    const onClickHandler = () => props.removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(task.id, newValue);
    }

    return (<div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
