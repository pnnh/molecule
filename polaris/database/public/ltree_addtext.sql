create function ltree_addtext(ltree, text) returns ltree
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

alter function ltree_addtext(ltree, text) owner to postgres;

