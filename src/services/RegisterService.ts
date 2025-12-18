import { api } from "./api";

export const register = async (nome: string, email: string, password: string, interests: string[], latitude: any, longitude: any) => {
  let jsonRegister = {
    "email": email,
    "name": nome,
    "password": password,
    "interests": interests,
    "latitude": latitude,
    "longitude": longitude
  }

  console.log("JSON", jsonRegister);

  return await api.post("/create-user", { ...jsonRegister });
};