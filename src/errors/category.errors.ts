import { AppError } from "./AppError";

export class CategoryHasProductsError extends AppError {
  code = "CATEGORY_HAS_PRODUCTS";
}
