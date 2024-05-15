//
// Created by ubuntu on 11/25/21.
//

#ifndef CPP_OPENGL_FILE_H
#define CPP_OPENGL_FILE_H

#include <string>
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>


using namespace std;

class Utils {
public:
    static GLuint createShaderProgram(string vertShader, string fragShader);
    static string readShaderSource(const char *filePath);
    static bool checkOpenGLError();
    static void printProgramLog(int prog);
    static void printShaderLog(GLuint shader);
};


#endif //CPP_OPENGL_FILE_H
