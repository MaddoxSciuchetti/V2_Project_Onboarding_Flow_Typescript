import {useState, useEffect} from "react";
import ToDoItem_2 from "./ToDoItem_2"
import {API_URL} from "../api.js";
import "./on_form.css"

function Offboarding_main() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const dataFetch = async () => {
            setIsLoading(true);
            const data = await(
                await fetch(`${API_URL}/offboarding/fetchoffboardingname`)
            ).json()
            console.log("test", data)
            const formattedData = data.map((input, i) => {
                return {
                    description: i,
                    input: {
                        id: input.id,
                        name: input["name"]
                    }
                }
            })
            setTasks(formattedData)
            setIsLoading(false);
        };
        dataFetch();
    }, [])

    async function handleSubmit() {
        if(newTask) {
            setTasks([...tasks, {
                input: {
                    "name": newTask
                }
            }])
            setNewTask("")
            await fetch(`${API_URL}/offboarding/postonboardingdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"name": newTask})
            })
            .then((response) => console.log(response))

        }
    }

    async function remove_task_1(taskToRemove) {
        await fetch(`${API_URL}/offboarding/onboardingname/delete/${taskToRemove}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
            signal: AbortSignal.timeout(5000)
        })
    }

    async function removeTask(taskToRemove) {
        try{
            await remove_task_1(taskToRemove)
            const filteredTasks = tasks.filter((task) => task.input["name"] !== taskToRemove)
            setTasks(filteredTasks);
        }catch(e){
            console.log(e)
        }
    }

    function handlepage(task) {
        window.location.href = `/offboarding/user/${task}`
    }

    return (
        <>

          <div>
            {isLoading? <div className="loading-container">
                <p className="loading-state">Lädt...</p>
                </div> :null
            }
          </div>
            <div className="list">
                <div className="sublist-2">
                    <div className="list">

                        <input
                        className="table-1 input-box"
                        id="1"
                        type="text"
                        value={newTask}
                        onChange={((e) => setNewTask(e.target.value))}
                        placeholder="Name" />

                        <button className="table-1 btn" onClick={handleSubmit}>Hinzufügen</button>
                    </div>

                    {tasks?.map((task, key) => (<ToDoItem_2 key={key} item={task.input.name} onRemove={removeTask} gotopage={handlepage} />))}

                </div>
            </div>
        </>
    )

    
}

export default Offboarding_main;