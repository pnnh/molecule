create table captcha
(
    pk          varchar(96) not null
        constraint captcha_pk
            primary key,
    create_time timestamp with time zone,
    update_time timestamp with time zone,
    checked     integer,
    content     varchar(2048),
    used        smallint default 0
);

alter table captcha
    owner to postgres;

grant delete, insert, select, update on captcha to debug;

