import { api } from "./api";

export const login = async (email: string, password: string) => {

    let jsonRegister = {
        "email": email,
        "password": password,
    }


    return await api.post("/login", { ...jsonRegister });
};