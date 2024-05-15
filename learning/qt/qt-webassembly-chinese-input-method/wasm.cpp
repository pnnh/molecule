//
// Created by Larry on 2022/8/30.
//

#include "wasm.h"
#include "TextBalloon.h"

#include <string>
#include <iostream>
#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <QString>

using namespace emscripten;

emscripten::val tryCharPtr() {
    const char *str = "abc哈哈😁☺";
    return emscripten::val(str);
}

emscripten::val tryStdString() {
    std::string str = "abc哈哈O(∩_∩)O哈哈~🐶efg☺";
    return emscripten::val(str);
}

emscripten::val callCompositionText(const std::string &type, const std::string &data) {
    std::cout << "callCompositionText:=====" << type << "|" << data << "====" << std::endl;

    QString compositionEvent = QString::fromStdString(type);
    QString text = QString::fromStdString(data);
    TextBalloon::defaultBalloon->setCompositionText(compositionEvent, text);

    std::string str = "ok";
    return emscripten::val(str);
}

emscripten::val callAppendText(const std::string &data) {
    std::cout << "callAppendText:=====" << data << "====" << std::endl;

    QString text = QString::fromStdString(data);
    TextBalloon::defaultBalloon->appendText(text);

    std::string str = "ok";
    return emscripten::val(str);
}

emscripten::val deleteContent() {
    std::cout << "deleteContent" << std::endl;

    TextBalloon::defaultBalloon->deleteContent();

    std::string str = "ok";
    return emscripten::val(str);
}

emscripten::val insertLineBreak() {
    std::cout << "insertLineBreak" << std::endl;

    TextBalloon::defaultBalloon->insertLineBreak();

    std::string str = "ok";
    return emscripten::val(str);
}

EMSCRIPTEN_BINDINGS(demo) {
    emscripten::function("tryCharPtr", &tryCharPtr);
    emscripten::function("tryStdString", &tryStdString);
    emscripten::function("callCompositionText", &callCompositionText);
    emscripten::function("callAppendText", &callAppendText);
    emscripten::function("deleteContent", &deleteContent);
    emscripten::function("insertLineBreak", &insertLineBreak);
}


EM_JS(void, call_log, (float px, float py), {
    showTextArea(px, py);
});

void js::showTextArea(float px, float py) {
    call_log(px, py);
}