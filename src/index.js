import React from 'react';
import classnames from 'classnames';
import StickyPosition from 'react-sticky-position';
import Accordion from '@economist/component-accordion';
import Balloon from '@economist/component-balloon';
import Button from '@economist/component-link-button';
import GoogleSearch from '@economist/component-google-search';
import Icon from '@economist/component-icon';
import SectionsCard from '@economist/component-sections-card';
import IconLink from './parts/menu-icon-link';
import MenuMore from './parts/menu-more';
import MenuTopic from './parts/menu-topic';

export default class Navigation extends React.Component {
  static defaultProps = {
    penName: 'guest-olejses',
  }

  constructor(props) {
    super(props);
    this.handleCloseSearchBarClick = this.handleCloseSearchBarClick.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.state = {
      searching: false,
    };
  }

  renderLoginLogout() {
    const { currentUrl, userLoggedIn, userIsSubscriber, penName } = this.props;
    const destinationParameter = currentUrl ? `?destination=${ encodeURIComponent(currentUrl) }` : '';
    const loginLogoutUrl = userLoggedIn ? `/logout${ destinationParameter }` : `/user/login${ destinationParameter }`;
    const buttonClassSuffix = userLoggedIn ? 'login' : 'logout';
    const buttonText = userLoggedIn ? 'My Account' : 'Log in';
    const registerUrl = `/user/register${ destinationParameter }`;
    const userMenuBalloonTrigger = (
      <IconLink
        href={loginLogoutUrl}
        className={`navigation__user-menu-link navigation__user-menu-link--${ buttonClassSuffix }`}
        icon="user"
        labelClassName="navigation__user-menu-link-label"
      >{buttonText}</IconLink>
    );
    if (userLoggedIn && userIsSubscriber) {
      return (
        <Balloon showOnHover trigger={userMenuBalloonTrigger} className="navigation__user-menu-popup--subscriber">
          <ul className="navigation__user-menu-linklist">
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/user">
                My account
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Manage my subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/products/renew">
                Renew my subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Buy a gift subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/user/${ penName }/newsletters`}>
                Newsletters
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/user/${ penName }/comments`}>
                My comments
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a
                className="navigation__user-menu-linklist-link--cta"
                href={loginLogoutUrl}
              >
                Log out
              </a>
            </li>
          </ul>
        </Balloon>
      );
    }
    if (userLoggedIn) {
      return (
        <Balloon showOnHover trigger={userMenuBalloonTrigger} className="navigation__user-menu-popup--registered">
          <ul className="navigation__user-menu-linklist">
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/user">
                My account
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Subscribe to The Economist
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/subscriptions/activation">
                Activate my digital subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Buy a gift subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/user/${ penName }/newsletters`}>
                Newsletters
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/user/${ penName }/comments`}>
                My comments
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a
                className="navigation__user-menu-linklist-link--cta"
                href={loginLogoutUrl}
              >
                Log out
              </a>
            </li>
          </ul>
        </Balloon>
      );
    }
    return (
      <Balloon showOnHover trigger={userMenuBalloonTrigger} className="navigation__user-menu-popup--anonymous">
        <Button href={loginLogoutUrl} className="navigation__user-menu-log-in-button">
          Log in to <span className="navigation__user-menu-the-economist-name">The Economist</span>
        </Button>
        <ul className="navigation__user-menu-linklist">
          <li className="navigation__user-menu-linklist-item">
            New to <span className="navigation__user-menu-the-economist-name">The Economist</span>?&nbsp;
            <a className="navigation__user-menu-linklist-link--cta" href={registerUrl}>
              Register now
            </a>
          </li>
          <li className="navigation__user-menu-linklist-item">
            <a className="navigation__user-menu-linklist-link--cta" href="/user">
              Manage my subscription
            </a>
          </li>
        </ul>
      </Balloon>
    );
  }

  renderSearchButton() {
    return (
      <IconLink
        href="/search"
        icon="magnifier"
        onClick={this.handleSearchButtonClick}
        className="navigation__main-navigation--desktop"
      >
        Search
      </IconLink>
    );
  }

  renderSearchBar({
    autoFocus = true,
    renderCloseButton = true,
    onCloseClick,
    className,
    swapMagnifierAndSearchBar,
  } = {}) {
    const closeButton = renderCloseButton ? (
      <div className="navigation__search-close-button-wrapper">
        <Button
          unstyled
          className="navigation__search-close-button"
          icon={{ icon: 'close', color: 'thimphu', useBackground: true }}
          onClick={onCloseClick}
        />
      </div>
    ) : null;
    let magnifier = (
      <div className="navigation__search-magnifier icon--background icon--magnifier-london"></div>
    );
    let searchBar = (
      <GoogleSearch autoFocus={autoFocus} />
    );
    if (swapMagnifierAndSearchBar) {
      [ magnifier, searchBar ] = [ searchBar, magnifier ];
    }
    return (
      <div className={classnames('navigation__search', className)}>
        {magnifier}
        {searchBar}
        {closeButton}
      </div>
    );
  }

  handleCloseSearchBarClick() {
    this.setState({ searching: false });
  }

  handleSearchButtonClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ searching: true });
    return false;
  }

  renderPrimaryNavigation() {
    const { userIsSubscriber } = this.props;
    let { accordionData } = this.props;
    const svgUri = { uri: this.props.svgUri } || {};
    if (userIsSubscriber) {
      accordionData = accordionData.filter((accordionLink) => (
        accordionLink.hideWhenSubscribed !== true
      ));
    }

    const menuAccordionTrigger = (
      <a
        href="/sections"
        className="navigation__main-navigation-link navigation__sections-link navigation--tappable-icon"
      >
        <Icon icon="hamburger" size="28px" color="white" />
        <Icon icon="close" size="28px" color="white" />
      </a>
    );
    return (
      <div className="navigation__primary-inner">
        <a href="http://www.economist.com" className="navigation__link-logo">
          <Icon icon="economist" size="64px" {...svgUri} />
        </a>
        <MenuTopic
          href={this.props.sharedMenu.topic.href}
          sectionsCardData={this.props.sectionsCardData}
          title={this.props.sharedMenu.topic.title}
        />
        <a href="/printedition"
          className="navigation__main-navigation-link navigation__main-navigation--desktop"
        >
          Print edition
        </a>
        <MenuMore
          moreBalloonData={this.props.moreBalloonData}
          href={this.props.sharedMenu.more.href}
          title={this.props.sharedMenu.more.title}
        />
        <div className="navigation__primary-expander" />
        {
          userIsSubscriber ? null : (
            <Button href={this.props.sharedMenu.subscribe.href}
              className="navigation__main-navigation-link navigation__main-navigation-link-subscribe"
              target="_blank"
              i13nModel={{
                action: 'click',
                element: 'subscribe',
              }}
              unstyled
            >
              {this.props.sharedMenu.subscribe.title}
            </Button>
          )
        }
        <div className="navigation__user-menu">
          {this.renderLoginLogout()}
        </div>
        {this.renderSearchButton()}
        <Balloon
          className="navigation__main-navigation-link navigation__mobile-accordion"
          trigger={menuAccordionTrigger}
        >
          <div>
            {this.renderSearchBar({
              autoFocus: false,
              renderCloseButton: false,
              className: 'navigation__search--inline',
              swapMagnifierAndSearchBar: true,
            })}
            <Accordion list={accordionData} />
          </div>
        </Balloon>
      </div>
    );
  }

  render() {
    const { searching } = this.state;

    const primaryContent = searching ?
      this.renderSearchBar({
        className: 'navigation__search--top-of-page',
        onCloseClick: this.handleCloseSearchBarClick,
      }) :
      this.renderPrimaryNavigation();

    const children = [ (
      <div className="navigation__primary" key="primary-navigation">
        {primaryContent}
      </div>
    ) ];
    if (this.props.children) {
      children.push(
        <div className="navigation__secondary" key="secondary">
          {this.props.children}
        </div>
      );
    }
    return (
      <StickyPosition className={this.props.className}>
        {children}
      </StickyPosition>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Navigation.propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.element),
      React.PropTypes.element,
    ]),
    links: React.PropTypes.arrayOf(React.PropTypes.object),
    penName: React.PropTypes.string,
    svgUri: React.PropTypes.string,
    userLoggedIn: React.PropTypes.bool,
    userIsSubscriber: React.PropTypes.bool,
    currentUrl: React.PropTypes.string,
    sharedMenu: React.PropTypes.shape({
      topic: React.PropTypes.shape({
        title: React.PropTypes.string,
        href: React.PropTypes.string,
      }),
      more: React.PropTypes.shape({
        title: React.PropTypes.string,
        href: React.PropTypes.string,
      }),
      subscribe: React.PropTypes.shape({
        title: React.PropTypes.string,
        href: React.PropTypes.string,
      }),
    }).isRequired,
    sectionsCardData: SectionsCard.propTypes.data,
    accordionData: Accordion.propTypes.list,
    moreBalloonData: SectionsCard.propTypes.data,
  };
}
