create function text2ltree(text) returns ltree
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

alter function text2ltree(text) owner to postgres;

