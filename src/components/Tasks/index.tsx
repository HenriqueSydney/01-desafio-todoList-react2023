import { CheckCircle, Circle, Trash } from 'phosphor-react'

import styles from './styles.module.css'
import { useState } from 'react'

interface ITaskContainerProps {
  id: string
  taskText: string
  onClickTask: (clickedTaskId: string) => void
  onDeleteTask: (taskToDeleteId: string) => void
  isDone?: boolean
}

export function Tasks({
  id,
  taskText,
  onClickTask,
  onDeleteTask,
  isDone = true,
}: ITaskContainerProps) {
  const [taskHover, setTaskHover] = useState(false)

  function handleOnMouseEnter() {
    setTaskHover(true)
  }

  function handleOnMouseLeave() {
    setTaskHover(false)
  }

  function handleOnClickTask() {
    onClickTask(id)
  }

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.taskContent}
        onClick={handleOnClickTask}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <div
          className={
            isDone ? styles.concludedTaskCheckbox : styles.taskCheckbox
          }
        >
          {isDone ? (
            <CheckCircle weight="fill" />
          ) : (
            <Circle weight={taskHover ? 'duotone' : 'light'} />
          )}
        </div>
        <div className={isDone ? styles.concludedTask : styles.task}>
          <span>{taskText}</span>
        </div>
      </div>
      <div>
        <button onClick={handleDeleteTask}>
          <Trash size={14} />
        </button>
      </div>
    </div>
  )
}
