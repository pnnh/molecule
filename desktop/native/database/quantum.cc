#include "quantum.h"
#include <iostream>
#include <sqlite3.h>

#include <chrono>
#include <iostream>
#include <sstream>
#include <spdlog/spdlog.h>

#ifdef _WIN32

#include <direct.h>

#define GetCurrentDir _getcwd
#else
#include <unistd.h>
#define GetCurrentDir getcwd
#endif

using namespace std;
using Clock = std::chrono::system_clock;
using ms = std::chrono::duration<double, std::milli>;

string get_current_dir() {
    char buff[FILENAME_MAX];
    GetCurrentDir(buff, FILENAME_MAX);
    string current_working_dir(buff);
    return current_working_dir;
}

int callback(void *NotUsed, int argc, char **argv, char **azColName) {
    for (int i = 0; i < argc; i++) {
        cout << azColName[i] << ": " << argv[i] << endl;
    }
    if (argc > 0) {
        cout << endl;
    }
    return 0;
}

void handle_rc(sqlite3 *db, int rc) {
    if (rc != SQLITE_OK) {
        cout << "sqlite3 rc: " << rc << ", error: " << sqlite3_errmsg(db) << endl;
        exit(rc);
    }
}

int open_database(const char *path) {
    std::cerr << "收到了2：" << path << std::endl;

    auto currentDir = get_current_dir();

    spdlog::info("Current Dir, {}", currentDir);

    sqlite3 *db;
    char *zErrMsg = 0;
    auto fullPath = currentDir + "\\quantum.sqlite3";

    int rc = sqlite3_open(fullPath.c_str(), &db);
    handle_rc(db, rc);

    auto versionSql = "select sqlite_version();";
    rc = sqlite3_exec(db, versionSql, callback, 0, &zErrMsg);
    handle_rc(db, rc);

    auto createSql = R"EOF(
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
)
)EOF";
    rc = sqlite3_exec(db, createSql, callback, 0, &zErrMsg);
    handle_rc(db, rc);

    auto insertSql = R"EOF(
insert company(id,name,age,address,salary) values(1, 'aa', 18, 'addr', 125);
)EOF";
    rc = sqlite3_exec(db, insertSql, callback, 0, &zErrMsg);
    handle_rc(db, rc);
    return 0;
}

void hello_world() {
    std::cerr << "Hello CPP" << std::endl;
    printf("Hello World\n");
}


int sum(int a, int b) {
    return a + b;
}

int *multiply(int a, int b) {
    // Allocates native memory in C.
    int *mult = (int *) malloc(sizeof(int));
    *mult = a * b;
    return mult;
}

void free_pointer(int *int_pointer) {
    // Free native memory in C which was allocated in C.
    free(int_pointer);
}

int subtract(int *a, int b) {
    return *a - b;
}
