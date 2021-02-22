import React, { useMemo, useState } from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { MdClose as CloseIcon } from 'react-icons/md'
import './style.scss'
import LinkButton from '../../components/LinkButton'
import clsx from 'clsx'
import { useHistory, useLocation } from 'react-router-dom'
import { commonRoute } from '../../config/routes'
import DashHead from './DashHead'
import RouteMapper from '../../utils/Router/RouteMapper'
import { dashboardRoutes } from './routes'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../redux/Action'

const Fields = ({ id, img, label, isSelected, onClick }) => {
  return (
    <div
      className={clsx('nav-fields-wrap', isSelected(id) && 'selected')}
      onClick={onClick.bind(this, id)}
    >
      <div className="nav-fields">
        <img src={require(`../../assets/img/${img}.svg`).default} alt={label} />
        <h4 className="field-label">{label}</h4>
      </div>
    </div>
  )
}

function DashBoard() {

  const avatarId = useSelector(state => state.selectAvatar.avatarIcon) || 1
  const [viewProfile, setViewProfile] = useState(false)

  const dispatch = useDispatch()

  const [isMenuOpen, setMenu] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const currentPath = useMemo(() => location.pathname, [location.pathname])

  const toggleMenu = () => setMenu((prev) => !prev)

  const goToLogin = () => {
    dispatch(userLogout())
    window.localStorage.clear();
    history.push(commonRoute.home)
  }

  function handleMenu(selected) {
    !currentPath?.includes(selected) &&
      history.push(commonRoute.dashboard[selected])
  }


  //check if the menu icon is the current path
  const isSelected = (id) => {
    if (currentPath?.includes(id)) {
      setViewProfile(false)
      return true
    }
    return false
  }

  const allyProps = {
    onClick: handleMenu,
    isSelected
  }

  const goToUserProfile = () => {
    setViewProfile(true)
    history.push(commonRoute.dashboard.userProfile)
  }

  return (
    <>
      <Grid container className="dashboard-root">
        {/* ---------------------- side bar ---------------------------------- */}
        <Grid
          item
          xs={12}
          md={1}
          sm={2}
          className={clsx('side-nav', isMenuOpen ? 'menu-open' : 'menu-closed')}
        >
          <div className="left-partition">
            {/*   sidebar menu    */}
            <IconButton className="menu-icon-btn" onClick={toggleMenu}>
              <CloseIcon className="menu-icon" />
            </IconButton>

            {/*   profile image   */}
            <div className={clsx('profile-wrap', viewProfile && 'selected')} onClick={goToUserProfile}>
              <div className="user-profile">
                <img
                  src={require(`../../assets/img/Avatar${avatarId}.svg`).default}
                  alt="profile"
                  className="user-profile-img"
                />
              </div>
            </div>

            {/*   menu items    */}
            <div className="field-main-wrap">
              <Fields
                img="dashIcon"
                label="Dashboard"
                id="mainDash"
                {...allyProps}
              />
              <Fields
                img="CashflowIcon"
                label="Cash Flow"
                id="cashFlow"
                {...allyProps}
              />
              <Fields
                img="BalanceIcon"
                label="Balance"
                id="balance"
                {...allyProps}
              />
              {/* <Fields
                img="debtIcon"
                label="Debt"
                id="debt"
                {...allyProps}
              /> */}
              <Fields
                img="StatsIcon"
                label="STATS"
                id="stats"
                {...allyProps}
              />
            </div>
          </div>

          {/*   logout section    */}
          <div className="right-partition">
            <div className="log-out-wrap">
              <LinkButton className="log-out-btn" onClick={goToLogin}>
                Sign out
              </LinkButton>
            </div>
          </div>
        </Grid>

        {/* --------------------- main section ------------------------------------ */}

        <Grid item sm={10} md={11} xs={12} className="dashboard-main-wrap">
          <Grid container className="dashboard-main">
            {/*    header    */}
            <Grid item xs={12} className="dash-header-wrap">
              <DashHead toggleMenu={toggleMenu} />
            </Grid>

            {/*   dashboard pages   */}
            <Grid item xs={12} className="dash-pages">
              <RouteMapper data={dashboardRoutes} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default DashBoard
