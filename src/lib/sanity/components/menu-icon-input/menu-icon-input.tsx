import React, { useCallback } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Box, Button, Grid, Stack } from '@sanity/ui';
import { StringInputProps, set } from 'sanity';

import { MENU_ICONS } from '@/constants/menu-icons';

function MenuIconInput(props: StringInputProps) {
  const { value, onChange } = props;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(set(nextValue));
    },
    [onChange],
  );

  return (
    <Box style={{ height: '60px', overflowY: 'auto' }}>
      <Grid columns={12} gap={2}>
        {Object.entries(MENU_ICONS).map(([iconKey, iconData]) => {
          const Icon = iconData;

          return (
            <Button
              key={iconKey}
              value={iconKey}
              mode={value === iconKey ? `default` : `ghost`}
              tone={value === iconKey ? `primary` : `default`}
              radius={50}
              onClick={handleClick}
            >
              <Stack space={3} padding={0.2}>
                <Icon />
              </Stack>
            </Button>
          );
        })}
      </Grid>
    </Box>
  );
}

export default MenuIconInput;
