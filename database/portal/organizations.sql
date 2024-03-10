create table organizations
(
    pk          varchar   not null
        constraint organizations_pk
            primary key,
    create_time timestamp not null,
    update_time timestamp not null,
    name        varchar   not null,
    description varchar,
    creator     varchar
);

alter table organizations
    owner to postgres;

