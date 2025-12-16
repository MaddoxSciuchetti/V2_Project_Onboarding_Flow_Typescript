import {useState, useEffect} from "react";
import ToDoItem_2 from "./ToDoItem_2.jsx"
import {API_URL} from "../api.js"
import {MdOutlineFamilyRestroom} from "react-icons/md";


function Onboarding_Form_Main() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")
    const [error, setError] = useState([""]);

    useEffect(() => {
        const dataFetch = async () => {
            setIsLoading(true);
            const data = await (
                await fetch(`${API_URL/onboarding/fetchData}`)
            ).json()
            console.log(data)
            const formattedData = data.map((input, i) => {
                return {
                    description: 1,
                    input: {
                        id: input.id,
                        name: input["name"]
                    }
                }
            })

            console.log("formatteddata",formattedData)
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

            await fetch(`${API_URL}/onboarding/postData`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"name": newTask})
            })
            .then((response) => console.log(response))
        }
    }

    function remove_task_1(taskToRemove) {
        return fetch(`${API_URL}/onboarding/delete/${taskToRemove}`, {
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
            const filteredTasks = tasks.filter((task) => task.input["name" !== taskToRemove])
            setTasks(filteredTasks);
        } catch(e) {
            console.error(e)
        }
    }

    function handlepage(task) {
        window.location.href = `/onboarding/user/${task}`
    }

    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
          <div>
                {isLoading ? 
                <div className="loading-container">
                    <p className="loading-state">Lädt...</p>
                </div> 
                : null
                    
                }
          </div>
          <div className="main-list">
            <div className="list">
                <div className="sublist-2">
                    <input
                      className="table-1 input-box"
                      id="1"
                      type="text"
                      value={newTask}
                      onChange={((e) => setNewTask(e.target.value))}
                      placeholder="Name" 
                    />

                    <button className="table-1 btn" onClick={handleSubmit}>Submit</button>
                </div>

                {tasks?.map((task, key) => (<ToDoItem_2 key={key} item={task.input.name} gotopage={handlepage} onRemove={removeTask} />))}
            </div>
          </div>
        </>
    )
}

export default Onboarding_Form_Main;