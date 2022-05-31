//  A constructor that holds all the functions that validate data.
const formValidation = function(){
    
    this.checkEmpty = (input) => {
        let inputValue;

        if(!input){
            return false;
        }else{
            inputValue = input;
            return inputValue;
        }
    }
    
    this.emailValidation = (input) => {
        const inputValue = input.trim();
        const mailRegex = /^[a-zA-Z0-9_\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{1,15}$/
        const isValid = mailRegex.test(inputValue);

        if(!isValid){
            return false;
        }else{
            return inputValue;
        }

    }

    this.pwdValidation = (input) => {
        const inputValue = input.trim();
        
        if(inputValue.length < 6){
            return false;
        }else{
            return inputValue;
        }
    }

    this.roleValidation = (input) => {
        const inputValue = input.toLowerCase().trim()
        const roles = ['admin', 'employee', 'help_desk'];

        const roleValRes = roles.filter((role) => {
            return role === inputValue;
        })
        
        if(!roleValRes.length){
            return false;
        }else{
            return inputValue;
        }
    }

    this.numVal = (input) => {
        const inputValue = input;

        if(isNaN(inputValue)){
            return false;
        }else{
            return true;
        }
    }

    this.sypmtomVal = (input) => {
        const inputValue = input.toLowerCase().trim();

        if(inputValue !== 'yes' && inputValue !== 'no'){
            return false;
        }else{
            return true;
        }
    }
}

module.exports = {
    formValidation
}