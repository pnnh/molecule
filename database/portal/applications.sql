create table applications
(
    pk              varchar                                     not null
        constraint pk
            primary key,
    id              varchar       default ''::character varying not null,
    secret          varchar       default ''::character varying not null,
    rotated_secrets varchar       default ''::character varying not null,
    redirect_uris   varchar       default ''::character varying not null,
    response_types  varchar       default ''::character varying,
    grant_types     varchar       default ''::character varying,
    scopes          varchar       default ''::character varying not null,
    audience        varchar       default ''::character varying not null,
    creator         varchar                                     not null,
    title           varchar       default ''::character varying not null,
    create_time     timestamp     default now()                 not null,
    update_time     timestamp     default now()                 not null,
    description     varchar       default ''::character varying not null,
    public          integer       default 0                     not null,
    site_url        varchar(256)  default ''::character varying not null,
    status          integer       default 0                     not null,
    image           varchar(1024) default ''::character varying not null,
    rank            integer       default 0                     not null
);

comment on table applications is 'oauth2 clients';

alter table applications
    owner to postgres;

grant delete, insert, select, update on applications to debug;

