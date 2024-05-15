console.log('hello')

$(function () {
    console.log('world')
})


const inputElement = document.getElementById("example")

function handleEvent(event) {
    console.debug('handleComposition: ', event.type, event.data)
    var type = String(event.type)
    var data = String(event.data)
    window.moduleConfig.callCompositionText(type, data)
}

inputElement.addEventListener('compositionstart', handleEvent);
inputElement.addEventListener('compositionupdate', handleEvent);
inputElement.addEventListener('compositionend', handleEvent);

function handleInput(event) {
    console.debug('handleInput: ', event.inputType, event.data)
    if (event.isComposing)
        return
    var inputType = event.inputType
    if (inputType === 'deleteContentBackward') {
        window.moduleConfig.deleteContent()
        return;
    }
    if (inputType === 'insertLineBreak' || (inputType === 'insertText' && !event.data)) {
        window.moduleConfig.insertLineBreak()
        return;
    }
    var data = String(event.data)
    window.moduleConfig.callAppendText(data)
}

inputElement.addEventListener('input', handleInput);

window.showTextArea = function (px, py) {
    console.debug('showTextArea: ', px, py)
    inputElement.style.left = String(px) + 'px';
    inputElement.style.top = String(py) + 'px';
    inputElement.style.display = 'block';
    setTimeout(function () {
        inputElement.focus();
    }, 0);
}