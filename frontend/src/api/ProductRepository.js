//these are all the http requests related to departments 
import axios from 'axios';

export class ProductRepository{
    
    url = 'http://localhost:8000'

    config = {
        
    };

    // //GET /products()
    getProducts(params){
        var config = this.config;
        config.params = params;
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/products/`, config)
                .then(x=>resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject(x);
                });
        });
    }

    //GET /productTypes()
    getProductTypes(params){
        var config = this.config;
        config.params = params;
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/product_types`, config)
                .then(x=>resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject(x);
                });
        });
    }


    getProductTypebyName(name){
        var config = this.config;
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/product_types/name/${name}`, config)
                .then(x=>resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject(x);
                });
        });
    }

    //THIS IS THE TEMPLATE!! :-)
    //POST productType
    addProductType(product_type){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/product_types`, {
                product_type_name: product_type.product_type_name,
                dept_id: product_type.dept_id,
                price: product_type.price
              })
              .then(x=> {
                  console.log(x);
                  resolve(x.data);
              })
              .catch(x=>{
                  console.log(x);
                  alert(x);
                  reject(x);
              }
              );
        });
    }

    deleteProductType(product_type_id){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/product_types/${product_type_id}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

deleteProduct(product_id){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/products/${product_id}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }
}

