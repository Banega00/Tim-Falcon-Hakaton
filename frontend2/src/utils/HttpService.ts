import axios, { AxiosInstance } from "axios";

class _HttpService{
    
  
    axiosInstance:AxiosInstance

        constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://192.168.43.189:3000',
            withCredentials: true
          });      
    }

    async login(email: string, password: string) {
        return await this.axiosInstance.post("/login",{email, password})
    }

    async logout() {
        return await this.axiosInstance.get("/logout")
    }

    async checkAuth(){
        return await this.axiosInstance.get("/checkAuth")
    }

    async loginWithGoogle() {
        return await this.axiosInstance.get("/login/google")
    }

    getSpeciesData = async (id:string) => {
        return await this.axiosInstance.get(`/species/${id}`);
    }

    public async getAllSpecies() {
        return await this.axiosInstance.get(`/species`);
    }
}

export const HttpService = new _HttpService();