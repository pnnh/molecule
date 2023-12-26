create function ltree_same(ltree_gist, ltree_gist, internal) returns internal
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

alter function ltree_same(ltree_gist, ltree_gist, internal) owner to postgres;

