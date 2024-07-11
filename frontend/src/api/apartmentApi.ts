import axios from 'axios';
import { apiService } from '../services/api.service';
import { generateQuery } from '../utils/generate-query';

class ApartmentApi {
    async getApartments(limit: number, offset: number) {
        return new Promise((resolve, reject) => {
            const queries = {
                limit,
                offset,
            };
            try {
                const apartments = apiService.get(
                    `/apartments/?${generateQuery(queries)}`
                );
                resolve(apartments);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }

    async getApartmentDetails(apartmentId: number) {
        return new Promise((resolve, reject) => {
            try {
                const apartments = apiService.get(`/apartments/${apartmentId}`);
                resolve(apartments);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }

    async createApartment(
        title: string,
        description: string,
        price: number | null,
        apartmentData: any
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const data = JSON.stringify({
                title: title,
                description: description,
                price: price,
            });

            try {
                const resp = apiService.post(
                    `/apartments/upload?data=${data}`,
                    apartmentData,
                    {
                        contentType: 'multipart/form-data',
                    }
                );
                resolve(resp);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }

    async updateApartment(id: number, apartmentData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const resp = apiService.put(`/apartments/${id}`, apartmentData);
                resolve(resp);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }

    async deleteApartment(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const resp = apiService.delete(`/apartments/${id}`);
                resolve(resp);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }
}

export const apartmentApi = new ApartmentApi();
