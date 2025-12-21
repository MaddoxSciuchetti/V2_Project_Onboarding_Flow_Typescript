import { useState, useEffect } from "react";
import { ToDoItem_2 } from "./ToDoItem_2";
import { API_URL } from "../api";
import { Task, Config, Input1, Incoming_API } from "./Task"

function Onboarding_Form_Main() {


    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>("")
    // const [state, setState] = useState([""]);
    const [error, setError] = useState<string[]>([""]);


    useEffect(() => {

        const dataFetch = async () => {
            setIsLoading(true);
            const data: Config = await (
                await fetch(`${API_URL}/onboarding/fetchData`)
            ).json()

            // formatting data
            const formattedData = data.map((input: Incoming_API): Input1  => {
                return {        
                    input: {
                        id:  input.id, 
                        name: input["name"]
                    }
                }
            })

            console.log("formatteddata", formattedData )
            setTasks(formattedData)
            setIsLoading(false);
        };
        dataFetch();
    }, [])

    function handleSubmit() {


        if(newTask){

            function information(){
                return fetch(`${API_URL}/onboarding/postData`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                        body: JSON.stringify({ "name": newTask})
                }).then(function(response: Response): any{
                    return response.json()  
                });
            }

            information().then(function(response: any) {
                setTasks([...tasks, {
                    input: {
                        "name": newTask,
                        "id": response.employee_form_id,
                    }
                    
                }])
                
            })
            
            setNewTask("")
  
            // const information = fetch(`${API_URL}/onboarding/postData` , {
            //     method: "POST",
            //     headers: {
            //         "Content-Type":"application/json"
            //     },
            //     body: JSON.stringify({"name": newTask})
            // })
            // .then((response) => response.json())
            // .then((response) => {
            //     return response.employee_form_id;
            // });
            // const get_id = async () => {
            //     const id_value = await information;
            //     console.log(id_value)
            //     return id_value;  
            // };

            // const id_value = get_id()
            // console.log("this is the id_value", id_value)


            // setTasks([...tasks, {
            //     input: {
            //         "name": newTask,
            //         // "id": get_id()
            //     }
            // }])
            // console.log(newTask)

        }
    }

    
    function remove_task_1(taskId: number): any{
        
        return fetch(`${API_URL}/onboarding/delete/${taskId}`, {
        method:"DELETE",
        headers: {
            "Content-Type":"application/json"
        },
        signal: AbortSignal.timeout(5000)
    })

    }

    async function removeTask(taskId: number) {
        // setError("Something went wrong")
        try {
            await remove_task_1(taskId)
            const filteredTasks = tasks.filter((task: Task) => task.input.id !== taskId)
            setTasks(filteredTasks);
        } catch (e) {
            console.error(e)
            // setError("Something went wrong")
        }
    }

    function handlepage(taskId: number){
        window.location.href = `/onboarding/user/${taskId}`  
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <div>
                {isLoading ? <div className="loading-container">
            
                    <p className="loading-state"> Lädt...</p>
            
                </div> : null}

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

                    {/* {state && state.map((value, key) => (<ToDoItem_2 key={key} item={value.name} gotopage={handlepage} onRemove={removeTask}/>))} */}
                    {tasks?.map((task: Task) => (<ToDoItem_2 key={task.input.id} item_value={task.input.id} item={task.input.name} gotopage={handlepage} onRemove={removeTask} />))} 
                    {/* {error && <p>{error}</p>} */}
                </div>   
            </div>     

        </>
    )

}

export default Onboarding_Form_Main;