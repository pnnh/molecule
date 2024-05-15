//
// Created by ubuntu on 11/24/21.
//

#ifndef CPP_OPENGL_DEBUG_H
#define CPP_OPENGL_DEBUG_H

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>

using namespace std;

GLuint createShaderProgram(string vertShader, string fragShader);
void printShaderLog(GLuint shader);

void printProgramLog(int prog);

bool checkOpenGLError();

#endif //CPP_OPENGL_DEBUG_H
