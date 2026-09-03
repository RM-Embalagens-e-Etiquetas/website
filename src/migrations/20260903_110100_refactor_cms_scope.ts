import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_home_config_sections_section" AS ENUM(
      'marquee',
      'proof',
      'differentiators',
      'catalog',
      'about-teaser',
      'contact-cta'
    );

    CREATE TABLE "company" (
      "id" serial PRIMARY KEY NOT NULL,
      "logo_id" integer,
      "brand_name" varchar,
      "phone" varchar NOT NULL,
      "whatsapp" varchar NOT NULL,
      "instagram_url" varchar NOT NULL,
      "instagram_handle" varchar,
      "address" varchar NOT NULL,
      "footer_blurb" varchar NOT NULL,
      "map_embed_url" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE "home_config" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_image_id" integer,
      "proof_label" varchar DEFAULT 'Prova fotográfica — 01',
      "about_image_id" integer,
      "about_text" varchar,
      "cta_text" varchar,
      "notice_enabled" boolean DEFAULT false,
      "notice_text" varchar,
      "notice_link" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE "home_config_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "section" "enum_home_config_sections_section" NOT NULL,
      "enabled" boolean DEFAULT true
    );

    CREATE TABLE "home_config_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE "home_config_differentiators" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "icon" "enum_home_differentiators_icon"
    );

    CREATE TABLE "home_config_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "product_groups_id" integer,
      "product_categories_id" integer,
      "media_id" integer
    );

    ALTER TABLE "company" ADD CONSTRAINT "company_logo_id_media_id_fk"
      FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "home_config" ADD CONSTRAINT "home_config_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "home_config" ADD CONSTRAINT "home_config_about_image_id_media_id_fk"
      FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "home_config_sections" ADD CONSTRAINT "home_config_sections_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."home_config"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_config_stats" ADD CONSTRAINT "home_config_stats_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."home_config"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_config_differentiators" ADD CONSTRAINT "home_config_differentiators_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."home_config"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_config_rels" ADD CONSTRAINT "home_config_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."home_config"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_config_rels" ADD CONSTRAINT "home_config_rels_product_groups_fk"
      FOREIGN KEY ("product_groups_id") REFERENCES "public"."product_groups"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_config_rels" ADD CONSTRAINT "home_config_rels_product_categories_fk"
      FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_config_rels" ADD CONSTRAINT "home_config_rels_media_fk"
      FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "company_logo_idx" ON "company" USING btree ("logo_id");
    CREATE INDEX "home_config_hero_image_idx" ON "home_config" USING btree ("hero_image_id");
    CREATE INDEX "home_config_about_image_idx" ON "home_config" USING btree ("about_image_id");
    CREATE INDEX "home_config_sections_order_idx" ON "home_config_sections" USING btree ("_order");
    CREATE INDEX "home_config_sections_parent_id_idx" ON "home_config_sections" USING btree ("_parent_id");
    CREATE INDEX "home_config_stats_order_idx" ON "home_config_stats" USING btree ("_order");
    CREATE INDEX "home_config_stats_parent_id_idx" ON "home_config_stats" USING btree ("_parent_id");
    CREATE INDEX "home_config_differentiators_order_idx" ON "home_config_differentiators" USING btree ("_order");
    CREATE INDEX "home_config_differentiators_parent_id_idx" ON "home_config_differentiators" USING btree ("_parent_id");
    CREATE INDEX "home_config_rels_order_idx" ON "home_config_rels" USING btree ("order");
    CREATE INDEX "home_config_rels_parent_idx" ON "home_config_rels" USING btree ("parent_id");
    CREATE INDEX "home_config_rels_path_idx" ON "home_config_rels" USING btree ("path");
    CREATE INDEX "home_config_rels_product_groups_id_idx" ON "home_config_rels" USING btree ("product_groups_id");
    CREATE INDEX "home_config_rels_product_categories_id_idx" ON "home_config_rels" USING btree ("product_categories_id");
    CREATE INDEX "home_config_rels_media_id_idx" ON "home_config_rels" USING btree ("media_id");
  `)

  await db.execute(sql`
    INSERT INTO "company" (
      "logo_id", "brand_name", "phone", "whatsapp", "instagram_url", "instagram_handle",
      "address", "footer_blurb", "map_embed_url", "updated_at", "created_at"
    )
    SELECT
      "logo_id", "brand_name", "phone", "whatsapp", "instagram_url", "instagram_handle",
      "address", "footer_blurb", "map_embed_url", "updated_at", "created_at"
    FROM "site"
    LIMIT 1;
  `)

  await db.execute(sql`
    INSERT INTO "home_config" (
      "hero_image_id", "proof_label", "about_image_id", "about_text", "cta_text",
      "updated_at", "created_at"
    )
    SELECT
      "hero_image_id", "proof_label", "about_image_id", "about_text", "cta_text",
      "updated_at", "created_at"
    FROM "home"
    LIMIT 1;
  `)

  await db.execute(sql`
    INSERT INTO "home_config_stats" ("_order", "_parent_id", "id", "value", "label")
    SELECT hs."_order", hc."id", hs."id", hs."value", hs."label"
    FROM "home_stats" hs
    CROSS JOIN "home_config" hc
    WHERE hs."_parent_id" = (SELECT "id" FROM "home" LIMIT 1);
  `)

  await db.execute(sql`
    INSERT INTO "home_config_differentiators" ("_order", "_parent_id", "id", "title", "description", "icon")
    SELECT hd."_order", hc."id", hd."id", hd."title", hd."description", hd."icon"
    FROM "home_differentiators" hd
    CROSS JOIN "home_config" hc
    WHERE hd."_parent_id" = (SELECT "id" FROM "home" LIMIT 1);
  `)

  await db.execute(sql`
    INSERT INTO "home_config_rels" ("order", "parent_id", "path", "media_id")
    SELECT hr."order", hc."id", hr."path", hr."media_id"
    FROM "home_rels" hr
    CROSS JOIN "home_config" hc
    WHERE hr."parent_id" = (SELECT "id" FROM "home" LIMIT 1);
  `)

  await db.execute(sql`
    INSERT INTO "home_config_sections" ("_order", "_parent_id", "id", "section", "enabled")
    SELECT v."_order", hc."id", v."id", v."section", true
    FROM "home_config" hc
    CROSS JOIN (
      VALUES
        (0, 'sec-marquee', 'marquee'::"enum_home_config_sections_section"),
        (1, 'sec-proof', 'proof'::"enum_home_config_sections_section"),
        (2, 'sec-diff', 'differentiators'::"enum_home_config_sections_section"),
        (3, 'sec-catalog', 'catalog'::"enum_home_config_sections_section"),
        (4, 'sec-about', 'about-teaser'::"enum_home_config_sections_section"),
        (5, 'sec-cta', 'contact-cta'::"enum_home_config_sections_section")
    ) AS v("_order", "id", "section");
  `)

  await db.execute(sql`
    DROP TABLE "contact_steps" CASCADE;
    DROP TABLE "contact" CASCADE;
    DROP TABLE "about_values" CASCADE;
    DROP TABLE "about" CASCADE;
    DROP TABLE "home_rels" CASCADE;
    DROP TABLE "home_differentiators" CASCADE;
    DROP TABLE "home_stats" CASCADE;
    DROP TABLE "home" CASCADE;
    DROP TABLE "site" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "home_config_rels" CASCADE;
    DROP TABLE "home_config_differentiators" CASCADE;
    DROP TABLE "home_config_stats" CASCADE;
    DROP TABLE "home_config_sections" CASCADE;
    DROP TABLE "home_config" CASCADE;
    DROP TABLE "company" CASCADE;
    DROP TYPE "public"."enum_home_config_sections_section";
  `)
}
