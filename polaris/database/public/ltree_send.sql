create function ltree_send(ltree) returns bytea
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function ltree_send(ltree) owner to postgres;

