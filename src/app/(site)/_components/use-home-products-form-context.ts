import { useFormContext } from "react-hook-form"
import { HomeProductsFormSchemaState } from "./home-product-container"

export const useHomeProductsFormContext = () => useFormContext<HomeProductsFormSchemaState>()
