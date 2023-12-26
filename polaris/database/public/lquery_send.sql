create function lquery_send(lquery) returns bytea
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

alter function lquery_send(lquery) owner to postgres;

