create table sessions
(
    pk            varchar(96)              not null
        constraint sessions_pk
            primary key,
    content       varchar(256)             not null,
    create_time   timestamp with time zone not null,
    update_time   timestamp with time zone not null,
    username      varchar(96)              not null,
    type          varchar(96)              not null,
    code          varchar(256),
    client_id     varchar(128),
    response_type varchar(128),
    redirect_uri  varchar(512),
    scope         varchar(256),
    state         varchar(128),
    nonce         varchar(128),
    id_token      varchar(1024),
    access_token  varchar(512),
    jwt_id        varchar(96),
    open_id       varchar(96),
    company_id    varchar(96)
);

alter table sessions
    owner to postgres;

grant delete, insert, select, update on sessions to debug;

