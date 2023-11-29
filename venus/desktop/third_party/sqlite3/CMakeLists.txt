

add_definitions(-DSQLITE_DEFAULT_WORKER_THREADS=4)
add_definitions(-DSQLITE_MAX_WORKER_THREADS=6)
add_definitions(-DSQLITE_ENABLE_FTS4)
add_definitions(-DSQLITE_ENABLE_FTS5)
add_definitions(-DSQLITE_ENABLE_JSON1)
add_definitions(-DSQLITE_ENABLE_RTREE)
add_definitions(-DSQLITE_ENABLE_EXPLAIN_COMMENTS)
add_definitions(-DHAVE_USLEEP)
add_definitions(-DHAVE_READLINE)

add_library(sqlite3 SHARED
        shell.c
        sqlite3.c
        sqlite3.h
        sqlite3ext.h
)

target_link_libraries(sqlite3 dl readline ncurses pthread)