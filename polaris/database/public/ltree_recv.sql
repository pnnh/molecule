create function ltree_recv(internal) returns ltree
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

alter function ltree_recv(internal) owner to postgres;

