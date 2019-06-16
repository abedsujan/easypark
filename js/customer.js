const fs = require('fs');
const filePath = "./data/customer.json";
class Customer {
    constructor() {
        const fileData = fs.readFileSync(filePath).toString();
        this._customerData = JSON.parse(fileData)

    }

    getAll() {
        return this._customerData;
    }
    getCustomerByNumberPlate(numberPlate) {
        return this._customerData.filter((customer => {
            return customer.numberPlate.toLowerCase() == numberPlate.toLowerCase()
        }));

    }
    addCustomer(customer, callback) {

        try {
            this.validate(customer);
            this._customerData.push(customer);
            fs.writeFileSync(filePath, JSON.stringify(this._customerData))
            callback(true, false);
        } catch (err) {
            callback(false, err.message);
        }
    }
    validate(customer) {

        if (customer.numberPlate.length > 5) {
            // ok
        } else {
            throw new Error("invalid customer number plate");
        }
        // do the validation 
    }
}

module.exports = Customer;