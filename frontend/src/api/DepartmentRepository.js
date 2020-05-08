//these are all the http requests related to departments 
import axios from 'axios';

export class DepartmentRepository{
    
    url = 'http://localhost:8000'

    config = {
        
    };

    //GET /departments
    getDepartments(){
        var config = this.config;
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/departments`, config)
                .then(x=>resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject(x);
                });
        });
    }


    //GET /departments/{id}
    getDepartment(id){
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/departments/${id}`)
                .then(x=>resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject(x);
                })
        })
    }

    //DELETE /departments/{id}
    deleteDepartment(id){
        return new Promise((resolve, reject)=>{
            axios.delete(`${this.url}/departments/${id}`)
                .then(x=>resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject(x);
                })
        })
    }

}