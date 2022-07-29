export default function validate (input)
    {
        let validateName = /^[a-z]+$/i;
        let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
        let errors={}
        if(!input.name)
        {
            errors.name ="Se requiere un nombre"
        }
        else if( input.name.length < 3){
            errors.name ="El nombre debe tener como minimo 3 caracteres"
        }
        else if(!validateName.test(input.name)){
            errors.name ="El nombre solo puede contener letras"
        }
        else if (!input.health ) {
            errors.health = "Debes completar el campo ¨vida¨";
        }
        else if(parseInt(input.health) < 1){
            errors.health = "Debe ser mayor a 1";
        }
        else if (!input.attack ) {
            errors.attack = "Debes completar este campo";
        }
        else if(parseInt(input.attack) < 1){
            errors.attack= "Debe ser mayor a 1";
        }
        else if (!input.defense ) {
            errors.defense = "Debes completar este campo";
        }
        else if(parseInt(input.defense) < 1){
            errors.defense = "Debe ser mayor a 1";
        }
        else if (!input.velocity) {
            errors.velocity = "Debes completar este campo";
        }
        else if(parseInt(input.velocity) < 1){
            errors.velocity = "Debe ser mayor a 1";
        }
        else if (!input.height ) {
            errors.height = "Debes completar este campo";
        }
        else if(parseInt(input.height) < 1){
            errors.height = "Debe ser mayor a 1";
        }
        else if (!input.weight ) {
            errors.weight = "Debes completar este campo";
        }
        else if(parseInt(input.weight) < 1){
            errors.weight = "Debe ser mayor a 1";
        }
        else if(!input.img){
            errors.img = "Se requiere una URL"
        }
       
        else if(!validateUrl.test(input.img)){
            errors.img = "Debe ser una URL valida ";
        }
        else if(input.type.length===0){
        
            errors.type= "Debe seleccionar un tipo"
        }
       
       

        return errors
    }