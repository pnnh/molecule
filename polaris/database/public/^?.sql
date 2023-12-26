-- Cyclic dependencies found

create operator ^? (procedure = lt_q_rregex, leftarg = lquery[], rightarg = ltree, commutator = ^?, join = matchingjoinsel, restrict = matchingsel);

alter operator ^?(lquery[], ltree) owner to postgres;

create operator ^? (procedure = lt_q_regex, leftarg = ltree, rightarg = lquery[], commutator = ^?, join = matchingjoinsel, restrict = matchingsel);

alter operator ^?(ltree, lquery[]) owner to postgres;

-- Cyclic dependencies found

create operator ^? (procedure = _lt_q_rregex, leftarg = lquery[], rightarg = ltree[], commutator = ^?, join = matchingjoinsel, restrict = matchingsel);

alter operator ^?(lquery[], ltree[]) owner to postgres;

create operator ^? (procedure = _lt_q_regex, leftarg = ltree[], rightarg = lquery[], commutator = ^?, join = matchingjoinsel, restrict = matchingsel);

alter operator ^?(ltree[], lquery[]) owner to postgres;

