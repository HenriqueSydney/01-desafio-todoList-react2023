import { Header } from './components/Header'
import './global.css'
import styles from './app.module.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { EmptyList } from './components/EmptyList'
import { Tasks } from './components/Tasks'
import { Toaster, toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

type TaskListType = {
  id: string
  text: string
  isDone: boolean
}

function App() {
  const [newTask, setNewTask] = useState('')
  const [taskList, setTaskList] = useState<TaskListType[]>([])
  const [concludedTasksCount, setConcludedTasksCount] = useState(0)

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTaskList((prevState) => [
      ...prevState,
      { id: uuidv4(), text: newTask, isDone: false },
    ])

    setNewTask('')
    toast.success('Tarefa adicionada com sucesso')
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleOnClickTask(clickedTaskId: string) {
    const clickedTaskIndex = taskList.findIndex(
      (task) => task.id === clickedTaskId,
    )

    const tasks = [...taskList]

    tasks[clickedTaskIndex].isDone = !tasks[clickedTaskIndex].isDone

    setTaskList(tasks)
    calculateMetrics(tasks)
  }

  function handleOnDeleteTask(taskToDeleteId: string) {
    const newTaskListWithoutDeletedTask = taskList.filter(
      (task) => task.id !== taskToDeleteId,
    )

    const newTaskList = [...newTaskListWithoutDeletedTask]

    setTaskList(newTaskList)
    calculateMetrics(newTaskList)
  }

  function calculateMetrics(newTaskList: TaskListType[]) {
    const totalOfConcludedTasks = newTaskList.reduce(
      (total, task) => (task.isDone ? total + 1 : total),
      0,
    )

    setConcludedTasksCount(totalOfConcludedTasks)
  }

  useEffect(() => {
    calculateMetrics(taskList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Header />
      <div className={styles.container}>
        <div>
          <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
            <input
              name="newToDo"
              type="text"
              placeholder="Adicione uma nova tarefa"
              className={styles.container}
              value={newTask}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
              required
            />

            <button type="submit">
              <span>Criar</span>
              <PlusCircle size={16} />
            </button>
          </form>

          <div className={styles.content}>
            <div className={styles.metrics}>
              <div>
                <strong className={styles.createdTasks}>Tarefas criadas</strong>
                <div className={styles.tasksCount}>
                  <span>{taskList.length}</span>
                </div>
              </div>

              <div>
                <strong className={styles.concludedTasks}>Concluídas</strong>
                <div className={styles.tasksCount}>
                  <span>
                    {concludedTasksCount} de {taskList.length}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.taskList}>
              {taskList.length === 0 ? (
                <EmptyList />
              ) : (
                taskList.map(({ id, text, isDone }) => (
                  <Tasks
                    key={id}
                    id={id}
                    taskText={text}
                    isDone={isDone}
                    onClickTask={handleOnClickTask}
                    onDeleteTask={handleOnDeleteTask}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
