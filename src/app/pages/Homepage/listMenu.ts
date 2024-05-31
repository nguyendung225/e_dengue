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
    name: "danh-sach-truong-hop-benh",
    permission: PERMISSIONS.SU_CO,
    ability: PERMISSION_ABILITY.VIEW,
    subMenu: [
      {
        title: "Danh sách trường hợp bệnh ",
        to: "/danh-sach-truong-hop-benh",
        hasBullet: false,
        icon: "/media/svg/icons/person-lines-fill.svg",
        permission: PERMISSIONS.THONG_KE,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "Tìm kiếm trường hợp bệnh ",
        to: "/tim-kiem-truong-hop-benh",
        hasBullet: false,
        icon: "/media/svg/icons/search.svg",
        permission: PERMISSIONS.THONG_KE,
        ability: PERMISSION_ABILITY.VIEW,
      },
    ]
  },
  {
    title: "Quản lý ổ dịch",
    to: "/danh-sach-o-dich",
    name: "danh-sach-o-dich",
    permission: PERMISSIONS.SU_CO,
    ability: PERMISSION_ABILITY.VIEW,
    subMenu: [
      {
        title: "Danh sách ổ dịch",
        to: "/danh-sach-o-dich",
        hasBullet: false,
        icon: "/media/svg/icons/list-ul.svg",
        permission: PERMISSIONS.THONG_KE,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "Thêm mới ổ dịch",
        to: "/them-moi-o-dich",
        hasBullet: false,
        icon: "/media/svg/icons/search.svg",
        permission: PERMISSIONS.THONG_KE,
        ability: PERMISSION_ABILITY.VIEW,
      },
    ]
  },
]