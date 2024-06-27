import { useFormContext } from "react-hook-form"
import { CoinFormState } from "../(detailed)"

export const useCoinFormContext = () => useFormContext<CoinFormState>()
