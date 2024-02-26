
//#define EXPORT extern "C" __attribute__((visibility("default"))) __attribute__((used))
//
//EXPORT int open_database(const char* path);
//EXPORT void hello_world();

#if defined(__cplusplus)
extern "C" {
#endif

int open_database(const char *path);

void hello_world();

int sum(int a, int b);
int subtract(int *a, int b);
int *multiply(int a, int b);
void free_pointer(int *int_pointer);

#if defined(__cplusplus)
}
#endif
