import * as React from 'react';
import { Button } from '@patternfly/react-core';
import PipelineImportModal from '~/concepts/pipelines/content/import/PipelineImportModal';
import { usePipelinesAPI } from '~/concepts/pipelines/context';
import { PipelineKFv2 } from '~/concepts/pipelines/kfTypes';

type ImportPipelineButtonProps = {
  onCreate?: (pipeline: PipelineKFv2) => void;
  redirectAfterImport?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'onClick'>;

const ImportPipelineButton: React.FC<ImportPipelineButtonProps> = ({
  onCreate,
  children,
  redirectAfterImport,
  ...buttonProps
}) => {
  const { apiAvailable, refreshAllAPI, pipelinesServer } = usePipelinesAPI();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        data-testid="import-pipeline-button"
        {...buttonProps}
        isDisabled={!apiAvailable || buttonProps.isDisabled || !pipelinesServer.compatible}
        onClick={() => setOpen(true)}
      >
        {children || 'Import pipeline'}
      </Button>
      <PipelineImportModal
        isOpen={open}
        redirectAfterImport={redirectAfterImport}
        onClose={(pipeline) => {
          setOpen(false);
          if (pipeline) {
            if (onCreate) {
              onCreate(pipeline);
            }
            refreshAllAPI();
          }
        }}
      />
    </>
  );
};

export default ImportPipelineButton;
