import{ CheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks(props) {
  const navigate = useNavigate();
  //Função que navega para a página da tarefa

  function onSeeDetailsClick(task){
    const query = new URLSearchParams()
    query.set("title", task.title)
    query.set("description", task.description)

    navigate(`/task?${query.toString()}`)

  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {/* Itera sobre as tarefas e cria um item de lista para cada uma */}
      {/* A chave é o id da tarefa */}
      {/* O botão chama a função onTaskClick passando o id da tarefa */}
      {/* O botão tem a classe "line-through" se a tarefa estiver concluída */}
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`bg-slate-400 text-white p-2 rounded-md w-full text-left flex items-center gap-2 ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.isCompleted && <CheckIcon />}
            {task.title}
          </button>

          <button
            onClick={() => 
              onSeeDetailsClick(task)
            }
            className="bg-slate-400 text-white p-2 rounded-md">
            <ChevronRightIcon />                                  
          </button>

          <button 
            //Passa o id da tarefa para a função onTaskDelete
            //A função onTaskDelete é passada como props
            //A função onTaskDelete remove a tarefa da lista
            //A função onTaskDelete é chamada quando o botão é clicado
            onClick={() => props.onTaskDelete(task.id)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <TrashIcon />                                  
          </button>

        </li>
      ))}
    </ul>
  );
}

export default Tasks;
