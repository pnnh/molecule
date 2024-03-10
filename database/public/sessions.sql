create table sessions
(
    pk          varchar(64)              not null
        constraint "PK_sessions"
            primary key,
    content     text                     not null,
    "user"      varchar(64)              not null,
    type        varchar(64)              not null,
    create_time timestamp with time zone not null,
    update_time timestamp with time zone not null
);

alter table sessions
    owner to postgres;

grant delete, insert, select, update on sessions to huable;

