create operator < (procedure = ltree_lt, leftarg = ltree, rightarg = ltree, commutator = >, negator = >=, join = scalarltjoinsel, restrict = scalarltsel);

alter operator <(ltree, ltree) owner to postgres;

