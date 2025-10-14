'use client';

import { Container, Box, Typography } from '@mui/material';
import { useParaphrase } from '@/lib/hooks/useParaphrase';
import { ParaphraseStatus } from '@/types/paraphrase.types';
import dynamic from 'next/dynamic';

const InitialScreen = dynamic(() => import('./InitialScreen'));

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
  } = useParaphrase();

  const renderScreen = () => {
    switch (state.status) {
      case ParaphraseStatus.IDLE:
      case ParaphraseStatus.LOADING:
      case ParaphraseStatus.SUCCESS:
      case ParaphraseStatus.ERROR:
        return (
          <InitialScreen
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
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1440px', margin: '0 auto', px: { xs: 2, sm: 3 } }}>
      <Box sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ fontSize: { xs: '28px', sm: '36px', md: '44px' }, mb: { xs: 1, sm: 2 } }}
        >
          AI Text Paraphraser by JustDone
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ mb: { xs: 3, sm: 4, md: 6 }, fontSize: { xs: '16px', sm: '18px', md: '22px' } }}
        >
          Transform your writing from good to great with our Paraphraser tool.
        </Typography>

        {renderScreen()}
      </Box>
    </Container>
  );
}
