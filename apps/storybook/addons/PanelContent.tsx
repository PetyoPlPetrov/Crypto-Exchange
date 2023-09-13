import {
  AddonPanel,
  Button,
  Placeholder,
  TabsState,
} from '@storybook/components';
import { convert, styled, themes } from '@storybook/theming';
import React, { Fragment } from 'react';

export const RequestDataButton = styled(Button)({
  marginTop: '1rem',
});

export const ADDON_ID = 'storybook/my-addon';
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TAB_ID = `${ADDON_ID}/tab`;
export const PARAM_KEY = `myAddonParameter`;

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
  CLEAR: `${ADDON_ID}/clear`,
};

type Results = {
  danger: any[];
  warning: any[];
};

interface PanelContentProps {
  active: boolean;
  fetchData: () => void;
  clearData: () => void;
}

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent: React.FC<PanelContentProps> = ({
  active,
  fetchData = alert,
  clearData = alert,
}) => (
  <AddonPanel active>
    <TabsState
      initial="overview"
      backgroundColor={convert(themes.normal).background.hoverable}
    >
      <div
        id="overview"
        title="Overview"
        color={convert(themes.normal).color.positive}
      >
        <Placeholder>
          <Fragment>
            Addons can gather details about how a story is rendered. This is
            panel uses a tab pattern. Click the button below to fetch data for
            the other two tabs.
          </Fragment>
          <Fragment>
            <RequestDataButton
              secondary
              small
              onClick={fetchData}
              style={{ marginRight: 16 }}
            >
              Request data
            </RequestDataButton>

            <RequestDataButton outline small onClick={clearData}>
              Clear data
            </RequestDataButton>
          </Fragment>
        </Placeholder>
      </div>
      <div
        id="danger"
        title={` Danger`}
        color={convert(themes.normal).color.negative}
      >
        items
      </div>
      <div
        id="warning"
        title={` Warning`}
        color={convert(themes.normal).color.warning}
      >
        items
      </div>
    </TabsState>
  </AddonPanel>
);
