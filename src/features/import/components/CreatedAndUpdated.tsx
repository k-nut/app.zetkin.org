import { FC } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import messageIds from '../l10n/messageIds';
import { Msg } from 'core/i18n';
import { PersonImport } from '../utils/types';

interface CreatedAndUpdatedProps {
  summary: PersonImport['summary'];
}

const CreatedAndUpdated: FC<CreatedAndUpdatedProps> = ({ summary }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" gap={2}>
      <Box
        border={1}
        borderColor={theme.palette.grey[300]}
        borderRadius={1}
        padding={2}
        width="100%"
      >
        <Msg
          id={messageIds.validation.updateOverview.created}
          values={{
            numPeople: summary.created.total,
            number: (
              <Typography
                sx={{
                  color: theme.palette.success.main,
                }}
                variant="h2"
              >
                {summary.created.total}
              </Typography>
            ),
          }}
        />
      </Box>
      <Box
        border={1}
        borderColor={theme.palette.grey[300]}
        borderRadius={1}
        padding={2}
        width="100%"
      >
        <Msg
          id={messageIds.validation.updateOverview.updated}
          values={{
            numPeople: summary.updated.total,
            number: (
              <Typography
                sx={{
                  color: theme.palette.info.light,
                }}
                variant="h2"
              >
                {summary.updated.total}
              </Typography>
            ),
          }}
        />
      </Box>
    </Stack>
  );
};

export default CreatedAndUpdated;
