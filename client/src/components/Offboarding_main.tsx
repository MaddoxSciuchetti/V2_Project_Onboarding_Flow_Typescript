import { useState, useEffect } from "react";
import { ToDoItem_2 } from "./ToDoItem_2";
import { API_URL } from "../api";
import "./on_form.css"
import {Task, Config, Input1, Incoming_API}  from "./Task"

function Offboarding_main() {

    const [tasks, setTasks] = useState<(Task)[]>([])
    const [newTask, setNewTask] = useState<string>("")
    // const [state, setState] = useState([""]);
    // const [error , setError] = useState([""]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const dataFetch = async () => {
            setIsLoading(true);
            const data: Config = await (
                await fetch(`${API_URL}/offboarding/fetchData`)
            ).json()
            console.log("test", data)
            const formattedData = data.map((input: Incoming_API): Input1 => {
                return {
                    input: {
                        id: input.id,
                        name: input["name"]
                    }
                }
            })
            console.log("formatteddata", formattedData)
            setTasks(formattedData)
            setIsLoading(false);
            
        };
        dataFetch();
    }, [])

    function handleSubmit() {
        if(newTask) {
            function information() {

                return fetch(`${API_URL}/offboarding/postoffboardingdata`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"name": newTask})
                }).then(function(response: Response): any {
                    return response.json()
                });
            }

            information().then(function(response: any) {
                setTasks([...tasks, {
                input: {
                        "name": newTask,
                        "id": response.employee_form_id
                    }
                }])
            })

            setNewTask("")
        }
    }


    // async function handleSubmit() {
    //     if(newTask){
    //         setTasks([...tasks, {
    //             input: {
    //                 "name": newTask
    //             }
    //     }])
    //     setNewTask("")
    //     await fetch(`${API_URL}/offboarding/postonboardingdata`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify({"name": newTask})
    //     })
    //     .then((response) => console.log(response))

    //     }
    // }

    async function remove_task_1(taskId: number): any {
        await fetch(`${API_URL}/offboarding/delete/${taskId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            signal: AbortSignal.timeout(5000)
        })
    }

    async function removeTask(taskId: number) {
        // setError("Something")


        try{
            await remove_task_1(taskId)
            const filteredTasks = tasks.filter((task: Task) => task.input.id !== taskId)
            setTasks(filteredTasks);
        } catch(e) {
            console.error(e)
            // setError("something went wrong")
        }
        // setTasks(tasks.filter((task) => task != taskToRemove));
        // remove_task_1(taskToRemove)
        // window.location.reload();
    }

    // const [modalOpen, setModalOpen] = useState(false);

    // const handleEditRow = () => {
    //     setModalOpen(true)
    // }

    function handlepage(taskId: number) {
        window.location.href = `/offboarding/user/${taskId}`
    }

    return(
        <><div>
            {isLoading ? <div className="loading-container">

                <p className="loading-state">Lädt...</p>
                </div> : null
            }
        </div>
            <div className="main-list">
                <div className="list">
              
                    <div className="sublist-2">
                        
                        <input className="table-1 input-box"
                        id="1"
                        type="text"
                        value={newTask}
                        onChange={((e) => setNewTask(e.target.value))}
                        placeholder="Name"/>

                        <button className="table-1 btn" onClick={handleSubmit}>Hinzufügen</button>
                    </div>

                    {tasks?.map((task: Task) => (<ToDoItem_2 key={task.input.id} item_value={task.input.id}item={task.input.name} onRemove={removeTask} gotopage={handlepage} />))}
                    {/* {state && state.map((value, key ) => (<ToDoItem_2 key={key} item={value.name} onRemove={removeTask} editRow={handleEditRow} gotopage={handlepage}/>))} */}
                    {/* {error && <p>{error}</p>} */}
                </div>
            </div>
        </>
        
    )
}

export default Offboarding_main; 