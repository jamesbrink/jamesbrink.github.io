---
layout: page
title: How to Band-Aide a worthless database.
date: 2011-08-07
tags:
  - MySQL
  - FAIL
---
#How to Band-Aide a worthless database.

So I am working on a project with an absolutely terrible database. The tables do not have the usual tableA.tableB_id with a tableX used for associations. The associations on this spectacular database are setup like so.

**tableA**

	id | a_sad_attempt_at_association (ids of rows in tableB) | someDataField
	01,"45||34||02||35||200", "some data"

As you can see where we would normally have an id field pointing to a table for associations, we have a string with with a "||" delimiter. Now normally any sane person would come along and create a new schema, but somehow this one managed to land in production(that is another story). So, how does one work with a database like this from a programming perspective without actually fixing it? This solution I am about to offer is very scary, ugly, and not very scalable. I got around this horse shit by creating a couple of views to act as the associative table between a many-to-many relationship. The following queries could probably be cleaned up a bit and simplified, but here it is (and yes, it is about as nasty as the underlying problem, as well as a performance hit on larger databases).

We need to be able to determine the association between tableA (as shown above) to tableB, by using a new View, which we will refer to as tableX. Before we can create tableX I had to create another view called tableXsub (a good DBA should be able to avoid this - as well as finding himself with this schema). tableXsub simply looks like so:

	CREATE VIEW tableXsub AS
	(select id ,SUBSTRING_INDEX( `id` , '\|\|', 1 ) AS tableB_id from tableA)
	UNION all
	(select id, SUBSTRING_INDEX(SUBSTRING_INDEX( `id` , '\|\|', 2 ),'\|\|',-1) AS tableB_id from tableA)
	UNION all
	(select id, SUBSTRING_INDEX(SUBSTRING_INDEX( `id` , '\|\|', 3 ),'\|\|',-1) AS tableB_id from tableA)
	UNION all
	(select id, SUBSTRING_INDEX(SUBSTRING_INDEX( `id` , '\|\|', 4 ),'\|\|',-1) AS tableB_id from tableA)
	UNION all
	(select id, SUBSTRING_INDEX(SUBSTRING_INDEX( `id` , '\|\|', 5 ),'\|\|',-1) AS tableB_id from tableA)
	UNION all
	(select id, SUBSTRING_INDEX(SUBSTRING_INDEX( `id` , '\|\|', 6 ),'\|\|',-1) AS tableB_id from tableA)
	UNION all
	(select id, SUBSTRING_INDEX(SUBSTRING_INDEX( `id` , '\|\|', 7 ),'\|\|',-1) AS tableB_id from tableA)

In my case I knew that the developer never used more than 7 associations in this field => "45||34||02||35||200", so I put exactly 7 SUBSTRING_INDEX and UNIONS in here.This query will return tableA.id|tableB_id, but due to the union and state of this particular db, tableB_id will sometimes be an empty string, to get around this I created yet another and final view which we call tableX.

	CREATE VIEW tableX AS
	SELECT * FROM tableXsub WHERE tableB_id != ""


At this point I finally have a proper 3 table many-to-many association and can query it in a sane way. As far as updating these tables? use your imagination... im done.
