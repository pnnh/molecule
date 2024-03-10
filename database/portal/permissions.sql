create table permissions
(
    pk          varchar                                 not null
        constraint permissions_pk
            primary key,
    name        varchar   default ''::character varying not null,
    create_time timestamp default now()                 not null,
    update_time timestamp default now()                 not null,
    description varchar   default ''::character varying not null
);

alter table permissions
    owner to postgres;

grant delete, insert, select, update on permissions to debug;

