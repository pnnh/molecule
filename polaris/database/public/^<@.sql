create operator ^<@ (procedure = ltree_risparent, leftarg = ltree, rightarg = ltree, commutator = ^@>, join = matchingjoinsel, restrict = matchingsel);

alter operator ^<@(ltree, ltree) owner to postgres;

create operator ^<@ (procedure = _ltree_r_isparent, leftarg = ltree, rightarg = ltree[], commutator = ^@>, join = matchingjoinsel, restrict = matchingsel);

alter operator ^<@(ltree, ltree[]) owner to postgres;

create operator ^<@ (procedure = _ltree_risparent, leftarg = ltree[], rightarg = ltree, commutator = ^@>, join = matchingjoinsel, restrict = matchingsel);

alter operator ^<@(ltree[], ltree) owner to postgres;

