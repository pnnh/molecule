
#define EXPORT extern "C" __attribute__((visibility("default"))) __attribute__((used))

EXPORT int open_database(const char* path);
EXPORT void hello_world();

//extern "C" {

//int open_database(const char* path);
//
//void hello_world();

//}
