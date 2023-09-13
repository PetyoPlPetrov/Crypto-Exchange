import { addons, types } from '@storybook/addons';
import React from 'react';
import { OutlineSelector } from './addons/OutlineSelector';
import { PanelContent } from './addons/PanelContent';

const ADDON_ID = 'addonid';
const ADDON_ID2 = 'addonid2';

addons.register('my/tab', () => {
  addons.add('my-panel-addon/tab', {
    type: types.TAB,
    title: 'Mytab',
    //👇 Checks the current route for the story
    route: ({ storyId, refId }) => {
      return refId ? `/mytab/${refId}_${storyId}` : `/mytab/${storyId}`;
    },

    //👇 Shows the Tab UI element in mytab view mode
    match: ({ viewMode, ...p }) => {
      return viewMode === 'mytab';
    },
    render: (props) => {
      return (
        <>
          {props.active && (
            <div>
              <h2>I'm a tabbed addon in Storybook!</h2>
              <PanelContent active />
            </div>
          )}
        </>
      );
    },
  });
});

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Outline1',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <OutlineSelector name="toolbar..." />,
  });
});

addons.register(ADDON_ID2, () => {
  addons.add(ADDON_ID2, {
    title: 'My panel tab',
    type: types.PANEL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <OutlineSelector name="Panell..." />,
  });
});
