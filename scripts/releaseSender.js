document.getElementById('btnReleaseSender').onclick = function(){
    const fieldsDataSender = document.querySelectorAll('.dataSender');
    fieldsDataSender.forEach(fieldDataSender => {
        fieldDataSender.removeAttribute('readonly');
    });
    alert("Campos do remetente liberados!");
}