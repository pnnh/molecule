create table access_token
(
    pk          varchar(96) not null
        constraint access_token_pk
            primary key,
    create_time timestamp with time zone,
    update_time timestamp with time zone,
    signature   varchar(128),
    content     varchar(4096)
);

alter table access_token
    owner to postgres;

