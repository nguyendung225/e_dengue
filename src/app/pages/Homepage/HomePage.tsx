import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import "./homepage.scss";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setSubMenu, useAuth } from "../../modules/auth";
import { hasAuthority } from "../../modules/utils/FunctionUtils";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../Constant";
import useMultiLanguage from "../../hook/useMultiLanguage";
import { KEY_LOCALSTORAGE } from "../../modules/auth/core/_consts";
import { useEffect, useState } from "react";

interface LinkBtnProps {
  linkTo: string;
  iconPath: string;
  text: string;
  hasAuthority: any;
}

const LinkButton = (props: LinkBtnProps) => {
  const { linkTo = "", iconPath, text, hasAuthority } = props;

  return (
    <>
      {/* khi có phân quyền sẽ check */}
      {hasAuthority && (
        <Link to={linkTo} onClick={() => setSubMenu(linkTo)}>
          <div className="link-button-container">
            <button type="button" className="button-link">
              <div className="cirle-animation cirle-animation-1"></div>
              <div className="cirle-animation cirle-animation-2"></div>
              <KTSVG svgClassName="spaces w-36 h-36" path={toAbsoluteUrl(iconPath)} />
            </button>
            <span className="button-text">{text}</span>
          </div>
        </Link>
      )}
    </>
  )
}

export function HomePage() {
  const { lang } = useMultiLanguage();
  const { logout } = useAuth();
  document.title = `${lang('SOFTWARE')}`;
  const accessTokenDecode = localStorage.getItem(KEY_LOCALSTORAGE?.ACCESS_TOKEN_DECODE);
  const [accessTokenInfo, setAccessTokenInfo] = useState<any>();

  useEffect(() => {
    if (!accessTokenDecode) return;
    setAccessTokenInfo(JSON.parse(accessTokenDecode));
  },[accessTokenDecode, accessTokenInfo])

  return (
    <div className="main">
      <div className="header">
        <div className="logo">
          {/* <Image src={toAbsoluteUrl("./media/logos/xHRM.svg")} /> */}
        </div>
        <div className="user">
          <div className="user-info">
            <span>{lang("GENERAL.HELLO")}</span>
            <h5>{accessTokenInfo?.sub}</h5>
          </div>
          <div className="user-avatar">
            <img src={toAbsoluteUrl("./media/avatars/blank.png")} alt="avatar" />
          </div>
          <div className="user-logout">
            <button type="button" onClick={logout}>{lang("LOGOUT")}</button>
          </div>
        </div>
      </div>
      <div className="z-100 main-content">
        <div className="body-container">
          <Row>
            <Col xs={12}>
              <h2 className="title-software">{"PHẦN MỀM QUẢN LÝ SCYK"}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <LinkButton
                linkTo={"/danh-sach-truong-hop-benh"}
                iconPath="/media/svg/icons/statistic.svg"
                text={"Thống kê SCYK"}
                hasAuthority={hasAuthority(PERMISSIONS.THONG_KE, PERMISSION_ABILITY.VIEW)}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
