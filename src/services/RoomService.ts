import { AxiosResponse } from "axios";
import { api } from "./api";
import { HttpClient } from "@/infra/adapters";
const token = localStorage.getItem("token");

export type RoomData = {
    id: number;
    name: string;
    description: string;
    capacity: number;
};

export interface ListRooms {
    rooms: Array<{}>
}

export const registerRoom = async (ownerId: number, name: string, type: string, description: string, capacity: number, categories: string[]) => {

    let jsonRoom = {
        ownerId: ownerId,
        name: name,
        type: type,
        description: description,
        capacity: capacity,
        categories: categories
    }

    console.log("JSON", jsonRoom);

    return await api.post("/create-room", jsonRoom, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


export const listRoomsDiscussionNearby = async (httpClient: HttpClient, id: number): Promise<RoomData[]> => {

    const token = localStorage.getItem("token");

    const body = {
        "id": id,
        "type": "discussion"
    };

    const response = await httpClient.request({
        url: "list-rooms-discussion-nearby", // Confirme se precisa da barra inicial "/"
        method: "POST",
        body: body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.body || [];
};

export const handleEnterRoom = async (roomId: number, idUser: number) => {
    try {

        const response = await api.post("/participate-room", {
            roomId: roomId,
            userId: idUser
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            alert("CHAT ABERTO");
        }

    } catch (error) {
        alert("Erro ao entrar na sala: " + error.message);
    }
};