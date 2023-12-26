create table accounts
(
    pk          varchar(96)                                            not null
        constraint accounts_pk
            primary key,
    create_time timestamp with time zone default now()                 not null,
    update_time timestamp with time zone default now()                 not null,
    username    varchar(128)                                           not null,
    password    varchar(1024)            default ''::character varying not null,
    photo       varchar(1024)            default ''::character varying not null,
    description varchar(1024)            default ''::character varying not null,
    mail        varchar(128)             default ''::character varying not null,
    status      integer                  default 0                     not null,
    nickname    varchar(128)             default ''::character varying not null,
    credentials varchar(1024)            default ''::character varying not null,
    session     varchar(1024)            default ''::character varying not null
);

comment on table accounts is '账户表';

comment on column accounts.pk is '主键列';

comment on column accounts.username is '用户名';

comment on column accounts.password is '密码';

comment on column accounts.mail is '电子邮件';

comment on column accounts.status is '可用状态';

alter table accounts
    owner to postgres;

create unique index accounts_index_account
    on accounts (username);

grant delete, insert, select, update on accounts to debug;

