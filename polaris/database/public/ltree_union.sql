create function ltree_union(internal, internal) returns ltree_gist
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

alter function ltree_union(internal, internal) owner to postgres;

