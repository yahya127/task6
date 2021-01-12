const fs = require('fs')
const yargs = require('yargs')
readFileData = function(){
    try{
        data = fs.readFileSync('tasks.json')
        if(data.toString().length==0) throw new Error('errrr')
        data = JSON.parse(data.toString())
        if(!Array.isArray(data)) throw new Error('')
    }
    catch(e){
        data = []
        fs.writeFileSync('tasks.json', "[]")
    }
    return data    
}
addCustomer = function(note) {
    data = readFileData() //=> return array
    data.push(note)
    fs.writeFileSync('tasks.json', JSON.stringify(data))
}
yargs.command({
    command: "addCust",
    describe: "add new customer to our file",
    builder: {
        name: { type: 'string', demandOption: true },
        balance: { type: 'number', demandOption: true },
        accountNumber:{type:'number', demandOption:true}  
    },
    handler: function (argv) {
        data = readFileData()
        accountNumbers = []
        data.forEach(element => {
            accountNumbers.push(element.accountNumber)
        });
        existnum=accountNumbers.includes(argv.accountNumber)
        
        if(!existnum) {
            let customer = { name: argv.name, balance: argv.balance, accountNumber: argv.accountNumber }
            console.log(customer);
            addCustomer(customer) 
        }
        else{        
            console.log("this Number is exist before") 
        }
    }
})
yargs.argv