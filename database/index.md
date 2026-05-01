Deeply intertwined with Physical datamodel:

Indexing (what is my fastest growing index, reference questions that i have in notes) , Query performance,

I have created the database in pg admin and i am now running queries through it. Table has been created with dummy data. I do not expect the application to have more than that data. This is the realistic yet also most pumped up scenario.

Developed a realistic SaaS scenario where the dummy data is in the correct proportions that would realistically display my database status if my project would succeed. The amount is ambitious but it is in no ways astronomical. It is fairly realistic as to other compared saas business who have a similar amount of data.

Considerations i made was creating a really realistic version of how my project could look like in order to make query performance checks that match the concrete reality.

Overview of how many rows have been created with the seed script:

Below shows one query being used in the production db. This query runs on no manually added indexing except those that are automatically added by postgres on the PK. Further queries on this db can be found in the project file README

1 Query Total query runtime: 56 msec:

EXPLAIN (ANALYZE, BUFFERS)
SELECT
we.id AS engagement_id,
we.type,
we.start_date,
we.end_date,
we.organization_id,
w.id AS worker_id,
w.first_name AS worker_first_name,
w.last_name AS worker_last_name,
w.email AS worker_email,
es.name AS engagement_status_name,
ru.first_name AS responsible_first_name,
ru.last_name AS responsible_last_name,
i.id AS issue_id,
i.title AS issue_title,
i.priority,
ist.name AS issue_status_name,
a.first_name AS assignee_first_name,
a.last_name AS assignee_last_name
FROM worker_engagements we
JOIN workers w ON w.id = we.worker_id
LEFT JOIN engagement_statuses es ON es.id = we.status_id
LEFT JOIN users ru ON ru.id = we.responsible_user_id
LEFT JOIN issues i ON i.worker_engagement_id = we.id
LEFT JOIN issue_statuses ist ON ist.id = i.status_id
LEFT JOIN users a ON a.id = i.assignee_user_id
WHERE we.organization_id = 'YOUR_ORG_ID_HERE'
ORDER BY we.created_at ASC, i.created_at DESC;

Result:

