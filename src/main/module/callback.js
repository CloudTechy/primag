import db from './database'

class Callback {
    static getProduct(event, id) {
        db.get(id).then(res => event.returnValue = { data: res })
            .catch(err => event.returnValue = { error: err })
    }
    static  allProduct(event) {
        db.getAll().then(res => event.returnValue = { data: res })
            .catch(err => event.returnValue = { error: err })
    }
    static addProduct(event, productArray) {
        db.insert(productArray).then(res => event.returnValue = { data: res })
            .catch(err => event.returnValue = { error: err })
    }
    static deleteProduct(event, id) {
        db.delete(id).then(res => event.returnValue = { data: res })
            .catch(err => event.returnValue = { error: err })
    }
    static editProduct(event, obj) {
        db.update([obj.name, obj.price], obj.id).then(res => event.returnValue = { data: res })
            .catch(err => event.returnValue = { error: err })
    }
    static sendProducts(ev) {
        db.getAll().then(res => ev.sender.webContents.send('products-ready', { data: res })
        ).catch(err => ev.sender.webContents.send('products-ready', { error: err }))
    }
}

export default Callback