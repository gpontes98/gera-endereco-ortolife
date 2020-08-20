$(document).ready(function(){
    $("#zipCodeRecipient").mask("99999-999");
});

$("#zipCodeRecipient").focusout(function(){ //Função é chamada ao tirar o foco do campo CEP
    
    //Nova variável "zipcode" somente com dígitos.
    const zipCode = $("#zipCodeRecipient").val().replace(/\D/g, '');

    //Expressão regular para validar o CEP.
    const testZipCode = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(testZipCode.test(zipCode)) {
        
        //Preenche os campos com (...) enquanto os campos estão sendo carregados
        changeFieldsZipCode("..."); 
            
        //Fazendo requisição no viacep e enviando o zipCode como parâmetro
        $.getJSON('https://viacep.com.br/ws/'+ zipCode +'/json/',  function(data) {         
            
            // Se não retornar erro o cep foi encontrado, prossegue
            if (!("erro" in data)) {
                //Colocando os valores que foram retornados do viacep nos campos do formulário
                $("#streetRecipient").val(data.logradouro);
                $("#stateRecipient").val(data.uf);
                $("#cityRecipient").val(data.localidade);    
                $("#districtRecipient").val(data.bairro);

                //Colocando borda padrão para indicar que está ok
                document.getElementById('zipCodeRecipient').style.border = "2px solid #c3c3c3";
                testFieldsZipCode("OK"); //Chamando função que testa os campos encontrado e enviando como parâmetro "ok" para indicar que o cep é válido
            } else{// Se o VIACEP retornar erro então o cep não foi encontrado
                
                changeFieldsZipCode(""); //Chamando função para mudar valores dos campos preenchidos pelo cep e enviando "" para limpar
                //Chamando função que testa os campos encontrado e enviando como parâmetro "atenção, cep não encontrado!" para indicar que o cep não é válido
                testFieldsZipCode("Atenção, CEP não encontrado!");                   
            }
        });
    }else{
        changeFieldsZipCode("");
        //testa os campos que foram ou não preenchidos
        testFieldsZipCode("Atenção, Houve um erro de digitação no CEP!");
    }
});

//Função para manipular todos os campos preenchidos pelo CEP - RECEBE COMO PARAMÊTRO O VALOR QUE VAI ENTRAR NO CAMPO
function changeFieldsZipCode(valueFields){    
    const fields = document.querySelectorAll(".zipCodeRecipientResult"); // Selecionando todos os campos zipCodeRecipientResult
    fields.forEach(field => { //Para cada campo encontrado ele coloca o valor RECEBIDO
        field.value = valueFields;
    });
}

//Função para testar os campos preenchidos pelo cep (recebe parâmetro para saber se o cep é válido ou não)
function testFieldsZipCode(flagTestFields){
    //Entra na condição se o cep não for encontrado
    if(flagTestFields != "OK"){
        document.getElementById('spanRecipientResult').innerHTML = flagTestFields; // Coloca o valor recebido como parâmetro para indicar o motivo de não encotrar o CEP
        document.getElementById('zipCodeRecipient').style.border = "2px solid #FF0000"; // Muda a cor da borda do input do CEP para vermelho
    }else{
        document.getElementById('spanRecipientResult').innerHTML = ""; //Se o cep for válido o span (usado para informar erro) fica em branco
    }

    const fields = document.querySelectorAll(".zipCodeRecipientResult"); // Selecionando todos os campos zipCodeRecipientResult
    fields.forEach(field => { //Para cada campo zipCodeRecipientResult encontrado ele vai verificar se o mesmo foi preenchido
        if(field.value == ""){      //Se não foi preenchido (viacep não encontrou) coloca uma borda vermelha para chamar atenção       
            field.style.border = "2px solid #FF0000";
        }else{ // Se foi preenchido pelo viacep coloca borda padrão para indicar que está ok
            field.style.border = "2px solid #c3c3c3";
            
        }
    });
}