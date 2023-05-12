import Fuse from 'fuse.js';
import { lighten } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Add, Clear } from '@mui/icons-material';
import { Autocomplete, Box, TextField, Theme, Tooltip } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import EventTypesModel from '../models/EventTypesModel';
import messageIds from '../l10n/messageIds';
import { useMessages } from 'core/i18n';
import { ZetkinActivity, ZetkinEvent } from 'utils/types/zetkin';

interface StyleProps {
  showBorder: boolean | undefined;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  inputRoot: {
    '& fieldset': { border: 'none' },
    '&:focus, &:hover': {
      borderColor: lighten(theme.palette.primary.main, 0.65),
      paddingLeft: 10,
      paddingRight: 0,
    },
    border: '2px dotted transparent',
    borderColor: ({ showBorder }) =>
      showBorder ? lighten(theme.palette.primary.main, 0.65) : '',
    borderRadius: 10,
    maxWidth: '200px',
    paddingLeft: ({ showBorder }) => (showBorder ? 10 : 0),
    transition: 'all 0.2s ease',
  },
}));

type EventTypeAutocompleteProps = {
  onBlur: () => void;
  onChange: (newValue: ZetkinEvent['activity'] | null) => void;
  onChangeNewOption: (newId: number) => void;
  onFocus: () => void;
  showBorder?: boolean;
  types: (
    | ZetkinActivity
    | { id?: number; title: string; uncategorizedId: 'UNCATEGORIZED_ID' }
  )[];
  typesModel: EventTypesModel;
  value: ZetkinEvent['activity'];
};

interface NewEventType {
  id?: number;
  title: string | null;
  createdTypeId?: 'CREATED_TYPE_ID';
  uncategorizedId?: 'UNCATEGORIZED_ID';
}

const EventTypeAutocomplete: FC<EventTypeAutocompleteProps> = ({
  onBlur,
  onChange,
  onChangeNewOption,
  onFocus,
  showBorder,
  types,
  typesModel,
  value,
}) => {
  const [createdType, setCreatedType] = useState<string>('');

  const classes = useStyles({ showBorder });
  const messages = useMessages(messageIds);

  useEffect(() => {
    //When a user creates a new type, it is missing an event ID.
    //In here, when the length of the type changes,
    //it searches for the created event and updates event with an ID.
    if (createdType !== '') {
      const newId = types.find((item) => item.title === createdType)!.id;
      onChangeNewOption(newId!);
    }
  }, [types.length]);

  const eventTypes: NewEventType[] = types;
  const fuse = new Fuse(eventTypes.slice(0, -1), {
    keys: ['title'],
    threshold: 0.4,
  });

  return (
    <Tooltip arrow title={showBorder ? '' : messages.type.tooltip()}>
      <Autocomplete
        blurOnSelect
        classes={{
          root: classes.inputRoot,
        }}
        disableClearable
        filterOptions={(options, { inputValue }) => {
          const searchedResults = fuse.search(inputValue);
          const inputStartWithCapital = inputValue
            ? `${inputValue[0].toUpperCase()}${inputValue.substring(
                1,
                inputValue.length
              )}`
            : '';

          const filteredResult: NewEventType[] = [
            ...searchedResults.map((result) => {
              return { id: result.item.id, title: result.item.title };
            }),
            {
              title: messages.type.uncategorized(),
              uncategorizedId: 'UNCATEGORIZED_ID',
            },
          ];

          if (
            filteredResult.find(
              (item) =>
                item.title?.toLocaleLowerCase() ===
                inputValue.toLocaleLowerCase()
            )
          ) {
            return filteredResult;
          }

          filteredResult.push({
            createdTypeId: 'CREATED_TYPE_ID',
            title: inputStartWithCapital,
          });
          return inputValue ? filteredResult : options;
        }}
        fullWidth
        getOptionLabel={(option) => option.title!}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        onBlur={() => onBlur()}
        onChange={(_, value) => {
          if (value.createdTypeId) {
            typesModel.addType(value.title!);
            setCreatedType(value.title!);
          }
          onChange(
            value.id
              ? {
                  id: value.id,
                  title: value.title!,
                }
              : null
          );
        }}
        onFocus={() => onFocus()}
        options={eventTypes}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              shrink: false,
              style: {
                maxWidth: 180,
              },
            }}
            InputProps={{
              ...params.InputProps,
            }}
            size="small"
          />
        )}
        renderOption={(props, option) => {
          return (
            <Box
              key={
                option.id
                  ? option.id
                  : option.uncategorizedId ?? option.createdTypeId
              }
            >
              {option.id && <li {...props}>{option.title}</li>}
              {option.uncategorizedId && (
                <li {...props}>
                  <Clear />
                  {messages.type.uncategorized()}
                </li>
              )}
              {option.createdTypeId && (
                <li {...props}>
                  <Add />
                  {messages.type.createType({ type: option.title! })}
                </li>
              )}
            </Box>
          );
        }}
        value={
          value
            ? value
            : {
                title: messages.type.uncategorized(),
              }
        }
      />
    </Tooltip>
  );
};

export default EventTypeAutocomplete;
