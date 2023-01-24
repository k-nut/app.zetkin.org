import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import getSurveys from 'features/smartSearch/fetching/getSurveys';
import { COLUMN_TYPE, SelectedViewColumn } from '../types';

interface SurveySubmitDateConfigProps {
  onOutputConfigured: (columns: SelectedViewColumn[]) => void;
}

const SurveySubmitDateConfig = ({
  onOutputConfigured,
}: SurveySubmitDateConfigProps) => {
  const intl = useIntl();

  //TODO: Refactor to use model pattern
  const { orgId } = useRouter().query;
  const surveysQuery = useQuery(
    ['surveysWithElements', orgId],
    getSurveys(orgId as string)
  );
  const surveys = surveysQuery.data;

  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel>
        {intl.formatMessage({
          id: 'misc.views.columnDialog.editor.fieldLabels.survey',
        })}
      </InputLabel>
      <Select
        onChange={(evt) => {
          if (!evt.target.value) {
            return;
          }
          const surveyId = evt.target.value as number;
          onOutputConfigured([
            {
              config: {
                survey_id: surveyId,
              },
              title:
                surveys?.find((survey) => survey.id === surveyId)?.title || '',
              type: COLUMN_TYPE.SURVEY_SUBMITTED,
            },
          ]);
        }}
      >
        {surveys?.map((survey) => (
          <MenuItem key={survey.id} value={survey.id}>
            {survey.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SurveySubmitDateConfig;
