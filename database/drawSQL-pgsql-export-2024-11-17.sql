CREATE TABLE "events"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NULL,
    "sport_id" BIGINT NOT NULL,
    "part1_id" BIGINT NOT NULL,
    "part2_id" BIGINT NOT NULL,
    "date" BIGINT NOT NULL,
    "venue_id" BIGINT NOT NULL,
    "description" BIGINT NULL,
    "tickets" BIGINT NULL,
    "slug" VARCHAR(255) NULL
);
ALTER TABLE
    "events" ADD PRIMARY KEY("id");
CREATE INDEX "events_sport_id_index" ON
    "events"("sport_id");
CREATE INDEX "events_part1_id_index" ON
    "events"("part1_id");
CREATE INDEX "events_part2_id_index" ON
    "events"("part2_id");
CREATE INDEX "events_venue_id_index" ON
    "events"("venue_id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_slug_unique" UNIQUE("slug");
CREATE TABLE "participants"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sport_id" BIGINT NOT NULL,
    "venue_id" BIGINT NOT NULL,
    "slug" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "participants" ADD PRIMARY KEY("id");
ALTER TABLE
    "participants" ADD CONSTRAINT "participants_name_unique" UNIQUE("name");
CREATE INDEX "participants_venue_id_index" ON
    "participants"("venue_id");
ALTER TABLE
    "participants" ADD CONSTRAINT "participants_slug_unique" UNIQUE("slug");
CREATE TABLE "sports"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "sports" ADD PRIMARY KEY("id");
ALTER TABLE
    "sports" ADD CONSTRAINT "sports_name_unique" UNIQUE("name");
ALTER TABLE
    "sports" ADD CONSTRAINT "sports_slug_unique" UNIQUE("slug");
CREATE TABLE "venues"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "latitude" VARCHAR(255) NOT NULL,
    "longitude" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "venues" ADD PRIMARY KEY("id");
ALTER TABLE
    "venues" ADD CONSTRAINT "venues_name_unique" UNIQUE("name");
ALTER TABLE
    "venues" ADD CONSTRAINT "venues_slug_unique" UNIQUE("slug");
ALTER TABLE
    "events" ADD CONSTRAINT "events_part1_id_foreign" FOREIGN KEY("part1_id") REFERENCES "participants"("id");
ALTER TABLE
    "participants" ADD CONSTRAINT "participants_sport_id_foreign" FOREIGN KEY("sport_id") REFERENCES "sports"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_part2_id_foreign" FOREIGN KEY("part2_id") REFERENCES "participants"("id");
ALTER TABLE
    "participants" ADD CONSTRAINT "participants_venue_id_foreign" FOREIGN KEY("venue_id") REFERENCES "venues"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_venue_id_foreign" FOREIGN KEY("venue_id") REFERENCES "venues"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_sport_id_foreign" FOREIGN KEY("sport_id") REFERENCES "sports"("id");