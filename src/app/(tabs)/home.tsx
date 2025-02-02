import React, { useState, useEffect } from "react";
import { BoardRepository } from 'react-native-draganddrop-board';
import { Board } from 'react-native-draganddrop-board';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import Tarefa from "../components/Tarefa";

interface ITarefa {
  id: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  description: string;
  priority: string;
  title: string;
}

export default function Home() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [tarefas, setTarefas] = useState<any[]>([
        {
            id: 1,
            name: 'Pendente⛔',
            rows: []
        },
        {
            id: 2,
            name: 'Fazendo⏳',
            rows: []
        },
        {
            id: 3,
            name: 'Concluído✅',
            rows: []
        }
    ]);
    const [listTarefas, setListTarefas] = useState<ITarefa[]>([]);
    const boardRepository = new BoardRepository(tarefas);

    useEffect(() => {
            const fetchTarefas = async () => {
            try {
                const tokenData = await SecureStore.getItemAsync("authToken");
                if(!tokenData) {
                    console.error('Token não encontrado');
                    return;
                }
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/tarefasUser`, {
                    headers: {
                        Authorization: `Bearer ${String(tokenData)}`,
                        "Content-Type": "application/json",
                    }
                });
                setListTarefas(response.data);
            } catch(error: any) {
                console.error('Erro ao buscar tarefas:', error.response.data);
            }
        };
        fetchTarefas();
    }, []);

    useEffect(() => {
        if(listTarefas.length > 0) {
            const updatedTarefas = tarefas.map(tarefa => {
                let filteredRows = Array<any>();
                switch (tarefa.id) {
                    case 1:
                        filteredRows = listTarefas.filter(t => t.status === "PENDING");
                        break;
                    case 2:
                        filteredRows = listTarefas.filter(t => t.status === "IN_PROGRESS");
                        break;
                    case 3:
                        filteredRows = listTarefas.filter(t => t.status === "COMPLETED");
                        break;
                    default:
                        filteredRows = [];
                }
                return {
                    ...tarefa,
                    rows: filteredRows
                };
            });
            setTarefas(updatedTarefas);
        }
    }, [listTarefas]);

    const handleOpen = (item:any) => {
        setSelectedItem(item);
        console.log('Item pressionado:', item);
    };

    const updateTarefaStatus = async (id: number, status: any) => {
        const tarefa = { ...listTarefas.find((task) => task.id === id), status };
        const token = await SecureStore.getItemAsync("authToken");
        if(!token) {
            console.error('Token não encontrado');
            return;
        }
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/tarefa/${id}`, {
                ...tarefa
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    }

    const handleDragEnd = async (srcColumn: any, destColumn: any, draggedItem: any) => {
        console.log("Eventos: ", srcColumn, destColumn, draggedItem.attributes.id);

        if(srcColumn !== destColumn) {
            let newStatus = "";
            switch (destColumn) {
                case 1:
                    newStatus = "PENDING";
                    break;
                case 2:
                    newStatus = "IN_PROGRESS";
                    break;
                case 3:
                    newStatus = "COMPLETED";
                    break;
                default:
                    newStatus = "PENDING";
            }
            await updateTarefaStatus(draggedItem.attributes.id, newStatus);
        }
    };
  

    return (
        <Board
            boardRepository={boardRepository}
            open={handleOpen}
            onDragEnd={handleDragEnd}
            isWithCountBadge={false}
            cardContent={(task: any) => (<Tarefa key={task.id} task={task} />)}
        />
    );
}
