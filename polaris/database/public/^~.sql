-- Cyclic dependencies found

create operator ^~ (procedure = ltq_rregex, leftarg = lquery, rightarg = ltree, commutator = ^~, join = matchingjoinsel, restrict = matchingsel);

alter operator ^~(lquery, ltree) owner to postgres;

create operator ^~ (procedure = ltq_regex, leftarg = ltree, rightarg = lquery, commutator = ^~, join = matchingjoinsel, restrict = matchingsel);

alter operator ^~(ltree, lquery) owner to postgres;

-- Cyclic dependencies found

create operator ^~ (procedure = _ltq_rregex, leftarg = lquery, rightarg = ltree[], commutator = ^~, join = matchingjoinsel, restrict = matchingsel);

alter operator ^~(lquery, ltree[]) owner to postgres;

create operator ^~ (procedure = _ltq_regex, leftarg = ltree[], rightarg = lquery, commutator = ^~, join = matchingjoinsel, restrict = matchingsel);

alter operator ^~(ltree[], lquery) owner to postgres;

