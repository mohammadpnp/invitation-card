
    function setup() {
    document.getElementById('buttonid').addEventListener('click', openDialog);
    function openDialog() {
    document.getElementById('fileid').click();
}
    document.getElementById('fileid').addEventListener('change', submitForm);
    function submitForm() {
    document.getElementById('formid').submit();
}

    document.getElementById('buttonid2').addEventListener('click', openDialog2);
    function openDialog2() {
    document.getElementById('fileid2').click();
}
    document.getElementById('fileid2').addEventListener('change', submitForm2);
    function submitForm2() {
    document.getElementById('formid2').submit();
}
}
