'use client';

import { Container, Box, Typography } from '@mui/material';
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
    handleRetry,
    handleCopy,
    handleNewText,
    isParaphraseDisabled,
  } = useParaphraseFlow();

  return (
    <Container maxWidth={false} sx={{ maxWidth: '90rem', margin: '0 auto', px: { xs: 2, sm: 3 } }}>
      <Box sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, mb: { xs: 1, sm: 2 } }}
        >
          AI Text Paraphraser by JustDone
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ mb: { xs: 3, sm: 4, md: 6 }, fontSize: { xs: '1rem', sm: '1.125rem', md: '1.375rem' } }}
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
          onCopy={handleCopy}
          onNewText={handleNewText}
        />
      </Box>
    </Container>
  );
}
