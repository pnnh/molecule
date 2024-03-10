create table groups
(
    pk          varchar not null
        constraint projects_pk
            primary key,
    name        integer,
    description varchar
);

alter table groups
    owner to postgres;

