document.getElementById('printIt').onclick = function() {
    
    resetDivPrintFields();// Limpando os campos da div para evitar redundância

    //Preencher os campos dentro da div (para imprimir somente ela)
    var flagCheckFillsDataSender = fillFieldsPrint(".dataSender", "senderPrintFields");
    var flagCheckFillsDataRecipient = fillFieldsPrint(".dataRecipient", "recipientPrintFields");

    // Testando as duas flags para liberar o print apenas se todos os campos estiverem preenchidos
    if(flagCheckFillsDataSender != false && flagCheckFillsDataRecipient != false){
        //Impressão
        var content = document.getElementById('inputsPrint').innerHTML, //Pegando o conteúdo que esta dentro da div inputsPrint para
        printScreen = window.open('about:blank'); //Abrindo nova tela no blank
        //Escrevendo no blank
        printScreen.document.write(`
            <html>
                <head>
                    <title>
                        Impressão de Endereço
                    </title>
                    <link rel="stylesheet" href="styles/style.css">
                </head>
                <body>
                    <div>
                        `+ content +`
                    </div>
                <body>

                <script language="JavaScript">
                    window.print();
                    window.close();
                </script>
            </html>
        `);

        //Recarrega a página para zerar os campos
        location.reload();

    }else{
        resetDivPrintFields();// Limpando os campos da div para evitar redundância
        alert("Por favor, preencha todos os campos para continuar!");
    }
};

// Reavailiar os nomes dados aos campos classInputs/idFieldPrint
function fillFieldsPrint(classInputs, idFieldPrint){
    var flagReturn = true; // Iniciando variável que será usada como flag
    const inputs = document.querySelectorAll(classInputs); //Selecionando todos os inputs com a classe (recebida como primeiro parâmetro)

    inputs.forEach(element => {// Percorre o array na origem para verificar se algum campo está vázio
        if (element.value == '') {flagReturn = false;}
    });

    // mudar para a função parar com o return, não é possível parar um foreach

    //alert("rodou aqui")
    // Formatando as linhas para colocar na tela de forma amigavel - Foi criado um array para rearmazenar os dados ja formatados
    const rowsFormated = [];
    rowsFormated[0] = inputs[0].value;
    rowsFormated[1] = inputs[2].value + ", " + inputs[3].value;
    rowsFormated[2] = inputs[5].value + " - " + inputs[4].value;
    rowsFormated[3] = inputs[6].value
    rowsFormated[4] = inputs[1].value;

    rowsFormated.forEach(input => {  //Adiciona um novo parágrafo para cada linha no array
            var paragraph = document.createElement("p"); // cria o <p>
            var text = document.createTextNode(input); // cria o nó de texto na <p>
            paragraph.appendChild(text); // adiciona o texto no <p>           
            document.getElementById(idFieldPrint).appendChild(paragraph); //Coloca um paragrafo dentro da div indicada (recebida como segundo parâmetro) 
    });
    return flagReturn; //Retornando a flag
}

// Função para resetar div do print
function resetDivPrintFields(){
    document.getElementById('senderPrintFields').innerHTML = "Remetente";
    document.getElementById('recipientPrintFields').innerHTML = "Destinatário";
}