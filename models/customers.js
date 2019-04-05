const Joi = require('Joi'); //Joi for validation
/**
 * @author Rohan Rao
 * @param { a number representing unique identifier for customer } custId
 * @param { denotes customer name } custName
 * @param { boolean value, if true denotes that customer has a premium membership }isGold
 * @param { credit available with the customer } availableCredit
 * @function customer- this function represents the customer model. Each customer object 
 *                      has the properties that are passed to this function as arguments          
 */
let customer =  function(custId, custName, isGold, availableCredit){
    this.custId = custId;
    this.custName = custName;
    this.isGold = isGold;
    this.availableCredit = availableCredit;
}

/**
 * @author Rohan Rao
 * @param { represents a customer object having properties - id, name, isGold, avilable credit } customerObj
 * @function validateCustomer: this function takes customer object as its input paramater and validates it using joi.
 *                             Returns a callback of error,value 
 */
let validateCustomer =  function(customerObj){
    const schema = Joi.object({
        custId: Joi.number().required(),
        custName: Joi.string().min(3).max(20).required(),
        isGold: Joi.boolean().required(),
        availableCredit: Joi.number().greater(1000).less(10000).required()
    });
     
    return Joi.validate(customerObj, schema);
}
exports.customer = customer;
exports.validateCustomer = validateCustomer;
