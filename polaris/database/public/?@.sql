create operator ?@ (procedure = _ltxtq_extract_exec, leftarg = ltree[], rightarg = ltxtquery);

alter operator ?@(ltree[], ltxtquery) owner to postgres;

