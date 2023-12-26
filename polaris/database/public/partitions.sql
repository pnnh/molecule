create table partitions
(
    pk          varchar(64)              not null
        constraint "PK_groups"
            primary key,
    title       varchar(128)             not null,
    create_time timestamp with time zone not null,
    update_time timestamp with time zone not null,
    owner       varchar(64)              not null,
    description varchar(256)             not null,
    channel     varchar(96),
    name        varchar(96),
    parent      varchar(96),
    level       integer default 1,
    path        ltree
);

alter table partitions
    owner to postgres;

grant delete, insert, select, update on partitions to huable;

