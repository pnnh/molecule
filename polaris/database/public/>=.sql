create operator >= (procedure = ltree_ge, leftarg = ltree, rightarg = ltree, commutator = <=, negator = <, join = scalargejoinsel, restrict = scalargesel);

alter operator >=(ltree, ltree) owner to postgres;

