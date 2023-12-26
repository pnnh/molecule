create operator ?~ (procedure = _ltq_extract_regex, leftarg = ltree[], rightarg = lquery);

alter operator ?~(ltree[], lquery) owner to postgres;

