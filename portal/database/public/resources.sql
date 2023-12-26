create table resources
(
    pk          varchar            not null
        constraint resources_pk
            primary key,
    create_time timestamp          not null,
    update_time timestamp          not null,
    title       varchar            not null,
    description varchar            not null,
    creator     varchar            not null,
    tags        varchar            not null,
    content     jsonb              not null,
    metadata    jsonb              not null,
    version     smallint default 0 not null,
    status      smallint default 0 not null,
    mime        varchar            not null,
    size        bigint             not null,
    uri         varchar            not null
);

comment on table resources is '资源表';

comment on column resources.title is '友好展示标题';

comment on column resources.description is '资源描述';

comment on column resources.creator is '创建者';

comment on column resources.tags is '标签列表，逗号分隔';

comment on column resources.version is '资源版本';

comment on column resources.status is '状态';

comment on column resources.size is '文件字节大小';

alter table resources
    owner to debug;

