'use client';

import { Container, Box, Typography } from '@mui/material';
import { containerSx, contentBoxSx, titleSx, subtitleSx } from './styles';
import { useParaphraseFlow } from '@/lib/hooks/useParaphraseFlow';
import { ParaphraseStatus } from '@/types/paraphrase.types';
import dynamic from 'next/dynamic';

const ParaphraseEditor = dynamic(() => import('./ParaphraseEditor'));

export default function ParaphraseContainer() {
  const {
    state,
    handleInputChange,
    handlePaste,
    handleSampleText,
    handleParaphrase,
    handleClear,
    isParaphraseDisabled,
  } = useParaphraseFlow();

  return (
    <Container maxWidth={false} sx={containerSx}>
      <Box sx={contentBoxSx}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={titleSx}
        >
          AI Text Paraphraser by JustDone
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          sx={subtitleSx}
        >
          Transform your writing from good to great with our Paraphraser tool.
        </Typography>

        <ParaphraseEditor
          inputText={state.status === ParaphraseStatus.SUCCESS ? state.outputText : state.inputText}
          onInputChange={handleInputChange}
          onPaste={handlePaste}
          onSampleText={handleSampleText}
          onParaphrase={handleParaphrase}
          onClear={handleClear}
          isParaphraseDisabled={isParaphraseDisabled}
          isLoading={state.status === ParaphraseStatus.LOADING}
          isSuccess={state.status === ParaphraseStatus.SUCCESS}
          isError={state.status === ParaphraseStatus.ERROR}
          errorMessage={state.error || undefined}
        />
      </Box>
    </Container>
  );
}
