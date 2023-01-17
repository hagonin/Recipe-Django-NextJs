CREATE TABLE "recipe"(
    "recipe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dish_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "recipe_name" VARCHAR(255) NOT NULL,
    "recipe_description" VARCHAR(255) NOT NULL,
    "prep_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "cook_time" TIME(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "recipe" ADD PRIMARY KEY("recipe_id");
CREATE INDEX "recipe_category_id_index" ON
    "recipe"("category_id");
CREATE TABLE "dish"(
    "dish_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "dish" ADD PRIMARY KEY("dish_id");
CREATE TABLE "recipe-ingredient"(
    "recipe_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "amount" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "recipe-ingredient" ADD PRIMARY KEY("recipe_id");
CREATE TABLE "category"(
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "category" ADD PRIMARY KEY("category_id");
CREATE TABLE "instruction"(
    "instruction_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "instruction" ADD PRIMARY KEY("instruction_id");
CREATE INDEX "instruction_recipe_id_index" ON
    "instruction"("recipe_id");
CREATE TABLE "user"(
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("user_id");
CREATE TABLE "role"(
    "role_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL
);
ALTER TABLE
    "role" ADD PRIMARY KEY("role_id");
CREATE TABLE "review"(
    "review_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment" VARCHAR(255) NOT NULL,
    "rating" INTEGER NOT NULL,
    "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "review" ADD PRIMARY KEY("review_id");
CREATE INDEX "review_recipe_id_index" ON
    "review"("recipe_id");
CREATE INDEX "review_user_id_index" ON
    "review"("user_id");
CREATE TABLE "ingredient"(
    "ingredient_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "ingredient" ADD PRIMARY KEY("ingredient_id");
CREATE TABLE "recipe-images"(
    "image_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "image" JSON NOT NULL,
    "alt_text" VARCHAR(255) NOT NULL,
    "is_feature" BOOLEAN NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "recipe-images" ADD PRIMARY KEY("image_id");
ALTER TABLE
    "recipe" ADD CONSTRAINT "recipe_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "dish"("dish_id");
ALTER TABLE
    "recipe" ADD CONSTRAINT "recipe_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("category_id");
ALTER TABLE
    "recipe-ingredient" ADD CONSTRAINT "recipe_ingredient_ingredient_id_foreign" FOREIGN KEY("ingredient_id") REFERENCES "ingredient"("ingredient_id");
ALTER TABLE
    "instruction" ADD CONSTRAINT "instruction_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipe"("recipe_id");
ALTER TABLE
    "review" ADD CONSTRAINT "review_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipe"("recipe_id");
ALTER TABLE
    "recipe" ADD CONSTRAINT "recipe_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE
    "review" ADD CONSTRAINT "review_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "role"("role_id");
ALTER TABLE
    "recipe-images" ADD CONSTRAINT "recipe_images_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipe"("recipe_id");