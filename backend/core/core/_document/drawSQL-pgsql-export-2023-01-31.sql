CREATE TABLE "recipe"(
    "recipe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "serve" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "summary" VARCHAR(255) NOT NULL,
    "desc" VARCHAR(255) NOT NULL,
    "rating_value" INTEGER NOT NULL,
    "rating_count" INTEGER NOT NULL,
    "prep_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "cook_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "recipe" ADD PRIMARY KEY("recipe_id");
CREATE INDEX "recipe_category_id_index" ON
    "recipe"("category_id");
CREATE TABLE "recipe_ingredient"(
    "ingredient_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" VARCHAR(255) NOT NULL,
    "quantity_as_float" DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    "recipe_ingredient" ADD PRIMARY KEY("recipe_id");
CREATE TABLE "category"(
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" CHAR(255) NOT NULL
);
ALTER TABLE
    "category" ADD PRIMARY KEY("category_id");
CREATE TABLE "directions"(
    "direction_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "method" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "directions" ADD PRIMARY KEY("direction_id");
CREATE INDEX "directions_recipe_id_index" ON
    "directions"("recipe_id");
CREATE TABLE "user"(
    "user_id" INTEGER NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "is_staff" BOOLEAN NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("user_id");
CREATE TABLE "recipe_review"(
    "review_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "stars" INTEGER NOT NULL,
    "date_added" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "recipe_review" ADD PRIMARY KEY("review_id");
ALTER TABLE
    "recipe_review" ADD PRIMARY KEY("recipe_id");
CREATE INDEX "recipe_review_user_id_index" ON
    "recipe_review"("user_id");
CREATE TABLE "recipe-image"(
    "image_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "image" JSON NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "default" BOOLEAN NOT NULL
);
ALTER TABLE
    "recipe-image" ADD PRIMARY KEY("image_id");
CREATE TABLE "source"(
    "url_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL,
    "url" CHAR(255) NOT NULL
);
ALTER TABLE
    "source" ADD PRIMARY KEY("url_id");
ALTER TABLE
    "recipe" ADD CONSTRAINT "recipe_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("category_id");
ALTER TABLE
    "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredient_id_foreign" FOREIGN KEY("ingredient_id") REFERENCES "recipe"("recipe_id");
ALTER TABLE
    "directions" ADD CONSTRAINT "directions_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipe"("recipe_id");
ALTER TABLE
    "recipe" ADD CONSTRAINT "recipe_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE
    "recipe_review" ADD CONSTRAINT "recipe_review_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE
    "recipe-image" ADD CONSTRAINT "recipe_image_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipe"("recipe_id");
ALTER TABLE
    "source" ADD CONSTRAINT "source_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipe"("recipe_id");