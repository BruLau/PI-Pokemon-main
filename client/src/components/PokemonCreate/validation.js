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
            errors.name ="El nombre debe tener como minimo 3 letras"
        }
        else if(!validateName.test(input.name)){
            errors.name ="El nombre solo puede contener letras"
        }
        else if (!input.health ) {
            errors.health = "Debes completar el campo ¨vida¨";
        }
        else if(parseInt(input.health) < 1){
            errors.health = "La vida debe ser mayor a 1";
        }
        else if (!input.attack ) {
            errors.attack = "Debes completar el campo ¨ataque¨";
        }
        else if(parseInt(input.attack) < 1){
            errors.attack= "El ataque debe ser mayor a 1";
        }
        else if (!input.defense ) {
            errors.defense = "Debes completar el campo ¨defensa¨";
        }
        else if(parseInt(input.defense) < 1){
            errors.defense = "la defensa debe ser mayor a 1";
        }
        else if (!input.velocity) {
            errors.velocity = "Debes completar el campo ¨velocidad¨";
        }
        else if(parseInt(input.velocity) < 1){
            errors.velocity = "La velocidad debe ser mayor a 1";
        }
        else if (!input.height ) {
            errors.height = "Debes completar el campo ¨altura¨";
        }
        else if(parseInt(input.height) < 1){
            errors.height = "La altura debe ser mayor a 1";
        }
        else if (!input.weight ) {
            errors.weight = "Debes completar el campo ¨peso¨";
        }
        else if(parseInt(input.weight) < 1){
            errors.weight = "El peso debe ser mayor a 1";
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