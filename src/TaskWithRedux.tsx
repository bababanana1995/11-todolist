import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";


export type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
}
export const TaskWithRedux = memo((props: TaskWithReduxPropsType) => {
    const {
        task,
        todolistId
    } = props
    // const t = useSelector<AppRootStateType,TaskType>(state => state.tasks[todolistId].filter(t=>t.id===task.id)[0])
    // const t = useSelector<AppRootStateType,TaskType>(state => state.tasks[todolistId].find(t=>t.id===task.id)as TaskType)
    const dispatch = useDispatch()
    const removeTask = ()=> {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const ChangeTaskStatus = (e:ChangeEvent<HTMLInputElement>)=>{
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id,newIsDoneValue,todolistId))
    }
    const ChangeTaskTitle = (title:string)=>{
        dispatch(changeTaskTitleAC(task.id,title,todolistId))
    }
    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={ChangeTaskStatus}
            />

            <EditableSpan value={task.title} onChange={ChangeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})
