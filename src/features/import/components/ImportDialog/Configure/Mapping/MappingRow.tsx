import { FC } from 'react';
import { ArrowForward, ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material';

import messageIds from 'features/import/l10n/messageIds';
import { Option } from 'features/import/hooks/useColumn';
import useColumnValuesMessage from 'features/import/hooks/useColumnValuesMessage';
import useUIDataColumn from 'features/import/hooks/useUIDataColumn';
import { Column, ColumnKind } from 'features/import/utils/types';
import { Msg, useMessages } from 'core/i18n';

interface MappingRowProps {
  clearConfiguration: () => void;
  columnIndex: number;
  fieldOptions: Option[];
  isBeingConfigured: boolean;
  onChange: (newColumn: Column) => void;
  onConfigureStart: () => void;
  optionAlreadySelected: (value: string) => boolean;
}

const MappingRow: FC<MappingRowProps> = ({
  clearConfiguration,
  columnIndex,
  fieldOptions,
  isBeingConfigured,
  onChange,
  onConfigureStart,
  optionAlreadySelected,
}) => {
  const theme = useTheme();
  const messages = useMessages(messageIds);
  const column = useUIDataColumn(columnIndex);

  const columnValuesMessage = useColumnValuesMessage(
    column.numberOfEmptyRows,
    column.uniqueValues
  );

  const getValue = () => {
    if (column.originalColumn.kind == ColumnKind.FIELD) {
      return `field:${column.originalColumn.field}`;
    }

    if (column.originalColumn.kind != ColumnKind.UNKNOWN) {
      return column.originalColumn.kind.toString();
    }

    //Column kind is UNKNOWN, so we want no selected value
    return '';
  };

  // This has to be a function, not a component with PascalCase. If it is used
  // as a component, the `Select` below won't recognise it as a valid option.
  const listOption = ({ value, label, key }: Option & { key?: string }) => {
    const alreadySelected = optionAlreadySelected(value);
    return (
      <MenuItem
        key={key}
        disabled={alreadySelected}
        sx={{ paddingLeft: 4 }}
        value={value}
      >
        {label}
      </MenuItem>
    );
  };

  return (
    <Box
      bgcolor={isBeingConfigured ? theme.palette.transparentGrey.light : ''}
      display="flex"
      flexDirection="column"
      padding={1}
    >
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <Box alignItems="center" display="flex">
          <Checkbox
            checked={column.originalColumn.selected}
            onChange={(ev, isChecked) => {
              if (isChecked) {
                onChange({
                  ...column.originalColumn,
                  selected: isChecked,
                });
              } else {
                onChange({
                  ...column.originalColumn,
                  kind: ColumnKind.UNKNOWN,
                  selected: isChecked,
                });
              }
              clearConfiguration();
            }}
          />
          <Box
            bgcolor={theme.palette.transparentGrey.light}
            borderRadius={2}
            padding={1}
          >
            <Typography>{column.title}</Typography>
          </Box>
        </Box>
        <Box alignItems="center" display="flex" width="50%">
          <ArrowForward
            color="secondary"
            sx={{
              marginRight: 1,
              opacity: column.originalColumn.selected ? '' : '50%',
            }}
          />
          <FormControl fullWidth size="small">
            <InputLabel
              sx={{ opacity: column.originalColumn.selected ? '' : '50%' }}
            >
              <Msg id={messageIds.configuration.mapping.selectZetkinField} />
            </InputLabel>
            <Select
              disabled={!column.originalColumn.selected}
              label={messages.configuration.mapping.selectZetkinField()}
              onChange={(event) => {
                clearConfiguration();
                if (event.target.value == 'id') {
                  onChange({
                    idField: null,
                    kind: ColumnKind.ID_FIELD,
                    selected: true,
                  });
                  onConfigureStart();
                } else if (event.target.value == 'org') {
                  onChange({
                    kind: ColumnKind.ORGANIZATION,
                    mapping: [],
                    selected: true,
                  });
                  onConfigureStart();
                } else if (event.target.value == 'tag') {
                  onChange({
                    kind: ColumnKind.TAG,
                    mapping: [],
                    selected: true,
                  });
                  onConfigureStart();
                } else if (event.target.value.startsWith('field')) {
                  onChange({
                    field: event.target.value.slice(6),
                    kind: ColumnKind.FIELD,
                    selected: true,
                  });
                }
              }}
              sx={{ opacity: column.originalColumn.selected ? '' : '50%' }}
              value={getValue()}
            >
              <ListSubheader>
                <Msg
                  id={messageIds.configuration.mapping.zetkinFieldGroups.id}
                />
              </ListSubheader>
              {listOption({
                label: messages.configuration.mapping.id(),
                value: 'id',
              })}

              {fieldOptions.length > 0 && (
                <ListSubheader>
                  <Msg
                    id={
                      messageIds.configuration.mapping.zetkinFieldGroups.fields
                    }
                  />
                </ListSubheader>
              )}
              {fieldOptions.map((option) => listOption(option))}

              <ListSubheader>
                <Msg
                  id={messageIds.configuration.mapping.zetkinFieldGroups.other}
                />
              </ListSubheader>
              {listOption({
                label: messages.configuration.mapping.organization(),
                value: 'org',
              })}
              {listOption({
                label: messages.configuration.mapping.tags(),
                value: 'tag',
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginLeft={5.5}
        minHeight="40px"
      >
        {!column.needsConfig && (
          <Box display="flex" sx={{ wordBreak: 'break-word' }} width="100%">
            <Typography color="secondary" variant="body2">
              {columnValuesMessage}
            </Typography>
          </Box>
        )}
        {column.needsConfig && (
          <>
            <Typography
              color={
                column.unfinishedMapping
                  ? theme.palette.warning.main
                  : 'secondary'
              }
              variant="body2"
            >
              {column.unfinishedMapping && (
                <Msg
                  id={
                    column.originalColumn.kind == ColumnKind.ID_FIELD
                      ? messageIds.configuration.mapping.needsConfig
                      : messageIds.configuration.mapping.needsMapping
                  }
                />
              )}
              {!column.unfinishedMapping && column.mappingResultsMessage}
            </Typography>
            <Button
              endIcon={<ChevronRight />}
              onClick={() => onConfigureStart()}
              variant="text"
            >
              <Msg
                id={
                  column.originalColumn.kind == ColumnKind.ID_FIELD
                    ? messageIds.configuration.mapping.configButton
                    : messageIds.configuration.mapping.mapValuesButton
                }
              />
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MappingRow;
