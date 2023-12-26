create table personal.directories
(
    pk          varchar(94)              not null
        constraint "PK_partitions"
            primary key,
    title       varchar(128)             not null,
    create_time timestamp with time zone not null,
    update_time timestamp with time zone not null,
    owner       varchar(96)              not null,
    description varchar(256)             not null,
    parent      varchar(96),
    level       integer,
    path        ltree,
    notebook    varchar(96),
    name        varchar(96),
    profile     varchar(96)
);

alter table personal.directories
    owner to postgres;

grant delete, insert, select, update on personal.directories to huable;

