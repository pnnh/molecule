create table captcha
(
    pk          varchar(96)   not null
        primary key,
    content     varchar(2048) not null,
    create_time timestamp     not null,
    checked     integer default 0,
    update_time timestamp
);

alter table captcha
    owner to postgres;

grant delete, insert, select, update on captcha to huable;

