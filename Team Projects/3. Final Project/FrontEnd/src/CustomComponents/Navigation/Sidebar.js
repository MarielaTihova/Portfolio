import React from 'react'
import { Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText } from 'react-sidebar-ui'
import 'react-sidebar-ui/dist/index.css';

const SidebarNav = () => {
    return (
        <div>
            <Sidebar bgColor='purple' isCollapsed={false}>
                <Logo
                    image='https://i.pinimg.com/originals/2e/94/62/2e9462cb6e812987c9c05491b61f887e.gif'
                    imageName='react logo' />
                <LogoText>Safe Workspace</LogoText>
                <DropdownItem
                    values={['First', 'Second', 'Third']}
                    bgColor={'purple'}>
                    Menu
        </DropdownItem>

                <Item bgColor='purple'>
                    <Icon><i className="fas fa-home" /></Icon>
          Home
        </Item>
                <Item bgColor='purple'>
                    <Icon><i className="fas fa-info" /></Icon>
          Covid Data Reports
        </Item>
                <Item bgColor='purple'>
                    <Icon><i className="fas fa-sitemap" /></Icon>
         Projects
        </Item>
                <Item bgColor='purple'>
                    <Icon><i className="far fa-address-book" /></Icon>
          Employees Vacations
        </Item>
                <Item bgColor='purple'>
                    <Icon><i className="fas fa-rss-square" /></Icon>
          Employees
        </Item>
                <InputItem type='text' placeholder={'Search...'} />
            </Sidebar>
        </div>
    )
};

export default SidebarNav;