import { IconButton } from '@storybook/components';
import React, { memo, useState } from 'react';

export const OutlineSelector = memo(({ name }: { name: string }) => {
  const [outline, setOutline] = useState(false);
  const toggleOutline = () => setOutline(!outline);

  return (
    <IconButton
      key="outline"
      title="Apply outlines to the preview"
      onClick={toggleOutline}
    >
      <div>{name}</div>
    </IconButton>
  );
});
