module;
#include <iostream>

// first thing after the Global module fragment must be a module command
export module foo;

export class foo
{
public:
    foo();
    void helloworld();
};

foo::foo() = default;
void foo::helloworld() { std::cout << "hello world\n"; }