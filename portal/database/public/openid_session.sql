create table openid_session
(
    pk          varchar(96) not null
        constraint openid_session_pk
            primary key,
    create_time timestamp with time zone,
    update_time timestamp with time zone,
    code        varchar(256),
    content     varchar(4096)
);

alter table openid_session
    owner to postgres;

