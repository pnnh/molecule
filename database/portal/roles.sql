create table roles
(
    pk          varchar                                 not null
        constraint roles_pk
            primary key,
    create_time timestamp default now()                 not null,
    update_time timestamp default now()                 not null,
    name        varchar   default ''::character varying not null,
    description varchar   default ''::character varying not null
);

alter table roles
    owner to postgres;

grant delete, insert, select, update on roles to debug;