" Sort Key: we.created_at, i.created_at DESC"
" Sort Method: quicksort Memory: 65kB"
" Buffers: shared hit=5353"
" -> Nested Loop Left Join (cost=448.14..7542.22 rows=180 width=211) (actual time=1.905..35.930 rows=180.00 loops=1)"
" Buffers: shared hit=5353"
" -> Nested Loop Left Join (cost=447.85..7537.11 rows=180 width=213) (actual time=1.857..35.792 rows=180.00 loops=1)"
" Buffers: shared hit=5350"
" -> Nested Loop Left Join (cost=447.57..7483.34 rows=180 width=222) (actual time=1.832..35.510 rows=180.00 loops=1)"
" Buffers: shared hit=4810"
" -> Nested Loop Left Join (cost=447.27..7462.82 rows=180 width=224) (actual time=1.767..35.349 rows=180.00 loops=1)"
" Buffers: shared hit=4807"
" -> Nested Loop (cost=446.98..7351.72 rows=180 width=232) (actual time=1.729..35.222 rows=180.00 loops=1)"
" Buffers: shared hit=4804"
" -> Hash Right Join (cost=446.69..7219.32 rows=180 width=183) (actual time=1.666..34.897 rows=180.00 loops=1)"
" Hash Cond: (i.worker_engagement_id = we.id)"
" Buffers: shared hit=4759"
" -> Seq Scan on issues i (cost=0.00..6300.00 rows=180000 width=99) (actual time=0.033..19.829 rows=180000.00 loops=1)"
" Buffers: shared hit=4500"
" -> Hash (cost=446.50..446.50 rows=15 width=100) (actual time=1.617..1.617 rows=15.00 loops=1)"
" Buckets: 1024 Batches: 1 Memory Usage: 10kB"
" Buffers: shared hit=259"
" -> Seq Scan on worker_engagements we (cost=0.00..446.50 rows=15 width=100) (actual time=0.018..1.607 rows=15.00 loops=1)"
" Filter: (organization_id = 'e8df6732-32d3-4278-9798-be9727da32f5'::uuid)"
" Rows Removed by Filter: 14985"
" Buffers: shared hit=259"
" -> Memoize (cost=0.30..8.05 rows=1 width=65) (actual time=0.001..0.001 rows=1.00 loops=180)"
" Cache Key: we.worker_id"
" Cache Mode: logical"
" Hits: 165 Misses: 15 Evictions: 0 Overflows: 0 Memory Usage: 3kB"
" Buffers: shared hit=45"
" -> Index Scan using workers_pkey on workers w (cost=0.29..8.04 rows=1 width=65) (actual time=0.013..0.013 rows=1.00 loops=15)"
" Index Cond: (id = we.worker_id)"
" Index Searches: 15"
" Buffers: shared hit=45"
" -> Memoize (cost=0.29..6.71 rows=1 width=24) (actual time=0.000..0.000 rows=1.00 loops=180)"
" Cache Key: we.status_id"
" Cache Mode: logical"
" Hits: 179 Misses: 1 Evictions: 0 Overflows: 0 Memory Usage: 1kB"
" Buffers: shared hit=3"
" -> Index Scan using engagement_statuses_pkey on engagement_statuses es (cost=0.28..6.70 rows=1 width=24) (actual time=0.032..0.032 rows=1.00 loops=1)"
" Index Cond: (id = we.status_id)"
" Index Searches: 1"
" Buffers: shared hit=3"
" -> Memoize (cost=0.30..8.05 rows=1 width=30) (actual time=0.001..0.001 rows=1.00 loops=180)"
" Cache Key: we.responsible_user_id"
" Cache Mode: logical"
" Hits: 179 Misses: 1 Evictions: 0 Overflows: 0 Memory Usage: 1kB"
" Buffers: shared hit=3"
" -> Index Scan using users_pkey on users ru (cost=0.29..8.04 rows=1 width=30) (actual time=0.060..0.060 rows=1.00 loops=1)"
" Index Cond: (id = we.responsible_user_id)"
" Index Searches: 1"
" Buffers: shared hit=3"
" -> Index Scan using issue_statuses_pkey on issue_statuses ist (cost=0.28..0.30 rows=1 width=23) (actual time=0.001..0.001 rows=1.00 loops=180)"
" Index Cond: (id = i.status_id)"
" Index Searches: 180"
" Buffers: shared hit=540"
" -> Memoize (cost=0.30..0.32 rows=1 width=30) (actual time=0.000..0.000 rows=1.00 loops=180)"
" Cache Key: i.assignee_user_id"
" Cache Mode: logical"
" Hits: 179 Misses: 1 Evictions: 0 Overflows: 0 Memory Usage: 1kB"
" Buffers: shared hit=3"
" -> Index Scan using users_pkey on users a (cost=0.29..0.31 rows=1 width=30) (actual time=0.043..0.043 rows=1.00 loops=1)"
" Index Cond: (id = i.assignee_user_id)"
" Index Searches: 1"
" Buffers: shared hit=3"
"Planning:"
" Buffers: shared hit=30"
"Planning Time: 1.380 ms"
"Execution Time: 36.289 ms"

Key observations

Even without the use of indexing the query above might still appear to be fast with a total runtime of 56msc. However this is also due to the db being warm and data saved in memory.

The query does a full table scan on the large tables seen here
Issues → scans 180k rows
worker_engagements → scans 15k rows
This is due to missing indexes
Only 15 workers belong to an org
This leads to the 14985 rows being scanned and then discarded again
Postgres builds the hash table instead of relying on index lookups
The lookup is still efficient but it also still scans all rows
The query is heavily relying on memory usage shown by shared hit -5300 which is data that is already in the ram. This explains the fast runtime

Note: The query processes far more data than is actually necessary due to missing indexes. The speed may appear fast but by no means does it indicate that it would continue to be fast when the database further scales. The solution is proper indexing

Following indexes were added to increase performance:

CREATE INDEX worker_engagements_org_created_idx
ON worker_engagements (organization_id, created_at);

CREATE INDEX issues_engagement_created_idx
ON issues (worker_engagement_id, created_at DESC);

The adding of the above indexes changed the execution plan from sequential scans and hash joins to index scans and nested loops. This resulted in the query being 30x faster jumping from an execution time of 36.289 ms → 1.197 ms as postgres no longer scans the full worker_engagements and issues tables directly.
