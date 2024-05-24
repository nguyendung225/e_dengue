import { PERMISSIONS, PERMISSION_ABILITY } from "../../Constant"

export type TMenu = {
  title: string,
  to: string,
  name: string,
  permission: string,
  ability: string,
  subMenu: TSubMenu[]
}

export type TSubMenu = {
  title: string,
  to: string,
  hasBullet: boolean,
  icon: string,
  permission: string,
  ability: string,
}

export const allMenu: TMenu[] = [
  {
    title: "Quản lý trường hợp bệnh",
    to: "/danh-sach-truong-hop-benh",
    name: "ds-bao-cao-scyk",
    permission: PERMISSIONS.SU_CO,
    ability: PERMISSION_ABILITY.VIEW,
    subMenu: [
      {
        title: "Danh sách trường hợp bệnh ",
        to: "/danh-sach-truong-hop-benh",
        hasBullet: false,
        icon: "/media/svg/icons/List ul.svg",
        permission: PERMISSIONS.THONG_KE,
        ability: PERMISSION_ABILITY.VIEW,
      },
    ]
  },
]