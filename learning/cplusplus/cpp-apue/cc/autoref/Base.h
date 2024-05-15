//
// Created by Larry on 2022/1/2.
//

#ifndef APUE_BASE_H
#define APUE_BASE_H

class Base {
 public:
  virtual void f();
};

class Derived : public Base {
 public:
  virtual void f() override;
};

#endif //APUE_BASE_H
