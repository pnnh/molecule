create table access_code
(
    pk          varchar(96) not null
        constraint access_code_pk
            primary key,
    create_time timestamp with time zone,
    update_time timestamp with time zone,
    code        varchar(128),
    content     varchar(4096),
    active      integer
);

alter table access_code
    owner to postgres;

