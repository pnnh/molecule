create table credentials
(
    pk                varchar(64)              not null
        constraint "PK_credentials"
            primary key,
    id                varchar(64)              not null,
    type              integer                  not null,
    transports        varchar(96)              not null,
    "user"            varchar(64)              not null,
    public_key        varchar(256)             not null,
    user_handle       varchar(256)             not null,
    signature_counter integer                  not null,
    cred_type         varchar(64)              not null,
    aa_guid           varchar(64)              not null,
    create_time       timestamp with time zone not null,
    update_time       timestamp with time zone not null
);

alter table credentials
    owner to postgres;

grant delete, insert, select, update on credentials to huable;

