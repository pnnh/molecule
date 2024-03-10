create table configs
(
    pk          varchar   not null
        constraint config_pk
            primary key,
    project     varchar   not null,
    key         varchar   not null,
    value       varchar   not null,
    update_time timestamp not null,
    create_time timestamp not null,
    file        varchar,
    environment varchar
);

alter table configs
    owner to postgres;

grant delete, insert, select, update on configs to debug;

