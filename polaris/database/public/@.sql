-- Cyclic dependencies found

create operator @ (procedure = ltxtq_exec, leftarg = ltree, rightarg = ltxtquery, commutator = @, join = matchingjoinsel, restrict = matchingsel);

alter operator @(ltree, ltxtquery) owner to postgres;

create operator @ (procedure = ltxtq_rexec, leftarg = ltxtquery, rightarg = ltree, commutator = @, join = matchingjoinsel, restrict = matchingsel);

alter operator @(ltxtquery, ltree) owner to postgres;

-- Cyclic dependencies found

create operator @ (procedure = _ltxtq_exec, leftarg = ltree[], rightarg = ltxtquery, commutator = @, join = matchingjoinsel, restrict = matchingsel);

alter operator @(ltree[], ltxtquery) owner to postgres;

create operator @ (procedure = _ltxtq_rexec, leftarg = ltxtquery, rightarg = ltree[], commutator = @, join = matchingjoinsel, restrict = matchingsel);

alter operator @(ltxtquery, ltree[]) owner to postgres;

