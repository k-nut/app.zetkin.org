import { FC } from 'react';
import { Divider, DividerProps, useTheme } from '@mui/material';

type ZUIDividerProps = Partial<
  Pick<DividerProps, 'flexItem' | 'orientation'>
> & {
  /**
   * The variant of the divider. Defaults to 'fullWidth'
   */
  variant?: 'middle' | 'fullWidth';
};

const ZUIDivider: FC<ZUIDividerProps> = ({
  flexItem,
  orientation = 'horizontal',
  variant = 'fullWidth',
}) => {
  const theme = useTheme();

  return (
    <Divider
      flexItem={flexItem}
      orientation={orientation}
      sx={{ color: theme.palette.dividers.main }}
      variant={variant}
    />
  );
};

export default ZUIDivider;
