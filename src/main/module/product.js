import db from './database'

class Product{
    constructor(productObj){
        this.id = productObj.id
        this.name = productObj.name
        this.price = productObj.price
    }

    static all(){
        return new Promise((resolve,reject) => {
             db.getAll().then((rows)=>{
                resolve({data : rows.map(row => new Product(row))})
            }).catch(err => reject( { error: err }))
        })
    }

    static get(id){
        return new Promise((resolve,reject) => {
            db.get(id).then((row)=>{
               resolve({data : new Product(row)})
           }).catch(err => reject( { error: err }))
       })
    }

    edit(productArray){
        return new Promise((resolve,reject) => {
            db.update(productArray, this.id).then((changes)=>{
               resolve({data :changes})
           }).catch(err => reject( { error: err }))
       })
    }
    static add(productArray){
        return new Promise((resolve,reject) => {
            db.insert(productArray).then((row)=>{
               resolve({data :new Product(row)})
           }).catch(err => reject( { error: err }))
       })
    }

    delete(){
        return new Promise((resolve,reject) => {
            db.delete(this.id).then((changes)=>{
               resolve({data :changes})
           }).catch(err => reject( { error: err }))
       })
    }
   

    
}
export default Product