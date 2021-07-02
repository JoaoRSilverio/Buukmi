import React from "react";
import IAppState from "../interfaces/state/AppState";
import { connect } from "react-redux";
import { ProfileComponent } from "./ProfileComponent";
import { IUserProfile } from "../interfaces/interfaces";
import { ROLES } from "../appConfig/Constants";
import Page from "./Page";
import { HStack, VStack } from "@chakra-ui/react";
import { NavbarDivider, NavbarGroup, NavbarHeading, Navbar, Button, Tabs, Tab } from "@blueprintjs/core";
import { Alignment } from "@blueprintjs/core/lib/esm/common/alignment";

export interface IDashboardProps {
    profile: IUserProfile;
    auth: ROLES[];
}

const Dashboard: React.FC<IDashboardProps> = props => {
    const { auth } = props;
    console.log(auth);
    if (auth.includes(ROLES.ADMIN)) {
        return (
            <VStack>
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT} >
                        <NavbarHeading>{"Admin Panel"}</NavbarHeading>
                        <NavbarDivider />
                    </NavbarGroup>
                </Navbar>
                <Tabs defaultSelectedTabId={"ng"}>
                    <Tab id="ng" title="Users" panel={<div>{"Users"}</div>} />
                    <Tab id="ap" title="Appointments" panel={<div>{"Appointments"}</div>} />
                    <Tab id="se" title="Services" panel={<div>{"Users"}</div>} />
                </Tabs>
                <ProfileComponent profile={props.profile} />
            </VStack>
        )
    }
    if (auth.includes(ROLES.PROFESSIONAL)) {
        return (<Page title={"Professional Dashboard"}>
            <ProfileComponent />
        </Page>)
    }

    return (<Page title={"Dashboard"}>
        <ProfileComponent />
    </Page>)
}
const mapStateToProps = (state: IAppState): IDashboardProps => {
    return {
        profile: state.Profile.activeProfile,
        auth: state.Auth.roles
    }
}
export default connect(
    mapStateToProps,
    undefined
)(Dashboard);
