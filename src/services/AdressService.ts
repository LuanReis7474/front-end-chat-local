import axios from "axios";

const osmApi = axios.create({
    baseURL: "https://nominatim.openstreetmap.org",

});

interface NominatimResponse {
    address: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        neighbourhood?: string;
    };
    display_name: string;
}

export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
        const response = await osmApi.get<NominatimResponse>('/reverse', {
            params: {
                format: 'json',
                lat: latitude,
                lon: longitude,
                zoom: 10,
                email: "luanreiscarvl@gmail.com"
            }
        });

        const address = response.data.address;
        console.log("response", address);
        const city = address.city || address.town || address.village || "Desconhecido";

        return {
            fullAddress: response.data.display_name,
            city: city,
            state: address.state,
            neighbourhood: address.neighbourhood,
        };
    } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        return null;
    }
};