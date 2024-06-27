import { PAGE_ROUTES } from "@/constants/routes"
import { MenuItem } from "./sidebar"
import { HomeIcon } from "@/components/customs/icons/home-icon"
import CoinIcon from "@/components/customs/icons/coin-icon"
import { UserIcon } from "@/components/customs/icons/user-icon"
import UserProfileButton from "@/components/UserProfileButton"
import { DocumentIcon } from "@/components/customs/icons/document-icon"
import { compact } from "lodash"

export interface UseMenuItemsVariables {
  withoutDocsItem?: boolean
}

export const useMenuItems = (variables?: UseMenuItemsVariables) => {
  const items: MenuItem[] = compact([
    {
      path: PAGE_ROUTES.HOME,
      icon: <HomeIcon />,
      label: "Home",
    },
    {
      path: PAGE_ROUTES.CREATE_COIN,
      icon: <CoinIcon className="size-7" />,
      label: "Create coin",
    },
    {
      path: "#",
      icon: <UserIcon />,
      label: "My profile",
      container: UserProfileButton,
    },
    variables?.withoutDocsItem
      ? null
      : {
          path: "https://docs.rocket.fun",
          icon: <DocumentIcon />,
          label: "Help Docs",
        },
  ])

  return items
}
