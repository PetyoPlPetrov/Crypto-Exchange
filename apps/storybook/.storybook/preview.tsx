import { StoryContext } from '@storybook/react';
import { theme } from 'libs/components';
import { ThemeProvider } from 'styled-components';

const withThemeProvider = (Story: any, context: StoryContext) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
