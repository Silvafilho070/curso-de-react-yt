import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";

//function App() {
//  const [message, setMessage] = useState("Olá, mundo!");
//
//  return (
//    <div>
//      <h1>{message}</h1>
//      <button
//        onClick={() => {
//          setMessage("Olá, fui clicado");
//        }}
//      >
//        mudar mensagem
//      </button>
//    </div>
//  );
//}
//
//export default App;


function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || ["gsgsgsgs"]
  );
  //O useState é um hook que permite criar um estado dentro de um componente

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]
  );

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://jsonplaceholder.typicode.com/todos?_limit=10");
      const data = await response.json();
      setTasks(data);
    }

    // fetchTasks();

  }, []);
  

  function onTaskClick(taskId) {
    //Cria uma nova lista de tarefas
    //Usa o map para iterar sobre as tarefas
    //O map retorna uma nova lista de tarefas
    //A nova lista de tarefas é igual a lista de tarefas atual
    //Mas, se a tarefa for a tarefa clicada, inverte o valor de isCompleted

    const newTasks = tasks.map((task) => {
      //Verifica se o id da tarefa é igual ao id da tarefa clicada
      //Se for, inverte o valor de isCompleted
      //Se não for, retorna a tarefa sem alterações

      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //Não precisa retornar nada!
      //Se não for a tarefa clicada, retorna a tarefa sem alterações
      //Se for a tarefa clicada, retorna a tarefa com isCompleted invertido

      return task;
    });
    setTasks(newTasks);
  }

  function onTaskDelete(taskId) {
    //Cria uma nova lista de tarefas
    //Usa o filter para iterar sobre as tarefas
    //O filter retorna uma nova lista de tarefas
    //A nova lista de tarefas é igual a lista de tarefas atual
    //Mas, se a tarefa for a tarefa clicada, remove a tarefa da lista

    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onTaskAdd(title, description) {
    //Cria uma nova tarefa
    //A nova tarefa tem um id igual ao tamanho da lista de tarefas + 1
    //A nova tarefa tem um título e uma descrição iguais aos valores dos inputs
    //A nova tarefa tem isCompleted igual a false
    const newTasks = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTasks]);
  }

  return (
    <div className=" w-screen h-screen bg-slate-500 flex justify-center p-6 overflow-y-auto ">
      <div className="w-[500px] space-y-4 ">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de tarefas
        </h1>
        <AddTask onTaskAdd={onTaskAdd} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
